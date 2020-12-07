import axios from 'axios';

axios.create({
  baseURL:'/product',
  timeout:30000
});
//const http="https://m.doujinfq.com/"
const http=""

if(window.location.href.indexOf('/admin')==-1){
axios.defaults.headers.common['sessionCode'] = localStorage.getItem('sessionCodeh5');
}
console.log(localStorage.getItem('sessionCodeh5'))
const formObj = (params)=>{
    var formData = new FormData();
    for (let k in params) {
        formData.append(k, params[k]);
    }
    return formData
}

const getForm = (url,data)=>{
  return axios({
      url: http+url,
      method: 'get',
      withCredentials: true,
      params: data,
      headers: {'sessionCode': window.localStorage.getItem('sessionCodeh5')}
  }).then(res=> {

    if(res.data.code=='905' || res.data.code=='919'){
      window.location.href = './#/login'
    }else{
      return res.data;
    }
  }).catch(err=>console.log('getFormErr',err));
}
const postForm = (url,data)=>{
  return axios({
      url: http+url,
      method: 'post',
      withCredentials: true,
      data: data,
      headers: {'sessionCode': window.localStorage.getItem('sessionCodeh5')}
  }).then(res=> {
    if(res.data.code=='905' || res.data.code=='919'){
      window.location.href = './#/login'
    }else{
      return res.data;
    }
  }).catch(err=>console.log('getFormErr',err));
}

export const login = data=>postForm('/product/mobile/outer/api/login',data);

//获取商户信息接口
export const getDevBusiness = data=>getForm('/product/normal/outer/api/getDevBusiness',data);
export const sendLoginMessage = data=>getForm('/product/mobile/outer/api/sendLoginMessage',data);
//图片上传接口
export const upload = data=>postForm('/product/mobile/outer/api/upload',formObj(data));
//h5获取商户课程列表接口
export const getDevCourseList = data=>getForm('/product/normal/outer/api/getDevCourseList',data);
//h5生产订单接口
export const createOrder = data=>postForm('/product/mobile/outer/api/createOrder',data);
//h5获取用户订单列表接口
export const getUserOrderList = data=>getForm('/product/mobile/outer/api/getUserOrderList',data);
//h5用户删除订单接口
export const deleteOrder = data=>postForm('/product/mobile/outer/api/deleteOrder',formObj(data));
//绑定银行卡生成预订单接口
export const bindcard = data=>postForm('/product/mobile/outer/api/bindcard',formObj(data));
