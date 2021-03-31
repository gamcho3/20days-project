const messageEl = document.getElementById('message')
const countEl = document.querySelector('.count');

let count = 1;

function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}
const RandomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

recognition.start();

recognition.addEventListener('result', voiceSpeak);

recognition.addEventListener('end', () => recognition.start());

function voiceSpeak(e) {
    const text = e.results[0][0].transcript;
    writeMessage(text);
    checkNumber(text);

}

function writeMessage(text) {
    messageEl.innerHTML = `<div>${text}</div>`;
}

function checkNumber(text) {
    const num = +text
    if (count > 6) {
        messageEl.innerHTML = `<div>game is over</div>`;

    }

    if (Number.isNaN(num)) {
        messageEl.innerHTML = `<div>your answer '${text}' is not NUMBER</div>`
    }
    if (num > 100 || num < 0) {
        messageEl.innerHTML = `<div>your answer '${num}' is not between 1 - 100</div>`

    }
    if (num == RandomNum) {
        messageEl.innerHTML += `<div>great! you win</div><button onclick="location.reload()">play again</button>`
    } else if (num > RandomNum) {
        messageEl.innerHTML += '<div>get Lower</div>';
        countEl.innerHTML = count++;
    } else if (num < RandomNum) {
        messageEl.innerHTML += `<div>get Higher</div>`;
        countEl.innerHTML = count++;
    }

}
