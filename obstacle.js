function initBuffersObstacle(gl, distance, type) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.
  var r = 5;
  var theta = 22.5*Math.PI/180.0;
  var si = Math.sin(theta);
  var co = Math.cos(theta);
  const positions1 = [
    // Front face
    -(r-2)*si, r*co,  0.0,
     (r-2)*si,  r*co,  0.0,
     (r-2)*si,  r*co,  -1.5,
    -(r-2)*si, r*co,  -1.5,

    -(r-2)*si, -r*co,  0.0,
     (r-2)*si,  -r*co,  0.0,
     (r-2)*si,  -r*co,  -1.5,
    -(r-2)*si, -r*co,  -1.5,

    -(r-2)*si, r*co, 0.0,
    (r-2)*si, r*co, 0.0,
    (r-2)*si, -r*co, 0.0,
    -(r-2)*si, -r*co, 0.0,

    -(r-2)*si, r*co, -1.5,
    (r-2)*si, r*co, -1.5,
    (r-2)*si, -r*co, -1.5,
    -(r-2)*si, -r*co, -1.5,

    (r-2)*si, r*co, 0.0,
    (r-2)*si, -r*co, 0.0,
    (r-2)*si, -r*co, -1.5,
    (r-2)*si, r*co, -1.5,

    -(r-2)*si, r*co, 0.0,
    -(r-2)*si, -r*co, 0.0,
    -(r-2)*si, -r*co, -1.5,
    -(r-2)*si, r*co, -1.5,
  ];


  const positions2 = [
    // Front face
    r*co, r*si-2,  0.0,
    r*co, r,  0.0,
    -r*co, r,  0.0,
    -r*co, r*si-2,  0.0,

    r*co, r*si-2,  -1.5,
    r*co, r,  -1.5,
    -r*co, r,  -1.5,
    -r*co, r*si-2,  -1.5,

    -r*co, r*si-2,  0.0,
    r*co, r*si-2,  0.0,
    r*co, r*si-2,  -1.5,
    -r*co, r*si-2,  -1.5,

    -r*co, r,  0.0,
    r*co, r*si-2,  0.0,
    r*co, r*si-2,  -1.5,
    -r*co, r,  -1.5,

    r*co, r*si-2,  0.0,
    r*co, r,  0.0,
    -r*co, r,  0.0,
    -r*co, r*si-2,  0.0,

    r*co, r*si-2,  0.0,
    r*co, r,  0.0,
    -r*co, r,  0.0,
    -r*co, r*si-2,  0.0,
    ];

  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.
  if(type==1 || type==2)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions1), gl.STATIC_DRAW);
  else
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions2), gl.STATIC_DRAW);

  // Now set up the colors for the faces. We'll use solid colors
  // for each face.
  const normalBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);

  const vertexNormals = [
    // Front
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,
     0.0,  0.0,  1.0,

    // Back
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,
     0.0,  0.0, -1.0,

    // Top
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,
     0.0,  1.0,  0.0,

    // Bottom
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,
     0.0, -1.0,  0.0,

    // Right
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,
     1.0,  0.0,  0.0,

    // Left
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0,
    -1.0,  0.0,  0.0
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals),
                gl.STATIC_DRAW);

  const textureCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);

  const textureCoordinates = [
    // Front
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Back
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Top
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Bottom
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Right
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
    // Left
    0.0,  0.0,
    1.0,  0.0,
    1.0,  1.0,
    0.0,  1.0,
  ];

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates),
                gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,
    8,  9,  10,     8,  10, 11,
    12, 13, 14,    12,  14, 15,
    16, 17, 18,    16,  18, 19,
    20, 21, 22,    20,  22, 23,
  ];

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    normal: normalBuffer,
    textureCoord: textureCoordBuffer,
    indices: indexBuffer,
    distance: distance,
    type: type,
    offset: Math.floor(Math.random() * 360),
  };
}

function drawSceneObstacle(gl, programInfo, buffers, texture, deltaTime, now, angle, distance, type, offset, jump) {
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.
  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 500.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.

  // Now move the drawing position a bit to where we want to
  // start drawing the square.
  const modelViewMatrix = mat4.create();
  mat4.translate(modelViewMatrix,     // destination matrix
                 modelViewMatrix,     // matrix to translate
                 [-0.0, 3*Math.cos(22.5*Math.PI/180.0)-jump, -distance+now*10]);  // amount to translatex
  if(type==1 || type==2) {
    var ang = angle + offset;
    if (type == 2)
      ang = ang + now*10;
  if ((-distance+now*10>=0.0 && -distance+now*10<=1.5) && (Math.abs(3.0*Math.cos(22.5*Math.PI/180.0)*Math.sin(Math.PI*ang/180.0))<=(3*Math.sin(22.5*Math.PI/180.0)))) {
    exit(0);
    }
  }
  else if(type==3 || type==4) {
    var ang = angle + offset;
    if (type == 4)
      ang = ang + now*10;
    var tmp = Math.floor(Number(ang/360.0));
    ang = ang-tmp*360;
    if(ang>=90 && ang<=270 && (-distance+now*10>=0.0 && -distance+now*10<=1.5))
      exit(0);
  }
  if(type == 1)
    mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              Math.PI*(angle+offset)/180.0,     // amount to rotate in radians
              [0, 0, 1]);       // axis to rotate around (Z)
  if(type == 2)
    mat4.rotate(modelViewMatrix,  // destination matrix
          modelViewMatrix,  // matrix to rotate
          Math.PI*(angle+now*10+offset)/180.0,     // amount to rotate in radians
          [0, 0, 1]);       // axis to rotate around (Z)
  if(type == 3)
    mat4.rotate(modelViewMatrix,  // destination matrix
          modelViewMatrix,  // matrix to rotate
          Math.PI*(angle+offset)/180.0,     // amount to rotate in radians
          [0, 0, 1]);       // axis to rotate around (Z)
  if(type == 4)
    mat4.rotate(modelViewMatrix,  // destination matrix
          modelViewMatrix,  // matrix to rotate
          Math.PI*(angle+offset+now*10)/180.0,     // amount to rotate in radians
          [0, 0, 1]);       // axis to rotate around (Z)
  mat4.rotate(modelViewMatrix,  // destination matrix
              modelViewMatrix,  // matrix to rotate
              0,// amount to rotate in radians
              [0, 1, 0]);       // axis to rotate around (X)

  const normalMatrix = mat4.create();
  mat4.invert(normalMatrix, modelViewMatrix);
  mat4.transpose(normalMatrix, normalMatrix);
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }
  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const num = 2; // every coordinate composed of 2 values
    const type = gl.FLOAT; // the data in the buffer is 32 bit float
    const normalize = false; // don't normalize
    const stride = 0; // how many bytes to get from one set to the next
    const offset = 0; // how many bytes inside the buffer to start from
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoord);
    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, num, type, normalize, stride, offset);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);
  }
  {
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.normal);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexNormal,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexNormal);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);

  // Tell WebGL to use our program when drawing

  gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      modelViewMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.normalMatrix,
      false,
      normalMatrix);

  gl.activeTexture(gl.TEXTURE0);

  // Bind the texture to texture unit 0
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Tell the shader we bound the texture to texture unit 0
  gl.uniform1i(programInfo.uniformLocations.uSampler, 0);

  {
    const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

  // Update the rotation for the next draw

  // cubeRotation += deltaTime;
}
