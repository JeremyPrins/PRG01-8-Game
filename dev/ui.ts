class UI extends GameObject {

    private score:HTMLElement
    private level:HTMLElement
    private game:Game

    constructor(game:Game) {
        super()
        this.game = game
        this.score = document.createElement("highscore")
        this.level = document.createElement("level")
        let foreground = document.getElementsByTagName("foreground")[0]

        foreground.appendChild(this.score)
        foreground.appendChild(this.level)
    }

    public update(){
        this.score.innerHTML = "Punten: " + this.game.score
        this.level.innerHTML = "Level: " + this.game.level
    }
}