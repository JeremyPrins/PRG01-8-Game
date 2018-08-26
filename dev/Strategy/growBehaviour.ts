class PlayerGrow extends GameObject implements IMovementBehaviour {

    player: Player;

    constructor(player: Player) {
        super();

        this.name = "powerUpGrow"
        this.element = document.createElement(this.name)
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        this.x = Math.random() * (window.innerWidth)
        this.y = -400 - (Math.random() * 450)
        this.player = player
    }

    public playerMoveBehaviour(): void {
        console.log("Executing behaviour " + this.name )
        this.player.element.setAttribute("style", "height:200px; width:200px;");

        setTimeout(() => {
            this.player.element.setAttribute("style", "height:100px; width:100px;");
            this.remove()
        }, 5000)


    }
}