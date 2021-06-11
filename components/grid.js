import GridObject from "./gridObject.js"

export default class Grid{

    constructor(width, height){
    
        this.grid = []
        let row;
        for(let y = 0; y < height; y++){
            row = [];
            for(let x = 0; x < width; x++){
                row.push(new GridObject(x, y))
            }
            this.grid.unshift(row)
        }
        console.log(this.vertices())
    }

    vertices(){
        let vertices = []
        this.grid.forEach( row => {
            row.forEach( gridObj => {
                gridObj.vertices().forEach(point => vertices.push(point))
            })
        })
        return vertices
    }
}