
precision highp float;

varying vec2 vTextureCoord;

uniform vec2 mouse;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform float time;
uniform vec4 fit;

uniform float u_speed;
uniform float u_mask;
uniform float u_time;

uniform sampler2D texture;

void main() {
    vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;
    if (length(mouse - screenPos) < 25.0) {
        
        float zoom1 = (2.5  * u_mask ) + 1.0;
        vec2 uv1 = (vTextureCoord - 0.5) / zoom1 + (0.5 / zoom1);
        float zoom2 = 1.0;
        if (u_mask > 0.) {
            zoom2 = (0.01 / u_mask ) + 1.0;
        }
        vec2 uv2 = (vTextureCoord - 0.5) / zoom2 + (0.5 / zoom2);

        float aspectRatio = outputFrame.x/outputFrame.y;
        vec2 uvVideo = uv1 * ratio1;
        vec2 uvVideoDist = uv1 * ratio1;
        vec2 uvVideo2 = uv2 * ratio2;
        if (ratio1.x < 1.) {
            uvVideo.x += ((1. - ratio1.x) / 2.);
        }
        if (ratio1.y < 1.) {
            uvVideo.y += ((1. - ratio1.y) / 2.);
        }
        if (ratio2.x < 1.) {
            uvVideo2.x += ((1. - ratio2.x) / 2.);
        }
        if (ratio2.y < 1.) {
            uvVideo2.y += ((1. - ratio2.y) / 2.);
        }
        
        
    } else {
        gl_FragColor = texture2D(texture, vTextureCoord);
    }
}