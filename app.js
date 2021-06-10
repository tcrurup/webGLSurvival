import GameView from "./components/gameView.js"

class App{
    
    constructor(){
        this.gameView = new GameView()
    }

    static start(){
        return new App();
    }
    
}

document.addEventListener("DOMContentLoaded", event => {
    console.log('Starting Application...')
    App.start();
});