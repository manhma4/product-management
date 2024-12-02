import * as Popper from "https://cdn.jsdelivr.net/npm/@popperjs/core@^2/dist/esm/index.js";

// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form");

if (formSendData) {
  formSendData.addEventListener("submit", (e) => {
    e.preventDefault();

    // console.log(e.target.elements.content.value);
    const content = e.target.elements.content.value;

    if (content) {
      socket.emit("CLIENT_SEND_MESSAGE", content);
      e.target.elements.content.value = "";
    }
  });
}

// End CLIENT_SEND_MESSAGE

// SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE", (data) => {
  const chatForm = document.querySelector("[my-id]");
  const myId = chatForm.getAttribute("my-id");

  const body = document.querySelector(".chat .inner-body");

  const div = document.createElement("div");
  let htmlFullName = "";

  if (myId == data.userId) {
    div.classList.add("inner-outgoing");
  } else {
    div.classList.add("inner-incoming");
    htmlFullName = `<div class="inner-name">${data.fullName}</div>`;
  }

  div.innerHTML = `
        ${htmlFullName}
        <div class="inner-content">${data.content}</div>
    `;

  body.appendChild(div);
  body.scrollTop = body.scrollHeight;
});
// End SERVER_RETURN_MESSAGE

// Function to scroll the chat to the bottom
function scrollToBottom() {
  const chatBody = document.querySelector(".inner-body");
  chatBody.scrollTop = chatBody.scrollHeight;
}
// Scroll to bottom when the page loads
scrollToBottom();

// Emoji
// Show pop-up
const buttonIcon = document.querySelector(".button-icon");
if (buttonIcon) {
  const tooltip = document.querySelector(".tooltip");
  Popper.createPopper(buttonIcon, tooltip);
  buttonIcon.onclick = () => {
    tooltip.classList.toggle("shown");
  };
}
// ENd show pop-up
const emojiPicker = document.querySelector("emoji-picker");
if (emojiPicker) {
  const input = document.querySelector(".inner-form input");
  console.log(input);
  emojiPicker.addEventListener("emoji-click", (e) => {
    const icon = e.detail.unicode;
    console.log(icon);
    input.value += icon;
  });
}
// End emoji
