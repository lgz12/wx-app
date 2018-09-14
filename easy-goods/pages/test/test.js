// pages/test/test.js

const app = getApp();

let self;
var API = require('../../utils/api.js')
Page({
   /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '美食', '美妆', '酒', '保健品', '数码', '家电'],
    local:'../../image/',
    typeIndex:0,
    header: '/image/6.jpg',
    header1: '/image/5.png',
    hiddentop:false,
    list:[],
    test: [{
      data:
        {
          one:
            [{ "id": "1", "img": "box1.png", "name": "手机", "typeid": "5" },
            { "id": "3", "img": "money.png", "name": "电话", "typeid": "5" }],
          two: [
            { "id": "4", "img": "box1.png", "name": "月饼", "typeid": "1" },
            { "id": "6", "img": "box1.png", "name": "可乐", "typeid": "1" }]
        }
    }]
     
    
      
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let data = {};
    var that =this;
    console.log(that.data.test[0].data)
    data.Tab_Name = "goods";
    data.Cont=" order by typeid"
    console.log(data)
    wx.request({
      url: app.globalData.localhost +'/php/Tab_query.php',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: 'POST',
      data: data,
      success: (res) => {
        let list = [];
        let data={};
        // console.log(res.data)
        // self.setData({
        //   list: list,

        //   //res代表success函数的事件对，data是固定的，list是数组  
        // })  

        let goodsList = res.data
        let itemOther = {};
        let n=1;//定义一个变量根据商品类型过滤
        // console.log(item[0])
        let goodsItem = [];
        itemOther.data = [];
        goodsItem.one=[];
        goodsItem.two=[];
        goodsItem.three = [];
        // console.log(itemOther)
        // console.log(goodsList.length)
        let len = goodsList.length//获取商品数组的长度
        for(var i=0;i<len ;i++){
          let item = goodsList[i]; 
          console.log(item.typeid)
          if(item.typeid==n){
            goodsItem.one.push(item);
          }else{
            while (item.typeid == n){
              n+=1
            }
            if (item.typeid==2){
              goodsItem.two.push(item);
            }else{
              goodsItem.three.push(item);
            }
            
          }
        }
//         for (let i in goodsList) {
//           let item = goodsList[i];    
// // console.log(goodsList[i].typeid)

// // console.log(i)
// // if(i % 2 == 0){
// //   goodsItem.one.push(item);
// // }else{
// //   goodsItem.two.push(item);
// // }
//         // while(n<6){
//           // if (goodsList[i].typeid == n) {
//             goodsItem.one.push(item);
//           // //   console.log(1)
//           // // } else {
//           // //   n += 1;
//           // }

          
         
//         }
        data.one = goodsItem.one
        data.two = goodsItem.two
        data.three = goodsItem.three
        list.push(data)

        // itemOther.data.push(goodsItem);
        console.log(list);
        console.log(list[0].one[0].id);
        that.setData({
          // list: res.data
          list: list,
        })

      },
      fail:err=>{
            console.log(err)
      }
    })
      // 使用 Mock
      
      // API.ajax('', function (res) {
      //   //这里既可以获取模拟的res
      //   console.log(res)
      //   that.setData({
      //     list: res.data
      //   })
      // });

    
  //  self =this;
  //  wx.showModal({
  //    title: '提示',
  //    content: '提交订单失败，请重试',
  //    showCancel:false,
  //    success: function (res) {
  //      if (res.confirm) {
  //        console.log('用户点击确定')
  //      } else if (res.cancel) {
  //        console.log('用户点击取消')
  //      }
  //    }
  //  })
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
  /**
   * 支付测试
   */
  testPay:()=>{
    wx.request({
      url: app.globalData.host + '/money?method=pay',
      header: {
        'content-type': 'application/json' // 默认值
      },
      data:{
        money:1
      },
      method: 'POST',
      success:res=>{
        self.pay(res.data);
      }
    })
  },
  /**
   * 获取访问数
   */
  access:()=>{
    wx.request({
      url: 'https://api.weixin.qq.com/datacube/getweanalysisappiddailysummarytrend?access_token=13_pAL2W-xULaPPiNfRtY-rdmOAgugHwrarop0B0UIciu15s4PRwSN_kYM5jZBQ7JEa4RSDVzKKwwO7jKctALnMBEf4VmesfCcwjJMIZeZpiH6LTQE3fDVnGF5gP_y_GzPyIU4hDuc-PdEXrY6CKYUaAFAZNJ',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"// 默认值
      },
      data: {
        "begin_date": "20180906",
        "end_date": "20180906"
      },
      method: 'POST',
      success: res => {
        console.log(res.data);
      }
      
    })
  },
/**
 * 支付
 */
  pay(data){
    
 wx.requestPayment({
   timeStamp: data.timeStamp,
   nonceStr: data.nonceStr,
   package: data.package,
      signType:'MD5',
      paySign: data.paySign,
      success:(res)=>{
        console.log(res)
      },
      fail:(res)=>{
        console.log(res);
      }

    })
  },
  /**
   * 
   */
  test:res=>{
    console.log(res);
  },
  inputSwitchStatus(){
   wx.navigateTo({
     url: '../search/search',
   })
  },
  typeClick(e){
    let data={}
    var self = this
    let typeId = e.target.dataset.idx;
    console.log("typeId:" + typeId);
    
    //typeId =0 为首页
    if (typeId == 0) {
      typeId = '';
      //显示全部的页面，隐藏其他页面
      self.setData({
        typeIndex: typeId,
        hiddentop: false
        // data.Cont:
        // index: typeId
      })
    }else{
      self.setData({
        typeIndex: typeId,
        hiddentop:true
      })
    }
    data.Tab_Name = "goods";
    data.Cont = " where typeid like '%" + typeId + "' order by typeid";
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
        let list = [];
        let data = {};
        // console.log(res.data)
        // self.setData({
        //   list: list,

        //   //res代表success函数的事件对，data是固定的，list是数组  
        // })  

        let goodsList = res.data
        let itemOther = {};
        let n = 1;//定义一个变量根据商品类型过滤
        // console.log(item[0])
        let goodsItem = [];
        itemOther.data = [];
        goodsItem.one = [];
        goodsItem.two = [];
        goodsItem.three = [];
        // console.log(itemOther)
        // console.log(goodsList.length)
        let len = goodsList.length//获取商品数组的长度
        for (var i = 0; i < len; i++) {
          let item = goodsList[i];
          console.log(item.typeid)
          if (item.typeid == n) {
            goodsItem.one.push(item);
          } else {
            while (item.typeid == n) {
              n += 1
            }
            if (item.typeid == 2) {
              goodsItem.two.push(item);
            } else {
              goodsItem.three.push(item);
            }

          }
        }
        //         for (let i in goodsList) {
        //           let item = goodsList[i];    
        // // console.log(goodsList[i].typeid)

        // // console.log(i)
        // // if(i % 2 == 0){
        // //   goodsItem.one.push(item);
        // // }else{
        // //   goodsItem.two.push(item);
        // // }
        //         // while(n<6){
        //           // if (goodsList[i].typeid == n) {
        //             goodsItem.one.push(item);
        //           // //   console.log(1)
        //           // // } else {
        //           // //   n += 1;
        //           // }



        //         }
        data.one = goodsItem.one
        data.two = goodsItem.two
        data.three = goodsItem.three
        list.push(data)

        // itemOther.data.push(goodsItem);
        console.log(list);
        // console.log(list[0].one[0].id);
        self.setData({
          // list: res.data
          list: list,
          typeIndex: typeId,
        })

      },
      fail: err => {
        console.log(err)
      }
  })
  },
  goodsClick: (e) => {//点击图片进入详情页面
    console.log();
    let goodsid = e.target.dataset.goodsid;//获取图片的id值
    wx.navigateTo({
      url: '../detail/detail?goodsId=' + goodsid
    })
  },
})