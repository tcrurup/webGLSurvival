import fragmentShaderText from "../webGL/shaders/fragmentShaderText.js"
import vertexShaderText from "../webGL/shaders/vertexShaderText.js"
import Grid from "./grid.js"

export default class GameView{

    
    constructor(){
        this.gameGrid = new Grid();
        this.gameCanvas = this.createCanvas()
        this.initializeGameView();
    }

    //Create a display the will generate the graphics
    initializeGameView(){
        document.querySelector("body").prepend(this.gameCanvas)
        
        const gl = this.gameCanvas.getContext('webgl')
        const mat4 = glMatrix.mat4
    
        if(!gl){
            console.log("Using experimental WebGL")
            gl = canvas.getContext('experimental-webgl');
        }
        if(!gl){
            alert('Your browser does not suppert WebGL')
        }
    
        //gl.enable(gl.DEPTH_TEST);
        //gl.enable(gl.CULL_FACE);
        //gl.frontFace(gl.CCW);
        //gl.cullFace(gl.BACK);
    
        let vertexShader = gl.createShader(gl.VERTEX_SHADER);
        let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    
        gl.shaderSource(vertexShader, vertexShaderText);
        gl.shaderSource(fragmentShader, fragmentShaderText);
    
        gl.compileShader(vertexShader);
        if(!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader))
            return;
        }
        gl.compileShader(fragmentShader);
        if(!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader))
            return;
        }
    
        let program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
    
        if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
            console.error('ERROR linking program!', gl.getProgramInfoLog(program))
            return;
        }
    
        gl.validateProgram(program);
        if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS)){
            console.error('ERROR validating program!', gl.getProgramInfoLog(program))
            return;
        }
    
        let boxVertices = 
        [ // X, Y, Z           R, G, B
            // Front
            1.0, 1.0, 0.0,    1.0, 0.0, 0.15,
            1.0, 0.0, 0.0,    1.0, 0.0, 0.15,
            0.0, 0.0, 0.0,    1.0, 0.0, 0.15,
            0.0, 1.0, 0.0,    1.0, 0.0, 0.15,
    
            2.0, 1.0, 0.0,    0.0, 1.0, 0.15,
            2.0, 0.0, 0.0,    0.0, 1.0, 0.15,
            1.0, 0.0, 0.0,    0.0, 1.0, 0.15,
            1.0, 1.0, 0.0,    0.0, 1.0, 0.15,
    
            3.0, 1.0, 0.0,    0.0, 1.0, 0.15,
            3.0, 0.0, 0.0,    0.0, 1.0, 0.15,
            2.0, 0.0, 0.0,    0.0, 1.0, 0.15,
            2.0, 1.0, 0.0,    0.0, 1.0, 0.15,
        ];
    
        var boxIndices =
        [
            0, 1, 2,
            0, 2, 3,
    
            4, 5, 6,
            4, 6, 7,
    
            8, 9, 10, 
            8, 10, 11
        ];
    
        let boxVertexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);
    
        let boxIndexBufferObject = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxIndexBufferObject);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);
    
        let positionAttribLocation = gl.getAttribLocation(program, 'vertPosition');
        let colorAttribLocation = gl.getAttribLocation(program, 'vertColor');
        
        gl.vertexAttribPointer(
            positionAttribLocation,                //Attribute location
            3,                                     //Number of elements per attribute
            gl.FLOAT,                              //Type of elements
            gl.FALSE,                               
            6 * Float32Array.BYTES_PER_ELEMENT,    //Size of individual vertex 
            0                                      //Offset
        );
    
        gl.vertexAttribPointer(
            colorAttribLocation,
            3,
            gl.FLOAT,
            gl.FALSE,
            6 * Float32Array.BYTES_PER_ELEMENT,
            3 * Float32Array.BYTES_PER_ELEMENT
        )
    
        gl.enableVertexAttribArray(positionAttribLocation);
        gl.enableVertexAttribArray(colorAttribLocation)
    
        gl.useProgram(program);
    
        let matWorldUniformLocation = gl.getUniformLocation(program, 'mWorld');
        let matViewUniformLocation = gl.getUniformLocation(program, 'mView');
        let matProjUniformLocation = gl.getUniformLocation(program, 'mProj');
    
        let worldMatrix = new Float32Array(16)
        let viewMatrix = new Float32Array(16)
        let projMatrix = new Float32Array(16)
        mat4.identity(worldMatrix);
        mat4.lookAt(viewMatrix, [0, 0, 100], [0, 0, 0], [0, 1, 0]);
        mat4.perspective(projMatrix, glMatrix.glMatrix.toRadian(45), this.gameCanvas.width / this.gameCanvas.height, 0.1, 1000.0);
    
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
        gl.uniformMatrix4fv(matViewUniformLocation, gl.FALSE, viewMatrix);
        gl.uniformMatrix4fv(matProjUniformLocation, gl.FALSE, projMatrix);
    
        gl.uniformMatrix4fv(matWorldUniformLocation, gl.FALSE, worldMatrix);
    
    
        let identityMatrix = new Float32Array(16);
        mat4.identity(identityMatrix);
    
        gl.clearColor(0.75, 0.85, 0.8, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, boxIndices.length, gl.UNSIGNED_SHORT, 0);
        
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