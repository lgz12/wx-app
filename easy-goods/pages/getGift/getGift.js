const app = getApp();
let self;
//util 主要是用来加减乘除
let util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // headerbg1: app.globalData.picUrl +'/headerbg1.png',
    logo: app.globalData.picUrl + '/logo.png',
    giftNumSend:0,
    totalAmount:0,
    isWriteAdress:false,
    address:null,
    goodsList:[],
    totalAmountText:'',
    wish:'',
    isPleasePlay:false,
    submitText:'求礼'
  },
  /**
   * 礼物记录点击
   */
  giftRecode() {
    wx.navigateTo({
      url: '../giftRecord/giftRecord',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    let orderArrSend = app.globalData.orderArrSend;
    console.log(orderArrSend)

    //礼物的件数
    let giftNumSend = 0;
    

    //礼物总价
    let totalAmount = 0;
    for (let i in orderArrSend) {
      giftNumSend = orderArrSend[i].goodsNum + giftNumSend;
      totalAmount = util.accAdd(totalAmount, orderArrSend[i].price);
    }
    console.log(orderArrSend);
    //重新规定人数范围
    // let openNum = [];
    // let openNumTop = giftNumSend + 10;
    // for (let i = giftNumSend; i <= openNumTop; i++) {
    //   openNum.push(i);
    // }



    self.setData({
      host: app.globalData.host,
      giftNumSend: giftNumSend,
      goodsList: orderArrSend,
      totalAmount: totalAmount,
      totalAmountText:totalAmount.toFixed(2)
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

    return {
      title: '我好喜欢这份礼物，求支付',
      path: '/pages/envelope/envelope?orderNum=' + self.orderNum + '&userSendPic=' + app.globalData.userInfo.avatarUrl + '&playMethod=' + self.playMethod + '&openNum=' + self.openNum + '&goodsNum=' + self.data.goodsNum,
      success: function (res) {
        // 转发成功
        console.log(res)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
   /**
    * 
    */
  /**
* 对应商品减少
*/
  numReduce: (e) => {
    let index = e.target.dataset.index;
    let order = app.globalData.orderArrSend[index];
    //数量不能小于等于0
    // if (order.goodsNum <= 0) {
    //   return;
    // }
    order.goodsNum--;
    //礼物总数量
    let giftNumSend = self.data.giftNumSend;
    giftNumSend--;


    let totalAmount = util.accSub(self.data.totalAmount, order.money);

    //商品减到为0时，需要在购物车去掉
    if (order.goodsNum == 0) {
      app.globalData.orderArrSend.splice(index,1);
    }

    self.setData({
      goodsList: app.globalData.orderArrSend,
      totalAmount: totalAmount,
      giftNumSend: giftNumSend,
      totalAmountText: parseFloat(totalAmount).toFixed(2)
    })
  },
  /**
  * 对应商品添加
  */
  increase: (e) => {
    let index = e.target.dataset.index;
    let order = app.globalData.orderArrSend[index];
    order.goodsNum++;
    let totalAmount = util.accAdd(self.data.totalAmount, order.money);
    let giftNumSend = self.data.giftNumSend;
    giftNumSend++;


    self.setData({
      goodsList: app.globalData.orderArrSend,
      totalAmount: totalAmount,
      giftNumSend: giftNumSend,
      totalAmountText: totalAmount.toFixed(2)
    })
  },
  /**
   * 送礼点击
   */
  sendGiftClick:()=>{
    //跳到送礼，就会清空购物车
    app.globalData.orderArrSend = [];
    wx.navigateTo({
      url: '../index/index'
    })
  },
  /**
   * 跳到礼物分类列表中
   */
  addMore: () => {
    wx.redirectTo ({
      url: '../test/test'
    })
  },
  /**
   * 点击选择礼物
   */
  selectGift:()=>{
    app.globalData.isSendGift = false;
    wx.navigateTo({
      url: '../test/test'
    })
  },
  writeAddress:()=>{
    wx.chooseAddress({
      success: function (res) {
        console.log(res)
        self.setData({
          address: res,
          isWriteAdress:true
          
        })
      },
    // wx.scanCode({
    //   success: (res) => {
    //     console.log(res)
    //   },//调用微信扫一扫功能


    // wx.chooseLocation({
    //   success: (res) => {
    //     console.log(res)
    //   },//打开地图选择位置
      fail: res => {
        wx.showModal({
          title: "提示",
          content: "轻松送礼需要获取您的通信地址",
          confirmText: "确定",
          showCancel: false,
          success: res => {
            if (res.confirm) {
              wx.openSetting({
                success: res => {
                  //判断是否有获取地址的权限
                  if (res.authSetting['.scope.address']) {
                    //成功获取权限
                  }
                }
              })
            }
          }

        })
      }
    })
  },
  /**
   * 求礼按钮点击
   */
  pleasePay:(e)=>{



    let data = {};
    
    //祝福
    // let wish = self.data.wish;
    let wish;
    if (self.data.wish.length == 0) {
      wish = "我喜欢这礼物，可以送我吗？";
    } else {
      wish = self.data.wish
    }
    
    //商品
    let goodsList = app.globalData.orderArrSend;
    //地址
    let address = self.data.address;
    //用户id
    let openId = app.globalData.openId;
    //总金额
    let totalAmount = self.data.totalAmount;
    //formId
    let formId = e.detail.formId;
  

    if (app.globalData.orderArrSend.length == 0){
      self.taost("请选择礼物");
      return;
    }
    if(address == null){
      self.taost("请选择地址");
      return;
    }

    if(wish == null || wish.length == 0)
    {
      self.taost("请填写留言");
      return;
    }

    if (totalAmount == 0)
    {
      self.taost("总金额为零，请选择礼物");
      return;
    }

    data.address = address;
    data.goodsList = goodsList;
    data.openId = openId;
    data.wish = wish;
    data.totalAmount = totalAmount;
    data.formId = e.detail.formId
   console.log(data)
    //提交
    wx.request({
      url: app.globalData.host + '/order?method=pleasePay',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data: data,
      success:res=>{
        if(res.data.status == 1)
        {
          self.taost("提交成功")
          self.setData({
            isPleasePlay:true,
            submitText:'向朋友求礼'
          });
        }
      }
    })
  },
  wishInput(e){
    self.setData({
      wish: e.detail.value
    })
  },
  taost(msg){
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel:false,
      success: function (res) {
        
      }
    })
  }
})