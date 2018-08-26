class PlayerSpeedUp extends GameObject implements IMovementBehaviour {

    player: Player;

    constructor(player: Player) {
        super();

        this.name = "powerUpSpeed"
        this.element = document.createElement(this.name)
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        this.x = Math.random() * (window.innerWidth)
        this.y = -400 - (Math.random() * 450)
        this.player = player
    }

    public playerMoveBehaviour(): void {
        console.log("Executing behaviour " + this.name )
        this.player.speed = 50;

        setTimeout(() => { 
            this.player.speed = 20 
            this.remove()
        }, 5000)

    }
}