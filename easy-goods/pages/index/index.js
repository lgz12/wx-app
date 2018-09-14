const app = getApp();
let self;
const playMethodArr = ["送爱人、送爸妈、送朋友、送同事",""];
let util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pickerStatus:true,
    zhijie:"直接送礼",
    hidden:false,
    mon:false,
    // headerbg1: app.globalData.picUrl + '/headerbg1.png',
    logo: app.globalData.picUrl + '/logo.png',
    ModalHidden:true,
    playMethodText:'送爱人、送爸妈、送朋友、送同事',
    openNum:[1,2,3,4,5,6,7,8,9,10],
    openNumIndex:3,
    giftNumSend:0,
    playMethod:1,
    wish:"",
    totalAmount:0.00,
    goodListHidden:false,
    goodsList: [{ "goodsName": "面膜2", "specification": "超薄", "goodsId": 2, "price": 0.05, "goodsNum": 5, "goodsPicUrl": "/images/goodsPic/list-img01.jpg" }, { "goodsName": "面膜1", "specification": "面膜规格2", "goodsId": 1, "price": 0.4, "goodsNum": 2, "goodsPicUrl": "/images/goodsPic/list-img01.jpg" }],
    showModal:false,
    showModalGoods:false,
    totalAmountText:'0.00'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
  },
  catchbox:function(){
    wx.navigateTo({
      url: '../getGift/getGift',
    })
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
    //订单中商品的数组
    let orderArrSend= app.globalData.orderArrSend;
    // console.log(orderArrSend)
    //要发送礼物的个数
    let giftNumSend = 0;
   
    let goods;
    //总金额
    let totalAmount = 0;

    //对礼物计数和计总金额
    for (let i in orderArrSend)
    {
      giftNumSend = orderArrSend[i].goodsNum + giftNumSend;
      totalAmount = util.accAdd(totalAmount, orderArrSend[i].price);
    }
    console.log(totalAmount)

    // //重新规定人数范围
    // let openNum = [];

    // //人数范围为最小为礼物数，最大为礼物数加10
    // let openNumTop = giftNumSend + 10;
    // for (let i = giftNumSend; i <= openNumTop;i++ )
    // {
    //   openNum.push(i);
    // }

    let openNum = self.range(giftNumSend);
    

    // if (orderArrSend[0])
    // {
    //   goods = orderArrSend[0];
    // }else{
    //   goods = {};
    // }

  // giftNumSend: giftNumSend,
    self.setData({
      host:app.globalData.host,
      giftNumSend: giftNumSend,
      totalAmount: totalAmount,
      totalAmountText: totalAmount.toFixed(2),
      openNum: openNum,
      goodsList: app.globalData.orderArrSend
    })
  },
  /**
   * 
   */
  range(giftNumSend){
    let openNum = [];
    let openNumTop = giftNumSend + 10;
    for (let i = giftNumSend; i <= openNumTop; i++) {
      openNum.push(i);
    }
    return openNum;
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
    
  },
  /**
   * 礼物记录点击
   */
  giftRecode(){
    wx.navigateTo({
      url: '../giftRecord/giftRecord',
    })
  },
  /**
   * 返回首页
   */
  back() {
    wx.navigateTo({
      url: '../giftRecord/giftRecord',
    })
  },
  /**
   * 点击玩法
   */
  morePlay:res=>{
    self.setData({
      ModalHidden:false
    })
  },
  /**
   * 模态框取消
   */
  modelCancel:()=>{
    self.setData({
      ModalHidden: true
    })
  },
  /**
   * 玩法点击
   */
  playItemClick:(e)=>{
    
    let which = e.target.dataset.which;
    let pickerStatus;
    let zhijie;
    let hidden;
    let mon;
    if(which == 1)
    {
      pickerStatus = true;
      hidden = false;
      mon=false;
      zhijie="直接送礼"
    } else if (which == 2){
      pickerStatus = false;
      hidden=true;
      mon="none";
      zhijie="满人开奖"
    }else{
      self.onCancel();
    }
    console.log(pickerStatus)
    console.log(hidden)
    console.log(mon)
    console.log(self.data.playMethod)
    self.hideModal();
    self.setData({
      ModalHidden: true,
      playMethodText: playMethodArr[which-1],
      pickerStatus: pickerStatus,
      hidden:hidden,
      mon:mon,
      zhijie:zhijie,
      playMethod:which
    });
  },

  /**
   * 满人开奖选择的人数
   */
  bindPickerChange:(e)=>{
    self.setData({
      openNumIndex: e.detail.value
    })
  },
  /**
   * 跳到选择礼物的页面
   */
  selectGift:()=>{
    //表标识是从送礼页面进入礼物分类
    // app.globalData.isSendGift = true;
    // wx.redirectTo ({
    //   url: '../AA/AA'
    // })


    // wx.navigateTo({
    //   url: '../goods/goods'
    // })

    wx.navigateTo({
      url: '../test/test'
    })
  },
  /**
   * 调到求礼的页面
   */
  getGiftClick:()=>{
    //跳到求礼页面，购物需要清除
    app.globalData.orderArrSend = [];
    wx.navigateTo({
      url: '../getGift/getGift'
    })
  },
  /**
   * 对应商品减少
   */
  numReduce:(e)=>{
    let index = e.target.dataset.index;
    console.log(index)
    let order = app.globalData.orderArrSend[index];
    //数量不能小于等于0
    // if (order.goodsNum <= 0) {
    //   return;
    // }
    order.goodsNum--;
    // console.log(order.goodsNum);
    //礼物总数量
    let giftNumSend = self.data.giftNumSend;
    giftNumSend--;
    // console.log(giftNumSend)

    let totalAmount = util.accSub(self.data.totalAmount, order.money);

    //商品减到为0时，需要在购物车去掉
    if (order.goodsNum == 0){
      app.globalData.orderArrSend.splice(index,1);
    }

    let openNum = self.range(giftNumSend);

    self.setData({
      goodsList: app.globalData.orderArrSend,
      totalAmount: totalAmount,
      giftNumSend:giftNumSend,
      openNum: openNum,
      totalAmountText: parseFloat(totalAmount).toFixed(2)
    })
  },
  /**
   * 对应商品添加
   */
  increase:(e)=>{
    let index = e.target.dataset.index;
    let order = app.globalData.orderArrSend[index];
    order.goodsNum++;
    let totalAmount = util.accAdd(self.data.totalAmount, order.money);
    let giftNumSend = self.data.giftNumSend;
    giftNumSend++;
    let openNum = self.range(giftNumSend);


    self.setData({
      goodsList: app.globalData.orderArrSend,
      totalAmount: totalAmount,
      giftNumSend:giftNumSend,
      openNum: openNum,
      totalAmountText: totalAmount.toFixed(2)
    })
  },
  addMore:()=>{
    wx.redirectTo ({
      url: '../test/test'
    })
  },
  sendGift:(e)=>{
  

  //判断购物车是否有商品
    if (app.globalData.orderArrSend.length == 0){
      console.log(app.globalData.orderArrSend.length);
        wx.showModal({
          title: '提示',
          content: '请先选择礼物',
          showCancel: false,
          success: function (res) {

          }
        })
      
      return;
    }
 
 
    let obj ={};
    obj.goodsList = app.globalData.orderArrSend;
    obj.playMethod =1;
    if(self.data.wish.length == 0)
    {
      obj.wish = "大吉大利，今晚吃鸡";
    }else{
      obj.wish = self.data.wish
    }
    obj.openId = app.globalData.openId
    obj.playMethod = self.data.playMethod;
    obj.openNum = self.data.openNum[self.data.openNumIndex];
    obj.totalAmount = self.data.totalAmount;
    console.log(JSON.stringify(obj));
    //测试
    //加载框
    
    // wx.showLoading({
    //   title: '创建订单中...',
    // })
    wx.navigateTo({
              url: '../payafter/payafter?obj=' + JSON.stringify(obj)
            })



    // wx.request({
    //   // url: app.globalData.host + '/order?method=orderSubmit',
    //   url:app.globalData.host + '/api/v1/goods/get?id=1',
    //   data:obj,
    //   header: {
    //     'content-type': 'application/json' // 默认值
    //   },
    //   method: 'get',
      
    //   success:(res)=>{
    //     //取消加载框
    //     wx.hideLoading()
    //     console.log(res.data);
    //     if(res)
    //       // if (res.data.status == 1)
    //     {
         
    //       console.log(res.data);
    //       //支付
    //       self.pay(res.data.data.payRes,payRes=>{

    //         obj.orderNum = res.data.content.orderNum;
    //         obj.goodsNum = self.data.giftNumSend;
    //         app.globalData.orderArrSend = [];
    //         wx.navigateTo({
    //           url: '../payafter/payafter?obj=' + JSON.stringify(obj)
    //         })

    //       })
        
    //     }else{
    //       console.log(res)
    //       //创建订单失败提示
    //       wx.showModal({
    //         title: '提示',
    //         content: '提交订单失败，请重试',
    //         showCancel: false,
    //         success: function (res) {
    //          //不做处理
    //         }
    //       })
    //     }
    //   }
    // })
 
   
  },
  /**
   * 获取祝福输入框的内容
   */
  wishInput:e=>{
    self.setData({
      wish: e.detail.value
    })
  },
  /**
   * 支付
   */
  pay(data,callback) {

    wx.requestPayment({
      timeStamp: data.timeStamp,
      nonceStr: data.nonceStr,
      package: data.package,
      signType: 'MD5',
      paySign: data.paySign,
      success: (res) => {
        callback(res);

      },
      fail: (res) => {
        console.log(res);
      }

    })
  },
  
 /**
  * 关闭商品列表项
  */
  goodListHidden(){
    self.setData({
      goodListHidden:true
    })
  },
  /**
   * 
   */
  /**
     * 弹窗
     */
  showDialogBtn: function () {
    this.setData({
      showModal: true,
    })
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onConfirm: function () {
    this.hideModal();
  },
  /**
   * 商品列表模态框点击外部隐藏
   */
  hideModalGoods(){
    self.setData({
      showModalGoods:false
    })
  },
  /**
   * 查看全部的商品
   */
  lookAll(){
    self.setData({
      showModalGoods: true
    })
  }
})