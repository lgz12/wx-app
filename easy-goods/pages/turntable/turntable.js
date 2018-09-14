//index.js
//获取应用实例
const app = getApp();
let self;
Page({
  data: {
    times:1,//抽奖次数
    circleList: [],//圆点数组
    awardList: [],//奖品数组
    colorCircleFirst: '#FFDF2F',//圆点颜色1
    colorCircleSecond: '#FE4D32',//圆点颜色2
    colorAwardDefault: '#F5F0FC',//奖品默认颜色
    colorAwardSelect: '#FE4D32',//奖品选中颜色
    indexSelect: 0,//被选中的奖品index
    isRunning: false,//是否正在抽奖
    imageAward: [
      '../../image/box1.png',
      '../../image/box1.png',
      '../../image/box1.png',
      '../../image/box1.png',
      '../../image/box1.png',
      '../../image/box1.png',
      '../../image/box1.png',
      '../../image/box1.png'
    ],//奖品图片数组
  },

  onLoad: function () {
    var _this = this;
    //圆点设置
    var leftCircle = 7.5;
    var topCircle = 7.5;
    var circleList = [];
    for (var i = 0; i < 24; i++) {
      if (i == 0) {
        topCircle = 15;
        leftCircle = 15;
      } else if (i < 6) {
        topCircle = 7.5;
        leftCircle = leftCircle + 102.5;
      } else if (i == 6) {
        topCircle = 15
        leftCircle = 630;
      } else if (i < 12) {
        topCircle = topCircle + 94;
        leftCircle = 620;
      } else if (i == 12) {
        topCircle = 565;
        leftCircle = 620;
      } else if (i < 18) {
        topCircle = 570;
        leftCircle = leftCircle - 102.5;
      } else if (i == 18) {
        topCircle = 565;
        leftCircle = 15;
      } else if (i < 24) {
        topCircle = topCircle - 94;
        leftCircle = 7.5;
      } else {
        return
      }
      circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
    }
    this.setData({
      circleList: circleList
    })
    //圆点闪烁
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#FFDF2F') {
        _this.setData({
          colorCircleFirst: '#FE4D32',
          colorCircleSecond: '#FFDF2F',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#FFDF2F',
          colorCircleSecond: '#FE4D32',
        })
      }
    }, 500)
    //奖品item设置
    var awardList = [];
    //间距,怎么顺眼怎么设置吧.
    var topAward = 25;
    var leftAward = 25;
    for (var j = 0; j < 8; j++) {
      if (j == 0) {
        topAward = 25;
        leftAward = 25;
      } else if (j < 3) {
        topAward = topAward;
        //166.6666是宽.15是间距.下同
        leftAward = leftAward + 166.6666 + 15;
      } else if (j < 5) {
        leftAward = leftAward;
        //150是高,15是间距,下同
        topAward = topAward + 150 + 15;
      } else if (j < 7) {
        leftAward = leftAward - 166.6666 - 15;
        topAward = topAward;
      } else if (j < 8) {
        leftAward = leftAward;
        topAward = topAward - 150 - 15;
      }
      var imageAward = this.data.imageAward[j];
      awardList.push({ topAward: topAward, leftAward: leftAward, imageAward: imageAward });
    }
    this.setData({
      awardList: awardList
    })
  },
  addtime:function(){
    this.setData({
      times: this.data.times+1
    })
  },
  //开始游戏
  startGame: function () {
    // var times=this.data.times
    if (this.data.times != 0 && this.data.times!=null){
    if (this.data.isRunning) return
    // this.data.times--
    // this.setData({
    //   isRunning: true,
    //   })
    if (this.data.times > 0) {
      this.setData({
        isRunning: true,
        times: this.data.times-1
      })
    }
    } else {
      return;
  this.setData({
      isRunning: true,
      })
    }

    var _this = this;
    var indexSelect = 0
    var i = 0;
    var timer = setInterval(function () {
      indexSelect++;
      //这里我只是简单粗暴用y=30*x+200函数做的处理.可根据自己的需求改变转盘速度
      var x=0;
      var a = Math.random();        //生成0——1的随机数  
      a = a * 10;                  //0——10的随机数  
      a = Math.ceil(a);//上取整，完成随机生成1——10的整数
      // var b=5;
      // console.log(a)
      // a=1
      console.log(i)
      i+=a;
      if (i > a*(154+a)) {
      // if (i > a * (32 + a)) {
        //去除循环
        
        clearInterval(timer);
        console.log(i);
        switch (_this.data.indexSelect) {
          case 0:
            x = "It's 8";
            break;
          case 1:
            x = "It's 1";
            break;
          case 2:
            x = "It's 2";
            break;
          case 3:
            x = "It's 3";
            break;
          case 4:
            x = "It's 4";
            break;
          case 5:
            x = "It's 5";
            break;
          case 6:
            x = "It's 6";
            break;
          case 7:
            x = "It's 7";
            break;
         
        }
        //获奖提示

        wx.showModal({
          
          title: '恭喜您',
          // content: '获得了第' + (_this.data.indexSelect + 1) + "个优惠券",
          content: '获得了' + (x),
          showCancel: false,//去掉取消按钮
          success: function (res) {
            console.log(res)
            if (res.confirm) {
              wx.redirectTo({
                url: '../index/index',
              })
              _this.setData({
                isRunning: false
              })
            }
          }
        })
      }
      indexSelect = indexSelect % 8;
      _this.setData({
        indexSelect: indexSelect
      })
    }, (200 + i))
  }
})
