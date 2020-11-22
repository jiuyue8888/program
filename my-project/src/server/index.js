import axios from 'axios';
axios.create({
  baseURL:'/product',
  timeout:30000
});
//const http="https://m.doujinfq.com/"
const http=""
axios.defaults.headers.common['sessionCode'] = localStorage.getItem('sessionCodeh5');

const getForm = (url,data)=>{
  return axios({
      url: http+url,
      method: 'get',
      withCredentials: true,
      params: data,
      //headers: {'content-Type': "application/x-www-form-urlencoded"}
  }).then(res=> res.data).catch(err=>console.log('getFormErr',err));
}
const postForm = (url,data)=>{
  return axios({
      url: http+url,
      method: 'post',
      withCredentials: true,
      data: data,
      //headers: {'content-Type': "application/x-www-form-urlencoded"}
  }).then(res=> res.data).catch(err=>console.log('getFormErr',err));
}

export const login = data=>postForm('/product/mobile/outer/api/login',data);
export const getDevBusiness = data=>getForm('/product/normal/outer/api/getDevBusiness',data);
export const sendLoginMessage = data=>getForm('/product/mobile/outer/api/sendLoginMessage',data);
