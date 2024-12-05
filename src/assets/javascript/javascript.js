
const socket = io('http://localhost:3400');


const loginForm = document.getElementById('loginForm');
const roomSelection = document.getElementById('roomSelection');
const chatArea = document.getElementById('chatArea');
const messageInputContainer = document.getElementById('messageInputContainer');
const loginButton = document.getElementById('loginButton');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const joinRoomButton = document.getElementById('joinRoom');
const messageInput = document.getElementById('messageInput');
const sendMessageButton = document.getElementById('sendMessage');
const messagesContainer = document.getElementById('messages');
const loginError = document.getElementById('loginError');


loginButton.addEventListener('click', () => {
    const email = emailInput.value;
    const password = passwordInput.value;


    fetch('http://localhost:3400/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
        
            loginForm.style.display = 'none';
            roomSelection.style.display = 'block';
        } else {
  
            loginError.style.display = 'block';
        }
    })
    .catch(error => {
        console.error('Error logging in:', error);
    });
});

joinRoomButton.addEventListener('click', () => {
    const room = document.getElementById('room').value;
    if (room) {
        socket.emit('join', room);
        roomSelection.style.display = 'none';
        chatArea.style.display = 'block';
        messageInputContainer.style.display = 'block';
        messagesContainer.innerHTML = `<p>Joined room: ${room}</p>`;
    } else {
        alert('Please enter a room name');
    }
});


sendMessageButton.addEventListener('click', () => {
    const message = messageInput.value;
    const room = document.getElementById('room').value;
    if (message && room) {
        socket.emit('message', { room, message });
        messageInput.value = '';
    } else {
        alert('Please enter a message');
    }
});


socket.on('message', (message) => {
    messagesContainer.innerHTML += `<p>${message}</p>`;
    messagesContainer.scrollTop = messagesContainer.scrollHeight;  
});
