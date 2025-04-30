"use strict"

let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  
    },
    width: 640,         
    height: 640,
    scene: [GalleryShooter]
}

const game = new Phaser.Game(config);