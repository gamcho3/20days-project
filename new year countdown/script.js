const btnContainer = document.getElementById('btnContainer');
const menuBtn = document.getElementById('menu');
const day = document.getElementById('day');
const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');
const containerEl = document.querySelector('.container');
const loadingEl = document.getElementById('loading');




menuBtn.addEventListener('click', () => {
    btnContainer.classList.add('show');

})
// 현재 년도
const currentYear = new Date().getFullYear();
//새해 시간
const newTime = new Date('jan 01 2022 00:00:00');

const chritmas = new Date('december 25 2022 00:00:00');
const thanksgivingday = 0;

//시간 얻기
function getCountDown() {
    //현재 시간 얻기
    const currentTime = new Date();
    //새해 시간 - 현재시간 / 초 60단위로 만들기
    const s = Math.floor((newTime - currentTime) / 1000 % 60);
    // 1일 = 86400초
    const d = Math.floor((newTime - currentTime) / 1000 / 86400);
    //1시간 = 3600초 % 24시간단위로 나누기
    const h = Math.floor((newTime - currentTime) / 1000 / 3600 % 24);
    const m = Math.floor((newTime - currentTime) / 1000 / 60 % 60);

    day.innerText = d;
    hour.innerText = h < 10 ? `0${h}` : h;
    minute.innerText = m < 10 ? `0${m}` : m;
    second.innerText = s < 10 ? `0${s}` : s;

}

setInterval(getCountDown, 1000);

setTimeout(() => {
    loadingEl.style.display = 'none';
    containerEl.style.display = 'flex';
}, 1000)

