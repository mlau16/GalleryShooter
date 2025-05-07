class VictoryScreen extends Phaser.Scene {

    constructor(){
        super("victoryScreen");
        this.my = {sprite: {}};
        this.my.sprite.Enemies = [];

        this.counter = 0;

    }

    preload(){
        this.load.setPath("./assets/");
        this.load.image("pixel_tiles", "tilemap_packed.png");
        this.load.image("background_tiles", "backgrounds.png");
        this.load.tilemapTiledJSON("map", "GalleryShooterMap.json");   
        this.load.audio("victoryNoise", "computerNoise_002.ogg");
    }

    create(){
        this.map = this.add.tilemap("map", 16, 16, 21, 21);
        this.tileset = this.map.addTilesetImage("tilemap-packed", "pixel_tiles");
        this.tileset2 = this.map.addTilesetImage("Backgrounds", "background_tiles");

        this.backgroundLayer = this.map.createLayer("Background", this.tileset2, 0, 0);
        this.platformLayer = this.map.createLayer("Platforms", this.tileset, 0, 0);
        this.backgroundLayer.setScale(3.0);
        this.platformLayer.setScale(3.0);

        const textObjects = this.map.getObjectLayer("Victory").objects;

        for (let obj of textObjects) {
            let txt = this.add.text(270, 125, obj.text.text, {
                font: `${obj.text.pixelsize * 3}px Trattatello`,
                color: "#b59b0a"
            });
        }

        this.sound.play("victoryNoise",{
            Volume: 3
        })
    }

    update(){
        let my = this.my;
        this.counter++; 

        my.sprite.Enemies.push(this.add.sprite(Math.random()*config.width, -5, "enemy"));
        for(let enemy of my.sprite.Enemies){
            enemy.y += 3;
        }

        if (this.counter % 300 == 0 ) {
            this.scene.start("titleScreen");
        }
    
    }

}