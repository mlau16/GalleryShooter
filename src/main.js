"use strict"

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  
    },
    width: 690,         
    height: 250,
    scene: [TitleScreen, GalleryShooter, VictoryScreen]
}

const game = new Phaser.Game(config);