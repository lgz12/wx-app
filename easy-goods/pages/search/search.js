// pages/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    local: '../../image/',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  watchPassWord: function (e) {
    // console.log(e.detail.value);//返回输入的值
    let data = {}
    var self = this
    data.Tab_Name = "goods";
    data.Cont = " where name like N'%" + e.detail.value + "%'";
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
        //   console.log(res.data)
        //   self.setData({
        //     list: res.data,
        //     // typeIndex: typeId,
        //   })
        // },
        // fail: err => {
        //   console.log(err)
        // }
        let list = [];
        let data = {};
        let goodsList = res.data
        // console.log(goodsList);
        // console.log(item[0])
        let goodsItem = [];
        goodsItem.one = [];
        goodsItem.two = [];
        // console.log(itemOther)
        // console.log(goodsList)
        for (let i in goodsList) {
          let item = goodsList[i];
          goodsItem.one.push(item);

        }
        data.one = goodsItem.one
        // data.two = goodsItem.two
        list.push(data)
        // itemOther.data.push(goodsItem);
        console.log(list);
        // console.log(list[0].one[0].id);
        self.setData({
          // list: res.data
          list: list
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