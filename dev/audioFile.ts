class AudioFile {
    
    private element = new Audio();
    constructor(src: string) {
        this.element = document.createElement("audio")
        this.element.src = src
    }
    
    play() {
        this.element.play()
    }

    stop() {
        this.element.pause();
        this.element.currentTime = 0;
    }
}