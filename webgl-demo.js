var cubeRotation = 0.0;
var angle = 0;
var jump = 0.0;
var dir = 0;
var grayscale = 0;
var level = 1;
Mousetrap.bind('left', function() { angle += 2; });
Mousetrap.bind('right', function() { angle -= 2; });
Mousetrap.bind('space', function() { dir = 1;});
Mousetrap.bind('b', function() { 
  if (grayscale == 1)
    grayscale = 0;
  else
    grayscale = 1;
});
main();

//
// Start here
//
function main() {
  const canvas = document.querySelector('#glcanvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program
const fsSourceGrayscale = `
  #ifdef GL_ES
  precision mediump float;
  #endif
  varying highp vec2 vTextureCoord;
  varying highp vec3 vLighting;
  uniform sampler2D uSampler;
  void main(void) {
    highp vec4 texelColor = texture2D(uSampler, vTextureCoord);
    vec3 color = texelColor.rgb;
    float gray = (color.r + color.g + color.b) / 3.0;
    vec3 gr = vec3(gray);
    gl_FragColor = vec4(gr * vLighting, texelColor.a);
  }
`;

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec3 aVertexNormal;
    attribute vec2 aTextureCoord;

    uniform mat4 uNormalMatrix;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;

    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vTextureCoord = aTextureCoord;

      // Apply lighting effect

      highp vec3 ambientLight = vec3(0.3, 0.3, 0.3);
      highp vec3 directionalLightColor = vec3(1, 1, 1);
      highp vec3 directionalVector = normalize(vec3(0.85, 0.8, 0.75));

      highp vec4 transformedNormal = uNormalMatrix * vec4(aVertexNormal, 1.0);

      highp float directional = max(dot(transformedNormal.xyz, directionalVector), 0.0);
      vLighting = ambientLight + (directionalLightColor * directional);
    }
  `;
  // Fragment shader program

  const fsSource = `
    varying highp vec2 vTextureCoord;
    varying highp vec3 vLighting;

    uniform sampler2D uSampler;

    void main(void) {
      highp vec4 texelColor = texture2D(uSampler, vTextureCoord);

      gl_FragColor = vec4(texelColor.rgb * vLighting, texelColor.a);
    }
  `;
  // Initialize a shader program; this is where all the lighting
  // for the vertices and so forth is established.
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  const shaderProgramGrayscale = initShaderProgram(gl, vsSource, fsSourceGrayscale);


  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgram, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgram, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
    },
  };

  const programInfoGrayscale = {
    program: shaderProgramGrayscale,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgramGrayscale, 'aVertexPosition'),
      vertexNormal: gl.getAttribLocation(shaderProgramGrayscale, 'aVertexNormal'),
      textureCoord: gl.getAttribLocation(shaderProgramGrayscale, 'aTextureCoord'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgramGrayscale, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgramGrayscale, 'uModelViewMatrix'),
      normalMatrix: gl.getUniformLocation(shaderProgramGrayscale, 'uNormalMatrix'),
      uSampler: gl.getUniformLocation(shaderProgramGrayscale, 'uSampler'),
    },
  };

  // Here's where we call the routine that builds all the
  // objects we'll be drawing.
  var buffersObstacle = [];
  const buffersTunnel = initBuffersTunnel(gl);
  for (var i=0; i<5; i++) {
    buffersObstacle.push(initBuffersObstacle(gl, (i+1)*100, 1));
  }
  for (var i=0; i<5; i++) {
    buffersObstacle.push(initBuffersObstacle(gl, (i+6)*100, 2));
  }
  for (var i=0; i<5; i++) {
    buffersObstacle.push(initBuffersObstacle(gl, (i+11)*100, 3));
  }
  for (var i=0; i<5; i++) {
    buffersObstacle.push(initBuffersObstacle(gl, (i+16)*100, 4));
  }
  var then = 0;
  const textureTunnel = loadTexture(gl, 'ok.jpeg');
  const textureObstacle = loadTexture(gl, 'nyc.jpeg');

  // Draw the scene repeatedly
  function render(now) {
    now *= 0.004;  // convert to seconds
    var points = Math.floor(now);
    if(now >= 50)
      level = 2;
    if(now >= 100)
      level = 3;
    if(now >= 150)
      level = 4;
    if (jump >= 0 && dir == 1)
      jump += 0.1;
    if (Math.abs(jump-3.0) <= 0.1 || dir == -1) {
      jump -= 0.1;
      dir = -1;
    }
    if (jump <= 0 && dir == -1) {
      jump = 0;
      dir = 0;
    }
    const deltaTime = now - then;
    then = now;
    if(grayscale)
      drawSceneTunnel(gl, programInfoGrayscale, buffersTunnel, textureTunnel, deltaTime, now, angle, jump, level);
    else
      drawSceneTunnel(gl, programInfo, buffersTunnel, textureTunnel, deltaTime, now, angle, jump, level);
    for(var i=0; i<20; i++) {
      if (grayscale)
        drawSceneObstacle(gl, programInfoGrayscale, buffersObstacle[i], textureObstacle, deltaTime, now, angle, buffersObstacle[i].distance, buffersObstacle[i].type, buffersObstacle[i].offset, jump, level);      
      else
        drawSceneObstacle(gl, programInfo, buffersObstacle[i], textureObstacle, deltaTime, now, angle, buffersObstacle[i].distance, buffersObstacle[i].type, buffersObstacle[i].offset, jump, level);
    }
    requestAnimationFrame(render);
    st = "Points: ";
    st = st + points + "<br/>";
    st = st + "Level: ";
    st = st + level;
    document.getElementById("x").innerHTML = st;
  }
  requestAnimationFrame(render);
}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

