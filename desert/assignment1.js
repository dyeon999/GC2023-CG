var gl;
var points;
var useUniform = 0; // 1->uniform 0->varying

window.onload = function init(){
    var canvas=document.getElementById("gl-canvas");  
    gl=WebGLUtils.setupWebGL(canvas);  
    if(!gl){alert("WebGL isn't available");}  


// ground vertices
var groundVertices = [
    vec2 (-1.0, 0),
    vec2 (1.0, 0),
    vec2 (-1.0, -1.0),
    vec2 (1.0, -1.0)
]


// pyramid vertices
var pyramidVertices = [
    vec2(-0.5,0),
    vec2(0.5,0),
    vec2(0, 0.5)
]

var pyramidColors = [
    vec4 (0.5, 0.392, 0.07),
    vec4 (0.5, 0.392, 0.07),
    vec4 (0.956,0.901,0.592,1.0)
]


// star vertices
var starVertices = [
    vec2(0,0.6),
    vec2(-0.6,-0.4),
    vec2(0.6,-0.4), //up
    vec2(-0.6,0.3), 
    vec2(0, -0.6), 
    vec2(0.6,0.3) //down
    ];

var starColors = [
    vec4 (1.0, 1.0, 0.0, 1.0), //v0 
    vec4 (1.0, 1.0, 1.0, 1.0), //v1
    vec4 (1.0, 1.0, 1.0, 1.0), //v2
    vec4 (1.0, 1.0, 0.0, 1.0), //v3
    vec4 (1.0, 1.0, 1.0, 1.0), //v4
    vec4 (1.0, 1.0, 0.0, 1.0) //v5
    ];


var cactusVertices = [
    vec2(0,0.1),
    vec2(-0.12,0.1),
    vec2(-0.12,-0.5),
    vec2(0,0.1),
    vec2(-0.12,-0.5),
    vec2(0,-0.5),

    vec2(-0.1,-0.1),
    vec2(-0.3,-0.18),
    vec2(-0.1,-0.18),
    vec2(-0.1,-0.1),
    vec2(-0.3,-0.1),
    vec2(-0.3,-0.18),

    vec2(-0.2,0),
    vec2(-0.3,0),
    vec2(-0.3,-0.1),
    vec2(-0.2,0),
    vec2(-0.3,-0.1),
    vec2(-0.2,-0.1)
];

var grassVertices = [
    vec2(0.2,0),
    vec2(-0.2,0),
    vec2(0,0.8), //center
    vec2(0,0),
    vec2(-0.4,0),
    vec2(-0.6,0.6), //left
    vec2(0,0),
    vec2(0.4,0),
    vec2(0.6,0.6), //right
];

    //ConfigureWebGL
    gl.viewport(0,0,canvas.width,canvas.height);  
    gl.clearColor(0.1,0.1,0.22,1.0);  
    gl.clear(gl.COLOR_BUFFER_BIT);


    //Load shaders and initialize attribute buffers  
    var program = initShaders(gl,"vertex-shader","fragment-shader");  
    gl.useProgram(program);  

    var vPosition=gl.getAttribLocation(program,"vPosition");  
    var vColor = gl.getAttribLocation(program,"vColor");
    var uColor = gl.getUniformLocation(program,"uColor");
    var uScale = gl.getUniformLocation(program, "uScale");
    var uTranslation = gl.getUniformLocation(program, "uTranslation");
    var uUseUniform = gl.getUniformLocation(program, "uUseUniform");


    //=======ground=========
    var groundBufferId=gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,groundBufferId);  
    gl.bufferData(gl.ARRAY_BUFFER,flatten(groundVertices),gl.STATIC_DRAW);

    //Associate vertex data buffer with shader variables  
    gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);  
    gl.enableVertexAttribArray(vPosition);

    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor,0.956,0.901,0.592,1.0);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 1);
    gl.uniform2fv(uTranslation, [0,-0.4]);
    gl.drawArrays(gl.TRIANGLE_STRIP,0,4);



    //=======pyramid=======
    
    var pyramidBufferId=gl.createBuffer();  
    gl.bindBuffer(gl.ARRAY_BUFFER,pyramidBufferId);  
    gl.bufferData(gl.ARRAY_BUFFER,flatten(pyramidVertices),gl.STATIC_DRAW);

    //Associate vertex data buffer with shader variables  
    gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);  
    gl.enableVertexAttribArray(vPosition);  

    // Load the triangle colors data into the GPU
    var pyramidColorId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, pyramidColorId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(pyramidColors), gl.STATIC_DRAW);

    gl.vertexAttribPointer(vColor, 4, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vColor);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 1.5);
    gl.uniform2fv(uTranslation, [0,-0.4]);
    gl.drawArrays(gl.TRIANGLES,0,3);  

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 1);
    gl.uniform2fv(uTranslation, [0.3,-0.6]);
    gl.drawArrays(gl.TRIANGLES,0,3);  



    //=======stars========
    //Load the data into the GPU  
    var starBufferId=gl.createBuffer();  
    gl.bindBuffer(gl.ARRAY_BUFFER,starBufferId);  
    gl.bufferData(gl.ARRAY_BUFFER,flatten(starVertices),gl.STATIC_DRAW);

    //Associate vertex data buffer with shader variables  
    gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);  
    gl.enableVertexAttribArray(vPosition);  

    // Load the triangle colors data into the GPU
    var starColorBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, starColorBufferId);
    gl.bufferData(gl.ARRAY_BUFFER, flatten(starColors), gl.STATIC_DRAW);

    gl.disableVertexAttribArray(vColor);
    gl.vertexAttrib4f(vColor,1.0,1.0,0.0,1.0);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.06);
    gl.uniform2fv(uTranslation, [-0.7, 0.6]);
    gl.drawArrays(gl.TRIANGLES,0,6);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.06);
    gl.uniform2fv(uTranslation, [-0.6, 0.8]);
    gl.drawArrays(gl.TRIANGLES,0,6);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.04);
    gl.uniform2fv(uTranslation, [-0.8, -0.1]);
    gl.drawArrays(gl.TRIANGLES,0,6);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.08);
    gl.uniform2fv(uTranslation, [-0.1, 0.85]);
    gl.drawArrays(gl.TRIANGLES,0,6);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.08);
    gl.uniform2fv(uTranslation, [0.7, 0.6]);
    gl.drawArrays(gl.TRIANGLES,0,6);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.1);
    gl.uniform2fv(uTranslation, [-0.35, 0.4]);
    gl.drawArrays(gl.TRIANGLES,0,6);  

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.07);
    gl.uniform2fv(uTranslation, [0.4, 0.35]);
    gl.drawArrays(gl.TRIANGLES,0,6);  

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.05);
    gl.uniform2fv(uTranslation, [0.3, 0.75]);
    gl.drawArrays(gl.TRIANGLES,0,6);  

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform1f(uScale, 0.06);
    gl.uniform2fv(uTranslation, [0.85, 0.1]);
    gl.drawArrays(gl.TRIANGLES,0,6);  



    //=======grass=======
    useUniform = 1;

    var grassBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,grassBufferId);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(grassVertices),gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vPosition);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform4fv(uColor,[0.25,0.3,0.1,1]);
    gl.uniform1f(uScale, 0.1);
    gl.uniform2fv(uTranslation, [-0.73,-0.73]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform4fv(uColor,[0.25,0.3,0.1,1]);
    gl.uniform1f(uScale, 0.1);
    gl.uniform2fv(uTranslation, [0.2,-0.95]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform4fv(uColor,[0.25,0.3,0.1,1]);
    gl.uniform1f(uScale, 0.1);
    gl.uniform2fv(uTranslation, [-0.1,-0.61]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);
    
    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform4fv(uColor,[0.25,0.3,0.1,1]);
    gl.uniform1f(uScale, 0.1);
    gl.uniform2fv(uTranslation, [0.95,-0.45]);
    gl.drawArrays(gl.TRIANGLES, 0, 9);



    //=======cactus=======
    var cactusBufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER,cactusBufferId);
    gl.bufferData(gl.ARRAY_BUFFER,flatten(cactusVertices),gl.STATIC_DRAW);

    gl.vertexAttribPointer(vPosition,2,gl.FLOAT,false,0,0);
    gl.enableVertexAttribArray(vPosition);

    gl.uniform1i(uUseUniform, useUniform);
    gl.uniform4fv(uColor,[0,0.4,0.1,1]);
    gl.uniform1f(uScale, 1);
    gl.uniform2fv(uTranslation, [-0.5,-0.25]);
    gl.drawArrays(gl.TRIANGLES, 0, 18);


};  

