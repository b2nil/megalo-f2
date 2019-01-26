<template>
  <div></div>
</template>

<config>
{
  pages: [
    'pages/multicharts/multicharts',
    'pages/radar/radar'
  ],
  tabBar: {
    color: '#333',
    selectedColor: '#007d37',
    list: [
      {
      pagePath: 'pages/multicharts/multicharts',
      text: 'home',
      iconPath: 'static/imgs/home.png',
      selectedIconPath: 'static/imgs/home_on.png',
      },
      {
      pagePath: 'pages/radar/radar',
      text: 'my',
      iconPath: 'static/imgs/mine.png',
      selectedIconPath: 'static/imgs/mine_on.png',
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'charto',
    navigationBarTextStyle: 'black'
  }
}
</config>

<script>
export default {
  mpType: "app",
  onLaunch: function(options) {
    // Do something initial when launch.
    console.log("App onLaunch");
  },
  onShow: function(options) {
    // Do something when show.
    console.log("App onShow");
  },
  onHide: function() {
    // Do something when hide.
    console.log("App onHide");
  },
  onError: function(msg) {
    console.log("App onError");
    console.log(msg);
  },
  globalData() {
    return {
      a: "I am global data"
    };
  }
};
</script>

<style lang="less">
page {
  background-color: #1e1e1e;
  color: whitesmoke;
}

.container {
  // 必须设置父一级 view 的样式
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
.title {
  text-align: center;
  font-family: "ubuntu";
  font-size: 12px;
  margin-top: 20px;
}
</style>
