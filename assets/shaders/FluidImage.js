export const vertexShader = `
precision mediump float;
  // default mandatory variables
  attribute vec3 aVertexPosition;
  attribute vec2 aTextureCoord;
  attribute vec3 uv;
  uniform mat4 uMVMatrix;
  uniform mat4 uPMatrix;

  uniform mat4 simplePlaneTextureMatrix;
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  uniform float uRadius;
  uniform float uStrength;
  
  varying vec2 vMouse;
  varying float vStrength;
  varying vec2 vRes;
  varying vec3 vUv;
  varying vec2 vTextureCoord;
  varying float vRadius;
  varying float vTime;
  varying float vWave;
  varying float vFromMouse;
  void main() {
    
    

    vec3 vertexPosition = aVertexPosition;
    float distanceFromMouse = distance(uMouse, vec2(vertexPosition.x, vertexPosition.y));
    // calculate our wave effect
    float waveSinusoid = cos(3. * (distanceFromMouse - (uTime / 100.0)));
    // attenuate the effect based on mouse distance
    float distanceStrength = (0.4 / (distanceFromMouse + 0.9));
    // calculate our distortion effect
    float distortionEffect = distanceStrength * waveSinusoid * uStrength;
    // apply it to our vertex position
    vWave +=  distortionEffect / 60.0;
    gl_Position = uPMatrix * uMVMatrix * vec4(vertexPosition, 1.0);
    
    vTextureCoord = (simplePlaneTextureMatrix * vec4(aTextureCoord, 0.0, 1.0)).xy;
    vMouse = (simplePlaneTextureMatrix * vec4((uMouse + 1.0) * 0.5, 0.0, 1.0)).xy - 0.5;
    vRes = uResolution;
    vUv = uv;
    vStrength = uStrength;
    vTime = uTime;
    vRadius = uRadius;
    vFromMouse = distanceFromMouse;


  }
`;

export const fragmentShader = `
precision mediump float;
varying vec2 vMouse;
varying vec3 vUv;
varying float vTime;
varying float vStrength;
varying float vWave;
varying float vRadius;
varying float fromMouse;
  varying vec2 vRes;
  varying vec2 vTextureCoord;
  uniform sampler2D simplePlaneTexture;
  uniform float uIsHover;



  const float transAmnt = 0.05; 
  const float PI = 3.1415926535;
  const float aspect = 2.33333333; 
  
  void main() {
    vec4 tex = texture2D(simplePlaneTexture, vTextureCoord);

vec4 wavedTex = texture2D(simplePlaneTexture, vTextureCoord + vWave );
float gray = dot(wavedTex.rgb, vec3(0.299, 0.587, 0.114));

  gl_FragColor = vec4(wavedTex.rgb, 1.0);

  }
`;
