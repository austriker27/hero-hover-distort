<template>
  <div class="wrapper">
    <div class="pixiContainer" ref="pixiCont"></div>
  </div>
</template>
<script>
import * as PIXI from "pixi.js";
import { Vector4 } from "./../vec4.js";

import circleshader from "raw-loader!../frags/circleshader.frag";
import pixiVertex from "raw-loader!../frags/pixiVertex.frag";
import workingFrag from "raw-loader!../frags/workingFrag.frag";

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
      container: null,
      pixi: null,
      uniforms: {
        u_resolution: new Vector4(500, 500, 1, 1),
        ratio1: new PIXI.Point(1, 1),
        ratio2: new PIXI.Point(1, 1),
        u_speed: 0.2,
        u_mask: 0,
        u_time: 0.5,
        u_mouse: new PIXI.Point(0.5, 0.5)
      },
      resizeTick: false
    };
  },
  methods: {
    init() {
      this.pixi = new PIXI.Application({
        transparent: true,
        // width: 256,
        // height: 256
        // transparent: true,
        width: this.$refs.pixiCont.clientWidth,
        height: this.$refs.pixiCont.clientHeight
      });
      this.$refs.pixiCont.appendChild(this.pixi.view);

      this.container = new PIXI.Container({
        width: this.pixi.screen.clientWidth,
        height: this.pixi.screen.clientHeight
      });

      // set a background image
      //   const background = PIXI.Sprite.from(
      //     "../assets/patrick-tomasso-YKnPN4j8SE8-unsplash_compressed.jpg"
      //   );

      this.load();

      this.background1 = PIXI.Sprite.from(
        "https://images.unsplash.com/photo-1584988291561-39380c93c5b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1267&q=80"
      );

      this.background2 = PIXI.Sprite.from(
        "https://images.unsplash.com/photo-1586281407543-001b6585b047?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1313&q=80"
      );

      this.texture1 = this.background2.texture;
      this.texture2 = this.background1.texture;
      this.uniforms = {
        ...this.uniforms,
        texture1: this.texture1,
        texture2: this.texture2
      };
      /* this.background.width = this.pixi.screen.width;
      this.background.height = this.pixi.screen.height;
      this.pixi.stage.addChild(this.background); */
      // const container = new PIXI.Container();
      this.container.filterArea = this.pixi.screen;
      // add container to screen
      this.pixi.stage.addChild(this.container);
      this.filter = new PIXI.Filter(null, circleshader, this.uniforms);
      this.container.filters = [this.filter];
      var texture =
        // Animate the filter
        this.pixi.ticker.add(delta => {
          this.filter.uniformGroup.uniforms = this.uniforms;
          /* this.filter.uniforms.u_mouse.copyFrom(
          this.pixi.renderer.plugins.interaction.mouse.global
        ); */
        });
      this.render();
    },
    resize() {
      if (!this.resizeTick) {
        this.resizeTick = true;
        requestAnimationFrame(() => {
          this.pixi.renderer.resize(
            this.$refs.pixiCont.clientWidth,
            this.$refs.pixiCont.clientHeight
          );

          this.uniforms.u_resolution = new Vector4(
            this.$refs.pixiCont.clientWidth,
            this.$refs.pixiCont.clientHeight,
            1,
            1
          );
          this.resizeTick = false;
          this.render();
        });
      }
    },
    render() {
      requestAnimationFrame(() => {
        this.pixi.render();
        this.render();
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
