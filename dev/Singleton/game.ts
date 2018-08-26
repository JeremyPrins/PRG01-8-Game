/// <reference path="../gameobject.ts"/>

class Game implements Subject {


    // Public 
    public static instance: Game
    public gameOver: boolean = false
    public level: number = 1
    public score: any = 0
    public observers: Observer[] = [];



    // Private 
    private ui: UI
    private player: Player
    private gameObjects: GameObject[] = []

    // Audio
    private hitSound = new AudioFile('audio/YUH.wav');
    private gameMusic = new AudioFile('audio/MUSIC.mp3');


    // Constructor
    constructor() {
        this.ui = new UI(this)
        this.player = new Player()
        this.gameObjects = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), this.ui]


        // Subscribe Enemy objects to game
        for (let enemy of this.gameObjects) {
            if (enemy instanceof Enemy) {
                this.subscribe(enemy)
            }
        }
        console.log(this.observers)

        this.gameLoop()
    }

    public notifySubscribers(): void {
        for (let o of this.observers) {
            o.notify();
        }
    }

    //Subscribe function
    public subscribe(enemy: Observer): void {
        this.observers.push(enemy)
    }

    //Unsubscribe function
    public unsubscribe(enemy: Observer): void {
        for (let object = 0; object < this.observers.length; object++) {
            if (this.observers[object] == enemy) {
                this.observers.splice(object, 1)
            }
        }
    }

    // **Singleton Pattern**
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }

    // Main gameloop
    private gameLoop(): void {


        if (this.score < 0) {
            this.gameOver = true
            this.gameMusic.stop()

        } else {

            // Player update func
            this.player.update()

            // GameObjects Update loop
            for (let object of this.gameObjects) {
                object.update()

                // If SpeedPowerUp
                if (object instanceof PlayerSpeedUp) {
                    if (Util.checkCollision(this.player.getRectangle(), object.getRectangle())) {
                        this.player.setMovementBehaviour(new PlayerSpeedUp(this.player))
                        this.notifySubscribers()
                        object.remove();
                    }
                }

                // If GrowPowerUp
                if (object instanceof PlayerGrow) {
                    if (Util.checkCollision(this.player.getRectangle(), object.getRectangle())) {
                        this.player.setMovementBehaviour(new PlayerGrow(this.player))
                        this.notifySubscribers()
                        object.remove();
                    }
                }

                // If Enemy
                if (object instanceof Enemy) {
                    if (Util.checkCollision(this.player.getRectangle(), object.getRectangle())) {

                        // Explosion Animation
                        this.gameObjects.push(new Explosion((object.x - 90), (object.y)))
                        this.score++
                        object.notify();

                        if (this.score == 10) {
                            this.level = 2
                            this.gameObjects.push(new Enemy())
                            // this.gameObjects.push(new PlayerSpeedUp(this.player))
                            this.gameObjects.push(new PlayerGrow(this.player))
                        }

                        if (this.score == 20) {
                            this.level = 3
                            this.gameObjects.push(new PlayerSpeedUp(this.player))
                            this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy())
                        }

                        if (this.score == 30) {
                            this.level = 4
                            this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy())
                        }
                    }
                }

                // If Enemy bottom screen 
                if (object instanceof Enemy) {
                    if (object.getRectangle().bottom - object.getRectangle().height > window.innerHeight) {
                        this.hitSound.play()
                        object.enemyScore()
                        object.notify();
                        this.score--
                    }
                }

                // If Enemy Speed Powerup bottom screen 
                if (object instanceof PlayerSpeedUp) {
                    if (object.getRectangle().bottom - object.getRectangle().height > window.innerHeight) {
                        object.remove()
                    }
                }

                // If Enemy Speed Powerup bottom screen 
                if (object instanceof PlayerGrow) {
                    if (object.getRectangle().bottom - object.getRectangle().height > window.innerHeight) {
                        object.remove()
                    }
                }
            }
            // Gameloop refresh
            requestAnimationFrame(() => this.gameLoop())
        }
    }
}

window.addEventListener("load", () => { Game.getInstance() })