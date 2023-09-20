var gl;

window.onload = function init() {
    var canvas = document.getElementById("gl-canvas");
    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) {
        alert("WebGL isn't available");
    }

    // Load shaders and initialize attribute buffers

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    // Create a buffer for the square's positions

    var bufferId = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray (vPosition);

    var uColor = gl.getUniformLocation(program, "uColor");
    gl.clear(gl.COLOR_BUFFER_BIT);

    vResolution = gl.getUniformLocation(program, "uResolution");

    gl.uniform2f(vResolution, gl.canvas.width, gl.canvas.height);

    
    for (var ii = 0; ii < 50; ++ii){
        setRectangle(
            gl, randomInt(300), randomInt(300), randomInt(300), randomInt(300)
        );

        gl.uniform4f(uColor, Math.random(), Math.random(), Math.random(), 1);

        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6;
        gl.drawArrays(primitiveType, offset, count);
    }

    function randomInt(range) {
        return Math.floor(Math.random() * range);
    }

    function setRectangle(gl, x, y, width, height){
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;
    
        gl.bufferData(gl.ARRAY_BUFFER, new
            Float32Array([
                x1, y1,
                x2, y1,
                x1, y2,
                x1, y2,
                x2, y1,
                x2, y2
            ]), gl.STATIC_DRAW);
    }
    

};
