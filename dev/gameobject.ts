abstract class GameObject {

    public name: string
    public element!: HTMLElement;
    public x: number = 0;
    public y: number = 0;
    public speed: number = 5;
    

    constructor() {
        this.name = "Gameobject"
    }

    public update(): void {
        this.y += this.speed
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`
    }

    public getSpeed():number{
        return this.speed;
    }

    public getRectangle() {
        return this.element.getBoundingClientRect()
    }

    public remove() {
        this.element.remove()
        console.log(this.name + " - Removed from game")
    }
}
