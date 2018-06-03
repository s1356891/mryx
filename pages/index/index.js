// pages/index/index.js
var bmap = require('../../libs/bmap-wx/bmap-wx.js'); 
var wxMarkerData = [];  //定位成功回调对象
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ak:'FGbG78HGrFipQIcI5LubymQbqODUyFp0',
    address: '',     //地址        //城市信息 
    currentTab: 0, //预设当前项的值
    sliderList: [
      { selected: true, imageResource: '../../images/banner/banner1.jpg' },
      { selected: false, imageResource: '../../images/banner/banner2.jpg' },
      { selected: false, imageResource: '../../images/banner/banner3.jpg' }
    ],
    goodsList:[
      { imgUrl: '../../images/index/lz.png', title: '荔枝', disc: '相当好吃的荔枝', price: '13.00', count: 2},
      { imgUrl: '../../images/index/sng.png', title: '千禧圣女果', disc: '吃了你怕谁', price: '23.00', count: 3},
      { imgUrl: '../../images/index/lz.png', title: '荔枝', disc: '相当好吃的荔枝', price: '13.00', count:2},
      { imgUrl: '../../images/index/sng.png', title: '千禧圣女果', disc: '吃了你怕谁', price: '23.00', count: 2},
      { imgUrl: '../../images/index/lz.png', title: '荔枝', disc: '相当好吃的荔枝', price: '13.00' },
      { imgUrl: '../../images/index/sng.png', title: '千禧圣女果', disc: '吃了你怕谁', price: '23.00' }
    ]
  },
  switchTab: function (e) {
    var sliederList = this.data.sliderList,
      i, item;
    for (i = 0; item = sliederList[i]; ++i) {
      item.selected = e.detail.current == i;
    }
    this.setData(
      {
        sliderList: sliederList
      }
    );
  },
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    /* 获取定位地理位置 */
    // 新建bmap对象     
    var BMap = new bmap.BMapWX({
      ak: that.data.ak
    });
    var fail = function (data) {
      console.log(data);
    };
    var success = function (data) {
      //返回数据内，已经包含经纬度    
      console.log(data);
      //使用wxMarkerData获取数据    
      wxMarkerData = data.wxMarkerData;
      //把所有数据放在初始化data内    
      that.setData({
        markers: wxMarkerData,
        latitude: wxMarkerData[0].latitude,
        longitude: wxMarkerData[0].longitude,
        address: wxMarkerData[0].address,
        cityInfo: data.originalData.result.addressComponent
      });
    }
    // 发起regeocoding检索请求     
    BMap.regeocoding({
      fail: fail,
      success: success
    });           
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
    setTimeout(function () {
      wx.stopPullDownRefresh()
    }, 2500)  
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