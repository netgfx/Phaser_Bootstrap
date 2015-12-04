
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
        /*if(reg.song === undefined){
            reg.song = game.add.audio('song');
            reg.song.repeat = true;
            reg.song.volume = 0.3;
        }

        if(reg.ding === undefined){
            reg.ding = game.add.audio('ding');
            reg.ding.volume = 0.5;
        }

        if (reg.sound === true && reg.song.isPlaying === false) {
            reg.song.play();
        }

        if(reg.sound === false) {
            this.soundButton.alpha = 0;
            this.nosoundButton.alpha = 1;
        }
        */
    },
    startGame: function () {
        game.state.start('Game');
    },
    startScores: function () {
        game.state.start('Scores');
    },
    toggleSound: function () {
        reg.sound = (reg.sound === true) ? false : true;

        if (reg.sound === false) {
            this.soundButton.alpha = 0;
            this.nosoundButton.alpha = 1;
            reg.song.stop();
        } else {
            this.nosoundButton.alpha = 0;
            this.soundButton.alpha = 1;
            reg.song.play();
        }
    },
    startScores: function () {
        game.state.start('Scores');
    },
    startCredits: function () {
        game.state.start("Credits");
    },
    shareTwitter: function () {
        var sharerURL = "http://twitter.com/intent/tweet?text=" + encodeURIComponent("I captured " + reg.mainScore + " presents on Present...ing! can you beat my score? http://xmas2015.7linternational.com");
        window.open(
            sharerURL,
            'Twitter',
            'width=626,height=436');
    },
    shareFacebook: function () {

        FB.ui({
            display: 'dialog',
            method: "feed",
            link: "http://xmas2015.7linternational.com",
            /*caption: title,*/
            description: "I captured " + reg.mainScore + " presents on Present...ing! can you beat my score? http://xmas2015.7linternational.com",
            picture: "http://xmas2015.7linternational.com/assets/promo.png",
            size: {width:640,height:480}, width:640, height:480
            /*caption: "I captured " + reg.mainScore + " presents on Present...ing! can you beat my score? http://presenting.surge.sh/",*/
        }, function (response) {

        });
    }
};