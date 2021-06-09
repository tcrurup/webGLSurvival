let vertexShaderText = [
'precision mediump float;',
'',
'attribute vec2 vertPosition;',
'',
'void main()',
'{',
'   gl_Position = vec4(vertPosition, 0.0, 1.0);',
'}'
].join('\n');

let fragmentShaderText = [
'precision mediump float;',
'',
'void main()',
'{',
'   gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);',
'}'
].join('\n');

function initDemo(){
    
    let canvas = document.getElementById("game-window");
    let gl = canvas.getContext('webgl')

    if(!gl){
        console.log("Using experimental WebGL")
        gl = canvas.getContext('experimental-webgl');
    }

    if(!gl){
        alert('Your browser does not suppert WebGL')
    }

    gl.clearColor(0.75, 0.85, 0.8, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

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
}