const playerScore = document.getElementById("score1")
const computerScore = document.getElementById("score2")
const playerBar = document.getElementById("player")
const computerBar = document.getElementById("computer")
const ball = document.getElementById("ball")
const startButton = document.getElementById("start")
let playerPosition = 0
let computerPosition = 0
let ballPosition = [0 , 680]
let direction = 'downleft'
let score1 = 0
let score2 = 0
let interval
let interval2
let started = false

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (playerPosition <=265) {
            playerPosition += 10
            playerBar.style.bottom = (playerPosition) + 'px'
            }
            break
        case 'ArrowDown' :
            if (playerPosition >= -265) {
            playerPosition -= 10
            console.log(playerPosition)
            playerBar.style.bottom = (playerPosition) + 'px'
            }
            break
    }
})

startButton.addEventListener('click', startGame)

function startGame() {
    if (started == false) {
    started = true
    ballPosition = [0, 680]
    interval = setInterval(moveBall, 1)
    interval2 = setInterval(moveComputer, 14)
    }
}

function moveBall() {
    switch (direction) {
        case 'downleft': 
            ballPosition[0] -= 1
            ballPosition[1] -= 1
            ball.style.bottom = ballPosition[0] + 'px'
            ball.style.left = ballPosition[1] + 'px'
            checkCollisions()
            break
        case 'upleft': 
            ballPosition[0] += 1
            ballPosition[1] -= 1
            ball.style.bottom = ballPosition[0] + 'px'
            ball.style.left = ballPosition[1] + 'px'
            checkCollisions()
            break
        case 'downright': 
            ballPosition[0] -= 1
            ballPosition[1] += 1
            ball.style.bottom = ballPosition[0] + 'px'
            ball.style.left = ballPosition[1] + 'px'
            checkCollisions()
            break
        case 'upright': 
            ballPosition[0] += 1
            ballPosition[1] += 1
            ball.style.bottom = ballPosition[0] + 'px'
            ball.style.left = ballPosition[1] + 'px'
            checkCollisions()
            break
    }
}

function checkCollisions() {
    checkPlayerCollisions()
    if (!checkPlayerCollisions()) {
        checkWallCollisions()
        checkIfPoint()
    }
}

function checkWallCollisions() {
    if (direction == 'downleft' && ballPosition[0] <= -275) {
        direction = 'upleft'
    } else if (direction == 'upleft' && ballPosition[0] >= 275) {
        direction = 'downleft'
    } else if (direction == 'downright' && ballPosition[0] <= -275) {
        direction = 'upright'
    } else if (direction == 'upright' && ballPosition[0] >= 275) {
        direction = 'downright'
    }
}

function checkIfPoint() {
    if (ballPosition[1] == -40) {
        clearInterval(interval)
        clearInterval(interval2)
        score2 += 1
        computerScore.innerHTML = score2
        startButton.innerHTML = 'RESUME'
        started = false
    } else if (ballPosition[1] == 1360) {
        clearInterval(interval)
        clearInterval(interval2)
        score1 += 1
        playerScore.innerHTML = score1
        startButton.innerHTML = 'RESUME'
        started = false
    }
}

function checkPlayerCollisions() {
    if (ballPosition[1] == 40 && (ballPosition[0] >= playerPosition - 30 && ballPosition[0] <= playerPosition + 30)) {
        switch (direction) {
            case 'downleft':
                direction = 'downright'
                break;
            case 'upleft':
                direction = 'upright'
                break
        }
    } else if (ballPosition[1] == 1290 && (ballPosition[0] >= computerPosition - 30 && ballPosition[0] <= computerPosition + 30)) {
        switch (direction) {
            case 'downright':
                direction = 'downleft'
                break;
            case 'upright':
                direction = 'upleft'
                break
        }
    }
}

function moveComputer() {
    if (computerPosition < ballPosition[0]) {
        computerPosition += 3
        computerBar.style.bottom = computerPosition + 'px'
    } else if (computerPosition > ballPosition[0]) {
        computerPosition -= 3
        computerBar.style.bottom = computerPosition + 'px'
    }
}

