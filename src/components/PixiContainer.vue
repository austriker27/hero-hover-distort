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
    name: 'PixiContainer',
    mounted() {
        // this.init();
    },
    methods: {
        init() {
            this.pixi = new PIXI.Application({
                transparent: false,
                width: 256,
                height: 256,
                // transparent: true,
                // width: this.$refs.pixiCont.clientWidth,
                // height: this.$refs.pixiCont.clientHeight
            });
            this.$refs.pixiCont.appendChild(this.pixi.view);

            this.container = new PIXI.Container({
                width: this.pixi.screen.clientWidth,
                height: this.pixi.screen.clientHeight
            });
            // this.load();
        }
    }
}
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
