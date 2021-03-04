const circle = document.querySelector('.circle-container');
const time = document.getElementById('time');
const smallcircle = document.querySelector('.small-circle-container');
const inCircle = document.querySelector('.in-circle');

//360도를 5등분으로 나눔
let totalTime = 5000;
let breathTime = (totalTime / 5) * 2;
let holdTime = totalTime / 5;



time.addEventListener('input', () => {
    totalTime = +(time.value * 1000);
    smallcircle.style.animation = `rotate ${totalTime / 1000}s linear infinite`;
})




function breathAnimation() {
    inCircle.innerText = 'inhale...'
    circle.className = 'circle-container grow';

    setTimeout(() => {
        inCircle.innerText = 'hold...'

        setTimeout(() => {
            inCircle.innerText = 'exhale...'
            circle.className = 'circle-container shrink'


        }, holdTime)
    }, breathTime)
}

setInterval(() => {
    breathAnimation();
}, totalTime)


