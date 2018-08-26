"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var AudioFile = (function () {
    function AudioFile(src) {
        this.element = new Audio();
        this.element = document.createElement("audio");
        this.element.src = src;
    }
    AudioFile.prototype.play = function () {
        this.element.play();
    };
    AudioFile.prototype.stop = function () {
        this.element.pause();
        this.element.currentTime = 0;
    };
    return AudioFile;
}());
var GameObject = (function () {
    function GameObject() {
        this.x = 0;
        this.y = 0;
        this.speed = 5;
        this.name = "Gameobject";
    }
    GameObject.prototype.update = function () {
        this.y += this.speed;
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    GameObject.prototype.getSpeed = function () {
        return this.speed;
    };
    GameObject.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    GameObject.prototype.remove = function () {
        this.element.remove();
        console.log(this.name + " - Removed from game");
    };
    return GameObject;
}());
var Enemy = (function (_super) {
    __extends(Enemy, _super);
    function Enemy() {
        var _this = _super.call(this) || this;
        _this.hitSound = new AudioFile('audio/YUH.wav');
        _this.name = "enemy";
        _this.element = document.createElement(_this.name);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        _this.speed = 5 + Math.random() * 5;
        _this.x = Math.random() * (window.innerWidth - 200);
        _this.y = -500 - (Math.random() * 450);
        return _this;
    }
    Enemy.prototype.enemyScore = function () {
        this.hitSound.play();
    };
    Enemy.prototype.reset = function () {
        this.x = Math.random() * (window.innerWidth - 200);
        this.y = -500 - (Math.random() * 450);
    };
    Enemy.prototype.notify = function () {
        console.log("enemy is notified of collision");
        this.reset();
    };
    return Enemy;
}(GameObject));
var Explosion = (function (_super) {
    __extends(Explosion, _super);
    function Explosion(x, y) {
        var _this = _super.call(this) || this;
        _this.enemySound = new AudioFile('audio/BOOM.mp3');
        _this.name = "explosion";
        _this.element = document.createElement(_this.name);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        _this.x = x;
        _this.y = y;
        _this.enemySound.play();
        setTimeout(function () { _this.remove(); }, 450);
        return _this;
    }
    return Explosion;
}(GameObject));
var Player = (function () {
    function Player() {
        var _this = this;
        this.x = window.innerWidth / 2;
        this.y = window.innerHeight / 2;
        this.speed = 20;
        this.speedUp = 0;
        this.speedRight = 0;
        this.speedDown = 0;
        this.speedLeft = 0;
        this.element = document.createElement("player");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(this.element);
        window.addEventListener("keydown", function (e) { return _this.onKeyDown(e); });
        window.addEventListener("keyup", function (e) { return _this.onKeyUp(e); });
        this.myMovementBehaviour = null;
    }
    Player.prototype.setMovementBehaviour = function (behaviour) {
        behaviour.playerMoveBehaviour();
    };
    Player.prototype.onKeyDown = function (event) {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = this.speed;
                break;
            case "ArrowRight":
                this.speedRight = this.speed;
                break;
            case "ArrowDown":
                this.speedDown = this.speed;
                break;
            case "ArrowLeft":
                this.speedLeft = this.speed;
                break;
        }
    };
    Player.prototype.onKeyUp = function (event) {
        switch (event.key) {
            case "ArrowUp":
                this.speedUp = 0;
                break;
            case "ArrowRight":
                this.speedRight = 0;
                break;
            case "ArrowDown":
                this.speedDown = 0;
                break;
            case "ArrowLeft":
                this.speedLeft = 0;
                break;
        }
    };
    Player.prototype.playerBounds = function () {
        if (this.x < 20) {
            this.x = 20;
        }
        if (this.x > (innerWidth - 120)) {
            this.x = innerWidth - 120;
        }
        if (this.y < 20) {
            this.y = 20;
        }
        if (this.y > (innerHeight - 120)) {
            this.y = innerHeight - 120;
        }
    };
    Player.prototype.update = function () {
        this.playerBounds();
        this.x = this.x + this.speedRight - this.speedLeft;
        this.y = this.y + this.speedDown - this.speedUp;
        this.element.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    Player.prototype.getRectangle = function () {
        return this.element.getBoundingClientRect();
    };
    return Player;
}());
var UI = (function (_super) {
    __extends(UI, _super);
    function UI(game) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.score = document.createElement("highscore");
        _this.level = document.createElement("level");
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.score);
        foreground.appendChild(_this.level);
        return _this;
    }
    UI.prototype.update = function () {
        this.score.innerHTML = "Punten: " + this.game.score;
        this.level.innerHTML = "Level: " + this.game.level;
    };
    return UI;
}(GameObject));
var Util = (function () {
    function Util() {
    }
    Util.checkCollision = function (a, b) {
        return (a.left <= b.right &&
            b.left <= a.right &&
            a.top <= b.bottom &&
            b.top <= a.bottom);
    };
    return Util;
}());
var Game = (function () {
    function Game() {
        this.gameOver = false;
        this.level = 1;
        this.score = 0;
        this.observers = [];
        this.gameObjects = [];
        this.hitSound = new AudioFile('audio/YUH.wav');
        this.gameMusic = new AudioFile('audio/MUSIC.mp3');
        this.ui = new UI(this);
        this.player = new Player();
        this.gameObjects = [new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy(), this.ui];
        for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
            var enemy = _a[_i];
            if (enemy instanceof Enemy) {
                this.subscribe(enemy);
            }
        }
        console.log(this.observers);
        this.gameLoop();
    }
    Game.prototype.notifySubscribers = function () {
        for (var _i = 0, _a = this.observers; _i < _a.length; _i++) {
            var o = _a[_i];
            o.notify();
        }
    };
    Game.prototype.subscribe = function (enemy) {
        this.observers.push(enemy);
    };
    Game.prototype.unsubscribe = function (enemy) {
        for (var object = 0; object < this.observers.length; object++) {
            if (this.observers[object] == enemy) {
                this.observers.splice(object, 1);
            }
        }
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.gameLoop = function () {
        var _this = this;
        if (this.score < 0) {
            this.gameOver = true;
            this.gameMusic.stop();
        }
        else {
            this.player.update();
            for (var _i = 0, _a = this.gameObjects; _i < _a.length; _i++) {
                var object = _a[_i];
                object.update();
                if (object instanceof PlayerSpeedUp) {
                    if (Util.checkCollision(this.player.getRectangle(), object.getRectangle())) {
                        this.player.setMovementBehaviour(new PlayerSpeedUp(this.player));
                        this.notifySubscribers();
                        object.remove();
                    }
                }
                if (object instanceof PlayerGrow) {
                    if (Util.checkCollision(this.player.getRectangle(), object.getRectangle())) {
                        this.player.setMovementBehaviour(new PlayerGrow(this.player));
                        this.notifySubscribers();
                        object.remove();
                    }
                }
                if (object instanceof Enemy) {
                    if (Util.checkCollision(this.player.getRectangle(), object.getRectangle())) {
                        this.gameObjects.push(new Explosion((object.x - 90), (object.y)));
                        this.score++;
                        object.notify();
                        if (this.score == 10) {
                            this.level = 2;
                            this.gameObjects.push(new Enemy());
                            this.gameObjects.push(new PlayerGrow(this.player));
                        }
                        if (this.score == 20) {
                            this.level = 3;
                            this.gameObjects.push(new PlayerSpeedUp(this.player));
                            this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy());
                        }
                        if (this.score == 30) {
                            this.level = 4;
                            this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy()),
                                this.gameObjects.push(new Enemy());
                        }
                    }
                }
                if (object instanceof Enemy) {
                    if (object.getRectangle().bottom - object.getRectangle().height > window.innerHeight) {
                        this.hitSound.play();
                        object.enemyScore();
                        object.notify();
                        this.score--;
                    }
                }
                if (object instanceof PlayerSpeedUp) {
                    if (object.getRectangle().bottom - object.getRectangle().height > window.innerHeight) {
                        object.remove();
                    }
                }
                if (object instanceof PlayerGrow) {
                    if (object.getRectangle().bottom - object.getRectangle().height > window.innerHeight) {
                        object.remove();
                    }
                }
            }
            requestAnimationFrame(function () { return _this.gameLoop(); });
        }
    };
    return Game;
}());
window.addEventListener("load", function () { Game.getInstance(); });
var PlayerGrow = (function (_super) {
    __extends(PlayerGrow, _super);
    function PlayerGrow(player) {
        var _this = _super.call(this) || this;
        _this.name = "powerUpGrow";
        _this.element = document.createElement(_this.name);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        _this.x = Math.random() * (window.innerWidth);
        _this.y = -400 - (Math.random() * 450);
        _this.player = player;
        return _this;
    }
    PlayerGrow.prototype.playerMoveBehaviour = function () {
        var _this = this;
        console.log("Executing behaviour " + this.name);
        this.player.element.setAttribute("style", "height:200px; width:200px;");
        setTimeout(function () {
            _this.player.element.setAttribute("style", "height:100px; width:100px;");
            _this.remove();
        }, 5000);
    };
    return PlayerGrow;
}(GameObject));
var PlayerSpeedUp = (function (_super) {
    __extends(PlayerSpeedUp, _super);
    function PlayerSpeedUp(player) {
        var _this = _super.call(this) || this;
        _this.name = "powerUpSpeed";
        _this.element = document.createElement(_this.name);
        var foreground = document.getElementsByTagName("foreground")[0];
        foreground.appendChild(_this.element);
        _this.x = Math.random() * (window.innerWidth);
        _this.y = -400 - (Math.random() * 450);
        _this.player = player;
        return _this;
    }
    PlayerSpeedUp.prototype.playerMoveBehaviour = function () {
        var _this = this;
        console.log("Executing behaviour " + this.name);
        this.player.speed = 50;
        setTimeout(function () {
            _this.player.speed = 20;
            _this.remove();
        }, 5000);
    };
    return PlayerSpeedUp;
}(GameObject));
//# sourceMappingURL=main.js.map