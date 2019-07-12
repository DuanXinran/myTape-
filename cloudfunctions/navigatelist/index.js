// 云函数入口文件
const cloud = require('wx-server-sdk')
var rp = require('request-promise');
cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {


  return rp('https://easy-mock.com/mock/5ce7a0f014a24448656b19af/bilibili/Navigate')
    .then(function (res) {
      console.log(event.start);
      console.log(res);
      return res;
    })
    .catch(function (err) {
      console.log(err);
    });
}

