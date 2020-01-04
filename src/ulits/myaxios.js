import axios from 'axios'
import { Toast } from 'antd-mobile';
import { API_URL } from "./baseulr"

//设置基准路径
const Axios=axios.create({
    baseURL:API_URL
})


// 添加请求拦截器
Axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //请求前加loading
    Toast.loading('Loading...', 60*60*60,null);
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
Axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //数据回来后将提示隐藏
    Toast.hide()
    return response.data;
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default Axios