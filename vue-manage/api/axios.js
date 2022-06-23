//封装的一个工具类,对axios二次封装
import axios from 'axios'
import config from '../config/index'
//判断当前是否为生产环境，如果是开发环境就变为生产环境
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

//工具类
 class HttpRequest{
        constructor(baseUrl){
            //初始化过程
             this.baseUrl = baseUrl
        }
        //用于定义axios的相关配置
        getInsideConfig(){
            const config ={
                baseUrl:this.baseUrl,
                //请求头信息
                header:{}
            }
            return config
        }
        //拦截器
        interceptor(instance){
            // 添加请求拦截器   instance是axios创建的实例
                instance.interceptors.request.use(function (config) {
                    // 在发送请求之前做些什么
                    return config;
                }, function (error) {
                    // 对请求错误做些什么
                    return Promise.reject(error);
                });

                // 添加响应拦截器
                instance.interceptors.response.use(function (response) {
                    // 对响应数据做点什么
                    console.log(response);
                    return response.data;
                }, function (error) {
                    // 对响应错误做点什么
                    return Promise.reject(error);
                });
        }
        request(options){
             const instance = axios.create()
             options = {...this.getInsideConfig(),...options}
             this.interceptor(instance)
             return instance(options)
        }
}
export default new HttpRequest(baseUrl)
