const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let score = 0;


ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
//  공의 위치,크기,움직이는속도
const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 5,
    speed: 3,
    dx: 5,
    dy: -4
}

//막대의 위치와 너비등등
const paddle = {
    x: canvas.width / 2,
    y: canvas.height - 20,
    width: 130,
    height: 25,
    speed: 6,
    dx: 5
}

//벽돌의 정보
const brickInfo = {
    width: 50,
    height: 50,
    padding: 40,
    offsetX: 50,
    offsetY: 60,
    visible: true
}

const brickRowCount = 6;//벽돌의 열
const brickcolumnCount = 4;//벽돌의 행

const bricks = [];

//벽돌 정보를 배열에 넣기
for (let i = 0; i < brickRowCount; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickcolumnCount; j++) {
        //블럭의 위치   
        const x = i * (brickInfo.padding + brickInfo.width) + brickInfo.offsetX;
        const y = j * (brickInfo.padding + brickInfo.height) + brickInfo.offsetY;

        bricks[i][j] = { x, y, ...brickInfo };
    }
}


//벽돌 만들기
function makeBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            ctx.beginPath();
            ctx.fillStyle = (brick.visible ? 'blue' : 'transparent');
            ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
            ctx.closePath();
        })
    })
}

//공 만들기
function makeBall() {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fill();

}


//밑 막대기 만들기
function makePaddle() {
    ctx.beginPath();
    ctx.fillStyle = 'green';
    ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    ctx.fill();
}

function makeScore() {
    ctx.font = '20px serif';
    ctx.fillText(`score : ${score}`, canvas.width / 2 + 100, 30)
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;

    //공위 얖옆으로 나갈려고할때
    if (ball.x + ball.size > canvas.width || ball.x - ball.size < 0) {
        ball.dx *= -1;
    }
    //공이 위 아래로 나갈려고 할때
    if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
        ball.dy *= -1;
    }
    //paddle안에 공이 들어갈때
    if (ball.y + ball.size > paddle.y && ball.x > paddle.x && ball.x < paddle.x + paddle.width) {
        ball.dy *= -1;
    }

    bricks.forEach(column => {
        column.forEach(brick => {

            if (brick.visible) {

                if (ball.x > brick.x && ball.x + ball.size < brick.x + brick.width
                    && ball.y + ball.size > brick.y && ball.y < brick.y + brick.height) {
                    ball.dy *= -1;
                    brick.visible = false;
                    increaseScore();
                }

            }

        })
    })

    if (ball.y + ball.size > canvas.height) {
        showAllBricks();
        score = 0;
    }

}


function keydown(e) {
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = -paddle.speed;
    }
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = paddle.speed;
    }
}

function keyup(e) {
    if (e.key === 'Left' || e.key === 'ArrowLeft') {
        paddle.dx = 0;
    }
    if (e.key === 'Right' || e.key === 'ArrowRight') {
        paddle.dx = 0;
    }
}

function movePaddle() {
    paddle.x += paddle.dx;

    if (paddle.x + paddle.width > canvas.width) {
        paddle.x = canvas.width - paddle.width;
    }
    if (paddle.x < 0) {
        paddle.x = 0;
    }
}


//애니메이션 반복함수
function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)//그림이 움직이게 해주는 효과(계속 캔버스를 지움)
    make();
    moveBall();
    movePaddle();
    requestAnimationFrame(update);
}

function increaseScore() {
    score++;

}

function showAllBricks() {
    bricks.forEach(column => {
        column.forEach(brick => {
            brick.visible = true;
        })
    })
}


update();




function make() {
    makeScore();
    makeBall();
    makePaddle();
    makeBricks();
}

document.addEventListener("keydown", keydown);
document.addEventListener("keyup", keyup);