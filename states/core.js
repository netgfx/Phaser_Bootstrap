GAME.Main = function (game) {};

var blast = false;
var gameStop = false;
var enemiesDestroyed = 0;

// Setup the example
GAME.Main.prototype = {
    create: function () {
        // Set stage background color
        game.stage.backgroundColor = 0x121212;
        //game.add.image(0, 0, reg.backgrounds["level" + String(reg.currentLevel)]);

        if (!this.game.device.desktop) {

        }

        // Simulate a pointer click/tap input at the center of the stage
        // when the example begins running.
        game.input.activePointer.x = this.game.width / 2;
        game.input.activePointer.y = this.game.height / 2;

        if (!this.game.device.desktop) {

        }

        // Show FPS
        game.time.advancedTiming = true;
        this.fpsText = this.game.add.text(
            20, 20, '', {
                font: '16px Arial',
                fill: '#ffffff'
            }
        );

        this.game.world.setBounds(-10, -10, this.game.width + 20, this.game.height + 20);

        /////////////////////
        reg.mainScore = 0;
        gameStop = false;

        // create fear factor HUD
        createHUD();

        // create modals
        // createModal("game-over");
        //createModal("level");

        initTimer();
        initScoreTimer();

    },
    update: function () {
        if (this.game.time.fps !== 0) {
            //this.fpsText.setText(this.game.time.fps + ' FPS');
        }

       // UPDATE SOMETHING EACH FRAME
    },
    sampleFunction: function (blast) {

        if (gameStop === true) {
            return false;
        }

    },
    render: function () {

    }
};

/**
 * [initTimer description]
 * @return {[type]} [description]
 */
function initTimer() {
    reg.timer = {};
    var _time = game.rnd.integerInRange(0, 100);

    reg.timer = game.time.events.loop(_time, function () {
        // update or create something based on timer
    }, this, []);

    return reg.timer;
}

function initScoreTimer() {
    reg.scoreTimer = {};

    return reg.scoreTimer;
}

/**
 * [removeTimer description]
 * @return {[type]} [description]
 */
function removeTimer() {
    gameStop = true;
    // clear timer
    game.time.events.remove(reg.timer);

    // do something when all timers stop ex:
    // saveScore();
}


/**
 * [shockAndAwe Shakes the camera and flashes the stage]
 * @return {[type]} [description]
 */
function shockAndAwe() {
    // Create the flash
    reg.flash.alpha = 1;
    game.add.tween(reg.flash)
        .to({
            alpha: 0
        }, 180, Phaser.Easing.Cubic.In)
        .start();

    // Shake the camera by moving it up and down 5 times really fast
    game.camera.y = 0;
    game.add.tween(game.camera)
        .to({
            y: -10
        }, 80, Phaser.Easing.Sinusoidal.InOut, false, 0, 5, true)
        .start();
}

function createHUD() {

    var hudGroup = game.add.group();
    var posX = (game.width / 2) - (322 / 2);
    var posY = game.height - 117;


    reg.hudGroup = hudGroup;
}

/**
 * [createModal description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function createModal(type) {

    var modalGroup = game.add.group();

    var modal = game.add.graphics(game.width, game.height);
    modal.beginFill("0x000000", 0.7);
    modal.x = 0;
    modal.y = 0;
    modal.drawRect(0, 0, game.width, game.height);

    var modalPanel = game.add.image((game.width / 2 - (550 / 2)), (game.height / 2 - (400 / 2)), "modal");

    if (type === "game-over") {
        var gameLabel = this.game.add.text(0, 0, "GAME OVER", {
            font: '46px FingerPaint-Regular',
            fill: '#ffffff',
            fontWeight: 'normal',
            align: 'center'
        });

        gameLabel.update();
        gameLabel.x = (game.width / 2) - (gameLabel.width / 2);
        gameLabel.y = modalPanel.y + 40;

        var gameLabel1 = this.game.add.text(0, 0, "Repeat Level?", {
            font: '40px FingerPaint-Regular',
            fill: '#ffffff',
            fontWeight: 'normal',
            align: 'center'
        });

        gameLabel1.update();
        gameLabel1.x = (game.width / 2) - (gameLabel.width / 2);
        gameLabel1.y = gameLabel.y + gameLabel.height + 20;

        // -----------

        var gameLabel2 = this.game.add.text(0, 0, "Return to Menu", {
            font: '40px FingerPaint-Regular',
            fill: '#ffffff',
            fontWeight: 'normal',
            align: 'center'
        });

        gameLabel2.update();
        gameLabel2.x = (game.width / 2) - (gameLabel2.width / 2);
        gameLabel2.y = gameLabel1.y + gameLabel1.height + 20;

        gameLabel2.inputEnabled = true;
        gameLabel2.events.onInputDown.add(function () {
            //this.game.state.start('MainMenu');
            transitionPlugin.to('MainMenu');
        }, this);

        gameLabel1.inputEnabled = true;
        gameLabel1.events.onInputDown.add(function () {
            //this.game.state.start('Game');
            transitionPlugin.to('Game');
        }, this);

        modalGroup.add(modal);
        modalGroup.add(modalPanel);
        modalGroup.add(gameLabel);
        modalGroup.add(gameLabel1);
        modalGroup.add(gameLabel2);

    } else if (type === "level") {

        var modalHeader = game.add.image((game.width / 2) - (305 / 2), modalPanel.y + 40, "modalHeader");

        // -----------

        var gameLabel2 = this.game.add.text(0, 0, "Return to Menu", {
            font: '40px FingerPaint-Regular',
            fill: '#ffffff',
            fontWeight: 'normal',
            align: 'center'
        });

        gameLabel2.update();
        gameLabel2.x = (game.width / 2) - (gameLabel2.width / 2);
        gameLabel2.y = modalHeader.y + modalHeader.height + 20;

        // ------------

        var scoreLabel = this.game.add.text(0, 0, "Score: " + reg.score, {
            font: '40px FingerPaint-Regular',
            fill: '#ffffff',
            fontWeight: 'normal',
            align: 'center'
        });

        scoreLabel.update();
        scoreLabel.x = (game.width / 2) - (scoreLabel.width / 2);
        scoreLabel.y = gameLabel2.y + gameLabel2.height + 20;

        // ------------

        var modalNext = game.add.image((game.width / 2) - (244 / 2), scoreLabel.y + scoreLabel.height + 30, "modalNext");

        gameLabel2.inputEnabled = true;
        gameLabel2.events.onInputDown.add(function () {
            //this.game.state.start('MainMenu');
            transitionPlugin.to('MainMenu');
        }, this);

        modalNext.inputEnabled = true;
        modalNext.events.onInputDown.add(function () {

            reg.currentLevel += 1;
            transitionPlugin.to('Levels');

        }, this);

        /*gameLabel.inputEnabled = true;
        gameLabel.events.onInputDown.add(function () {
            //this.game.state.start('Game');
            transitionPlugin.to('Game');
        }, this);*/

        modalGroup.add(modal);
        modalGroup.add(modalPanel);
        modalGroup.add(modalHeader);
        //modalGroup.add(gameLabel);
        modalGroup.add(gameLabel2);
        modalGroup.add(scoreLabel);
        modalGroup.add(modalNext);
    } else if (type === "no-level") {
        var modalHeader = game.add.image((game.width / 2) - (305 / 2), modalPanel.y + 40, "modalHeader");

        // -----------

        var gameLabel2 = this.game.add.text(0, 0, "Return to Menu", {
            font: '40px FingerPaint-Regular',
            fill: '#ffffff',
            fontWeight: 'normal',
            align: 'center'
        });

        gameLabel2.update();
        gameLabel2.x = (game.width / 2) - (gameLabel2.width / 2);
        gameLabel2.y = modalHeader.y + modalHeader.height + 20;

        // ------------

        var scoreLabel = this.game.add.text(0, 0, "Score: " + reg.score, {
            font: '40px FingerPaint-Regular',
            fill: '#ffffff',
            fontWeight: 'normal',
            align: 'center'
        });

        scoreLabel.update();
        scoreLabel.x = (game.width / 2) - (scoreLabel.width / 2);
        scoreLabel.y = gameLabel2.y + gameLabel2.height + 20;

        // ------------

        gameLabel2.inputEnabled = true;
        gameLabel2.events.onInputDown.add(function () {
            //this.game.state.start('MainMenu');
            transitionPlugin.to('MainMenu');
        }, this);


        modalGroup.add(modal);
        modalGroup.add(modalPanel);
        modalGroup.add(modalHeader);
        modalGroup.add(gameLabel2);
        modalGroup.add(scoreLabel);
    }

    modalGroup.visible = false;

    reg.modal[type] = modalGroup;
}

/**
 * [getExplosion Create explosion]
 * @param  {[type]} x     [description]
 * @param  {[type]} y     [description]
 * @param  {[type]} scale [description]
 * @return {[type]}       [description]
 *
 * Search Tag: #explosion, #explode
 */
function getExplosion(x, y, scale) {
    // Try to get a used explosion from the explosionGroup.
    // If an explosion isn't available, create a new one and add it to the group.
    // Setup new explosions so that they animate and kill themselves when the
    // animation is complete.
    // Get the first dead explosion from the explosionGroup
    var explosion = reg.explosionGroup.getFirstDead();

    // If there aren't any available, create a new one
    if (explosion === null) {
        explosion = game.add.sprite(0, 0, 'explosion');
        explosion.anchor.setTo(0.5, 0.5);

        // Add an animation for the explosion that kills the sprite when the
        // animation is complete
        var animation = explosion.animations.add('boom', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34], 40, false);

        animation.killOnComplete = true;

        // Add the explosion sprite to the group
        reg.explosionGroup.add(explosion);
    }

    // Revive the explosion (set it's alive property to true)
    // You can also define a onRevived event handler in your explosion objects
    // to do stuff when they are revived.
    explosion.revive();

    // Move the explosion to the given coordinates
    explosion.x = x;
    explosion.y = y;
    explosion.scale.x = scale;
    explosion.scale.y = scale;

    // Set rotation of the explosion at random for a little variety
    explosion.angle = game.rnd.integerInRange(0, 360);

    // Play the animation
    explosion.animations.play('boom');

    // Return the explosion itself in case we want to do anything else with it
    return explosion;
}

/**
 * [showModal description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function showModal(type) {
    game.world.bringToTop(reg.modal[type]);
    reg.modal[type].visible = true;
}

/**
 * [hideModal description]
 * @param  {[type]} type [description]
 * @return {[type]}      [description]
 */
function hideModal(type) {

}

/**
 * [saveScore description]
 * @return {[type]} [description]
 */
function saveScore() {

    // enemies x10 and the remaining fear as bonus
    var remainingFear = (reg.hud.width-34) - Math.round(reg.fearBar.width);
    reg.score = Number(reg.levelEditor["level" + reg.currentLevel].enemies * 10) + remainingFear;

    if (Number(reg.levelEditor["level" + reg.currentLevel].bestScore) < reg.score) {
        reg.levelEditor["level" + reg.currentLevel].bestScore = reg.score;
    }

    localStorage.setItem("nightcast-levels", JSON.stringify(reg.levelEditor));
}



/// EVENT LISTENERS

function attackGhost(e) {
    var item = String(e.id);
    e.tweenObj.stop();
    e.smallTween.stop();

    var scale = e.scale.x + 0.2;
    getExplosion( (Math.round(e.x) + (Math.round(e.width/2)-(128 * scale)) ), Math.round(e.y) + (Math.round(e.height/2)- (128 * scale)), scale );
    e.kill();
    enemiesDestroyed += 1;
}

/**
 * [resetAchievements description]
 * @return {[type]} [description]
 */
function resetAchievements() {
    reg.levelEditor = JSON.parse('{"level1":{"levelName":"Level - 1","status":"open","bestScore":"0","enemies":"25","minInterval":1000,"maxInterval":3600,"fearPerFrame":0.06},"level2":{"levelName":"Level - 2","status":"closed","bestScore":"0","enemies":"38","minInterval":1100,"maxInterval":3200,"fearPerFrame":0.08},"level3":{"levelName":"Level - 3","status":"closed","bestScore":"0","enemies":"45","minInterval":1000,"maxInterval":3000,"fearPerFrame":0.09},"level4":{"levelName":"Level - 4","status":"closed","bestScore":"0","enemies":"55","minInterval":1200,"maxInterval":3000,"fearPerFrame":0.1},"level5":{"levelName":"Level - 5","status":"closed","bestScore":"0","enemies":"80","minInterval":800,"maxInterval":3000,"fearPerFrame":0.15}}');
}

// Setup game
var game = new Phaser.Game(640, 960, Phaser.CANVAS, 'game');
game.state.add('Boot', GAME.Boot);
game.state.add('Preloader', GAME.Preloader);
game.state.add('Scores', GAME.Scores);
game.state.add('Info', GAME.Info);
game.state.add('MainMenu', GAME.Menu);
game.state.add("Levels", GAME.Levels);
game.state.add('Game', GAME.Main);

game.state.start('Boot');