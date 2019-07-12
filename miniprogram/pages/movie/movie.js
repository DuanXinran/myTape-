// pages/movie/movie.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
 movieList:[],
    navigateList:[],
    swiperList:[],
   detil:'',
   selectIndex:0
  },
  activeChange(e){
     this.setData({
       selectIndex:e.target.dataset.index
     })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 /**
   *视频列表
   */

    wx.cloud.callFunction({
      name:"movielist",
      data:{
        
        start:0,
        count:5
      }
    }).then(res=>{
      // console.log(res);
      this.setData({
        movieList:this.data.movieList.concat( JSON.parse(res.result).othersList)
      })
    }).catch(err=>{
      console.log(err)
    });
 /**
   * 导航栏
   */
    wx.cloud.callFunction({
      name: "navigatelist",
      data: {
      }

    }).then(res => {
      // console.log(res);
      this.setData({
        navigateList: this.data.navigateList.concat(JSON.parse(res.result).navigateList)
      })
      // console.log(this.data.navigateList);
    }).catch(err => {
      console.log(err)
    });
 /**
   * 轮播图
   */

    wx.cloud.callFunction({
      name: "swiperlist",
      data: {
      }

    }).then(res => {
      // console.log(res);
      this.setData({
        swiperList: this.data.swiperList.concat(JSON.parse(res.result).swiperList)
      })
      // console.log(this.data.swiperList);
    }).catch(err => {
      console.log(err)
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