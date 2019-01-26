# megalo-f2

## 描述

A f2 component for megalo

## 示例

```html
<template>
  <div class="container">
    <ff-canvas id="multi-radial-dom" canvasId="multi-radial" :opts="radial" />
  </div>
</template>

<script>
  import ffCanvas from "@b2nil/megalo-f2"
  export default {
    components: {
      "ff-canvas": ffCanvas
    },
    data() {
      return {
        radial: {
          onInit: drawRadial
        }
      }
    }
  }
</script>

<style>
  #multi-radial-dom {
    width: 100%;
    height: 33%;
  }
  .container {
    // 必须设置 canvas 父一级 view 的样式
    position: relative;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 300px; // required
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    box-sizing: border-box;
  }
</style>
```
