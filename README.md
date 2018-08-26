# PRG08 Week 4 oefening 1

## Polymorphism

Gebruik het type van de parent om verschillende typen children generiek te kunnen aanspreken. In dit voorbeeld erven `Health` en `Bomb` van `GameObject`. `GameObject` heeft een `update` method:
```
objects:GameObject[] = []

this.objects.push(new Health(), new Bomb())

for(let o of this.objects){
    o.update()
}
```

### Type Guards

Check welk type een object echt is. Alleen Car heeft een drive functie. Met `instanceof` kijken we of het object een Car is.
```
if(o instanceof Car) {
    o.drive()
}
```

## Opdracht

- Maak een array in Game.ts waarin de UI, de Health en de Bomb instances geplaatst worden
- De Car blijft wel een losse property, dit is nodig omdat we bij elk element willen kijken of het element de car raakt.
- In de gameloop loop je door de gameobjects array heen. Daarbij roep je de `update` functie van UI, health en bomb aan.
- Zorg met `instanceof` dat de checks voor collision blijven werken!

## Fire!

- Zodra een bom beneden uit beeld gaat, voeg je een `new Fire()` toe aan de gameobjects array. Deze instance moet op dezelfde x positie verschijnen als waar de bom uit beeld ging.
- Als er 10 vuurtjes in beeld zijn is het game over!

## Health 

- Als je collide met een health object, verwijder je alle Fire instances uit de gameobjects array. Let op dat de fire DIVS ook uit de DOM verwijderd moeten worden.

### Fire Element uit DOM verwijderen

```
this.element.remove()
```

### Object uit array verwijderen

Je kan het beste van achter naar voren door een array loopen, zodat je tijdens de loop het object meteen uit de array kan verwijderen:
```
for(let i = array.length; i>=0; i--){
    let item = array[i]

    // check wat voor item dit is
    if(item...){
        // verwijder dit item uit de array
        array.splice(i,1)
    }
}
```

### Collision 

Gebruik de DOM rectangle om de positie en afmeting van een element te achterhalen. [MDN documentatie](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect)

```
let rectangle : ClientRect = divelement.getBoundingClientRect()

function checkCollision(a: ClientRect, b: ClientRect) {
    return (a.left <= b.right &&
          b.left <= a.right &&
          a.top <= b.bottom &&
          b.top <= a.bottom)
}
```
