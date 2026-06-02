const socket = io("http://localhost:5001");

const chatBox = document.getElementById("chat-box");

function sendMessage() {

    const username =
        document.getElementById("username").value;

    const message =
        document.getElementById("message").value;

    if (!username || !message) {
        return;
    }

    socket.emit("sendMessage", {
        username,
        message,
        time: new Date().toLocaleTimeString()
    });

    document.getElementById("message").value = "";
}

socket.on("receiveMessage", (data) => {

    const div = document.createElement("div");

    div.className = "message";

    div.innerHTML = `
        <strong>${data.username}</strong>
        <small>(${data.time})</small>
        <br>
        ${data.message}
    `;

    chatBox.appendChild(div);

    chatBox.scrollTop = chatBox.scrollHeight;
});