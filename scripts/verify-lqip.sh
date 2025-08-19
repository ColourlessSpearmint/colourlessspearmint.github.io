#!/bin/bash

# LQIP Implementation Verification Script
# Tests all components of the blobhash image placeholder system

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Counters
TESTS_PASSED=0
TESTS_FAILED=0
TOTAL_TESTS=0

# Test result tracking
run_test() {
    local test_name="$1"
    local test_command="$2"
    local expected_result="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "${BLUE}[TEST $TOTAL_TESTS]${NC} $test_name"
    
    if eval "$test_command" >/dev/null 2>&1; then
        if [ "$expected_result" = "pass" ]; then
            echo -e "${GREEN}  ✅ PASSED${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        else
            echo -e "${RED}  ❌ FAILED (expected failure but passed)${NC}"
            TESTS_FAILED=$((TESTS_FAILED + 1))
        fi
    else
        if [ "$expected_result" = "fail" ]; then
            echo -e "${GREEN}  ✅ PASSED (expected failure)${NC}"
            TESTS_PASSED=$((TESTS_PASSED + 1))
        else
            echo -e "${RED}  ❌ FAILED${NC}"
            TESTS_FAILED=$((TESTS_FAILED + 1))
        fi
    fi
}

run_test_with_output() {
    local test_name="$1"
    local test_command="$2"
    local min_expected="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    echo -e "${BLUE}[TEST $TOTAL_TESTS]${NC} $test_name"
    
    local result=$(eval "$test_command" 2>/dev/null || echo "0")
    
    if [ "$result" -ge "$min_expected" ]; then
        echo -e "${GREEN}  ✅ PASSED${NC} (found $result, expected ≥$min_expected)"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}  ❌ FAILED${NC} (found $result, expected ≥$min_expected)"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

print_header() {
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}  LQIP Implementation Verification Script${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo ""
}

print_section() {
    echo ""
    echo -e "${YELLOW}--- $1 ---${NC}"
}

print_summary() {
    echo ""
    echo -e "${BLUE}================================================${NC}"
    echo -e "${BLUE}  TEST SUMMARY${NC}"
    echo -e "${BLUE}================================================${NC}"
    echo "Total Tests: $TOTAL_TESTS"
    echo -e "Passed: ${GREEN}$TESTS_PASSED${NC}"
    echo -e "Failed: ${RED}$TESTS_FAILED${NC}"
    
    if [ $TESTS_FAILED -eq 0 ]; then
        echo -e "${GREEN}🎉 All tests passed! LQIP implementation is working correctly.${NC}"
        return 0
    else
        echo -e "${RED}⚠️  Some tests failed. Please check the implementation.${NC}"
        return 1
    fi
}

# Get script directory and project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

print_header

# Change to project root
cd "$PROJECT_ROOT"
echo "Project root: $PROJECT_ROOT"

print_section "File Structure Tests"

run_test "Go generator exists" "[ -f 'scripts/generate-lqip.go' ]" "pass"
run_test "Go module file exists" "[ -f 'scripts/go.mod' ]" "pass"
run_test "Render template exists" "[ -f 'layouts/_default/_markup/render-image.html' ]" "pass"
run_test "CSS file exists" "[ -f 'static/classlessspearmint.css' ]" "pass"
run_test "Media directory exists" "[ -d 'assets/media' ]" "pass"
run_test "Data directory exists" "[ -d 'data' ]" "pass"

print_section "Go Environment Tests"

run_test "Go is installed" "command -v go" "pass"
run_test "Go version is 1.21+" "go version | grep -E 'go1\.(2[1-9]|[3-9][0-9])'" "pass"
run_test "Go modules initialized" "[ -f 'scripts/go.sum' ]" "pass"

print_section "Hugo Environment Tests"

run_test "Hugo is installed" "command -v hugo" "pass"
run_test "Hugo version check" "hugo version" "pass"

print_section "Image Assets Tests"

run_test_with_output "WebP images found" "find assets/media -name '*.webp' | wc -l" "1"
run_test_with_output "Total image files" "find assets/media -name '*.webp' -o -name '*.jpg' -o -name '*.jpeg' -o -name '*.png' | wc -l" "1"

print_section "LQIP Data Generation Tests"

if [ ! -f "data/lqip.yaml" ]; then
    echo -e "${YELLOW}  ⚠️  LQIP data not found, generating...${NC}"
    cd scripts && go run generate-lqip.go && cd ..
fi

run_test "LQIP data file exists" "[ -f 'data/lqip.yaml' ]" "pass"
run_test_with_output "LQIP entries generated" "grep -c 'value:' data/lqip.yaml || echo 0" "1"
run_test "LQIP YAML is valid" "python3 -c 'import yaml; yaml.safe_load(open(\"data/lqip.yaml\"))'" "pass"

print_section "Hugo Template Tests"

run_test "Template contains LQIP logic" "grep -q 'lqip_data' layouts/_default/_markup/render-image.html" "pass"
run_test "Template uses Site.Data.lqip" "grep -q 'Site\.Data\.lqip' layouts/_default/_markup/render-image.html" "pass"
run_test "Template sets --lqip property" "grep -q '\-\-lqip:' layouts/_default/_markup/render-image.html" "pass"

print_section "CSS Implementation Tests"

run_test "CSS contains LQIP selector" "grep -q '\[style.*--lqip:' static/classlessspearmint.css" "pass"
run_test "CSS has decode variables" "grep -q 'lqip-ca:' static/classlessspearmint.css" "pass"
run_test "CSS uses mod function" "grep -q 'mod(' static/classlessspearmint.css" "pass"
run_test "CSS uses pow function" "grep -q 'pow(' static/classlessspearmint.css" "pass"
run_test "CSS has radial gradients" "grep -q 'radial-gradient' static/classlessspearmint.css" "pass"
run_test "CSS has oklab colors" "grep -q 'oklab(' static/classlessspearmint.css" "pass"

print_section "Hugo Build Tests"

echo -e "${BLUE}  Building Hugo site...${NC}"
if hugo --minify >/dev/null 2>&1; then
    echo -e "${GREEN}  Hugo build successful${NC}"
    
    run_test "Public directory created" "[ -d 'public' ]" "pass"
    run_test_with_output "HTML pages generated" "find public -name '*.html' | wc -l" "10"
    run_test "Test page generated" "[ -f 'public/lqip-test.html' ]" "pass"
    
    print_section "LQIP Integration Tests"
    
    run_test_with_output "Images with LQIP attributes" "grep -r 'style.*--lqip' public/ | wc -l || echo 0" "1"
    run_test "LQIP values are integers" "grep -r 'style.*--lqip.*[0-9]' public/ | head -1" "pass"
    run_test "Background properties included" "grep -r 'background-size.*cover' public/ | head -1" "pass"
    
    # Test specific LQIP values
    if grep -q "anagramcolab\.webp" data/lqip.yaml; then
        run_test "Anagram image has LQIP" "grep -r 'anagramcolab.*--lqip' public/" "pass"
    fi
    
    print_section "CSS Function Support Tests"
    
    echo -e "${BLUE}  Note: CSS function support requires browser testing${NC}"
    echo -e "${BLUE}  Visit /lqip-test.html in a modern browser to verify${NC}"
    
else
    echo -e "${RED}  Hugo build failed${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

print_section "Performance Tests"

if [ -f "data/lqip.yaml" ]; then
    LQIP_ENTRIES=$(grep -c "value:" data/lqip.yaml || echo 0)
    IMAGE_COUNT=$(find assets/media -name "*.webp" -o -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" | wc -l)
    
    echo "LQIP entries: $LQIP_ENTRIES"
    echo "Image files: $IMAGE_COUNT"
    
    if [ "$LQIP_ENTRIES" -gt 0 ] && [ "$IMAGE_COUNT" -gt 0 ]; then
        COVERAGE=$((LQIP_ENTRIES * 100 / IMAGE_COUNT))
        echo "LQIP coverage: $COVERAGE%"
        
        if [ "$COVERAGE" -ge 90 ]; then
            echo -e "${GREEN}  ✅ Excellent LQIP coverage${NC}"
        elif [ "$COVERAGE" -ge 70 ]; then
            echo -e "${YELLOW}  ⚠️  Good LQIP coverage${NC}"
        else
            echo -e "${RED}  ❌ Low LQIP coverage${NC}"
        fi
    fi
fi

print_section "Recommendations"

echo "🔧 To test browser compatibility:"
echo "   1. Open http://localhost:1313/lqip-test.html"
echo "   2. Check browser console for CSS errors"
echo "   3. Use network throttling to see placeholders"
echo ""
echo "🚀 To deploy:"
echo "   1. Run: scripts/build-with-lqip.sh --minify"
echo "   2. Deploy the 'public' directory"
echo ""
echo "🔄 To regenerate LQIP data:"
echo "   1. Run: scripts/generate-lqip.sh"
echo "   2. Rebuild: hugo --minify"

print_summary