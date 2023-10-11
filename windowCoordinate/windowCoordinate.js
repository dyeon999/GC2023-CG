var gl;
var points;

window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" );
    }

    // var vertices = [
    //     vec2(0, 1.0),
    //     vec2(-1.0, -1.0),
    //     vec2(1.0, -1.0)
    // ];

    var vertices = [
        10, 20,
        190, 20,
        100, 200
    ];


    var colors = [
        vec4(1.0, 0.0, 0.0, 1.0),
        vec4(0.0, 1.0, 0.0, 1.0),
        vec4(0.0, 0.0, 1.0, 1.0),
    ];
    
    // Configure WebGL
    // 
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 0.0, 0.0, 0.0, 1.0 ); 

    // Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program ); 

    // Load the data into the GPU 

    var vetrtexPositionBufferId = gl.createBuffer();

    gl.bindBuffer( gl.ARRAY_BUFFER, vetrtexPositionBufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW);


    // Associate vertex data buffer with shader variables

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition ); 


    var vetrtexColorBufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vetrtexColorBufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(colors), gl.STATIC_DRAW);

    var vColor = gl.getAttribLocation( program, "vColor" );
    gl.vertexAttribPointer( vColor, 4, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vColor ); 

    var vResolution = gl.getUniformLocation(program, "vResolution");
    gl.uniform2f(vResolution, gl.canvas.width, gl.canvas.height);

    // offset
    // var uOffset = gl.getUniformLocation(program, "uOffset");
    // gl.uniform4fv(uOffset, [0.3,0,0,0]);

    // uniform cariable

    // var uColor = gl.getUniformLocation(program, "uColor");
    // gl.uniform4fv(uColor,[0,0,1,0]); 

    gl.clear( gl.COLOR_BUFFER_BIT ); 
    gl.drawArrays( gl.TRIANGLES, 0, 3);
};

// function render() {
//     gl.clear( gl.COLOR_BUFFER_BIT ); 
//     gl.drawArrays( gl.TRIANGLES, 0, 3);
// }