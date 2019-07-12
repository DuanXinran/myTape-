// pages/detail/detail.js
const db=wx.cloud.database();
var util=require("./../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieDetail:[],
    recomList:[],
    boolean:true,
    boolean1:false,
    content:'',
    images:[],
    fileIds:[],
    movieId:-1,
    userInfo:'',
    commentList:[]
  },
  onGotUserInfo: function (e) {
   
    this.setData({
      userInfo: JSON.parse(e.detail.rawData)
    })
  
  },



  submit:function(){
    

  
    wx.showLoading({
      title: '评论加载中',
    })
    let promiseArr=[];
    for(let i=0;i<this.data.images.length;i++){
      promiseArr.push(new Promise((reslove,reject)=>{   let item=this.data.images[i];
      let suffix=/\.\w+$/.exec(item)[0];
          wx.cloud.uploadFile({
        cloudPath:new Date().getTime()+suffix,
        filePath:item,
        success:res=>{
         this.setData({
           fileIds:this.data.fileIds.concat(res.fileID)
         });
         reslove();
        },
        false:console.error
      })

      }))
    }
    Promise.all(promiseArr).then(res=>{
 db.collection('comment').add({
   data:{
     content:this.data.content,
     movieId:this.data.movieId,
     fileIds:this.data.fileIds,
     avatar:this.data.userInfo.avatarUrl,
     nickName:this.data.userInfo.nickName,
     time: util.formatTime(new Date).toString().slice(0,24)
    //  .toString().splice(11)
   }
 }).then(res=>{
   wx.hideLoading();
   wx.showToast({
     title: '评论成功',
   })
   this.onLoad();
   this.setData({
     content:'',
     images: []

   })
 }).catch(err=>{
   wx.hideLoading();
   wx.showToast({
     title: '评论失败',
   })
 })
    })
  },
  uploadImg:function(){
     wx.chooseImage({
       count:9,
       sizeType:['compressed'],
       sourceType:['album'],

       success: res=> {
         const tempFilePaths = res.tempFilePaths;
        this.setData({
          images:this.data.images.concat(tempFilePaths)
        })
     
       },
     })
  },

  onContentChange:function(event){
    this.setData({
      content:event.detail
    })

  },


 change:function(){
   this.setData({
     boolean:!this.data.boolean,
      boolean1: !this.data.boolean1
   })
  //  console.log(this.data.commentList)
  //  if(this.boolean==true){
  //    this.setData({
  //      boolean1: false
  //    })
  //  }
  //  else{
  //    this.setData({
  //      boolean1: true
  //    })
  //  }
  //  console.log("b:" + this.data.boolean + "b1:" + this.data.boolean1)
 },
  change1: function () {
    
    this.setData({
      boolean: !this.data.boolean,
      boolean1: !this.data.boolean1
    })
    //    if (this.boolean1 == true) {
    //   this.setData({
    //     boolean: false
    //   })
    // }
    // else {
    //   this.setData({
    //     boolean: true
    //   })
    // }
    // console.log("b:" + this.data.boolean + "b1:" + this.data.boolean1)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   

 this.setData({
   movieId: this.options.id
 })

  /**
   * 视频详情页
   */
    wx.cloud.callFunction({
      name: "getDetail",
      data: {
       id: this.options.id
}
    }).then(res => {
      
      this.setData({
        movieDetail: JSON.parse(res.result).othersList[options.id],
        recomList: JSON.parse(res.result).othersList.splice(parseInt(options.id)+1,6),
   
      })
   
      // console.log(this.data.recomList)
      // console.log(res);
     
      
    }).catch(err => {
      console.log(err)
    });
    

    let _this=this;
   
    db.collection('comment').where({
      
        movieId: this.data.movieId
     
    }).get({
      success: function (res) {
        // console.log(res.data)
        let list=[...res.data];
       _this.setData({
         commentList:list
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