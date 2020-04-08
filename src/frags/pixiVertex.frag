attribute vec2 aVertexPosition;

uniform mat3 projectionMatrix;
uniform vec4 inputSize;
uniform vec4 outputFrame;

varying vec2 vUv;

vec4 filterVertexPosition () {
  vec2 position = aVertexPosition * max(outputFrame.zw, vec2(0.)) + outputFrame.xy;

  return vec4((projectionMatrix * vec3(position, 1.0)).xy, 0.0, 1.0);
}

vec2 filterTextureCoord () {
  return aVertexPosition * (outputFrame.zw * inputSize.zw);
}

void main () {
  vUv = filterTextureCoord();
  gl_Position = filterVertexPosition();
}