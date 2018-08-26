/// <reference path="./gameobject.ts"/>

class Enemy extends GameObject implements Observer {


    // Sound Effect
    public hitSound = new AudioFile('audio/YUH.wav');
       
    constructor() {
        super();
        this.name = "enemy"
        this.element = document.createElement(this.name)
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        this.speed = 5 + Math.random() * 5
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = -500 - (Math.random() * 450) 
        // console.log(this.getSpeed());
        
    }

     public enemyScore(){
        this.hitSound.play()
    }

    public reset(){  
        this.x = Math.random() * (window.innerWidth - 200)
        this.y = -500 - (Math.random() * 450) 
    }    
    
    public notify(): void {
        console.log("enemy is notified of collision")
        this.reset()
    }
}