<template>
  <div>
    <h1 class="title">Radial Graph</h1>
    <div class="container">
      <ff-canvas
        id="multi-radial-dom"
        canvasId="multi-radial"
        :opts='radial'
      />
    </div>

    <h1 class="title">Bar Graph</h1>
    <div class="container">
      <ff-canvas
        id="multi-bar-dom"
        canvasId="multi-bar"
        :opts='bar'
      />
    </div>

    <h1 class="title">Scatter Graph</h1>
    <div class="container">
      <ff-canvas
        id="multi-scatter-dom"
        canvasId="multi-scatter"
        :opts='scatter'
      />
    </div>
  </div>
</template>

<script>
import F2Canvas from "@/components/ff-canvas/index.vue";
import { drawBar, drawScatter, drawRadial } from "./chart";
export default {
  mpType: "page",
  components: {
    "ff-canvas": F2Canvas
  },
  data() {
    return {
      bar: {
        onInit: drawBar
      },
      scatter: {
        onInit: drawScatter
      },
      radial: {
        onInit: drawRadial
      }
    };
  },

  onLoad() {
    Megalo.showToast({
      title: "正在加载中...",
      icon: "loading",
      mask: true
    });
  },

  onReady() {
    Megalo.hideToast();
  }
};
</script>

<style lang="less" scoped>
#multi-bar-dom {
  width: 100%;
  height: 33%;
}
#multi-scatter-dom {
  width: 100%;
  height: 33%;
}
#multi-radial-dom {
  width: 100%;
  height: 33%;
}
#multi-radar-dom {
  width: 100%;
  height: 33%;
}
</style>
