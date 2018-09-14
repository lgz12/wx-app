// pages/AA/AA.js
const app = getApp();
let self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '美食', '美妆', '酒', '保健品', '数码', '家电'],
      currentTab: 0 ,
    imgUrls: [
      {
        link: '/pages/index/index',
        url: '../../image/5.png'
      }, {
        link: '/pages/logs/logs',
        url: '../../image/6.jpg'
      },  
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {},
  },
  //点击商品进入详细页面
  goodsClick: (e) => {
    console.log();
    let goodsid = e.target.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsid
    })
  },
  navbarTap: function (e) {
      this.setData({
         currentTab: e.currentTarget.dataset.idx
      })
   } ,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var listData = [{
       
      // img1: "../../image/1.png",
      img1: app.globalData.host+"/images/goodsPic/list-img01.jpg",
      content1: "好利来 半熟芝士蛋糕",

      content2: "让你好吃到想哭",
      content3: "￥38.00"
    },

    {

      
      img1: "../../image/2.png",
      content1: "百草味 缤纷水果干礼盒",

      content2: "给你鲜果般的味蕾",
      content3: "￥42.00"
    },

    {

      
      img1: "../../image/3.png",
      content1: "伊利 安慕希常温酸奶",

      content2: "用心呵护你每一天",
      content3: "￥56.00"


    }, 
    {


      img1: "../../image/4.png",
      content1: "好利来 蒲公英空气巧克力",

      content2: "颠覆你对巧克力的口感体验",
      content3: "￥57.00"
    },
    ]
    this.setData({ postlist: listData }),
      self = this;
    wx.request({
      url: app.globalData.host + '/goods?method=getIndexGoods',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: (res) => {
        console.log(res.data.content)
        let goodsList = res.data.content.goodsList
        let goodsListOther = new Array;
        for (let i in goodsList) {
          let item = goodsList[i];
          let itemOther = {};
          itemOther.data = [];
          for (let j in item.data) {
            if (j % 2 == 0) {
              let goodsItem = {};
              goodsItem.one = item.data[j];
              goodsItem.two = item.data[parseInt(j + 1)];
              itemOther.data.push(goodsItem);
            }
          }

          itemOther.typeId = item.typeId;
          itemOther.typeName = item.typeName;
          goodsListOther.push(itemOther);
        }
        console.log(goodsListOther)
        let typeArr = res.data.content.typeList || [];

        let indexPage = {};
        indexPage.id = 0;
        indexPage.type = "全部";

        typeArr.unshift(indexPage);

        self.setData({
          goodsList: goodsListOther,
          typeArr: typeArr
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
  
  }
})