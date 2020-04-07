<template>
  <div class="wrapper">
    <div class="pixiContainer" ref="pixiCont"></div>
  </div>
</template>
<script>
import * as PIXI from "pixi.js";
import vec4 from "./../vec4.js";

import newShader from "raw-loader!../new-shader.frag";

export default {
  name: "PixiContainer",
  mounted() {
    this.init();
    this.resize();
    window.addEventListener("resize", this.resize);
  },
  data() {
    return {
      background: null,
      filter: null,
      uniforms: {}
    };
  },
  methods: {
    init() {
      this.pixi = new PIXI.Application({
        // transparent: false,
        // width: 256,
        // height: 256
        // transparent: true,
        width: this.$refs.pixiCont.clientWidth,
        height: this.$refs.pixiCont.clientHeight
      });
      this.$refs.pixiCont.appendChild(this.pixi.view);

      const container = new PIXI.Container({
        width: this.pixi.screen.clientWidth,
        height: this.pixi.screen.clientHeight
      });

      // set a background image
      //   const background = PIXI.Sprite.from(
      //     "../assets/patrick-tomasso-YKnPN4j8SE8-unsplash_compressed.jpg"
      //   );

      this.load();

      this.background = PIXI.Sprite.from(
        "https://images.unsplash.com/photo-1584988291561-39380c93c5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
      );

      this.texture = this.background.texture;
      this.uniforms = {
        ...this.uniforms,
        texture: this.texture
      };
      /* this.background.width = this.pixi.screen.width;
      this.background.height = this.pixi.screen.height;
      this.pixi.stage.addChild(this.background); */

      const shaderFrag = `
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
        `;
      // const container = new PIXI.Container();
      container.filterArea = new PIXI.Rectangle(
        0,
        0,
        this.pixi.screen.width,
        this.pixi.screen.height
      );
      // add container to screen
      this.pixi.stage.addChild(container);
      this.uniforms = {
        ...this.uniforms,
        mouse: new PIXI.Point()
      };
      this.filter = new PIXI.Filter(null, newShader, this.uniforms);
      container.filters = [this.filter];
      var texture =
        // Animate the filter
        this.pixi.ticker.add(delta => {
          this.filter.uniforms.mouse.copyFrom(
            this.pixi.renderer.plugins.interaction.mouse.global
          );
        });
    },
    resize() {
      this.uniforms.fit = new vec4(
        this.$refs.pixiCont.clientWidth,
        this.$refs.pixiCont.clientWidth,
        1,
        1
      );
    },
    // load assets into pixi adn run setup once done
    load() {
      this.loader = new PIXI.Loader();
      this.loader.add([
        "https://images.unsplash.com/photo-1584988291561-39380c93c5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
      ]);
      this.loader.load(this.setup);
    },
    //setup function that is called at the end of load
    setup() {
      //Create the image sprite
      /* let image = new PIXI.Sprite(
        PIXI.loader.resources[
          "https://images.unsplash.com/photo-1584988291561-39380c93c5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
        ].texture
      );

      //Add the image to the stage
      this.pixi.stage.addChild(image); */
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
.pixiContainer {
  border: 3px solid red;
  height: 100%;
  width: 100%;
  /* background-image: url('../assets/patrick-tomasso-YKnPN4j8SE8-unsplash_compressed.jpg');
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover; */
}
</style>
