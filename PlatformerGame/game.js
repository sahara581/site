const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// プレイヤー設定
const player = {
    x: canvas.width / 4,  // プレイヤーの初期位置
    y: canvas.height / 2,
    width: 50,
    height: 50,
    speed: 2,
    jumpPower: 15,       // ジャンプ力を15に設定
    velocityY: 0,
    isJumping: false,
    jumpCount: 0,        // ジャンプ回数カウンタ
    maxJumps: 4          // 最大ジャンプ回数を4に設定
};

const ground = {
    x: 0,
    y: canvas.height - 50, // 地面の位置 (キャンバスの下部)
    width: canvas.width,
    height: 50
};

let obstacles = [];
let coins = [];
const obstacleFrequency = 100;
const coinFrequency = 150;
const coinDistance = 50; // コイン間隔
const minObstacleGap = 500; // 障害物間の最小間隔
let frameCount = 0;
let isGameOver = false;
let startTime = Date.now();
let coinCount = 0; // 取得したコインの数

function update() {
    if (isGameOver) return;

    // プレイヤーのジャンプ処理
    if (player.isJumping && player.jumpCount < player.maxJumps) {
        player.velocityY = -player.jumpPower;
        player.isJumping = false;
        player.jumpCount++;
    }

    // プレイヤーの位置更新
    player.y += player.velocityY;
    player.velocityY += 0.5; // 重力

    // プレイヤーが地面に着地した場合の処理
    if (player.y + player.height > ground.y) {
        player.y = ground.y - player.height;
        player.velocityY = 0;
        player.jumpCount = 0; // 地面に着地したらジャンプ回数をリセット
    }

    // 障害物生成
    if (frameCount % obstacleFrequency === 0) {
        createObstacle();
    }

    // コイン生成
    if (frameCount % coinFrequency === 0) {
        createCoins();
    }

    // 障害物の位置更新
    obstacles.forEach(obstacle => {
        obstacle.x -= player.speed;
    });

    // コインの位置更新
    coins.forEach(coin => {
        coin.x -= player.speed;
    });

    // 衝突判定
    checkCollisions();

    // 画面外の障害物を削除
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
    coins = coins.filter(coin => coin.x + coin.width > 0);

    // 描画
    draw();

    frameCount++;
}

function createObstacle() {
    // 障害物の間隔を計算
    let lastObstacle = obstacles[obstacles.length - 1];
    let gap = Math.max(minObstacleGap, Math.floor(Math.random() * 200) + minObstacleGap);
    
    // 最後の障害物が存在する場合、前の障害物との間隔を設定
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
    const numCoins = Math.floor(Math.random() * 5) + 6; // 6〜10個のコインを生成
    let x = canvas.width;
    let y = ground.y - 50; // コインの高さ
    let gap = coinDistance;

    // コインの重複を防ぐため、障害物と他のコインの位置を確認
    for (let i = 0; i < numCoins; i++) {
        // コインの重複を防ぐため、障害物と他のコインの位置を確認
        while (coins.some(coin => Math.abs(coin.x - x) < 50) ||
               obstacles.some(obstacle => Math.abs(obstacle.x - x) < 50)) {
            x += coinDistance; // コインの間隔を保つ
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
    // 障害物との衝突判定
    obstacles.forEach(obstacle => {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            gameOver();
        }
    });

    // コインとの衝突判定
    coins.forEach((coin, index) => {
        if (player.x < coin.x + coin.width &&
            player.x + player.width > coin.x &&
            player.y < coin.y + coin.height &&
            player.y + player.height > coin.y) {
            coins.splice(index, 1); // コインを削除
            coinCount++; // コイン数を増加
        }
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 地面の描画
    ctx.fillStyle = 'green';
    ctx.fillRect(ground.x, ground.y, ground.width, ground.height);

    // プレイヤーの描画
    ctx.fillStyle = 'blue';
    ctx.fillRect(player.x, player.y, player.width, player.height);

    // 障害物の描画
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // コインの描画
    ctx.fillStyle = 'gold';
    coins.forEach(coin => {
        ctx.fillRect(coin.x, coin.y, coin.width, coin.height);
    });

    // スコアの描画
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${elapsedTime}秒`, 10, 30);
    ctx.fillText(`Coins: ${coinCount}`, 10, 60); // コイン数の表示
}

function gameOver() {
    isGameOver = true;
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    if (confirm(`ゲームオーバー！ スコア: ${elapsedTime}秒、コイン数: ${coinCount}。もう一度プレイしますか？`)) {
        resetGame();
    }
}

function resetGame() {
    // ゲームの状態をリセット
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
    startTime = Date.now();
    coinCount = 0;
}

function handleInput(x) {
    const halfWidth = canvas.width / 2;

    if (x < halfWidth) {
        player.isJumping = true;
    } else {
        player.speed += 1; // 右側タップで加速
    }
}

function handleTouch(event) {
    event.preventDefault(); // スクロール防止
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
