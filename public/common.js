(function loadQuicklink() {
    if (typeof quicklink === "undefined") {
        const script = document.createElement("script");
        script.src = "https://unpkg.com/quicklink@2.2.0/dist/quicklink.umd.js";
        script.onload = () => {
            quicklink.listen();
        };
        document.head.appendChild(script);
    } else {
        quicklink.listen();
    }
})();

customElements.define(
    "ethan-header",
    class EthanHeader extends HTMLElement {
        constructor() {
            super();
        }

        connectedCallback() {
            this.innerHTML = `
            <header>
                <a href="/" class="title-container" tabindex="0" aria-label="Home">
                    <span class="title-item">Ethan</span>
                    <span class="title-item"> Marks</span>
                </a>
                <nav>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/blog">Blog</a>
                    <a href="/tag/projects">Projects</a>
                </nav>
            </header>
            `;
            // Get references to the header and nav elements
            const headerElement = this.querySelector("header");
            const navElement = this.querySelector("nav");

            if (headerElement && navElement) {
                // Function to add the 'nav-animations-skipped' class and clean up listeners
                const skipNavAnimations = () => {
                    headerElement.classList.add("nav-animations-skipped");
                    // Once nav animations are skipped, remove event listeners.
                    // The "fly-in" effects are meant to run once or be instantly skipped.
                    headerElement.removeEventListener(
                        "mouseenter",
                        handleHeaderEnter
                    );
                    headerElement.removeEventListener(
                        "focusin",
                        handleHeaderFocusIn
                    );
                };

                // Event handler for mouse entering the entire header area
                const handleHeaderEnter = () => {
                    skipNavAnimations();
                };

                // Event handler for keyboard focus entering anywhere within the header
                // This covers accessibility for keyboard users by checking if focus lands inside <header>
                const handleHeaderFocusIn = (event) => {
                    if (headerElement.contains(event.target)) {
                        // Ensure focus is truly within the header
                        skipNavAnimations();
                    }
                };

                // Attach event listeners to the header element
                headerElement.addEventListener("mouseenter", handleHeaderEnter);
                headerElement.addEventListener("focusin", handleHeaderFocusIn);
            }
        }
    }
);

customElements.define(
    "ethan-footer",
    class EthanFooter extends HTMLElement {
        constructor() {
            super();
        }
        connectedCallback() {
            this.innerHTML = `
            <footer>
                <span>Ethan Marks, &copy;2025</span>
            </footer>
            `;
            this.footer = this.querySelector("footer");
            this.updateFooterPosition = this.updateFooterPosition.bind(this);
            this._footerAnimationFrame = null;
            this._footerLoop = () => {
                this.updateFooterPosition();
                this._footerAnimationFrame = requestAnimationFrame(
                    this._footerLoop
                );
            };
            window.addEventListener("resize", this.updateFooterPosition);
            this._footerLoop();
        }
        disconnectedCallback() {
            window.removeEventListener("resize", this.updateFooterPosition);
            if (this._footerAnimationFrame) {
                cancelAnimationFrame(this._footerAnimationFrame);
                this._footerAnimationFrame = null;
            }
        }
        updateFooterPosition() {
            // Check if the document is shorter than the viewport
            const docHeight = document.documentElement.scrollHeight;
            const winHeight = window.innerHeight;
            if (docHeight <= winHeight + 1) {
                this.footer.classList.add("fixed-bottom");
            } else {
                this.footer.classList.remove("fixed-bottom");
            }
        }
    }
);

// Set background-attachment: fixed if scroll height is less than viewport height
(function setBackgroundAttachmentFixedIfShortPage() {
    function updateBackgroundAttachment() {
        if (document.documentElement.scrollHeight <= window.innerHeight) {
            document.body.style.backgroundAttachment = "fixed";
        } else {
            document.body.style.backgroundAttachment = "";
        }
    }
    window.addEventListener("DOMContentLoaded", updateBackgroundAttachment);
    window.addEventListener("resize", updateBackgroundAttachment);
})();

// Add 'scroll' class to tables wider than 90vw
(function addScrollClassToWideTables() {
    function updateTableScrollClasses() {
        var vw90 = window.innerWidth * 0.9;
        document.querySelectorAll("table").forEach(function (table) {
            if (table.scrollWidth > vw90) {
                table.classList.add("scroll");
            } else {
                table.classList.remove("scroll");
            }
        });
    }
    window.addEventListener("DOMContentLoaded", updateTableScrollClasses);
    window.addEventListener("resize", updateTableScrollClasses);
})();

// add 'lightmode' class to body if user prefers light color scheme
const allowLightMode = false;
const forceLightMode = false;
(function handleLightMode() {
    const lightQuery = window.matchMedia("(prefers-color-scheme: light)");
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    function updateLightMode() {
        if ((lightQuery.matches && allowLightMode) || forceLightMode) {
            document.body.classList.add("lightmode");
        } else {
            document.body.classList.remove("lightmode");
        }
    }

    document.addEventListener("DOMContentLoaded", function () {
        updateLightMode();
        lightQuery.addEventListener("change", updateLightMode);
        darkQuery.addEventListener("change", updateLightMode);
    });
})();
