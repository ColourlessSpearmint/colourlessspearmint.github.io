document.addEventListener("DOMContentLoaded", () => {
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-button");
    const chatMessages = document.getElementById("chat-messages");

    // Function to add a new message
    function addMessage(content, isUser) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${
            isUser ? "user-message" : "bot-message"
        }`;

        const avatar = document.createElement("div");
        avatar.className = `avatar ${isUser ? "user-avatar" : ""}`;

        const avatarIcon = document.createElement("span");
        avatarIcon.className = "avatar-icon";
        avatarIcon.textContent = isUser ? "U" : "EI";

        const messageContent = document.createElement("div");
        messageContent.className = `message-content ${
            isUser ? "user-content" : "bot-content"
        }`;
        messageContent.textContent = content;

        avatar.appendChild(avatarIcon);
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);

        chatMessages.appendChild(messageDiv);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Send message function
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message) {
            // Add user message
            addMessage(message, true);

            // Clear input
            messageInput.value = "";

            // Show "typing..." message
            const typingIndicator = document.createElement("div");
            typingIndicator.className = "message bot-message typing-indicator";
            typingIndicator.innerHTML = `
                <div class="avatar">
                    <span class="avatar-icon">EI</span>
                </div>
                <div class="message-content bot-content">thinking,..</div>
            `;
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;

            // Replace with actual bot response after a delay
            setTimeout(() => {
                typingIndicator.remove(); // Remove the "..." indicator
                addMessage(
                    "That's a great question/comment/whatever! Unfortunately, this is just a prewritten message. I couldn't be bothered to integrate an actual AI into this overproduced attempt at humor.",
                    false
                );
            }, 1500);
        }
    }

    // Event listeners
    sendButton.addEventListener("click", sendMessage);

    messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    });

    // Fix for mobile virtual keyboard adjusting viewport height
    const originalHeight = window.innerHeight;
    window.addEventListener("resize", () => {
        if (window.innerHeight < originalHeight) {
            // Keyboard is likely open
            document.body.style.height = originalHeight + "px";
        } else {
            document.body.style.height = "";
        }
    });
});
