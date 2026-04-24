// Game state
const GameState = {
    MENU: 0,
    PLAYING: 1,
    GAME_OVER: 2
};

const Difficulty = {
    EASY: 0,
    MEDIUM: 1,
    HARD: 2,
    INSANE: 3,
    UNBEATABLE: 4,
    BLIND_NIGHTMARE: 5
};

const difficultyNames = [
    "Easy",
    "Medium",
    "Hard",
    "INSANE",
    "UNBEATABLE!",
    "BLIND NIGHTMARE"
];

// Game objects
let canvas, ctx, overlay;
let width = 800, height = 600;
let currentState = GameState.MENU;
let currentDifficulty = Difficulty.MEDIUM;
let selectedDifficultyIndex = 1;

// Player
let player = {
    x: 400,
    y: 500,
    vx: 0,
    vy: 0,
    size: 40,
    speed: 400,
    bulletSpeed: 600,
    shootCooldown: 0,
    health: 3,
    invincibleTimer: 0,
    color: '#32CD32' // limegreen
};

// Game entities
let enemies = [];
let playerBullets = [];
let enemyBullets = [];
let powerUps = [];
let particles = [];
let scorePopups = [];
let stars = [];

// Game state variables
let enemySpawnTimer = 0;
let enemySpawnInterval = 0.4;
let powerUpSpawnTimer = 0;
let powerUpSpawnInterval = 5;
let score = 0;
let highScore = 0;

// Difficulty scaling
let enemyBaseSpeed = 200;
let enemySpeedMultiplier = 1;
let spawnIntervalMultiplier = 1;

// Special mode flags
let insaneMode = false;
let unbeatableMode = false;
let blindNightmare = false;

// Cooldowns
let shotCooldownTimer = 0;
const shotCooldownDuration = 5; // INSANE mode
const blindShotCooldown = 2;     // BLIND NIGHTMARE

// Power-up timers
let rapidFireTimer = 0;
let shieldTimer = 0;
const rapidFireDuration = 5;
const shieldDuration = 5;

// Screen effects
let shakeIntensity = 0;
let shakeDuration = 0;
let distortionTime = 0;
let distortionIntensity = 0;

// Input state
const keys = {};

// Timing
let lastTime = 0;
let deltaTime = 0;
let fps = 0;
let frameCount = 0;
let lastFpsUpdate = 0;

// Initialize
window.addEventListener('load', () => {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');
    overlay = document.getElementById('ui-overlay');
    
    // Input handling
    window.addEventListener('keydown', (e) => {
        const key = e.key;
        keys[key] = true;
        
        // Prevent default for game controls
        if ([' ', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 
              'w', 'a', 's', 'd', 'W', 'A', 'S', 'D', 'F11', 'r', 'R',
              '1', '2', '3'].includes(key)) {
            e.preventDefault();
        }
        
        // F11 fullscreen
        if (key === 'F11') {
            e.preventDefault();
            toggleFullscreen();
        }
        
        // Number keys for player color
        if (currentState === GameState.PLAYING || currentState === GameState.MENU) {
            if (key === '1') player.color = '#32CD32'; // limegreen
            if (key === '2') player.color = '#00FFFF'; // cyan
            if (key === '3') player.color = '#FFA500'; // orange
        }
    });
    
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        keys[key] = false;
    });
    
    // Initialize stars
    regenerateStars();
    
    // Start game loop
    requestAnimationFrame(gameLoop);
});

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
    setTimeout(regenerateStars, 100);
}

function regenerateStars() {
    stars = [];
    const starCount = 200;
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            speed: 20 + Math.random() * 80,
            brightness: 0.3 + Math.random() * 0.7,
            size: 1 + Math.floor(Math.random() * 3)
        });
    }
}

function gameLoop(currentTime) {
    // Calculate delta time
    if (lastTime === 0) {
        lastTime = currentTime;
        requestAnimationFrame(gameLoop);
        return;
    }
    
    deltaTime = Math.min(0.05, (currentTime - lastTime) / 1000);
    lastTime = currentTime;
    
    // FPS calculation
    frameCount++;
    if (currentTime - lastFpsUpdate >= 1000) {
        fps = frameCount;
        frameCount = 0;
        lastFpsUpdate = currentTime;
    }
    
    // Update screen effects
    if (shakeDuration > 0) {
        shakeDuration -= deltaTime;
        if (shakeDuration <= 0) shakeIntensity = 0;
    }
    
    if (distortionIntensity > 0) {
        distortionTime += deltaTime * 3;
    }
    
    // Update game based on state
    switch (currentState) {
        case GameState.MENU:
            updateMenu();
            break;
        case GameState.PLAYING:
            updatePlaying();
            break;
        case GameState.GAME_OVER:
            updateGameOver();
            break;
    }
    
    // Update stars
    updateStars();
    
    // Draw everything
    draw();
    
    // Update UI overlay
    updateUI();
    
    requestAnimationFrame(gameLoop);
}

function updateMenu() {
    // Difficulty selection with arrow keys
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        selectedDifficultyIndex--;
        if (selectedDifficultyIndex < 0) selectedDifficultyIndex = 5;
        // Clear key to prevent rapid changes
        keys['ArrowLeft'] = false;
        keys['a'] = false;
        keys['A'] = false;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        selectedDifficultyIndex++;
        if (selectedDifficultyIndex > 5) selectedDifficultyIndex = 0;
        keys['ArrowRight'] = false;
        keys['d'] = false;
        keys['D'] = false;
    }
    
    // Start game with Space or Enter
    if (keys[' '] || keys['Enter']) {
        currentDifficulty = selectedDifficultyIndex;
        startGame();
        keys[' '] = false;
        keys['Enter'] = false;
    }
}

function startGame() {
    // Set mode flags
    insaneMode = (currentDifficulty === Difficulty.INSANE);
    unbeatableMode = (currentDifficulty === Difficulty.UNBEATABLE);
    blindNightmare = (currentDifficulty === Difficulty.BLIND_NIGHTMARE);
    
    // Base settings per difficulty
    switch (currentDifficulty) {
        case Difficulty.EASY:
            enemyBaseSpeed = 150;
            enemySpawnInterval = 0.6;
            player.bulletSpeed = 700;
            break;
        case Difficulty.MEDIUM:
            enemyBaseSpeed = 200;
            enemySpawnInterval = 0.4;
            player.bulletSpeed = 600;
            break;
        case Difficulty.HARD:
            enemyBaseSpeed = 300;
            enemySpawnInterval = 0.25;
            player.bulletSpeed = 500;
            break;
        case Difficulty.INSANE:
            enemyBaseSpeed = 450;
            enemySpawnInterval = 0.15;
            player.bulletSpeed = 800;
            break;
        case Difficulty.UNBEATABLE:
            enemyBaseSpeed = 700;
            enemySpawnInterval = 0.08;
            player.bulletSpeed = 1000;
            break;
        case Difficulty.BLIND_NIGHTMARE:
            enemyBaseSpeed = 600;
            enemySpawnInterval = 0.1;
            player.bulletSpeed = 1200;
            break;
    }
    
    // Reset player
    player = {
        x: 400,
        y: 500,
        vx: 0,
        vy: 0,
        size: 40,
        speed: 400,
        bulletSpeed: player.bulletSpeed,
        shootCooldown: 0,
        health: (insaneMode || unbeatableMode || blindNightmare) ? 1 : 3,
        invincibleTimer: 0,
        color: player.color
    };
    
    // Reset game state
    enemies = [];
    playerBullets = [];
    enemyBullets = [];
    powerUps = [];
    particles = [];
    scorePopups = [];
    enemySpawnTimer = 0;
    powerUpSpawnTimer = 0;
    enemySpeedMultiplier = 1;
    spawnIntervalMultiplier = 1;
    score = 0;
    rapidFireTimer = 0;
    shieldTimer = 0;
    shotCooldownTimer = 0;
    
    // Reset effects
    shakeIntensity = 0;
    shakeDuration = 0;
    distortionIntensity = 0;
    distortionTime = 0;
    
    // Apply special effects for Blind Nightmare
    if (blindNightmare) {
        distortionIntensity = 15;
    }
    
    currentState = GameState.PLAYING;
}

function updatePlaying() {
    // Update power-up timers
    if (rapidFireTimer > 0) rapidFireTimer -= deltaTime;
    if (shieldTimer > 0) shieldTimer -= deltaTime;
    
    // Update shot cooldown
    if ((insaneMode || blindNightmare) && shotCooldownTimer > 0) {
        shotCooldownTimer -= deltaTime;
    }
    
    // Player shooting
    let currentFireCooldown = (rapidFireTimer > 0) ? 0.075 : 0.15;
    if (unbeatableMode) currentFireCooldown = 0.1;
    player.shootCooldown -= deltaTime;
    
    if (keys[' '] && player.shootCooldown <= 0) {
        let canShoot = true;
        if ((insaneMode || blindNightmare) && shotCooldownTimer > 0) {
            canShoot = false;
            scorePopups.push({
                x: player.x,
                y: player.y - 30,
                text: `WAIT ${shotCooldownTimer.toFixed(1)}s`,
                life: 0.8,
                color: 'red'
            });
        }
        
        if (canShoot) {
            player.shootCooldown = currentFireCooldown;
            if (insaneMode) shotCooldownTimer = shotCooldownDuration;
            if (blindNightmare) shotCooldownTimer = blindShotCooldown;
            
            playerBullets.push({
                x: player.x,
                y: player.y - player.size / 2 - 5,
                size: 6,
                active: true,
                isEnemy: false
            });
            
            // Muzzle flash
            for (let i = 0; i < 5; i++) {
                particles.push({
                    x: player.x,
                    y: player.y - player.size / 2,
                    vx: (Math.random() - 0.5) * 60,
                    vy: -40 - Math.random() * 40,
                    life: 0.3,
                    color: 'rgba(255, 255, 100, 0.8)'
                });
            }
        }
    }
    
    // Player movement
    let moveX = 0, moveY = 0;
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) moveX -= 1;
    if (keys['ArrowRight'] || keys['d'] || keys['D']) moveX += 1;
    if (keys['ArrowUp'] || keys['w'] || keys['W']) moveY -= 1;
    if (keys['ArrowDown'] || keys['s'] || keys['S']) moveY += 1;
    
    if (moveX !== 0 || moveY !== 0) {
        const len = Math.sqrt(moveX * moveX + moveY * moveY);
        moveX /= len;
        moveY /= len;
        player.vx = moveX * player.speed;
        player.vy = moveY * player.speed;
    } else {
        player.vx = player.vy = 0;
    }
    
    player.x += player.vx * deltaTime;
    player.y += player.vy * deltaTime;
    player.x = Math.max(player.size / 2, Math.min(width - player.size / 2, player.x));
    player.y = Math.max(player.size / 2, Math.min(height - player.size / 2, player.y));
    
    // Enemy spawning
    enemySpawnTimer += deltaTime;
    while (enemySpawnTimer >= enemySpawnInterval * spawnIntervalMultiplier) {
        enemySpawnTimer -= enemySpawnInterval * spawnIntervalMultiplier;
        const x = Math.random() * (width - player.size) + player.size / 2;
        enemies.push({
            x: x,
            y: -20,
            size: 35,
            speed: enemyBaseSpeed * enemySpeedMultiplier + (Math.random() * 60 - 30),
            angle: 0,
            shootCooldown: 0.5 + Math.random() * 1.5
        });
    }
    
    // Power-up spawning (only if not insane/unbeatable/blind nightmare)
    if (!insaneMode && !unbeatableMode && !blindNightmare) {
        powerUpSpawnTimer += deltaTime;
        while (powerUpSpawnTimer >= powerUpSpawnInterval) {
            powerUpSpawnTimer -= powerUpSpawnInterval;
            const x = 20 + Math.random() * (width - 40);
            const type = Math.floor(Math.random() * 3);
            powerUps.push({
                x: x,
                y: -20,
                size: 16,
                type: type
            });
        }
    }
    
    // Enemy movement and shooting
    for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.y += e.speed * deltaTime;
        e.angle += 360 * deltaTime * 0.5;
        
        if (insaneMode || unbeatableMode || blindNightmare) {
            e.shootCooldown -= deltaTime;
            const shootInterval = (unbeatableMode || blindNightmare) ? 0.5 : 1.5;
            if (e.shootCooldown <= 0) {
                enemyBullets.push({
                    x: e.x,
                    y: e.y + e.size / 2,
                    size: 6,
                    active: true,
                    isEnemy: true
                });
                e.shootCooldown = shootInterval * 0.8 + Math.random() * (shootInterval * 0.4);
            }
        }
        
        if (e.y > height + 30) {
            enemies.splice(i, 1);
        }
    }
    
    // Player bullets update
    for (let i = playerBullets.length - 1; i >= 0; i--) {
        const b = playerBullets[i];
        b.y -= player.bulletSpeed * deltaTime;
        if (b.y < -20) {
            playerBullets.splice(i, 1);
            continue;
        }
        
        let hit = false;
        for (let j = enemies.length - 1; j >= 0; j--) {
            const e = enemies[j];
            const dx = b.x - e.x;
            const dy = b.y - e.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (b.size + e.size) / 2) {
                enemies.splice(j, 1);
                hit = true;
                score += 10;
                
                scorePopups.push({
                    x: e.x,
                    y: e.y - 10,
                    text: '+10',
                    life: 1,
                    color: 'yellow'
                });
                
                // Explosion particles
                for (let k = 0; k < 15; k++) {
                    particles.push({
                        x: e.x,
                        y: e.y,
                        vx: (Math.random() - 0.5) * 400,
                        vy: (Math.random() - 0.5) * 400,
                        life: 0.8,
                        color: 'rgba(255, 100, 0, 0.8)'
                    });
                }
                
                enemySpeedMultiplier = Math.min(3, enemySpeedMultiplier + 0.02);
                spawnIntervalMultiplier = Math.max(0.3, spawnIntervalMultiplier - 0.01);
                break;
            }
        }
        if (hit) {
            playerBullets.splice(i, 1);
        }
    }
    
    // Enemy bullets update
    const enemyBulletSpeed = (unbeatableMode || blindNightmare) ? 600 : 400;
    for (let i = enemyBullets.length - 1; i >= 0; i--) {
        const b = enemyBullets[i];
        b.y += enemyBulletSpeed * deltaTime;
        if (b.y > height + 20) {
            enemyBullets.splice(i, 1);
            continue;
        }
        
        if (shieldTimer <= 0) {
            const dx = b.x - player.x;
            const dy = b.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (b.size + player.size) / 2 && player.invincibleTimer <= 0) {
                player.health--;
                player.invincibleTimer = 1.2;
                enemyBullets.splice(i, 1);
                
                // Screen shake!
                shakeIntensity = 10;
                shakeDuration = 0.3;
                
                // Hit particles
                for (let k = 0; k < 15; k++) {
                    particles.push({
                        x: b.x,
                        y: b.y,
                        vx: (Math.random() - 0.5) * 400,
                        vy: (Math.random() - 0.5) * 400,
                        life: 1,
                        color: 'rgba(255, 0, 255, 0.8)'
                    });
                }
                
                if (player.health <= 0) {
                    currentState = GameState.GAME_OVER;
                    if (score > highScore) highScore = score;
                }
            }
        }
    }
    
    // Power-ups update
    for (let i = powerUps.length - 1; i >= 0; i--) {
        const p = powerUps[i];
        p.y += 100 * deltaTime;
        if (p.y > height + 30) {
            powerUps.splice(i, 1);
            continue;
        }
        
        const dx = p.x - player.x;
        const dy = p.y - player.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < (p.size + player.size) / 2) {
            if (p.type === 0) { // health
                player.health = Math.min((insaneMode || unbeatableMode || blindNightmare) ? 1 : 3, player.health + 1);
                scorePopups.push({
                    x: p.x,
                    y: p.y,
                    text: '+HEALTH',
                    life: 1,
                    color: 'lime'
                });
            } else if (p.type === 1) { // rapid fire
                rapidFireTimer = rapidFireDuration;
                scorePopups.push({
                    x: p.x,
                    y: p.y,
                    text: 'RAPID FIRE!',
                    life: 1,
                    color: 'orange'
                });
            } else if (p.type === 2) { // shield
                shieldTimer = shieldDuration;
                scorePopups.push({
                    x: p.x,
                    y: p.y,
                    text: 'SHIELD!',
                    life: 1,
                    color: 'cyan'
                });
            }
            
            // Collection particles
            for (let k = 0; k < 8; k++) {
                particles.push({
                    x: p.x,
                    y: p.y,
                    vx: (Math.random() - 0.5) * 200,
                    vy: (Math.random() - 0.5) * 200,
                    life: 0.6,
                    color: 'white'
                });
            }
            
            powerUps.splice(i, 1);
        }
    }
    
    // Player-enemy collision
    if (shieldTimer <= 0) {
        for (let i = enemies.length - 1; i >= 0; i--) {
            const e = enemies[i];
            const dx = e.x - player.x;
            const dy = e.y - player.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < (e.size + player.size) / 2 && player.invincibleTimer <= 0) {
                player.health--;
                player.invincibleTimer = 1.2;
                enemies.splice(i, 1);
                
                shakeIntensity = 15;
                shakeDuration = 0.4;
                
                for (let k = 0; k < 20; k++) {
                    particles.push({
                        x: e.x,
                        y: e.y,
                        vx: (Math.random() - 0.5) * 600,
                        vy: (Math.random() - 0.5) * 600,
                        life: 1,
                        color: 'red'
                    });
                }
                
                if (player.health <= 0) {
                    currentState = GameState.GAME_OVER;
                    if (score > highScore) highScore = score;
                }
                break;
            }
        }
    }
    
    if (player.invincibleTimer > 0) {
        player.invincibleTimer -= deltaTime;
    }
    
    score += Math.floor(deltaTime * 10);
    
    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * deltaTime;
        p.y += p.vy * deltaTime;
        p.life -= deltaTime * 2;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
    
    // Update score popups
    for (let i = scorePopups.length - 1; i >= 0; i--) {
        const s = scorePopups[i];
        s.y -= 30 * deltaTime;
        s.life -= deltaTime * 2;
        if (s.life <= 0) {
            scorePopups.splice(i, 1);
        }
    }
}

function updateGameOver() {
    if (keys['r'] || keys['R']) {
        currentState = GameState.MENU;
        keys['r'] = false;
        keys['R'] = false;
    }
    
    // Update particles
    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * deltaTime;
        p.y += p.vy * deltaTime;
        p.life -= deltaTime * 2;
        if (p.life <= 0) {
            particles.splice(i, 1);
        }
    }
}

function updateStars() {
    for (let star of stars) {
        star.y += star.speed * deltaTime;
        if (star.y > height) {
            star.y = 0;
            star.x = Math.random() * width;
        }
    }
}

function draw() {
    // Save context state
    ctx.save();
    
    // Apply screen shake
    if (shakeDuration > 0) {
        const offsetX = (Math.random() * 2 - 1) * shakeIntensity;
        const offsetY = (Math.random() * 2 - 1) * shakeIntensity;
        ctx.translate(offsetX, offsetY);
    }
    
    // Apply distortion (only in Blind Nightmare)
    if (blindNightmare && distortionIntensity > 0) {
        const t = distortionTime;
        
        // Complex warp
        const warpX = Math.sin(t * 2.0) * 15 + Math.sin(t * 1.3) * 10;
        const warpY = Math.cos(t * 1.7) * 15 + Math.sin(t * 2.5) * 10;
        const rotateWarp = Math.sin(t * 1.2) * 3;
        const scale = 1 + Math.sin(t * 3.0) * 0.05;
        
        ctx.translate(warpX, warpY);
        ctx.rotate(rotateWarp * Math.PI / 180);
        ctx.scale(scale, scale);
    }
    
    // Clear screen
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, width, height);
    
    // Draw stars
    for (let star of stars) {
        const brightness = Math.floor(255 * star.brightness);
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx.fillRect(star.x, star.y, star.size, star.size);
    }
    
    // Draw particles
    for (let p of particles) {
        ctx.globalAlpha = p.life;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
    ctx.globalAlpha = 1;
    
    // Draw power-ups
    for (let pu of powerUps) {
        let color;
        if (pu.type === 0) color = 'lime';
        else if (pu.type === 1) color = 'orange';
        else color = 'cyan';
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.moveTo(pu.x, pu.y - pu.size/2);
        ctx.lineTo(pu.x + pu.size/2, pu.y);
        ctx.lineTo(pu.x, pu.y + pu.size/2);
        ctx.lineTo(pu.x - pu.size/2, pu.y);
        ctx.closePath();
        ctx.fill();
    }
    
    // Draw player bullets
    ctx.fillStyle = 'yellow';
    for (let b of playerBullets) {
        ctx.fillRect(b.x - b.size/2, b.y - b.size/2, b.size, b.size);
    }
    
    // Draw enemy bullets
    ctx.fillStyle = 'magenta';
    for (let b of enemyBullets) {
        ctx.fillRect(b.x - b.size/2, b.y - b.size/2, b.size, b.size);
    }
    
    // Draw enemies (hexagons)
    for (let e of enemies) {
        ctx.fillStyle = 'red';
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = i * Math.PI / 3 + e.angle * Math.PI / 180;
            const x = e.x + Math.cos(angle) * e.size / 2;
            const y = e.y + Math.sin(angle) * e.size / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
    }
    
    // Draw player
    if (currentState === GameState.PLAYING) {
        let drawPlayer = true;
        if (player.invincibleTimer > 0 && Math.floor(player.invincibleTimer * 10) % 2 === 0) {
            drawPlayer = false;
        }
        
        if (shieldTimer > 0) {
            ctx.strokeStyle = 'cyan';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.size * 0.8, 0, Math.PI * 2);
            ctx.stroke();
        }
        
        if (drawPlayer) {
            ctx.fillStyle = player.color;
            ctx.beginPath();
            ctx.moveTo(player.x, player.y - player.size);
            ctx.lineTo(player.x + player.size * 0.8, player.y + player.size * 0.5);
            ctx.lineTo(player.x - player.size * 0.8, player.y + player.size * 0.5);
            ctx.closePath();
            ctx.fill();
        }
    }
    
    // Draw score popups
    for (let sp of scorePopups) {
        ctx.globalAlpha = sp.life;
        ctx.fillStyle = sp.color;
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(sp.text, sp.x, sp.y);
    }
    ctx.globalAlpha = 1;
    ctx.textAlign = 'left';
    
    // Restore context (removes shake/distortion)
    ctx.restore();
}

function updateUI() {
    let html = '';
    
    if (currentState === GameState.MENU) {
        html = `
            <div class="menu-container">
                <div class="menu-title">SPACALLAX 2.0.0</div>
                <div class="menu-prompt">Select Difficulty:</div>
                <div class="difficulty-display">
                    ${difficultyNames[selectedDifficultyIndex]}
                </div>
                <div class="menu-hint">
                    <kbd>←</kbd> <kbd>→</kbd> or <kbd>A</kbd> <kbd>D</kbd> to select<br>
                    <kbd>SPACE</kbd> or <kbd>ENTER</kbd> to start<br>
                    <kbd>F11</kbd> Fullscreen<br>
                    <kbd>1</kbd> <kbd>2</kbd> <kbd>3</kbd> Change color
                </div>
            </div>
        `;
    } else if (currentState === GameState.PLAYING) {
        // In-game UI
        const healthText = (insaneMode || unbeatableMode || blindNightmare) 
            ? `Health: ${player.health}/1` 
            : `Health: ${player.health}/3`;
        
        let cooldownText = '';
        if (insaneMode) {
            if (shotCooldownTimer > 0) {
                cooldownText = `<div style="color: magenta; font-size: 14px;">Shot ready in: ${shotCooldownTimer.toFixed(1)}s</div>`;
            } else {
                cooldownText = `<div style="color: green; font-size: 14px;">Shot ready!</div>`;
            }
        }
        if (blindNightmare) {
            if (shotCooldownTimer > 0) {
                cooldownText = `<div style="color: magenta; font-size: 14px;">Blind shot: ${shotCooldownTimer.toFixed(1)}s</div>`;
            } else {
                cooldownText = `<div style="color: green; font-size: 14px;">Blind shot ready!</div>`;
            }
        }
        if (unbeatableMode) {
            cooldownText = `<div style="color: red; font-size: 16px;">GOOD LUCK</div>`;
        }
        
        let powerupText = '';
        if (rapidFireTimer > 0) {
            powerupText += `<div style="color: orange; font-size: 12px;">Rapid Fire: ${rapidFireTimer.toFixed(1)}s</div>`;
        }
        if (shieldTimer > 0) {
            powerupText += `<div style="color: cyan; font-size: 12px;">Shield: ${shieldTimer.toFixed(1)}s</div>`;
        }
        
        html = `
            <div class="game-ui">
                <div class="top-left">
                    <div>Score: ${score}  High Score: ${highScore}</div>
                    <div class="health-text">${healthText}</div>
                    <div class="fps-text">FPS: ${fps}</div>
                </div>
                <div class="top-right">
                    <div class="difficulty-text">Difficulty: ${difficultyNames[currentDifficulty]}</div>
                    ${cooldownText}
                    ${powerupText}
                </div>
                <div class="fullscreen-hint">F11: Fullscreen</div>
                <div class="color-hint">1: Green  2: Blue  3: Orange</div>
            </div>
        `;
    } else if (currentState === GameState.GAME_OVER) {
        html = `
            <div class="gameover-container">
                <div class="gameover-title">GAME OVER</div>
                <div class="gameover-scores">Your Score: ${score}</div>
                <div class="gameover-scores">High Score: ${highScore}</div>
                <div class="gameover-hint">Press R to return to menu</div>
            </div>
        `;
    }
    
    overlay.innerHTML = html;
}
