const chatForm = document.getElementById("chat-form");
const chatMessage = document.querySelector(".chat-messages");

const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

//Join chatroom
socket.emit("joinRoom", { username, room });

//Get username and room from URL

console.log(username);

//Message from server
socket.on("message", (mess) => {
  console.log(mess);
  outputMessage(mess);

  chatMessage.scrollTop = chatMessage.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;

  //Emit message to server
  socket.emit("chatMessage", msg);

  //Clear input
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

//output message to DOM

function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
      ${message.text}
    </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
