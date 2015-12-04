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
            this.fpsText.setText(this.game.time.fps + ' FPS');
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
    localStorage.setItem("tempgame", JSON.stringify(reg.mainScore));
}



/// EVENT LISTENERS


/**
 * [resetAchievements description]
 * @return {[type]} [description]
 */
function resetAchievements() {
    reg.levelEditor = JSON.parse('');
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