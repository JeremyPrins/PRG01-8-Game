class Explosion extends GameObject {

    // Sound Effect
    public enemySound = new AudioFile('audio/BOOM.mp3');

    constructor(x: number, y: number) {
        super()

        this.name = "explosion"
        this.element = document.createElement(this.name)
        let foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        this.x = x
        this.y = y
        this.enemySound.play()
        setTimeout(() => { this.remove() }, 450)

    }

}