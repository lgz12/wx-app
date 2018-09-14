// pages/goods/goods.js
const app = getApp();
let self;
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['全部', '美食', '美妆', '酒', '保健品', '数码', '家电'],
    currentTab: 0,
    index:0,
    host: app.globalData.host,
    // header: app.globalData.host+'/upload/images/goodsPic/20180530113044.jpg',
    header: '/image/6.jpg',
    header1: '/image/5.png',
    url: app.globalData.host + '/upload/images/goodsCover/20180530113640.jpg',
    img01: app.globalData.host + 'images/goodsPic/list-img01.jpg',
    typeArr:[],
    goodsList:[],
    indexPageHidden:false,
    indexPageHidden1: true,
    notIndexPageIsHid:true,
    goodsListOther:[],
    isShow:"",
    list:[],
    typeIndex:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    self = this;
      wx.request({
        url: app.globalData.host + '/api/v1/goods/list?id=1',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method:'GET',
        success:(res)=>{
          let list = res.data;
          console.log(res.data)
          // self.setData({
          //   list: list,
            
          //   //res代表success函数的事件对，data是固定的，list是数组  
          // })  
          
          let goodsList = res.data
          let goodsListOther = new Array;
          let itemOther = {};
          // console.log(item[0])
          itemOther.data = [];
          // console.log(goodsList)
          for(let i in goodsList)
          {
            let item = goodsList[i];
            // console.log(item)
            for(let j in item){
              if (j % 2 == 0)
              {
                let goodsItem ={};
                goodsItem.one = item[j];
                goodsItem.two = item[parseInt(j + 1)];
                itemOther.data.push(goodsItem);
                // console.log(itemOther);
               
              }
            }
          console.log(itemOther);
            
            // itemOther.id = item;
            // itemOther.goodsName = item.goodsName;
            // itemOther.typePrice = item.typePrice;
            // goodsListOther.push(itemOther);
            // console.log(goodsListOther);
          }
          // console.log(goodsListOther)
          // let typeArr = res.data.content.typeList ||[];
          
          // let indexPage = {};
          // indexPage.id = 0;
          // indexPage.type="全部";

          // typeArr.unshift(indexPage);

          self.setData({
            list: itemOther,
            // typeArr: typeArr,

          })
          console.log(itemOther.data[0].one.id)
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
  goodsClick:(e)=>{
    console.log();
    let goodsid = e.target.dataset.goodsid;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?goodsId=' + goodsid
    })
  },
  turntable:(e)=>{
    wx.navigateTo({
      url: '../turntable/turntable'
    })
  },
  turntest: (e) => {
    wx.navigateTo({
      url: '../test/test'
    })
  },
  /**
   * 类型点击事件
   */
  typeClick:(e)=>{
    let typeId = e.target.dataset.idx;
    console.log("typeId:" + typeId);
    //typeId =0 为首页
    if(typeId ==0)
    {
      //显示全部的页面，隐藏其他页面
      self.setData({
        indexPageHidden:false,
        indexPageHidden1: true,
        notIndexPageIsHid: true,
        typeIndex: typeId
        // index: typeId

      })
      return;
    }

    wx.request({
      // url: app.globalData.host + '/goods?method=getTypeGoods',
      url: app.globalData.host + '/api/v1/goods/list?id='+typeId,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'get',
      success: (res) => {
        let list = res.data;
        console.log(res.data)
        // self.setData({
        //   list: list,

        //   //res代表success函数的事件对，data是固定的，list是数组  
        // })  

        let goodsList = res.data
        let goodsListOther = new Array;
        let itemOther = {};
        // console.log(item[0])
        itemOther.data = [];
        // console.log(goodsList)
        for (let i in goodsList) {
          let item = goodsList[i];

          for (let j in item) {
            if (j % 2 == 0) {
              let goodsItem = {};
              goodsItem.one = item[j];
              goodsItem.two = item[parseInt(j + 1)];
              itemOther.data.push(goodsItem);
              // console.log(itemOther);

            }
          }
          console.log(itemOther);

          // itemOther.id = item;
          // itemOther.goodsName = item.goodsName;
          // itemOther.typePrice = item.typePrice;
          // goodsListOther.push(itemOther);
          // console.log(goodsListOther);
        }
        // console.log(goodsListOther)
        // let typeArr = res.data.content.typeList ||[];

        // let indexPage = {};
        // indexPage.id = 0;
        // indexPage.type="全部";

        // typeArr.unshift(indexPage);

        self.setData({
          list: itemOther,
          indexPageHidden: true,
          indexPageHidden1: false,
          // goodsListOther: goodsListOther,
          // notIndexPageIsHid:false,
          typeIndex: typeId,
          currentTab: 'index',

        })
       
      }
        
        
      
    })
  }
})