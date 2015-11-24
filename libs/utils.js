var utils = utils || {};


utils = {
    animateNumber: function (num, fn, step, speed, endFn) {
        var _step = step || 10;
        var _speed = speed || 10; // in seconds because this is total
        var repeats = Math.ceil(num / _step);
        var animSpeed = (_speed / repeats) * 1000; // in ms

        window.console.log("repeats: " + repeats + " animSpeed: " + animSpeed);
        var _endFn = endFn || function () {
            game.time.events.remove(this);
        };
        var _timer = game.time.create(true);
        _timer.start();
        _timer.onComplete.add(_endFn);
        _timer.repeat(animSpeed, repeats, fn, this, [_step]);

    },
    calculateMonsterAttack: function(trapType, enemyType) {
        var chanceToCrit = game.rnd.integerInRange(monsterLevel, 12);
        var isCrit = false;
        var finalDamage = 0;
        if(chanceToCrit >= 8) {
            isCrit = true;
        }
        var normalDamage = game.rnd.integerInRange(trapType, trapType+3)*2;
        if(isCrit === true) {
            normalDamage = normalDamage*2;
        }

        finalDamage = Math.abs(normalDamage-enemyType); // ;

        return finalDamage;
    },
    changeCameraView: function(pos, item) {
        //game.camera.y = pos.y;
        game.camera.follow(null);
        var tweenObj = tweenProperty(game.camera, "y", {y:item.y-game.height/2}, 600, 0, Phaser.Easing.Quartic.Out);
        tweenObj.onComplete.add(function(){
            game.camera.follow(item);
        },this);
    },
    addCoins: function(amount) {
        var coinGroup = reg.guiGroup.getChildAt(0);
        var textCoins = coinGroup.getChildAt(0);
        window.console.log(textCoins,textCoins.text);
        textCoins.text = "x"+String(Number(String(textCoins.text).replace("x",""))+amount);
    },
    garbageCollect: function () {


    }
};