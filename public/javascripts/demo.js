class Demo extends Phaser.Scene{
    constructor(){
        super({key: "Demo"});
        this.player;
        this.crate;
        this.platforms;
        this.cursors;
       // this.score = 0;
        //this.scoreText;
       // this.floor;
        //this.wall;
        //this.wall2;
        //this.wall3;
        //this.soundFX;
        //this.ceiling;

    }
    preload(){
        this.load.audio('1979', '../assets/1979.mp3');
        this.load.image('background', '../assets/background.png');
        this.load.image('ground', '../assets/ground.png');
        this.load.image('star', '../assets/crate.png');
        //this.load.image('bomb', '../assets/bomb.png');
        this.load.spritesheet('dude', '../assets/dude.png', {frameWidth:28, frameHeight: 28});
    
    }
    create(){
        this.soundFX = this.sound.add("1979", {loop:"true"});
   this.soundFX.play();

    this.add.image(400, 300, 'background');

    this.wall = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 8,
        setXY: { x: -67, y: 550, stepY: -127 },
        
       
    }); 
    this.floor = this.physics.add.staticGroup({
       key: 'ground',
        repeat: 20,
        setXY: { x: -67, y: 550, stepX: 127 },
        
       
    });
 
    this.wall2 = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 8,
        setXY: { x: 3000, y: 550, stepY: -127 },
        
       
    }); 
    this.wall3 = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 8,
        setXY: { x: 3000, y: 550, stepY: -127 },
        
       
    }); 
    
    this.ceiling = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 40,
        setXY: { x: -67, y: -127, stepX: 127 },
        });
        this.platforms = this.physics.add.staticGroup();    


        this.platforms.create(600, 460, 'ground');
        this.platforms.create(50, 250, 'ground')
        this.platforms.create(220, 220, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(400, 280, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(580, 70, 'ground').setScale(0.4).refreshBody();
    

        this.player = this.physics.add.sprite(100, 450, 'dude').setScale(2);

        this.player.setBounce(0);
        this.player.setCollideWorldBounds(false);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 7, end: 10 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 5 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    this.crate = this.physics.add.sprite(800, 50, 'star').setScale(0.4);

    //crate.setScale(0.5);
    //crate.setVelocityX(0);

 
    //crate.children.iterate(function (child) {

      

    //});
  
    //crate.create(800, 50, 'star').setScale(0.25);
   // crate.create(1300, 150, 'star').setScale(0.25);
    //crate.create(1300, 250, 'star').setScale(0.25);
    //crate.create(800, 350, 'star').setScale(0.25);
   
    

    //this.scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(this.player, this.ceiling);
    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.player, this.floor);
    this.physics.add.collider(this.player, this.wall);
    this.physics.add.collider(this.player, this.wall2);
    this.physics.add.collider(this.crate, this.platforms);
    this.physics.add.collider(this.crate, this.floor);
    this.physics.add.collider(this.player, this.crate);
    //this.physics.add.collider(crate);

   

    this.cameras.main.startFollow(this.player);
    //this.physics.add.overlap(player, crate, collectStar, null, this);
    }
    update(){
        if (this.cursors.left.isDown)
        {
            this.player.setVelocityX(-160);
    
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160);
    
            this.player.anims.play('right', true);
    
           
        }
        else
        {
            this.player.setVelocityX(0);
    
            this.player.anims.play('turn');
        }
    
        if (this.cursors.up.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-500);
        }
        //crate.setGravityY();
        
        this.crate.setVelocityX(0);
        
        
        //if(crate.body.velocityX > 0 && crate.body.velocityX < 0){
        //    crate.setVelocityX(0)
        //}

    }
};
//export default Demo;