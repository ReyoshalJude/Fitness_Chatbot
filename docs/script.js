const API_BASE = "https://fitness-chatbot-80vp.onrender.com/";

function addMessage(text, type) {
    const box = document.getElementById("chat-box");
    const div = document.createElement("div");
    div.className = "msg " + type;
    div.innerText = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById("user-input");
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";

    addMessage("Thinking...", "bot");

    const response = await fetch(API_BASE + "/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
    });

    const data = await response.json();

    const msgs = document.querySelectorAll(".msg.bot");
    msgs[msgs.length - 1].remove();

    addMessage(data.reply, "bot");
}
