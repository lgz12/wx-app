//index.js  
//获取应用实例  
let app = getApp()
let self ;
Page({
  data: {
    /** 
        * 页面配置 
        */
        local:'../../image/',
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
    firstPageData: [{ "playMethodText": "直接送礼", "orderNum": "2018090601", "statusText": "已送出", "data": [{ "goodsName": "面膜2", "specification": "超薄", "goodsId": 2, "price": 0.05, "goodsNum": 5, "goodsPicUrl": "box1.png" }] }, { "playMethodText": "满人开奖", "orderNum": "2018090602", "statusText": "已送出", "data": [{ "goodsName": "面膜2 面包", "specification": "超薄", "goodsId": 2, "price": 0.5, "goodsNum": 15, "goodsPicUrl": "box1.png" }] }],
    secodePageData: [{ "playMethodText": "直接送礼", "orderNum": "2018090606", "statusText": "已送出", "data": [{ "goodsName": "面膜2", "specification": "超薄", "goodsId": 2, "price": 0.05, "goodsNum": 5, "goodsPicUrl": "box1.png" }] }],
    thirdPageData: [{ "openNum": "5", "orderNum": "2018090606", "nickName": "面膜2", "orderTime":"2018/9/6", "goodsNum": 5, "avatarUrl": "box1.png" }],
    host:app.globalData.host
  },
  onLoad: function () {
    var that = this;
    self = this;
    this.firstPage();
    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        console.log(res)
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    switch (e.detail.current){
      case 0:
        that.firstPage();
        break;
      case 1:
        that.secondPage();
        break;
      case 2:
        that.thirdPage();
        break;
    }
   
    that.setData({ currentTab: e.detail.current });

  },
  firstPage() {
    console.log(self.data.firstPageData)
    if (!self.data.firstPageData){
      wx.request({
        url: app.globalData.host + '/gift?method=getMySend',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data:{
          openId:app.globalData.openId
        },
        success:res=>{
          console.log(res)
          if(res.data.status == 1)
          {
            self.setData({
              firstPageData: res.data.content
            })
          }
        }
      })
    }
  },
  /**
   * 第二页面加载数据
   * 不重复加载
   */
  secondPage(){
    if (!self.data.secodePageData) {
        wx.request({
          url: app.globalData.host + '/gift?method=giftIGet',
          header: {
            'content-type': 'application/json' // 默认值
          },
          method: 'POST',
          data: {
            openId: app.globalData.openId
          },
          success:res=>{
            if (res.data.status == 1)
            {
              self.setData({
                secodePageData:res.data.content
              });
            }
          }
        })
    }
  },
  thirdPage(){
    if (!self.data.secodePageData) {
      wx.request({
        url: app.globalData.host + '/gift?method=getIPlay',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        data: {
          openId: app.globalData.openId
        },
        success: res => {
          let data = res.data.content;
          if (res.data.status == 1) {
            console.log(res);
            for (let i in data) {
              data[i].orderTime = self.formatDateTime(data[i].orderTime)
            }
            self.setData({
              thirdPageData: res.data.content
            })
          }
        }
      })
    }
   
  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
    
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  },
  /**
   * 时间戳转日期
   */
   formatDateTime(inputTime) {    
    var date = new Date(inputTime * 1000);  
    var y = date.getFullYear();    
    var m = date.getMonth() + 1;    
    m = m < 10 ? ('0' + m) : m;    
    var d = date.getDate();    
    d = d < 10 ? ('0' + d) : d;    
    var h = date.getHours();  
    h = h < 10 ? ('0' + h) : h;  
    var minute = date.getMinutes();  
    var second = date.getSeconds();  
    minute = minute < 10 ? ('0' + minute) : minute;    
    second = second < 10 ? ('0' + second) : second;   
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;    
  }
})  