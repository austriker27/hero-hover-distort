uniform float progress;
uniform sampler2D texture;
uniform vec4 fit;
varying vec2 vUv;

void main()	{
  vec2 newUV = (vUv - vec2(0.5)) * fit.zw + vec2(0.5);
  vec2 p = newUV;
  float x = progress;
  x = smoothstep(.0,1.0,(x*2.0+p.y-1.0));
  vec4 f = mix(
    texture2D(texture, (p-.5)*(1.-x)+.5), 
    texture2D(texture, (p-.5)*x+.5), 
    x);
  gl_FragColor = f;
}  