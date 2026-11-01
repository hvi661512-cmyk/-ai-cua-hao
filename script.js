const chat = document.getElementById(“chat”);
const input = document.getElementById(“input”);
const welcome = document.getElementById(“welcome”);

let history = JSON.parse(
localStorage.getItem(“hao_history”) || “[]”
);

function showMessage(text, type) {
const box = document.createElement(“div”);
box.className = “message “ + type;

if (type === "ai") {
    const label = document.createElement("div");
    label.className = "label";
    label.textContent = "✦ AI CỦA HÀO";
    box.appendChild(label);
}
const content = document.createElement("div");
content.textContent = text;
box.appendChild(content);
chat.appendChild(box);
chat.scrollTop = chat.scrollHeight;

}

function saveHistory() {
localStorage.setItem(
“hao_history”,
JSON.stringify(history)
);
}

function renderHistory() {
chat.innerHTML = “”;

if (history.length === 0) {
    chat.appendChild(welcome);
    return;
}
history.forEach(message => {
    showMessage(message.text, message.type);
});

}

function getAIResponse(text) {
const q = text.toLowerCase();

if (q.includes("xin chào") || q === "hello") {
    return "Xin chào! Tôi là AI CỦA HÀO. Tôi có thể giúp gì cho bạn?";
}
if (q.includes("bạn là ai")) {
    return "Tôi là AI CỦA HÀO – trợ lý AI cá nhân phiên bản 2.0!";
}
if (q.includes("bóng đá")) {
    return "Bạn muốn tìm hiểu về bóng đá, chiến thuật hay thủ môn?";
}
if (q.includes("việt nam")) {
    return "Đội tuyển Việt Nam 🇻🇳! Bạn muốn nói về cầu thủ hay giải đấu?";
}
if (q.includes("cảm ơn")) {
    return "Không có gì! Tôi luôn sẵn sàng hỗ trợ bạn.";
}
return "Tôi đã nhận được câu hỏi! Bộ não AI thực sự sẽ được kết nối trong bước tiếp theo.";

}

function sendMessage() {
const text = input.value.trim();

if (!text) return;
welcome?.remove();
input.value = "";
history.push({
    text: text,
    type: "user"
});
showMessage(text, "user");
const answer = getAIResponse(text);
history.push({
    text: answer,
    type: "ai"
});
showMessage(answer, "ai");
saveHistory();

}

document.getElementById(“send”).addEventListener(
“click”,
sendMessage
);

input.addEventListener(“keydown”, event => {
if (event.key === “Enter”) {
sendMessage();
}
});

document.getElementById(“newChat”).addEventListener(
“click”,
() => {
history = [];
saveHistory();
chat.innerHTML = “”;
chat.appendChild(welcome);
}
);

renderHistory();
