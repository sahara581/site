const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Player Setting
const player = {
    x: canvas.width / 4,  // Player's initial position
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 2,
    jumpPower: 15,       // Jump power set to 15
    velocityY: 0,
    isJumping: false,
    jumpCount: 0,        // Jump Count Counter
    maxJumps: 4          // Set maximum number of jumps to 4
};

const ground = {
    x: 0,
    y: canvas.height - 50, // Ground position (bottom of canvas)
    width: canvas.width,
    height: 50
};

let obstacles = [];
let coins = [];
const obstacleFrequency = 100;
const coinFrequency = 150;
const coinDistance = 50; // Coin spacing
const minObstacleGap = 500; // Minimum spacing between obstacles
let frameCount = 0;
let isGameOver = false;
let distanceTraveled = 0; // Distance (used as score)
let coinCount = 0; // Number of coins acquired

function update() {
    if (isGameOver) return;

    // Player jump handling
    if (player.isJumping && player.jumpCount < player.maxJumps) {
        player.velocityY = -player.jumpPower;
        player.isJumping = false;
        player.jumpCount++;
    }

    // Player position update
    player.y += player.velocityY;
    player.velocityY += 0.5; // Gravity

    // Processing when the player lands on the ground
    if (player.y + player.height > ground.y) {
        player.y = ground.y - player.height;
        player.velocityY = 0;
        player.jumpCount = 0; // Reset the number of jumps when you land on the ground.
    }

    // プレイヤーの移動距離をスコアとして加算
    distanceTraveled += player.speed;

    // Obstacle generation
    if (frameCount % obstacleFrequency === 0) {
        createObstacle();
    }

    // Coin generation
    if (frameCount % coinFrequency === 0) {
        createCoins();
    }

    // Obstacle position update
    obstacles.forEach(obstacle => {
        obstacle.x -= player.speed;
    });

    // Coin position update
    coins.forEach(coin => {
        coin.x -= player.speed;
    });

    // collision detection
    checkCollisions();

    // Remove off-screen obstacles
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    coins = coins.filter(coin => coin.x + coin.width > 0);

    // drawing
    draw();

    frameCount++;
}

function createObstacle() {
    // Calculate obstacle spacing
    let lastObstacle = obstacles[obstacles.length - 1];
    let gap = Math.max(minObstacleGap, Math.floor(Math.random() * 200) + minObstacleGap);
    
    // If the last obstacle exists, set the distance from the previous obstacle
    let x = lastObstacle ? lastObstacle.x + lastObstacle.width + gap : canvas.width;

    const height = Math.floor(Math.random() * 3) * 100 + 100;
    obstacles.push({
        x: x,
        y: canvas.height - height,
        width: 50,
        height: height
    });
}

function createCoins() {
    const numCoins = Math.floor(Math.random() * 5) + 6; // Generates 6 to 10 coins
    let x = canvas.width;
    let y = ground.y - 50; // Coin Height
    let gap = coinDistance;

    // Locate obstacles and other coins to prevent duplication of coins
    for (let i = 0; i < numCoins; i++) {
        // Locate obstacles and other coins to prevent duplication of coins
        while (coins.some(coin => Math.abs(coin.x - x) < 50) ||
               obstacles.some(obstacle => Math.abs(obstacle.x - x) < 50)) {
            x += coinDistance; // Maintain coin spacing
        }
        coins.push({
            x: x,
            y: y,
            width: 30,
            height: 30
        });
        x += gap;
    }
}

function checkCollisions() {
    // Collision detection with obstacles
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            gameOver();
        }
    });

    // Coin collision determination
    coins.forEach((coin, index) => {
        if (player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y) {
            coins.splice(index, 1); // Remove coins
            coinCount++; // Increased number of coins
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Drawing the ground
    ctx.fillStyle = 'green';
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

    // Drawing the player
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // Drawing obstacle
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Drawing coin
    ctx.fillStyle = 'gold';
    coins.forEach(coin => {
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    });

    // Drawing UI
    const distanceScore = Math.floor(distanceTraveled);
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Distance: ${distanceScore}m`, 10, 30);
    ctx.fillText(`Coins: ${coinCount}`, 10, 60);
    ctx.fillText(`Speed Meter: ${player.speed}`, 10, 100)
    ctx.fillText(`Right: Acceleration`, 10, 140);
    ctx.fillText(`Left: Jump`, 10, 170);
}

function gameOver() {
    isGameOver = true;
    const distanceScore = Math.floor(distanceTraveled);
    if (confirm(`GameOver! Distance: ${distanceScore}m , Coins: ${coinCount}; Would you like to play again?`)) {
        resetGame();
    }
}

function resetGame() {
    // Reset game state
    player.x = canvas.width / 4;
    player.y = canvas.height / 2;
    player.velocityY = 0;
    player.isJumping = false;
    player.jumpCount = 0;
    player.speed = 2;

    obstacles = [];
    coins = [];
    frameCount = 0;
    isGameOver = false;
    distanceTraveled = 0; // Reset Distance
    coinCount = 0;
}

function handleInput(x) {
    const halfWidth = canvas.width / 2;

    if (x < halfWidth) {
        player.isJumping = true;
    } else {
        player.speed = player.speed * 1.1 // Tap right to accelerate
    }
}

function handleTouch(event) {
    event.preventDefault(); // Scroll prevention
    const touchX = event.touches[0].clientX;
    handleInput(touchX);
}

function handleClick(event) {
    const clickX = event.clientX;
    handleInput(clickX);
}

document.addEventListener('touchstart', handleTouch);
document.addEventListener('click', handleClick);

function gameLoop() {
    update();
    requestAnimationFrame(gameLoop);
}

gameLoop();
