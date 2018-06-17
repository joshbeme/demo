var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var stars;
var platforms;
var cursors;
var score = 0;
var scoreText;

var game = new Phaser.Game(config);

function preload ()
{
    this.load.audio('1979', '../assets/1979.mp3')
    this.load.image('background', '../assets/background.png');
    this.load.image('ground', '../assets/ground.png');
    this.load.image('star', '../assets/carrot.png');
    //this.load.image('bomb', '../assets/bomb.png');
    this.load.spritesheet('dude', '../assets/dude.png', {frameWidth:28, frameHeight: 28});
}

function create ()
{
   
    this.soundFX = this.sound.add("1979", {loop:"true"});
    this.soundFX.play();

    this.add.image(400, 300, 'background');

    wall = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 8,
        setXY: { x: -67, y: 550, stepY: -127 },
        
       
    }); 
    floor = this.physics.add.staticGroup({
       key: 'ground',
        repeat: 20,
        setXY: { x: -67, y: 550, stepX: 127 },
        
       
    });
 
    wall2 = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 8,
        setXY: { x: 3000, y: 550, stepY: -127 },
        
       
    }); 
    wall3 = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 8,
        setXY: { x: 3000, y: 550, stepY: -127 },
        
       
    }); 
    
    ceiling = this.physics.add.staticGroup({
        key: 'ground',
        repeat: 40,
        setXY: { x: -67, y: -127, stepX: 127 },
        });
    platforms = this.physics.add.staticGroup();    


    platforms.create(600, 460, 'ground');
    platforms.create(50, 250, 'ground')
    platforms.create(220, 220, 'ground').setScale(0.5).refreshBody();
    platforms.create(400, 280, 'ground').setScale(0.5).refreshBody();
    platforms.create(580, 70, 'ground').setScale(0.4).refreshBody();
    

    player = this.physics.add.sprite(100, 450, 'dude').setScale(2);

    player.setBounce(0.2);
    player.setCollideWorldBounds(false);

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

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });

    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.physics.add.collider(player, ceiling);
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, floor);
    this.physics.add.collider(player, wall);
    this.physics.add.collider(player, wall2);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars, floor);

    this.cameras.main.startFollow(player);
    this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }
}


function collectStar(player, carrot){
    carrot.disableBody(true,true);
    //this.cameras.main.shake(50);
    score += 10;
    scoreText.setText('Score: ' + score);
    //x += 0.1
    //player.setScale(x);  
}