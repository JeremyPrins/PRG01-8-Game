# Space Boys

## Inleiding

Het doel van de game is om te voorkomen dat de vijanden die van bovenaan het scherm naar beneden komen de onderkant van het scherm bereiken. De speler kan zijn score verhogen door vijanden te rammen vijanden scoren punten door de onderkant vvan het speelveld te bereiken. 

## Speelbare game
De game is hier te spelen.
https://stud.hosted.hr.nl/0893306/game/docs/

## Installatie

Om de game te installeren moet je de repo colonen en naar de docs map navigeren om het spel te spelen. Je moet natuurlijk ool de webserver opstarten. 

## Klassendiagram

UML van de game >


## Pull request

Link naar de pull request die je in week 4 hebt gedaan. De link gaat naar een PR in een fork van het project van een medestudent.

Fork game Maarten Esser
https://github.com/JeremyPrins/Eindopdracht-Game

Ik heb bij deze commit de singleton en strategy patern toegevoegd. De singleton omdat de game instance maar een keer aangemaakt hoeft te worden en daarna niet meer. De strategy patern omdat er in de game meerdere soorten gedrag nodig zijn maar ze wel een aantal eigenschappen delen die overlap hebben.

## Peer review

Link peer review: 
https://github.com/duncanteege/theminimalist/issues/3

## Singleton

Ik heb bij deze game de Singleton pattern gebruik in de game class.

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

Beschrijf van minimaal 2 plekken uit jouw code waar en waarom er gebruik is gemaakt van polymorfisme.

## Strategy

Beschrijf waar en waarom je het strategy pattern hebt toegepast.

## Observer

Beschrijf waar en waarom je het observer pattern hebt toegepast.

## Gameplay componenten

Beschrijf per component waar en waarom je het hebt toegepast
