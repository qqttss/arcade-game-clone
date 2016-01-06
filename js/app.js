// Enemies class our player must avoid
var Enemy = function() {
    this.x = -101;
    this.y = 62 + (Math.floor(Math.random() * 4)) * 83;
    this.speed = 101 + (Math.floor(Math.random() * 3)) * 101;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position. Multiply any movement by the dt parameter
// which will ensure the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    this.x = this.x + this.speed * dt;
    if (this.x >= 707) {
        this.x = -101;
        this.speed = 101 + (Math.floor(Math.random() * 3)) * 101;
        this.y = 62 + (Math.floor(Math.random() * 4)) * 83;
    }

    // detect collision between player and enemies
    if (Math.abs(this.x - player.x) < 101 &&
        Math.abs((this.y + (83 - 62)) - (player.y + 10)) < 83) {
        player.reset();
        playerLife.decrease();
    }
};

// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// the player class.
var Player = function() {
    this.x = 101 * (4 - 1);
    this.y = 83 * (6 - 1) - 10;
    this.playerImg = 'images/char-boy.png';
};

// update method of Player for game
Player.prototype.update = function() {
    if (this.ctlKey === 'left' && this.x > 0) {
        this.x = this.x - 101;
    } else if (this.ctlKey === 'right' && this.x < 606) {
        this.x = this.x + 101;
    } else if (this.ctlKey === 'up' && this.y > 0) {
        this.y = this.y - 83;
    } else if (this.ctlKey === 'down' && this.y < 405) {
        this.y = this.y + 83;
    }

    this.ctlKey = null;

    // if player reaches the river, reset player position and
    // increase player's scoreValues by 1.
    if (this.y < 62) {
        this.reset();
        playerScore.update();
    }
};

// Draw the enemy on the screen
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.playerImg), this.x, this.y);
};

Player.prototype.handleInput = function(key) {
    this.ctlKey = key;
};

// reset player to its initial position
Player.prototype.reset = function() {
    this.x = 101 * (4 - 1);
    this.y = 83 * (6 - 1) - 10;
};

// the score class of player
var Score = function() {
    this.scoreImg = 'images/Star.png';
    this.scoreValue = 0;
};

// draw the scores (stars) at top of the screen
Score.prototype.render = function() {
    var y = 0;
    for (var i = 0; i < this.scoreValue; i++) {
        var x = i * 50;
        ctx.drawImage(Resources.get(this.scoreImg), x, y);
    }
};

Score.prototype.update = function() {
    this.scoreValue = this.scoreValue + 1;
};

// * player life class
var PlayerLife = function() {
    this.lifeImg = 'images/Heart.png';
    this.lifeValue = 3;
};

// draw the player life (hearts) at the bottom on the screen
PlayerLife.prototype.render = function() {
    var y = 575;
    console.log(this.lifeValue);
    for (var i = 0; i < this.lifeValue; i++) {
        var x = i * 50;
        ctx.drawImage(Resources.get(this.lifeImg), x, y);
    }

    if (this.lifeValue <= 0) {
        ctx.font = '30px Arial';
        ctx.fillStyle = 'red';
        ctx.fillText("Game is over. Please restart the game!", 100, 250);
        ctx.fillText("Your score is " + playerScore.scoreValue + " .", 200, 390);
        ctx.fillText("You've collected " + gem.gemNum + " gem(s).", 200, 320);
    }
};

//  decrease life value of player once it collides with enemy
PlayerLife.prototype.decrease = function() {
    this.lifeValue = this.lifeValue - 1;
};

// gem class for player to take
var gemImages = [
    'images/Gem Blue.png',
    'images/Gem Green.png',
    'images/Gem Orange.png'
];

var Gem = function() {
    this.x = (Math.floor(Math.random() * 7)) * 101;
    this.y = 62 + (Math.floor(Math.random() * 3)) * 83;
    this.gemImg = gemImages[Math.floor(Math.random() * 3)];
    this.gemNum = 0;
};

// draw the gem on the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
};

Gem.prototype.update = function() {
    this.gemNum = this.gemNum + 1;
};

// reset gem position once it collides with player
Gem.prototype.reset = function() {
    // detect collision between player and gem
    if (Math.abs(this.x - player.x) < 101 &&
        Math.abs(this.y - (player.y + 10)) < 83) {
        this.update();
        this.x = (Math.floor(Math.random() * 7)) * 101;
        this.y = 62 + (Math.floor(Math.random() * 3)) * 83;
        this.gemImg = gemImages[Math.floor(Math.random() * 3)];
        ctx.drawImage(Resources.get(this.gemImg), this.x, this.y);
    }
};

// Instantiate all objects.
// Place all enemy objects in an array called allEnemies
var enemyA = new Enemy();
var enemyB = new Enemy();

var allEnemies = [enemyA, enemyB];

var player = new Player();

var playerLife = new PlayerLife();

var playerScore = new Score();

var gem = new Gem();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});