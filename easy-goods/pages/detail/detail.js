// pages/goodsDetail/goodsDetail.js
let util = require('../../utils/util.js');
var WxParse = require('../../wxParse/wxParse.js');
const app = getApp();
let self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // article: '<div style="text-align:center;">《静夜思》· 李白<br />床前明月光，<br />疑是地上霜。 <br />举头望明月， <br />低头思故乡。<br /><img src="http://www.xiexingcun.com/Poetry/6/images/53e.jpg" alt="" /><br /><img src="http://www.xiexingcun.com/Poetry/6/images/53.jpg" alt="" /><br /><br /><img src="http://www.xiexingcun.com/Poetry/6/images/53b.jpg" alt="" /><br /></div>',
    // header: app.globalData.picUrl + '/header.jpg',
    // header: app.globalData.picUrl + '/api/v1/goods/list?id=1',
    // header: '/image/t3.jpg',
    goodsPic: app.globalData.host + '/upload/images/goodsCover/20180530113640.jpg',
    goodsPicArr: [ ],
    goodsDetail: [{
       
      url: '../../image/1.png'
    }, {
       
      url: '../../image/2.png'
    },],
    showModalStatus:false,
    goodsNum:1,
    amount:60,
    goodsName:"",
    description:"",
    priceDefault: '',
    specArr:[],
    // goodsPic: "",
    goodsPhotos: "",
    price:0,
    money:0,
    specification:"",
    goodsId:0,
    host: app.globalData.host ,
    standardName:"",
    typeArr: [],
    goodsList: [],
    article:'',
    goodsListOther: [],
    isShow: "",
    typeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;
    // console.log(options)
    let goodsId = 2;
    let data={}
    self.data.goodsId=options.goodsId;
    console.log(options.goodsId)
      data.Tab_Name = "goodsDetail";
    data.Cont = " where id =" + self.data.goodsId;
      console.log(data)
  //  console.log(data)
    wx.request({
        url: app.globalData.localhost + '/php/Tab_query.php',
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'POST',
        data: data,
      
      success: (res) => {
        console.log(res.data[0])
        var article = res.data[0].goodsDetail;
        let tem = WxParse.wxParse('article', 'html', article, self, 5);
        // console.log(tem)
        let price;
        let money;
        let goodsPhotos;
        let goodsPicArr;
        let standardName;
        // console.log(res.data.data.goodsPhotos[0].picUrl)
        // self.data.amount = res.data.amount;
        // price = res.data.data.standards[0].prices


        // for (let n in res.data.data.goodsPhotos) {

        //   res.data.data.goodsPhotos[n].picUrl = res.data.data.goodsPhotos[n].picUrl;
        //   // console.log(res.data.data.goodsPhotos[n].picUrl)          
        // }



        // for (let n in res.data.data.goodsDetail) {

        //   res.data.data.goodsDetail[n].picUrl = app.globalData.host + res.data.data.goodsDetail[n].picUrl;
        //   // console.log(res.data.data.goodsPhotos[n].picUrl)          
        // }




        // for (let i in res.data.data.standards){
        //   if(i == 0)
        //   {
        //     res.data.data.standards[i].isChecked = true;
        //     price = res.data.data.standards[i].prices * 1;
        //     money = res.data.data.standards[i].prices;
        //     self.data.standardName = res.data.data.standards[i].standardName;
        //     // console.log(self.data.standardName)
        //   }else{
        //     res.data.data.standards[i].isChecked = false;
        //   }
        // }



        // for (let j in res.data.data.picTitle){
        //   res.data.data.picTitle[j].picUrl = app.globaldata.data.host + res.data.data.picTitle[j].picUrl;
        // }
        // self.data.goodsId = res.data.data.id;
        // console.log(res.data.data.goodsDetail)
        // console.log(app.globalData.host + res.data.data.picUrl)
        console.log(res.data[0].img)
        self.setData({
          // amount: res.data.data.amount,
          priceDefault: res.data[0].money,
          name: res.data[0].name,
          description: res.data[0].description,
          // specArr: res.data.data.standards,
          // goodsPicArr: res.data.data.goodsPhotos ,
          // goodsPic: res.data.data.goodsPhotos[0].picUrl,
          // article: tem,
          // goodsPic:  res.data.data.picUrl,
          // goodsdetail:goodsdetail,
          price: res.data[0].money,
          // picUrl: res.data[0].picUrl,
          money: res.data[0].money,
        })
      }
    }),
    data.Tab_Name = "pic";
    console.log(data)
    //  console.log(data)
    wx.request({
      url: app.globalData.localhost + '/php/Tab_query.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: data,
      success: (res) => {
        console.log(res.data[0].picUrl)
        self.setData({
          goodsPicArr: res.data,
          picUrl: res.data[0].picUrl,
        })

      }
    })
    data.Tab_Name = "standards";
    console.log(data)
    //  console.log(data)
    wx.request({
      url: app.globalData.localhost + '/php/Tab_query.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: data,
      success: (res) => {
        console.log(res.data[0].standardName)
        self.setData({
          specArr:res.data,
          standardName: res.data[0].standardName

        })

      }
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
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  },
  modalCancel:()=>{
    self.hideModal();
  },
  /**
   * 商品粮递减
   */
  numReduce:()=>{
    let num = self.data.goodsNum  - 1;
    if(num <1)
    {
      return;
    }
    let price = util.accMul(self.data.money,num);
    let money = self.data.money;
    // let money = util.accMul(self.data.money, num);
    self.setData({
      goodsNum: num,
      price: price,
      money:money
    })
  },
  /**
   * 商品量递增
   */
  increase:()=>{
    let num = self.data.goodsNum + 1;
    if (num > self.data.amount)
    {
      return;
    }
    let price = util.accMul(self.data.money,num);
    let money = self.data.money;
    console.log(self.data.money + "  "+ num +" "+price);
    self.setData({
      goodsNum: self.data.goodsNum + 1,
      price: price,
      money:money
    })
  },
  /**
   * 规格选择
   */
  specClick:(e)=>{
    let index = e.target.dataset.index;
    let price ;
    let money;
    let standardName;
    for (let i in self.data.specArr){
      if(i == index){
       
        self.data.specArr[i].isChecked = true;
        price=self.data.specArr[i].price;
        console.log(self.data.specArr[i].standardName)
        standardName = self.data.specArr[i].standardName;
        // // price = self.data.specArr[i].price * self.data.goodsNum;
        // price = util.accMul(self.data.specArr[i].price, self.data.goodsNum);
        // money = self.data.specArr[i].price;
        // self.data.specification = self.data.specArr[i].specification
      }else{
        self.data.specArr[i].isChecked = false;
      }
      // console.log(self.data.specArr[i].isChecked)
    }
    
    self.setData({
      standardName: standardName,
      specArr: self.data.specArr,
      price: price,//price是总价
      money: price//money是单价
    })
  },
  /**
   * 加入购物车
   */
  addShopCar:(res)=>{
    console.log(res);
    console.log(app.globalData.userInfo);
    let objIsNull = true;
    //用循环方法判断对象是否为空对象
    for (let i in app.globalData.userInfo){
      objIsNull = false;
      break;
    }
    console.log("objIsNull:" + objIsNull);
    if (objIsNull){

      let data = res.detail.userInfo;
      let userInfo = {};
      userInfo.openId = app.globalData.openId;
      userInfo.nickName = data.nickName;
      userInfo.gender = data.gender;
      userInfo.city = data.city;
      userInfo.province = data.province;
      userInfo.country = data.country;
      userInfo.language = data.language;
      userInfo.avatarUrl = data.avatarUrl;
      self.addGoods();
      wx.setStorageSync("userInfo", data)
      app.globalData.userInfo = data;
      // wx.request({
      //   url: app.globalData.host + '/user?method=setUserInfo',
      //   header: {
      //     'content-type': 'application/json' // 默认值
      //   },
      //   method: 'GET',
      //   data: userInfo,
      //   success:res=>{
      //     if(res.data.status == 1)
      //     {
      //       self.addGoods();
      //       wx.setStorageSync("userInfo", data)
      //       app.globalData.userInfo = data;
      //     }          
      //   }
      // })
    }else{
      self.addGoods();
    }

  },
  addGoods(){
    let item = {};
    item.goodsName = self.data.name,
      
      item.description = self.data.description,
      item.specification = self.data.standardName,
      item.goodsId = self.data.goodsId,
      item.price = self.data.price,
      item.goodsNum = self.data.goodsNum,
      item.goodsPicUrl = self.data.picUrl;
      item.money = self.data.money;
      let goodList = app.globalData.orderArrSend;
      console.log(item)
      let isHasExist = false;
    for (let i in goodList)
    {
      console.log(self.data.id)
      if (goodList[i].goodsId == self.data.id)
      {
        isHasExist = true;
      }
    }
    if (!isHasExist){
      app.globalData.orderArrSend.unshift(item);
    }
    
    console.log(JSON.stringify(app.globalData.orderArrSend));
    // wx.redirectTo({
    //     url: '../index/index'
    //   })
    //判断应该跳到哪一个页面上
    if (app.globalData.isSendGift) {
      wx.switchTab({//只能跳转到有tabbar页面
      // wx.redirectTo({
        url: '../index/index'
      })
    } else {
      wx.redirectTo({
        url: '../getGift/getGift'
      })
    }
  },
  /**
   * 去求礼页面
   */
  getGiftPage(){
    wx.redirectTo({
      url: '../getGift/getGift',
    })
  },
  goHome(){
    wx.redirectTo({
      url: '../index/index',
    })
  }

})