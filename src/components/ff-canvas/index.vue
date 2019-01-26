<template>
  <canvas
    v-if="canvasId"
    class="f2-canvas"
    :id="canvasId"
    :canvas-id="canvasId"
    @init="init"
    @touchstart="touchStart"
    @touchmove="touchMove"
    @touchend="touchEnd"
    @touchcancel="touchCancel"
    @longtap="press"
    @error="error"
  >
  </canvas>
</template>

<script>
export default {
  props: {
    canvasId: {
      type: String,
      value: "f2-canvas"
    },
    opts: {
      type: Object
    },
    F2: {
      type: Object,
      default: require("my-f2/dist/my-f2.min.js")
    }
  },

  methods: {
    init(callback) {
      var _this = this;
      let ctx;
      if (Megalo.getEnv() !== "alipay") {
        ctx = Megalo.createCanvasContext(_this.canvasId);
      } else {
        ctx = Megalo.createCanvasContext(_this.canvasId, {
          enableNative: true
        });
      }
      const canvas = new _this.F2.Renderer(ctx);
      _this.canvas = canvas;

      Megalo.createSelectorQuery()
        .select(`.f2-canvas`)
        .boundingClientRect()
        .exec(rect => {
          if (typeof callback === "function") {
            _this.chart = callback(
              canvas,
              rect[0].width,
              rect[0].height,
              _this.F2
            );
          } else if (_this.opts && typeof _this.opts.onInit === "function") {
            _this.chart = this.opts.onInit(
              canvas,
              rect[0].width,
              rect[0].height,
              _this.F2
            );
          }
        });
    },

    canvasToTempFilePath(options) {
      const { canvasId } = this;
      this.canvas.ctx.draw(true, () => {
        Megalo.canvasToTempFilePath({
          canvasId,
          ...options
        });
      });
    },

    emitNormalizedEvent(type, e) {
      const EVENTS_MAP = {
        touchstart: "touchStart",
        touchmove: "touchMove",
        touchend: "touchEnd",
        touchcancel: "touchCancel",
        longtap: "longTap"
      };
      switch (Megalo.getEnv()) {
        case "wechat":
          this.canvas.emitEvent(type, [e]);
          break;
        case "alipay":
          if (EVENTS_MAP[type]) {
            this.canvas.ctx.emitter.emit(EVENTS_MAP[type], e);
          } else {
            this.canvas.ctx.emitter.emit(type, e);
          }
          break;
      }
    },

    touchStart(e) {
      if (this.canvas) {
        this.emitNormalizedEvent("touchstart", e);
      }
    },
    touchMove(e) {
      if (this.canvas) {
        this.emitNormalizedEvent("touchmove", e);
      }
    },
    touchEnd(e) {
      if (this.canvas) {
        this.emitNormalizedEvent("touchend", e);
      }
    },

    touchCancel(e) {
      if (this.canvas) {
        this.emitNormalizedEvent("touchcancel", e);
      }
    },

    press(e) {
      if (this.canvas) {
        this.emitNormalizedEvent("longtap", e);
      }
    }
  },

  onReady() {
    setTimeout(() => {
      if (!this.opts) {
        console.warn(
          '组件需绑定 opts 变量，例：<ff-canvas   id="mychart-dom-bar" canvas-id="mychart-bar"  :opts="opts"></ff-canvas>'
        );
        return;
      }
      if (!this.opts.lazyLoad) {
        this.init();
      }
    }, 50);
  }
};
</script>

<style scoped>
.f2-canvas {
  width: 100%;
  height: 100%;
}
</style>


