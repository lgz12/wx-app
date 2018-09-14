// pages/joinLottery/joinLottery.js
const app = getApp();
let self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title_one:'',
    title_two:'',
    userSendPic:'',
    goodsList:[],
    host:app.globalData.host,
    playerNum:0,
    playerList:[],
    status:0,
    winPlayerNum:0,
    winPlayerList:[],
    buttonText:"发送给好友",
    address:{},
    isHideAddress:true,
    orderNum:"",
    wish:"大吉大利，今晚吃鸡！",
    shareOptions:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;

    ///--------------- 模拟数据
    // let orderNum = "1525235078213510";
    // let formId ='1525235160668';
    //-------------------------------
    let formId = options.formId;
    let orderNum = options.orderNum;
    //分享参数
    let shareOptions = options.shareOptions;

    console.log("formId:" + formId + ",orderNum" + orderNum);
    console.log("shareOptions:" + shareOptions);

    wx.request({
      url: app.globalData.host + '/order?method=joinPlay',
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      data:{
        openId:app.globalData.openId,
        orderNum:orderNum,
        formId: formId
      },
      success:res=>{
        let data = res.data;
      console.log(data)
        if(data.status == 1)
        {
          //对商品整合计数
          let goodsList = [];
          let flag;
          for (let i in data.content.goods){
           flag = true;
            for(let item of goodsList){
           
              if (item.goodsId == data.content.goods[i].goodsId){
                item.goodsNum++;
                flag = false;
              }
            }
            if(!flag)
            {
              continue;
            }
            //添加元素
            let itemOther = {};
            itemOther.goodsId = data.content.goods[i].goodsId;
            itemOther.goodsName = data.content.goods[i].goodsName;
            itemOther.goodsPicUrl = data.content.goods[i].goodsPicUrl;
            itemOther.goodsNum = 1;
            goodsList.push(itemOther);
            
          }
          let playerNum = data.content.playerList.length;
          let winPlayerNum;
          let winPlayerList;
          if (data.content.winPlayerList)
          {
            winPlayerNum = data.content.winPlayerList.length;
            winPlayerList = data.content.winPlayerList;
          }else{
            winPlayerNum=0;
            winPlayerList = {};
          }


          let status = data.content.status;
          let buttonText;
          if (status == 1){
            buttonText = "我也要送礼";
          }else if (status == 2){
            buttonText = "填写地址";
          }else{
            buttonText = "发送给好友";
          }
          
          
          console.log(data.content.winPlayerList)
          self.setData({
            title_one: data.content.title,
            title_two: data.content.giftText,
            userSendPic:data.content.userSend.picUrl,
            goodsList: goodsList,
            playerNum: playerNum,
            playerList: data.content.playerList,
            status:data.content.status,
            winPlayerNum: winPlayerNum,
            winPlayerList: winPlayerList,
            buttonText: buttonText,
            orderNum: orderNum,
            wish: data.content.wish,
            formId: formId,
            shareOptions: shareOptions
          })
        }
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
    console.log(" self.data.shareOptions:" + self.data.shareOptions);
    let shareOptions = JSON.parse(self.data.shareOptions);
    return {
      title: '这里有一个礼物，快来抢呀',
      path: '/pages/envelope/envelope?orderNum=' + shareOptions.orderNum + '&userSendPic=' + shareOptions.userSendPic + '&playMethod=' + shareOptions.playMethod + '&openNum=' + shareOptions.openNum + '&goodsNum=' + shareOptions.goodsNum,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  /**
   * 按钮点击事件
   */
  submit(){
    if(self.data.status == 1){
      //我也要送礼
      wx.redirectTo({
        url: '../index/index',
      })
    } else if (self.data.status == 2){
      //填写地址
      wx.chooseAddress({
        success:res=>{
          self.setData({
            address:res,
            isHideAddress:false,
            status:4,
            buttonText:"提交"
          })
        },
        fail:res=>{
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
                    if (res.authSetting['scope.address']) {
                      //成功获取权限
                    }
                  }
                })
              }
            }

          })
        }
      })
    } else if (self.data.status == 3){
      //发送给好友

    } else if (self.data.status == 4){
      //提交收货地址
      console.log(self.data.orderNum)
      let data = {};
      let address = self.data.address;
      data.openId = app.globalData.openId;
      data.consignee = address.userName;
      data.cityName = address.cityName;
      data.provinceName = address.provinceName;
      data.countyName = address.countyName;
      data.postalCode = address.postalCode;
      data.detailInfo = address.detailInfo;
      data.phoneNumber = address.telNumber;
      data.nationalCode = address.nationalCode;
      data.orderNum = self.data.orderNum;
      wx.request({
        url: app.globalData.host + '/order?method=submitGetGiftAddress',
        data: data,
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: res => {
          console.log(res)
          if (res.data.status = 1) {
            wx.showModal({
              title: '提示',
              content: '提交地址成功，我们将尽快发货',
              showCancel: false,
              success: function (res) {

              }
            })

            self.setData({
              buttonText: "我也送礼物",
              status:1
            });
          }
        }
      })
    }
  }
})