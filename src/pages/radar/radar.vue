<template>
  <div>
    <h1 class="title">Radar Graph</h1>
    <div class="container">
      <ff-canvas
        id="radar-dom"
        canvas-id="radar"
        :opts='radar'
      />
    </div>
  </div>
</template>

<script>
import F2Canvas from '@/components/ff-canvas/index.vue';
import { drawChart } from './chart';
export default {
  components: {
    'ff-canvas': F2Canvas,
  },
  data(){
    return {
      radar: { onInit: drawChart }
    }
  },
  onLoad() {
    Megalo.showToast({
      title: '正在加载中...',
      icon: 'loading',
      mask: true,
    });
  },

  onReady() {
    Megalo.hideToast();
  },
}
</script>

<style lang="less" scoped>
#radar-dom {
    width: 100%;
    height: 100%;
}
</style>

