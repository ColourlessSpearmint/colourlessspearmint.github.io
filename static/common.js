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

// Set footer position if page height is less than viewport height
(function makeFooterStickyOnShortPages() {
    function updateFooterPosition() {
        const footer = document.querySelector("footer");
        if (!footer) {
            // If there's no footer on the page, do nothing.
            return;
        }

        // Check if the document's total height is less than or equal to the viewport height.
        if (document.documentElement.scrollHeight <= window.innerHeight) {
            footer.classList.add("fixed-bottom");
        } else {
            footer.classList.remove("fixed-bottom");
        }
    }

    // Run the function when the DOM is ready and when the window is resized.
    window.addEventListener("DOMContentLoaded", updateFooterPosition);
    window.addEventListener("resize", updateFooterPosition);
})();

// Set background attachment: fixed if scroll height is less than viewport height
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
