# Space Boys

## Inleiding

Het doel van de game is om te voorkomen dat de vijanden die van bovenaan het scherm naar beneden komen de onderkant van het scherm bereiken. De speler kan zijn score verhogen door vijanden te rammen vijanden scoren punten door de onderkant vvan het speelveld te bereiken. 

## Speelbare game
De game is hier te spelen.
https://stud.hosted.hr.nl/0893306/game/docs/

## Installatie

Om de game te installeren moet je de repo colonen en naar de docs map navigeren om het spel te spelen. Je moet natuurlijk ool de webserver opstarten. 

## Klassendiagram
UML van de game

https://stud.hosted.hr.nl/0893306/game/UML.png

## Pull request

Link naar de pull request die je in week 4 hebt gedaan. De link gaat naar een PR in een fork van het project van een medestudent.

Fork game Maarten Esser
https://github.com/JeremyPrins/Eindopdracht-Game

Ik heb bij deze commit de singleton en strategy patern toegevoegd. De singleton omdat de game instance maar een keer aangemaakt hoeft te worden en daarna niet meer. De strategy patern omdat er in de game meerdere soorten gedrag nodig zijn maar ze wel een aantal eigenschappen delen die overlap hebben.

## Peer review

Link peer review: 
https://github.com/duncanteege/theminimalist/issues/3

## Singleton

Ik heb bij deze game de Singleton pattern gebruik in de game class

  ```
    // Public 
    public static instance: Game
   ```
   
De method.

  ```
    // **Singleton Pattern**
    public static getInstance() {
        if (!Game.instance) {
            Game.instance = new Game()
        }
        return Game.instance
    }
   ```
   
Die wordt hier uitgevoerd.
```
window.addEventListener("load", () => { Game.getInstance() })
   ```


## Polymorfisme

In Space Boys wordt Polymosrfisme vooral gebruikt in de class gameobject
Zo extenden de classes, enemy, expliosion, UI, PlayerSpeedUp en PlayerGrow de class gameobject

```
class Enemy extends GameObject implements Observer 

class Explosion extends GameObject

class UI extends GameObject 

class PlayerGrow extends GameObject implements IMovementBehaviour

class PlayerSpeedUp extends GameObject implements IMovementBehaviour

   ```
## Strategy

Ik heb de Strategy pattern toegapast bij de powerups in deze game
Beide powerups implementen de interface IpowerupBehaviour

```
interface IMovementBehaviour {
    player: Player;
    playerMoveBehaviour(): void
}
   ```
   
Het gedrag wordt gezet in de Player class en is default null
Als de player een powerup oppakt dan krijgt de speler het bijbehoordende gedrag
```
    public myMovementBehaviour: IMovementBehaviour | null
    
```
```
    this.myMovementBehaviour = null
```
```
    public setMovementBehaviour(behaviour: IMovementBehaviour): void {
        behaviour.playerMoveBehaviour()
    }
```

## Observer

De Observer class heb ik toegepast met als subject de game class en als observer de enemy class
```
interface Subject {
    observers: Observer[]
    subscribe(o: Observer): void
    unsubscribe(o: Observer): void
    notifySubscribers(): void
}
```
```
interface Observer {
    notify(): void
}
```

Game subscribed de enemies hier
```
        // Subscribe Enemy objects to game
        for (let enemy of this.gameObjects) {
            if (enemy instanceof Enemy) {
                this.subscribe(enemy)
            }
        }
```

Met deze functie
```

    //Subscribe function
    public subscribe(enemy: Observer): void {
        this.observers.push(enemy)
    }
```

En notified ze hier
```
    public notifySubscribers(): void {
        for (let o of this.observers) {
            o.notify();
        }
    }
```

De notify funtie laat de enemy zichzelf resetten na een botsing met de speler
```
    public notify(): void {
        console.log("enemy is notified of collision")
        this.reset()
    }
```


## Gameplay componenten

Ik heb twee gameplay componenten toegevoegd.

De game is visueel aantrekkelijk en heeft een samenhangende uitstraling.

De game heeft geluiden 
