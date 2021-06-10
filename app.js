
import GameView from "./components/gameView.js"

function initDemo(){
    
    let gameView = new GameView();

}

console.log('loading script')
document.addEventListener("DOMContentLoaded", event => {
    console.log('DOM Loaded')
    initDemo();
});