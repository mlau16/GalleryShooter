class TitleScreen extends Phaser.Scene {

    constructor(){
        super("titleScreen");

    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("pixel_tiles", "tilemap_packed.png");
        this.load.image("background_tiles", "backgrounds.png");
        this.load.tilemapTiledJSON("map", "GalleryShooterMap.json");   
        this.load.audio("click", "click_003.ogg");

        document.getElementById('description').innerHTML = '<h2>SPACE to shoot | \'A\' or \'D\' to move</h2>'
    }

    create(){
        this.map = this.add.tilemap("map", 16, 16, 21, 21);
        this.tileset = this.map.addTilesetImage("tilemap-packed", "pixel_tiles");
        this.tileset2 = this.map.addTilesetImage("Backgrounds", "background_tiles");

        this.backgroundLayer = this.map.createLayer("Background", this.tileset2, 0, 0);
        this.platformLayer = this.map.createLayer("Platforms", this.tileset, 0, 0);
        this.backgroundLayer.setScale(3.0);
        this.platformLayer.setScale(3.0);

        const textObjects = this.map.getObjectLayer("Text").objects;

        for (let obj of textObjects) {
            let txt = this.add.text(250, 125, obj.text.text, {
                font: `${obj.text.pixelsize * 3}px Trattatello`,
                color: "#000000"
            });

            txt.setAlpha(0); 

            this.tweens.add({
                targets: txt,
                alpha: { from: 0.3, to: 0.7 },
                duration: 1000,     
                yoyo: true,         
                repeat: -1,         
                ease: 'Sine.easeInOut'
            });
        }
        }

    update(){
        this.mouseDown = this.input.on('pointerdown', (pointer) => {
            this.sound.play("click", {
                volume: 3
            })
            this.scene.start("galleryShooter");
        });
    
    }

}