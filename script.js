const flower = document.getElementById('flower');
const water = document.getElementById('water');
const butterfly = document.getElementById('butterfly');
const scoreDisplay = document.getElementById('score');
let score = 0;
let flowerPosition = 125; // Starting position of the goat
let gameInterval;
let gameSpeed = 5; // Speed of object movement

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && flowerPosition > 0) {
        flowerPosition -= 20;
    } else if (event.key === 'ArrowRight' && flowerPosition < 250) {
        flowerPosition += 20;
    }
    flower.style.left = `${flowerPosition}px`;
});

function startGame() {
    // Place initial objects randomly
    resetObject(water, 'water');
    resetObject(butterfly, 'butterfly');

    gameInterval = setInterval(() => {
        moveObject(water, 'water');
        moveObject(butterfly, 'butterfly');
        checkCollision();
    }, 20);
}

function moveObject(object, type) {
    let objectTop = parseInt(window.getComputedStyle(object).getPropertyValue('top'));

    if (objectTop >= 600) { // If object goes off the screen, reset it
        resetObject(object, type);
    } else {
        object.style.top = `${objectTop + gameSpeed}px`;
    }
}

function resetObject(object, type) {
    object.style.top = '-50px'; // Start off screen at the top
    object.style.left = `${Math.floor(Math.random() * 270)}px`; // Random X position
}

function checkCollision() {
    let flowerRect = flower.getBoundingClientRect();
    let waterRect = water.getBoundingClientRect();
    let butterflyRect = butterfly.getBoundingClientRect();

    // Check collision with leaf
    if (flowerRect.left < waterRect.right &&
        flowerRect.right > waterRect.left &&
        flowerRect.top < waterRect.bottom &&
        flowerRect.bottom > waterRect.top) {
        score++;
        scoreDisplay.textContent = score;
        resetObject(water, 'water');
    }

    // Check collision with bike
    if (flowerRect.left < butterflyRect.right &&
        flowerRect.right > butterflyRect.left &&
        flowerRect.top < butterflyRect.bottom &&
        flowerRect.bottom > butterflyRect.top) {
        clearInterval(gameInterval);
        alert('Game Over! Your Score: ' + score);
        window.location.reload();
    }
}

startGame();
