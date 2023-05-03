export default function displayMessage(messageType, message, messageContainer) {
    const element = document.querySelector(messageContainer);

    element.innerHTML = `<div class="message ${messageType}">${message}</div>`;
}
