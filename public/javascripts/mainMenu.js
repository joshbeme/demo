class MainMenu extends Phaser.Scene {
    constructor(){
        super({key: "MainMenu"})
        this.select
        this.selected
        this.start
        this.options
        this.credits
        this.key_enter
      
    }
    preload(){
        this.load.audio('MCIS', '../assets/MCIS.mp3');
        this.load.image('back', '../assets/cave.jpg');
    }
    create(){
        this.back = this.add.image(630, 350, 'back');

        this.music = this.sound.add("MCIS", {loop:"true"});
        this.music.play();

        this.start = this.add.text(525, 220, "Start Game", {font: "50px Impact"});
        this.options = this.add.text(560, 320, "Options", {font: "50px Impact"});
        this.credits = this.add.text(560, 420, "Credits", {font: "50px Impact"});
        this.select = 'start';
        
        this.input.keyboard.on('keydown_ENTER', function(event){
            if (this.select === 'start' ){
                this.scene.start("Demo")
                this.music.pause();
            }
            else {
                null
            }
        }, this);//Change Scene

        this.input.keyboard.on('keyup_DOWN', function(event){
            if (this.select === 'start' && this.select != 'credits')
            {
                this.select = 'options'
            }
            else if (this.select === 'options' && this.select != 'start')
            {
                this.select = 'credits'
            }
            else if (this.select === 'credits' && this.select != 'options')
            {
                this.select = 'start'
            }
        }, this);//cycle down

        this.input.keyboard.on('keyup_UP', function(event){
            if (this.select === 'start' && this.select != 'credits')
            {
                this.select = 'credits'
            }
            else if (this.select === 'options' && this.select != 'start')
            {
                this.select = 'start'
            }
            else if (this.select === 'credits' && this.select != 'options')
            {
                this.select = 'options'
            }
        }, this);//cycle up
        
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update(){
        

        if (this.select === 'start'){
            this.start.setColor("Red");
        }
        else{
            this.start.setColor("White")
        }
       if (this.select === 'options'){
            this.options.setColor("Red");
        }
        else{
            this.options.setColor("White")
        }
        if (this.select === 'credits'){
            this.credits.setColor("Red");
        }
        else{
            this.credits.setColor("White")
        }


        
     
    }
}
//export default MainMenu;