import axios from "axios";
let baseUrl = '/api';
// let token = localStorage.getItem("token")
const instance = axios.create({
  baseURL: baseUrl,
  timeout: 1000, //如果接口一秒都没有返回结果，则axios会自动帮我们做一个失败(reject)的处理
  headers: { 'Content-Type': 'application/json'}, //在发送服务端之前，前端设置请求头信息；
});
// const foodadd = axios.create({
//   baseURL: baseUrl,
//   timeout: 1000, //如果接口一秒都没有返回结果，则axios会自动帮我们做一个失败(reject)的处理
//   headers: { 'Content-Type': 'application/json'}, //在发送服务端之前，前端设置请求头信息；
// });
//api 在项目中，通常情况指的是 服务端的一个接口方法；
//一个方法只实现一个功能；所以这个方法就只能是单纯的去调用服务端的接口；
//这样房子的目的就只是为了可读性，和可维护性；
//这个是 登录接口
/**
* @description 登录接口
* @param payload object
* @param payload.username string 用户名 6-20位
* @param payload.password string 密码 6-20位
*/

export const loginApi = function (payload = {}) {
  //payload 是不是服务端要的入参
  //就是网页的预览
  return instance.post('/user/login', payload)
}

/**
 * @description 注册接口
 */
export const registerApi = function (payload ={}){
  return instance.post('/user/register', payload)
}
export const signUp = function (options = {}) {
  return instance.post('/user/register', options)
}

export const foodList = function (foodList = {}) {
  return instance.post('food/list', foodList)
}

export const deleteFood = function (options = {}) {
  return instance.post('food/delete', options)
}
export const foodAdd = function (options = {}) {
  return instance.post('/food/add', options)
}

