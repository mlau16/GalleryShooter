class GalleryShooter extends Phaser.Scene {
    constructor() {
        super("galleryShooter");
        this.my = {sprite: {}};

        this.avatarX = 50;
        this.avatarY = 173;

        this.counter = 0;
        this.avatarType = 'Stand';

        this.my.sprite.laser = [];   
        this.maxLasers = 10;

        this.my.sprite.Enemies = [];
        this.maxEnemies = 2;
        
        this.playerScore = 0;
    }

    preload() {
        this.load.setPath("./assets/");
        this.load.image("pixel_tiles", "tilemap_packed.png");
        this.load.image("background_tiles", "backgrounds.png");
        this.load.image("avatar","tile_0000.png");
        this.load.image("avatar2","tile_0001.png");
        this.load.image("laser", "tile_0863.png");
        this.load.image("enemy", "tile_0011.png");
        this.load.tilemapTiledJSON("map", "GalleryShooterMap.json");   
        this.load.audio("pew", "laserSmall_004.ogg");

        document.getElementById('description').innerHTML = '<h2>SPACE to shoot | \'A\' or \'D\' to move</h2>'
    }

    create(){
        let my = this.my;

        this.map = this.add.tilemap("map", 16, 16, 21, 21);
        this.tileset = this.map.addTilesetImage("tilemap-packed", "pixel_tiles");
        this.tileset2 = this.map.addTilesetImage("Backgrounds", "background_tiles");

        this.backgroundLayer = this.map.createLayer("Background", this.tileset2, 0, 0);
        this.platformLayer = this.map.createLayer("Platforms", this.tileset, 0, 0);
        this.backgroundLayer.setScale(3.0);
        this.platformLayer.setScale(3.0);

        my.sprite.avatar = this.add.sprite(this.avatarX,this.avatarY,"avatar");
        my.sprite.avatar.flipX = true;
        my.sprite.avatar.setScale(1.5);
        my.sprite.avatar2 = this.add.sprite(this.avatarX, this.avatarY, "avatar2");
        my.sprite.avatar2.setScale(1.5);
        my.sprite.avatar2.flipX = true;
        my.sprite.avatar2.visible = false;
        my.sprite.Enemies.push(this.add.sprite(Math.random()*config.width, -5, "enemy"));


        this.left = this.input.keyboard.addKey("A");
        this.right = this.input.keyboard.addKey("D");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
    }

    update(){
        let my = this.my;

        this.counter++;

        if (this.counter % 10 == 0) {  
            switch (this.avatarType) {
                case "Stand":
                    this.avatarType = "Walk";
                    my.sprite.avatar.visible = false;
                    my.sprite.avatar2.visible = true;
                    break;
                case "Walk":
                    this.avatarType = "Stand";
                    my.sprite.avatar2.visible = false;
                    my.sprite.avatar.visible = true;
                    break;
                default:
                    console.log("Error: unknown avatar");
            }
        }

        if(my.sprite.avatar.x <= 0){
            my.sprite.avatar.x = 0;
        }
        if(my.sprite.avatar.x >= 690){
            my.sprite.avatar.x = 690;
        }

        if(this.left.isDown){
            my.sprite.avatar.flipX = false;
            my.sprite.avatar2.flipX = false;
            my.sprite.avatar.x -= 3;
            my.sprite.avatar2.x = my.sprite.avatar.x;
        }

        if(this.right.isDown){
            my.sprite.avatar.flipX = true;
            my.sprite.avatar2.flipX = true;
            my.sprite.avatar.x += 3;
            my.sprite.avatar2.x = my.sprite.avatar.x;
        }

        if (Phaser.Input.Keyboard.JustDown(this.space)) {
            if (my.sprite.laser.length < this.maxLasers) {
                this.sound.play("pew",{
                    volume: 5
                })
                my.sprite.laser.push(this.add.sprite(my.sprite.avatar.x, my.sprite.avatar.y, "laser"));
            }
        }

        for (let laser of my.sprite.laser) {
            laser.y -= 10;
        }
        

        if (this.counter % 300 == 0 ) {
            if(my.sprite.Enemies.length < this.maxEnemies){
                my.sprite.Enemies.push(this.add.sprite(Math.random()*config.width, -5, "enemy"));
            
            }
        }
       for (let enemy of my.sprite.Enemies){
            enemy.y += 0.5;
       }

        my.sprite.laser = my.sprite.laser.filter((laser) => laser.y > -(laser.displayHeight/2));

        for (let enemy of my.sprite.Enemies) {
            for (let laser of my.sprite.laser){
                if (this.collides(enemy, laser)) {
                    laser.y = -100;
                    enemy.visible = false;
                
                    this.playerScore++;
                    console.log(this.playerScore);

                    Phaser.Utils.Array.Remove(my.sprite.Enemies, enemy);

                }
            }
        }
        for(let enemy of my.sprite.Enemies){
            if (enemy.y > 250){
                enemy.visible = false;
                Phaser.Utils.Array.Remove(my.sprite.Enemies, enemy);
            }
        }
        
       if(this.playerScore == 5){
            this.scene.start("victoryScreen");
       }

    }

    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false;
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false;
        return true;
    }
}