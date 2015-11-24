
GAME.Menu = function(game) {

};

GAME.Menu.prototype = {
    create: function() {
        //this.add.image(0, 0, 'menuBG');

        /*this.startButton = this.add.button((game.width/2) - 216, 300, 'menuPlay', this.startGame, this, 1, 0, 2);
        this.infoButton = this.add.button((game.width/2) - 170, this.startButton.y + 110, 'menuScores', this.startScores, this, 1, 0, 2);
        this.soundButton = this.add.button((game.width/2) - 127, this.infoButton.y + 110, 'menuSoundOn', this.toggleSound, this, 1, 0, 2);

        this.scoresButton = this.add.button((game.width/2) - 184, this.soundButton.y + 110, 'menuInfo', this.startInfo, this, 1, 0, 2);*/

        // sound manager
        /*reg.track = game.add.audio('track');
        reg.track.loop = true;

        if (reg.sound === true) {
            reg.track.play();
        }*/
    },
    startGame: function() {
        game.state.start('Levels');
    },
    startScores: function () {
        game.state.start('Scores');
    },
    toggleSound: function() {
        reg.sound = (reg.sound === true) ? false : true;

        if(reg.sound === false) {
            this.soundButton.loadTexture("menuSoundOff",0);
            reg.track.stop();
        }
        else {
            this.soundButton.loadTexture("menuSoundOn",0);
            reg.track.play();
        }
    },
    startInfo: function() {
        game.state.start('Info');
    }
};