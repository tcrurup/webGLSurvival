export default class GridObject{

    constructor(xCoord, yCoord){
        this.x = xCoord;
        this.y = yCoord;
    }

    get x1(){ return this.x + 1 }
    get y1(){ return this.y + 1 }


    vertices(){
        return [
        //     X         Y       Z      U  V
            this.x1,  this.y1,  0.0,    1, 1,
            this.x1,  this.y,   0.0,    1, 0, 
            this.x,   this.y,   0.0,    0, 0,
            this.x,   this.y1,  0.0,    0, 1
        ]
    }
    
}