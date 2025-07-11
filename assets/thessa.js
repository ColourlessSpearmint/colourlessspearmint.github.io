document.addEventListener("DOMContentLoaded", function () {
    // DOM Elements
    const container = document.getElementById("thessa-container");
    const wordInput = document.getElementById("word-input");
    const generateBtn = document.getElementById("generate-btn");
    const loadingContainer = document.getElementById("loading-container");
    const loadingText = document.getElementById("loading-text");
    const resultsArea = document.getElementById("results-area");
    const hoverPopover = document.getElementById("hover-popover");
    const copyNotificationEl = document.getElementById("copy-notification");
    const messageBoxEl = document.getElementById("message-box");

    // Modals & API Key
    const aboutModal = document.getElementById("about-thessa-modal");
    const apiKeyModal = document.getElementById("apiKeyModal");
    const apiKeyInput = document.getElementById("apiKeyInput");
    const apiKeyErrorEl = document.getElementById("apiKeyError");

    // State
    let userApiKey = "";
    const API_KEY_STORAGE_KEY = "thessaUserApiKey";

    // Initial Setup
    if (!loadApiKey()) {
        showModal(apiKeyModal);
    } else {
        wordInput.focus();
    }

    // Event Listeners
    generateBtn.addEventListener("click", handleGeneration);
    wordInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") handleGeneration();
    });
    document
        .getElementById("thessa-info-btn")
        .addEventListener("click", () => showModal(aboutModal));
    document.getElementById("settings-btn").addEventListener("click", () => {
        apiKeyInput.value = userApiKey || "";
        showModal(apiKeyModal);
    });
    document
        .getElementById("about-modal-close-btn")
        .addEventListener("click", () => hideModal(aboutModal));
    document
        .getElementById("apiKeyModalCloseBtn")
        .addEventListener("click", () => hideModal(apiKeyModal));
    document
        .getElementById("saveApiKeyBtn")
        .addEventListener("click", () => saveApiKey(apiKeyInput.value));

    function handleGeneration() {
        const word = wordInput.value.trim();
        if (!userApiKey) {
            showModal(apiKeyModal);
            return;
        }
        if (word) fetchWordData(word);
    }

    async function fetchWordData(word) {
        clearResultsAndMessages();
        container.classList.remove("results-state");
        if (loadingContainer) loadingContainer.style.display = "block";
        setGenerateBtnLoading(true);

        const loadingMessages = [
            "Contacting Gemini...",
            "Analyzing syllables...",
            "Consulting ancient texts...",
            "Reticulating splines...",
            "Polishing results...",
        ];
        let messageIndex = 0;
        if (loadingText)
            loadingText.textContent = loadingMessages[messageIndex];
        const messageInterval = setInterval(() => {
            messageIndex = (messageIndex + 1) % loadingMessages.length;
            if (loadingText)
                loadingText.textContent = loadingMessages[messageIndex];
        }, 2000);

        const prompt = `
        For the word "${word}", generate a JSON object. Do not include any text or markdown formatting outside of the JSON object itself.

        {
          "word": "${word}",
          "definition": "A concise definition of the word, around 20-30 words.",
          "etymology": "The origin and history of the word, in a single, engaging sentence.",
          "example_sentence": "An example sentence that clearly demonstrates the word's usage.",
          "synonyms": [ {"word": "synonym1", "definition": "..."} ],
          "antonyms": [ {"word": "antonym1", "definition": "..."} ],
          "cognates": [ {"language": "LanguageName", "word": "cognate1", "definition": "...", "flag_emoji": "🇮🇹"} ]
        }

        - Provide 10-15 diverse synonyms.
        - Provide 4-6 antonyms.
        - Provide 3-5 cognates from various languages, ensuring one is always Bulgarian. Include the appropriate country flag emoji for each.
        - All definitions must be concise and in English.
        - If a field is not applicable, return an empty string or array.
        `;

        try {
            const response = await fetch(getApiUrl(), {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                    generationConfig: {
                        temperature: 0.6,
                        maxOutputTokens: 4096,
                        response_mime_type: "application/json",
                    },
                }),
            });

            if (!response.ok)
                throw new Error(
                    (await response.json()).error?.message ||
                        `HTTP error ${response.status}`
                );

            const data = await response.json();
            const jsonText = data.candidates?.[0]?.content?.parts?.[0]?.text;
            if (!jsonText) throw new Error("No content received from API.");

            renderResults(JSON.parse(jsonText));
        } catch (error) {
            console.error("API Error:", error);
            if (messageBoxEl) {
                messageBoxEl.textContent = `Error: ${error.message}`;
                messageBoxEl.style.display = "block";
            }
        } finally {
            clearInterval(messageInterval);
            if (loadingContainer) loadingContainer.style.display = "none";
            setGenerateBtnLoading(false);
        }
    }

    function renderResults(data) {
        if (!resultsArea) return; // Prevent error if resultsArea is null
        clearResultsAndMessages();

        if (data.definition)
            resultsArea.appendChild(createCard("Definition", data.definition));
        if (data.etymology)
            resultsArea.appendChild(createCard("Etymology", data.etymology));
        if (data.example_sentence)
            resultsArea.appendChild(
                createCard("Example", data.example_sentence)
            );

        if (data.synonyms?.length) {
            data.synonyms.forEach((item) =>
                resultsArea.appendChild(createCapsule(item, "synonym"))
            );
        }
        if (data.antonyms?.length) {
            data.antonyms.forEach((item) =>
                resultsArea.appendChild(createCapsule(item, "antonym"))
            );
        }
        if (data.cognates?.length) {
            data.cognates.forEach((item) =>
                resultsArea.appendChild(createCapsule(item, "cognate"))
            );
        }

        container.classList.add("results-state");
    }

    function createCard(label, text) {
        const card = document.createElement("div");
        card.className = "result-item result-card";
        card.innerHTML = `<span class="label">${label}</span><p>${text}</p>`;
        card.addEventListener("click", () => copyToClipboard(text));
        return card;
    }

    function createCapsule(item, type) {
        const text =
            type === "cognate"
                ? `${item.flag_emoji || ""} <span class="language">${
                      item.language
                  }:</span> ${item.word}`
                : item.word;
        const capsule = document.createElement("div");
        capsule.className = `result-item capsule ${type}-capsule`;
        capsule.innerHTML = text;
        capsule.dataset.definition = item.definition;
        capsule.addEventListener("click", () => copyToClipboard(item.word));
        capsule.addEventListener("mouseover", (e) =>
            showHoverPopover(e.currentTarget)
        );
        capsule.addEventListener("mouseout", hideHoverPopover);
        return capsule;
    }

    function showHoverPopover(element) {
        const definition = element.dataset.definition;
        if (!hoverPopover || !definition) return;
        hoverPopover.textContent = definition;
        hoverPopover.classList.add("visible");
        const rect = element.getBoundingClientRect();
        hoverPopover.style.left = `${
            rect.left + rect.width / 2 - hoverPopover.offsetWidth / 2
        }px`;
        hoverPopover.style.top = `${
            rect.top - hoverPopover.offsetHeight - 10
        }px`;
    }

    function hideHoverPopover() {
        if (hoverPopover) hoverPopover.classList.remove("visible");
    }

    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            if (!copyNotificationEl) return;
            copyNotificationEl.textContent = `Copied: "${text.substring(
                0,
                25
            )}..."`;
            copyNotificationEl.classList.add("show");
            setTimeout(() => copyNotificationEl.classList.remove("show"), 2000);
        });
    }

    function clearResultsAndMessages() {
        if (resultsArea) resultsArea.innerHTML = "";
        if (messageBoxEl) messageBoxEl.style.display = "none";
    }

    function setGenerateBtnLoading(isLoading) {
        if (!generateBtn) return;
        generateBtn.disabled = isLoading;
        generateBtn.innerHTML = isLoading
            ? `<div class="loading-spinner" style="width:24px; height:24px; border-width:2px; margin:0;"></div>`
            : `<svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>`;
    }

    function loadApiKey() {
        const storedKey = localStorage.getItem(API_KEY_STORAGE_KEY);
        if (storedKey) {
            userApiKey = storedKey;
            return true;
        }
        return false;
    }

    function saveApiKey(key) {
        if (key.trim()) {
            userApiKey = key.trim();
            localStorage.setItem(API_KEY_STORAGE_KEY, userApiKey);
            hideModal(apiKeyModal);
            wordInput.focus();
        } else if (apiKeyErrorEl) {
            apiKeyErrorEl.textContent = "API Key cannot be empty.";
        }
    }

    function getApiUrl() {
        return `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${userApiKey}`;
    }

    function showModal(modal) {
        if (modal) {
            modal.style.display = "flex";
            setTimeout(() => modal.classList.add("visible"), 10);
        }
    }

    function hideModal(modal) {
        if (modal) {
            modal.classList.remove("visible");
            setTimeout(() => (modal.style.display = "none"), 300);
        }
    }
});
