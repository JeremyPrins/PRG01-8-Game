class Player {

    public element: HTMLElement
    public x: number = window.innerWidth / 2
    public y: number = window.innerHeight / 2
    public speed: number = 20
    public speedUp: number = 0
    public speedRight: number = 0
    public speedDown: number = 0
    public speedLeft: number = 0

    public myMovementBehaviour: IMovementBehaviour | null


    constructor() {
        this.element = document.createElement("player")
        const foreground = document.getElementsByTagName("foreground")[0]
        foreground.appendChild(this.element);
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        this.myMovementBehaviour = null

    }

    public setMovementBehaviour(behaviour: IMovementBehaviour): void {
        behaviour.playerMoveBehaviour()
    }

    onKeyDown(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = this.speed
                break
            case "ArrowRight":
                this.speedRight = this.speed
                break
            case "ArrowDown":
                this.speedDown = this.speed
                break
            case "ArrowLeft":
                this.speedLeft = this.speed
                break
        }
    }

    onKeyUp(event: KeyboardEvent): void {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = 0
                break
            case "ArrowRight":
                this.speedRight = 0
                break
            case "ArrowDown":
                this.speedDown = 0
                break
            case "ArrowLeft":
                this.speedLeft = 0
                break
        }
    }

    // Method to keep te player from leaving the screen
    public playerBounds() {

        if (this.x < 20) {
            this.x = 20
        }
        if (this.x > (innerWidth - 120)) {
            this.x = innerWidth - 120
        }
        if (this.y < 20) {
            this.y = 20
        }
        if (this.y > (innerHeight - 120)) {
            this.y = innerHeight - 120

        }
    }

    // Player update method
    public update(): void {
        this.playerBounds()

        this.x = this.x + this.speedRight - this.speedLeft
        this.y = this.y + this.speedDown - this.speedUp
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }
    
    public getRectangle() {
        return this.element.getBoundingClientRect()

    }
}