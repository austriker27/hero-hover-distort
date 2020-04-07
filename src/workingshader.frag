
precision highp float;

varying vec2 vTextureCoord;

uniform vec2 mouse;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform float time;
uniform vec4 fit;

uniform sampler2D texture;

void main() {
vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;
if (length(mouse - screenPos) < 25.0) {

vec2 uv = vTextureCoord.xy / outputFrame.xy;

vec2 dir = normalize(uv - mouse);
float d = distance(mouse, uv);
float p = 0.01 * (1.0 / (d * d));
vec4 c = texture2D(texture, mix(uv, mouse, p));
gl_FragColor = c;

} else {
gl_FragColor = texture2D(texture, vTextureCoord);
}
}
