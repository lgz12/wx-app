// pages/OpernEnvelope/OpernEnvelope.js
const app = getApp();
let self;
Page({
  orderNum:"",
  /**
   * 页面的初始数据
   *  submitIsWriteAdd 值规则 
   * 1表示 获取收件信息
   * 2表示题提交信息
   * 3表示我也要送礼物
   */
  data: {
      titleText:"",
      userSend:{},
      wish:"",
      userGet:{},
      giftNum:0,
      submitText:"填写地址",
      submitIsWriteAdd:1,
      address:{},
      goodsList: [],
      host:app.globalData.host,
      formId:''
  },
toast:msg=>{
  wx.showModal({
    title: "提示",
    content: msg,
    confirmText: "确定",
    showCancel: false,
    success: res => {
    
    }

  })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self = this;

     let orderNum = options.orderNum || "";
    // let orderNum = "1525200739401328";
    self.orderNum = orderNum;
  
    console.log("orderNum:" + orderNum);
    self= this;
      wx.request({
        url: app.globalData.host + '/order?method=getGift',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        data:{
          openId:app.globalData.openId,
          orderNum: orderNum
        },
        success:res=>{
          let data = res.data;
          console.log(data)
          let goodsList;
          let isNeedWriteAddress;
          let submitText;

          if (data.content.isNeedWriteAddress == 0)
          {
            isNeedWriteAddress = 3;
            submitText = "我也要送礼"
          }else{
            isNeedWriteAddress = 1;
            submitText = "填写地址"
          }
          //整理商品列表，相同的归为一类
         goodsList = data.content.goods;
          let goodsListOther = [];

          //标志每一次循环是否在新有对应的元素
          let isInArr;
          for(let i in goodsList)
          {
            isInArr = false;
            for(let j in goodsListOther)
            {
              if (goodsListOther[j].goodsId == goodsList[i].goodsId)
              {
                goodsListOther[j].goodsNum++;
                isInArr = true;
              }
            }
            if(!isInArr)
            {
              goodsListOther.push(goodsList[i]);
            }
          }
          console.log(goodsListOther)
          self.setData({
            userSend:data.content.userSend,
            userGet:data.content.giftOwn,
            giftNum: data.content.goods.length,
            titleText:data.content.title,
            submitIsWriteAdd: isNeedWriteAddress,
            submitText:submitText,
            wish: data.content.wish,
            goodsList: goodsListOther
          });
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
  /**
   * 填写地址
   * 
   */
  writeAddress:res=>{
    console.log(self.data.submitIsWriteAdd)

    //判断按钮点击是否是为了填写收件信息
      if (self.data.submitIsWriteAdd == 2)
      {
        console.log(self.orderNum)
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
        data.orderNum = self.orderNum;
        wx.request({
          url: app.globalData.host + '/order?method=submitGetGiftAddress',
          data: data,
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success:res=>{
            console.log(res)
            if(res.data.status = 1)
            {
              wx.showModal({
                title: '提示',
                content: '提交地址及成功，我们将尽快发货',
                showCancel: false,
                success: function (res) {
                 
                }
              })

              self.setData({
                submitText:"我也送礼物",
                submitIsWriteAdd:3
              });
            }
          }
        })

        return;
      }

      //是否是获取地址
      if (self.data.submitIsWriteAdd == 1){
      wx.chooseAddress({
        success: function (res) {

          self.setData({
            address: res,
            submitIsWriteAdd: 2,
            submitText: "提交"
          })
        },
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
    }

    //是否是跳到主页上
      if (self.data.submitIsWriteAdd == 3){
        wx.redirectTo({
          url: '../index/index',
        })
      }
  }
})