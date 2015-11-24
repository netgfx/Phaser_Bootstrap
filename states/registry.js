reg = {
    score: (localStorage.getItem('template_score') === undefined) ? localStorage.getItem('template_score') : 0,
    mainScore: "",
    selectedLang: "en",
    sound: true,
    animationSpeed: 5000,
    creationSpeed: 1600,
    pointsRate: 10,
    modal : {

    },
    achievements: {

    },
    easings: [
    Phaser.Easing.Cubic.InOut,
    Phaser.Easing.Sinusoidal.In,
    Phaser.Easing.Quadratic.InOut,
    Phaser.Easing.Quartic.Out,
    Phaser.Easing.Linear,
    Phaser.Easing.Cubic.In,
    Phaser.Easing.Quintic.Out,
    Phaser.Easing.Quintic.InOut
    ],
    mainEasing: Phaser.Easing.Cubic.InOut,
    currentLevel:"1",
    backgrounds: {
        "level1": "bg1",
        "level2": "bg2",
        "level3": "bg3",
        "level4": "bg4",
        "level5": "bg5",
    },
    levelEditor: {

    }
};