var gl;

window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" );
    }
    
    // Configure WebGL
    // 
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 ); 

    // Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program ); 

    // Load the data into the GPU 

    var bufferId = gl.createBuffer();

    gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
    // vertex
    var all = new Float32Array([
        0, 1, -0.5, 0.5, 0.5, 0.5, //triangle
        0, 0.5, -0.5, 0, 0.5, 0, //triangle
        0, 0, -0.5, -0.5, 0.5, -0.5, //triangle
        -0.15, -0.5, 0.15, -0.5, -0.15, -1, //triangle
        0.15, -0.5, -0.15, -1, 0.15, -1 //triangle
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, all, gl.STATIC_DRAW);


    // Associate vertex data buffer with shader variables

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition ); 

    // uniform cariable

    var uColor = gl.getUniformLocation(program, "uColor");

    // clear

    gl.clear(gl.COLOR_BUFFER_BIT);

    // leaf color
    gl.uniform4fv(uColor,[0,1,0,1]); //change the color by using this line
    gl.drawArrays(gl.TRIANGLES, 0, 9);

    // body color
    gl.uniform4fv(uColor, [0.5, 0.25, 0, 1]); // color (R,G,B,A)
    gl.drawArrays(gl.TRIANGLES, 9, 6);

    // render();
};

// function render() {
//     gl.clear( gl.COLOR_BUFFER_BIT ); 
//     gl.drawArrays( gl.TRIANGLES, 0, 6 );
// }