const socket = io('http://localhost:5000')
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const name = prompt('What\'s your name?')
appendMessage('You joined')
socket.emit('new-user', name)

socket.on('chat-message', data => {
    appendMessage(`${data.name}: ${data.message}`) 
})

socket.on('user-connected', name => {
    appendMessage(`${name} is connected`)
})

socket.on('user-disconnected', name => {
    appendMessage(`${name} left the chat`)
})

messageForm.addEventListener('submit', e => {
    //this is gonna stop our page from posting to our server
    //which is also gonna stop it from refreshing 
    //when we click send our page will not refresh which is perfect (RTA)
    e.preventDefault()
    const message = messageInput.value
    appendMessage(`You: ${message}`) 
    socket.emit('send-chat-message', message)
    messageInput.value = ''
})

function appendMessage(message) {
    const messageElement = document.createElement('div')
    messageElement.innerText = message
    messageElement.style.padding = '5px'
    messageElement.style.borderBottom = '0.3px aliceblue solid'
    messageElement.style.margin = '3px'
    messageElement.style.backgroundColor = 'aliceblue'
    messageElement.style.border = '0.1px solid lightblue'
    messageElement.style.borderRadius = '9px'
    messageContainer.append(messageElement)
}
