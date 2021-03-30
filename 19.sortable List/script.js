const listUl = document.getElementById('list-ul');
const checkBtn = document.getElementById('check')
const alarm = document.querySelector('.alarm');
const replayBtn = alarm.querySelector('button');

const richPeople = [
    'Bad Boys for Life',
    'Sonic the Hedgehog',
    'Birds of Prey',
    'Dolittle',
    'The Invisible Man',
    'The Call of the Wild',
    'Onward',
    'Tenet',
    'The Gentlemen',
    'The Croods: A New Age'
]

//랜덤으로 정렬된 list가 들어가는 곳
const listItems = [];

let dragstart

//list 랜덤정렬후 html에 집어넣기
[...richPeople]
    .map(a => ({ value: a, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((people, idx) => {
        const li = document.createElement('li');
        li.setAttribute('index', idx);

        li.innerHTML = `
 <span>${idx + 1}</span>
             <div class="people" draggable="true">
                 <p>${people}</p>
                 <i class="fas fa-stream"></i>
             </div>
 `
        listItems.push(li);

        listUl.appendChild(li);
        DragEvent();
    })

//li안에 있는 div에 주는 효과
function dragStart() {
    //효과를 받는 div에 가장 가까운 Li의 index를 받아오기
    dragstart = +this.closest('li').getAttribute('index');
    console.log(dragstart);
}

//li에 주는 효과들
function dragEnter() {
    this.classList.add('over');
}

function dragLeave() {
    this.classList.remove('over');
}

function dragOver(e) {
    //this.classList.add('over');
    e.preventDefault();
}

function dragDrop() {
    const dragend = this.getAttribute('index');
    console.log(dragend)
    swapItems(dragstart, dragend);
    this.classList.remove('over');
}

//div 바꿔주는 함수
function swapItems(start, end) {
    //해당되는 li의 div를 추출
    const startItem = listItems[start].querySelector('.people');
    const endItem = listItems[end].querySelector('.people');

    //추출한 div를 해당되는 li로 입력
    listItems[start].appendChild(endItem);
    listItems[end].appendChild(startItem)

}

//drag 효과  li와 div에 각각 주기
function DragEvent() {
    const peoples = document.querySelectorAll('.people');
    const listLi = document.querySelectorAll('.list-ul li');

    peoples.forEach(people => {
        people.addEventListener('dragstart', dragStart);
    })

    listLi.forEach(li => {
        li.addEventListener('dragenter', dragEnter);
        li.addEventListener('dragleave', dragLeave);
        li.addEventListener('dragover', dragOver);
        li.addEventListener('drop', dragDrop);
    })

}

//순서가 맞는지 확인하기
checkBtn.addEventListener('click', () => {
    listItems.forEach((item, idx) => {
        const list = item.querySelector('.people').innerText;
        if (richPeople[idx] == list) {
            item.classList.remove('wrong');
            item.classList.add('right');


        } else {
            item.classList.remove('right');
            item.classList.add('wrong');
        }
    })
    const arr = listItems.filter(item => item.classList.contains('right'))
    if (arr.length == 10) {
        alarm.classList.add('on');
    }
})

replayBtn.addEventListener('click', () => {
    location.reload();
})