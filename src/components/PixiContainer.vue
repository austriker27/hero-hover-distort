<template>
  <div class="wrapper">
    <div class="pixiContainer" ref="pixiCont">
      <h1>Enter pixi</h1>
    </div>
  </div>
</template>
<script>
import * as PIXI from "pixi.js";

export default {
  name: "PixiContainer",
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.pixi = new PIXI.Application({
        // transparent: false,
        // width: 256,
        // height: 256
        // transparent: true,
        // width: this.$refs.pixiCont.clientWidth,
        // height: this.$refs.pixiCont.clientHeight
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

      const background = PIXI.Sprite.from(
        "https://images.unsplash.com/photo-1584988291561-39380c93c5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
      );
      background.width = this.pixi.screen.width;
      background.height = this.pixi.screen.height;
      this.pixi.stage.addChild(background);

      const shaderFrag = `
        precision highp float;

        varying vec2 vTextureCoord;

        uniform vec2 mouse;
        uniform vec4 inputSize;
        uniform vec4 outputFrame;
        uniform float time;

        void main() {
        vec2 screenPos = vTextureCoord * inputSize.xy + outputFrame.xy;
        if (length(mouse - screenPos) < 25.0) {
            gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0) * 0.7; //yellow circle, alpha=0.7
        } else {
            gl_FragColor = vec4( sin(time), (mouse.xy - outputFrame.xy) / outputFrame.zw, 1.0) * 0.5; // blend with underlying image, alpha=0.5
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
      this.pixi.stage.addChild(container);
      const filter = new PIXI.Filter(null, shaderFrag, {
        mouse: new PIXI.Point()
      });
      container.filters = [filter];

      // Animate the filter
      this.pixi.ticker.add(delta => {
        filter.uniforms.mouse.copyFrom(
          this.pixi.renderer.plugins.interaction.mouse.global
        );
      });
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
      let image = new PIXI.Sprite(
        PIXI.loader.resources[
          "https://images.unsplash.com/photo-1584988291561-39380c93c5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
        ].texture
      );

      //Add the image to the stage
      this.pixi.stage.addChild(image);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
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
