#define GLSLIFY 1

varying vec2 vTextureCoord;

uniform sampler2D texture1;
uniform sampler2D texture2;
uniform vec2 ratio1;
uniform vec2 ratio2;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

uniform float u_speed;
uniform float u_mask;
uniform float u_time;

void main() {
  float zoom1 = (2.5  * u_mask ) + 1.0;
  vec2 uv1 = (vTextureCoord - 0.5) / zoom1 + (0.5 / zoom1);
  float zoom2 = 1.0;
  if (u_mask > 0.) {
      zoom2 = (0.01 / u_mask ) + 1.0;
  }
  vec2 uv2 = (vTextureCoord - 0.5) / zoom2 + (0.5 / zoom2);
  float aspectRatio = u_resolution.x/u_resolution.y;
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
  vec2 uvCircle = vTextureCoord;
  uvCircle.y /= aspectRatio;
  vec2 mouse = u_mouse;
  float dist = distance(vec2(mouse.x, mouse.y / aspectRatio), uvCircle.xy);

  uvVideoDist.y = -uvVideoDist.y;
  
  float holeMove = 0.006 * u_speed;
  if (u_mask > 0.) {
      holeMove = 0.11 * u_mask;
  }

  vec2 warp = normalize(mouse.xy - vTextureCoord.xy) * pow(dist, -1.0) * holeMove;

  warp.y = -warp.y;
  uvVideoDist = uvVideo + warp;
  vec2 uvVortex = uvVideoDist;
  float holeVortex = 0.;

  if (u_mask > 0.) {
    
    float vortexSize = u_mask * 1.4;
    
    vec2 relUV = uvVideo - mouse;
    float maxAngle = radians(520.0 * pow(1.1,u_mask));
    if (dist < vortexSize) {
        float angle = maxAngle * (1.0 - (dist / vortexSize));
      float s = sin(angle);
      float c = cos(angle);
      
      float xnew = relUV.x * c - relUV.y * s;
      float ynew = relUV.x * s + relUV.y * c;
      
      uvVortex = vec2(xnew, ynew);
      uvVortex += mouse;
      float maxRadiusVortex = vortexSize;
      float minRadiusVortex = vortexSize - 0.01;
      // float minRadiusVortex = 0.;
      float rangeVortex = maxRadiusVortex - minRadiusVortex;
      holeVortex = clamp((dist - minRadiusVortex) / rangeVortex, 0., 1.);
    }
  }
  
  // maxRadius la gestico con il cambio slide
  float maxRadius = u_mask;
  float minRadius = u_mask - 0.01;
  float range = maxRadius - minRadius;
  float hole = clamp((dist - minRadius) / range, 0., 1.);

  
  vec4 video1 = texture2D( texture1, uvVideoDist );
  vec4 videoVortex = texture2D( texture1, uvVortex );
  vec4 video2 = texture2D( texture2, uvVideo2 );

  vec4 videoMix = mix( videoVortex, video1, holeVortex);
  
  gl_FragColor = mix(video2, videoMix, hole);
}