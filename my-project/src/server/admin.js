import axios from 'axios';
axios.create({
  baseURL:'/product',
  timeout:30000
});
//const http="https://m.doujinfq.com/"
const http=""

if(window.location.href.indexOf('/admin')>0){
  axios.defaults.headers.common['sessionCode'] = window.localStorage.getItem('sessionCode');

}else{
  axios.defaults.headers.common['sessionCode'] = window.localStorage.getItem('sessionCodeh5');
}

const getForm = (url,data)=>{
  return axios({
      url: http+url,
      method: 'get',
      withCredentials: true,
      params: data,
     headers: {'sessionCode': window.localStorage.getItem('sessionCode')}
  }).then(res=> {
    if(res.data.code=='905' || res.data.code=='919'){
      window.location.href = './#/admin'
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
      headers: {'sessionCode': window.localStorage.getItem('sessionCode')}
  }).then(res=> {

    if(res.data.code=='905' || res.data.code=='919'){
      window.location.href = './#/admin'
    }else{
      return res.data;
    }
  }).catch(err=>console.log('getFormErr',err));
}

export const login = data=>postForm('/product/web/inner/api/login',data);
export const logout = data=>postForm('/product/web/inner/api/logout',data);

//管理端用户删除接口
//export const deleteDevBusiness = data=>postForm('/product/web/inner/api/deleteDevBusiness',{id:data});
export const deleteDevBusiness = data=>{
  return axios({
      url: http+'/product/web/inner/api/deleteDevBusiness?id='+data,
      method: 'post',
      withCredentials: true,
      //data: data,
      headers: {'sessionCode': window.localStorage.getItem('sessionCode')}
  }).then(res=> res.data).catch(err=>console.log('getFormErr',err));
};
//管理端用户新增接口
export const createDevBusiness = data=>postForm('/product/web/inner/api/createDevBusiness',data);
//管理端用户编辑接口
export const updateDevBusiness = data=>postForm('/product/web/inner/api/updateDevBusiness',data);
//管理端课程删除接口
//export const deleteCourse = data=>postForm('/product/web/inner/api/deleteCourse',data);
export const deleteCourse = data=>{
  return axios({
        url: http+'/product/web/inner/api/deleteCourse?id='+data,
        method: 'post',
        withCredentials: true,
        //data: data,
        headers: {'sessionCode': window.localStorage.getItem('sessionCode')}
    }).then(res=> res.data).catch(err=>console.log('getFormErr',err));
};
//理端课程新增接口
export const createCourse = data=>postForm('/product/web/inner/api/createCourse',data);
//管理端课程编辑接口
export const updateCourse = data=>postForm('/product/web/inner/api/updateCourse',data);
//管理端订单删除接口
export const deleteOrder = data=>{
  return axios({
      url: http+'/product/web/inner/api/deleteOrder?id='+data,
      method: 'post',
      withCredentials: true,
      //data: data,
      headers: {'sessionCode': window.localStorage.getItem('sessionCode')}
  }).then(res=> res.data).catch(err=>console.log('getFormErr',err));
};
//管理端订单审核接口
//export const verify = data=>postForm('/product/web/inner/api/verify',data);

export const verify = data=>{
  return axios({
      url: http+'/product/web/inner/api/verify?id='+data.id+'&verifyStatus='+data.verifyStatus,
      method: 'post',
      withCredentials: true,
      //data: data,
      headers: {'sessionCode': window.localStorage.getItem('sessionCode')}
  }).then(res=> res.data).catch(err=>console.log('getFormErr',err));
};
//理端订单数据导出接口


//3、管理端用户查询接口
export const getDevBusinessList = data=>getForm('/product/web/inner/api/getDevBusinessList',data);
//管理端订单查询接口
export const getDveOrderList = data=>getForm('/product/web/inner/api/getDveOrderList',data);
//管理端获取课程列表接口
export const getDevCourseList = data=>getForm('/product/web/inner/api/getDevCourseList',data);
export const getExamFashionConfigList = data=>getForm('/product/web/inner/api/getExamFashionConfigList',data);
