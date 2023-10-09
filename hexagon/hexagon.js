var gl;
var points;

window.onload = function init(){
    var canvas = document.getElementById( "gl-canvas" );
    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { 
        alert( "WebGL isn't available" );
    }

    var hexaVertices = [
        vec2(-0.3,0.6),
        vec2(-0.4,0.8),
        vec2(-0.6,0.8),
        vec2(-0.7,0.6),
        vec2(-0.6,0.4),
        vec2(-0.4,0.4),
        vec2(-0.3,0.6)
    ];

    var stripVertices = [
        vec2(-0.5,0.2),
        vec2(-0.4,0.0),
        vec2(-0.3,0.2),
        vec2(-0.2,0.0),
        vec2(-0.1,0.2),

        vec2(0.0,0.0),
        vec2(0.1,0.2),
        vec2(0.2,0.0),
        vec2(0.3,0.2),
        vec2(0.4,0.0),
        vec2(0.5,0.2)
    ]
    // var colors = [
    //     vec4(1.0, 0.0, 0.0, 1.0),
    //     vec4(0.0, 1.0, 0.0, 1.0),
    //     vec4(0.0, 0.0, 1.0, 1.0),
    // ];
    
    // Configure WebGL
    // 
    gl.viewport( 0, 0, canvas.width, canvas.height );
    gl.clearColor( 1.0, 1.0, 1.0, 1.0 ); 


    // Load shaders and initialize attribute buffers

    var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program ); 

    var vPosition = gl.getAttribLocation( program, "vPosition" );
    var vColor = gl.getAttribLocation( program, "vColor" );

    // Load the data into the GPU 

    var hexaBufferId = gl.createBuffer();

    gl.bindBuffer( gl.ARRAY_BUFFER, hexaBufferId );
    gl.bufferData(gl.ARRAY_BUFFER, flatten(hexaVertices), gl.STATIC_DRAW);


    // Associate vertex data buffer with shader variables

    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
    gl.enableVertexAttribArray( vPosition ); 

    // gl.clear( gl.COLOR_BUFFER_BIT ); 
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4fv(vColor, [0.0,0.0,0.0,1.0]);
    gl.drawArrays( gl.LINE_STRIP, 0, 7);

    // ============ strip vertex buffer ============
    var stripBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, stripBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(stripVertices), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);
    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor, 1.0,1.0,0.0,1.0);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 11);

    gl.vertexAttrib4f(vColor, 0.0,0.0,0.0,1.0);
    gl.drawArrays(gl.LINE_STRIP, 0, 11);
};

// function render() {
//     gl.clear( gl.COLOR_BUFFER_BIT ); 
//     gl.drawArrays( gl.TRIANGLES, 0, 3);
// }