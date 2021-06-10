import Grid from "./grid.js"

export default class GameView{

    
    constructor(){
        console.log("constructing game view")
        this.gameGrid = new Grid();
        this.initializeGameView();
    }

    //Create a display the will generate the graphics
    initializeGameView(){
        let body = document.querySelector("body")
        body.prepend(this.createCanvas())
    }

    createCanvas(){
        let canvas = document.createElement("canvas")
        canvas.id = "game-window"
        canvas.height = "600"
        canvas.width = "800"
        canvas.innerHTML = "Your browser does not support HTML5"
        return canvas;
    }
    
    //
}