// Enemies Class [Players should not collide with this class objects]
var Enemy = function(x,y) {
// Variables applied to each instances of Enemy Class go here
    this.x=x;
    this.y=y;
    this.sprite = 'images/enemy-bug.png';
    this.randomSpeed = 40 * Math.random() * 10 + 5;
};

// This method updates the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
//Multiplying by dt parameter wil ensure that the game runs at same speed for all computers
    this.start=-100;
    this.x+=this.randomSpeed*dt
    if(this.x>=510)
        {
            this.x=this.start;
            this.randomSpeed=40 * Math.random() * 10 + 5;
        }
    this.collisionCheck();

};
//This method is called to check whether enemy object have collided with the player object or not.
//Source : https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.collisionCheck = function() {
    var pBox = {x: player.x, y: player.y, width: 50, height: 40};
    var eBox = {x: this.x, y: this.y, width: 60, height: 70};
    if (pBox.x < eBox.x + eBox.width &&
        pBox.x + pBox.width > eBox.x &&
        pBox.y < eBox.y + eBox.height &&
        pBox.height + pBox.y > eBox.y) {
            player.LifeDecrement();   
            player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player Class
var Player = function() {
    this.x=200;
    this.y=400;
    this.score=0;
    this.lives=3;
    this.sprite='images/char-princess-girl.png';

};
//When the player collides with enemy and lives>0 then only position of the player is set to initial.
Player.prototype.reset = function() {
    this.x=200;
    this.y=400;
};
//Resets all the properties when game is over,Stores the high score in the local storage and Display score and high score on the alert window 
Player.prototype.gameOver = function() {
    if(localStorage.getItem('score')==null)
        localStorage.setItem("score", this.score);
    else
    {
        if(localStorage.getItem('score')<this.score)
            localStorage.setItem("score", this.score);
    }
    window.alert('GAME OVER\nScore : '+this.score+'\nHigh Score :'+localStorage.getItem('score'));
    this.x=200;
    this.y=400;
    this.score=0;
    this.lives=3;

};
//Increments the score on reaching water by 100
Player.prototype.scoreIncrement = function() {
    this.score+=100;
};
//Decrements Life by 1 and score by 10 when player is collided by the enemy
Player.prototype.LifeDecrement = function() {
    this.score-=10
    this.lives--;
};
//If life is 0 at any instant then gameOver() function is called
Player.prototype.update = function() {
    if(this.lives==0)
        this.gameOver();
};
//This method render the player image and score and lives of the player on the canvas
Player.prototype.render = function() {
ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
ctx.fillStyle ='white';
ctx.font="16px Arial";
ctx.fillText('Score : '+this.score,10,70);
ctx.fillText('Lives : '+this.lives,420,70);

};
//This method is used to make player move left,right,up and down when user click the specified key
Player.prototype.handleInput = function(keypress) {
    switch(keypress){
        case 'left' :
            if(this.x>0)
                this.x-=101;
            break;
        case 'right' :
            if(this.x<400)
                this.x+=101;
            break;
        case 'up' :
            if(this.y>45)
                this.y-=83;
            else
                {
                this.reset();
                this.scoreIncrement();
            }
            break;
        case 'down' :
            if(this.y<400)
                this.y+=83;
            break;
    }

};
//Instatiating Enemy objects
var enemy1 = new Enemy(0,67);
var enemy2 = new Enemy(0,150);
var enemy3 = new Enemy(0,233);
var enemy4 = new Enemy(105,67);
//allElements array containing enemy objects
var allEnemies = [enemy1,enemy2,enemy3,enemy4];
var player = new Player();


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
