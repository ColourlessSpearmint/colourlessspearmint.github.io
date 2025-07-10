function isMobileDevice() {
    return window.matchMedia("(pointer: coarse)").matches;
}
if (!isMobileDevice()) {
    const script = document.createElement("script");
    script.src =
        "https://cdn.jsdelivr.net/npm/vanilla-tilt@1.8.1/dist/vanilla-tilt.min.js";
    script.onload = function () {
        VanillaTilt.init(document.querySelectorAll("[data-tilt]"));
    };
    document.head.appendChild(script);
}

function runScrambleAnimation(element) {
    const originalText = element.textContent;
    if (!originalText) return;

    const SCRAMBLE_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
    const REVEAL_DELAY = 200;
    const SOLVE_DELAY = 100;
    const SCRAMBLE_SPEED = 50;
    const HIDDEN_CHAR = "\u2007";

    let charStates = Array.from(originalText).map((char) => ({
        final: char,
        state: "hidden",
    }));

    element.textContent = Array(originalText.length + 1).join(HIDDEN_CHAR);

    const totalRevealTime = (charStates.length - 1) * REVEAL_DELAY;
    const totalAnimationDuration =
        totalRevealTime + (charStates.length - 1) * SOLVE_DELAY;
    const startTime = performance.now();

    charStates.forEach((charState, i) => {
        setTimeout(() => {
            charState.state =
                charState.final.trim() === "" ? "solved" : "scrambled";
        }, i * REVEAL_DELAY);
        setTimeout(() => {
            charState.state = "solved";
        }, totalRevealTime + i * SOLVE_DELAY);
    });

    let lastScrambleUpdate = 0;
    let prevOutput = [];
    let finished = false;

    const update = (currentTime) => {
        const elapsed = currentTime - startTime;

        if (elapsed >= totalAnimationDuration + SOLVE_DELAY) {
            element.textContent = originalText;
            if (!finished) {
                finished = true;
            }
            return;
        }

        const scrambleIntervalPassed =
            currentTime - lastScrambleUpdate >= SCRAMBLE_SPEED;

        let currentOutput = [];
        for (let i = 0; i < charStates.length; i++) {
            const charState = charStates[i];
            switch (charState.state) {
                case "hidden":
                    currentOutput[i] = HIDDEN_CHAR;
                    break;
                case "scrambled":
                    currentOutput[i] = scrambleIntervalPassed
                        ? SCRAMBLE_CHARS[
                              Math.floor(Math.random() * SCRAMBLE_CHARS.length)
                          ]
                        : prevOutput[i];
                    break;
                case "solved":
                    currentOutput[i] = charState.final;
                    break;
            }
        }

        if (scrambleIntervalPassed) {
            lastScrambleUpdate = currentTime;
        }

        element.textContent = currentOutput.join("");
        prevOutput = currentOutput;

        requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
}

// Apply scramble animation to all elements with .scramble class
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".scramble").forEach((element) => {
        runScrambleAnimation(element);
    });
});
