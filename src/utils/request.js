import axios from 'axios'
// 导入进度条插件
import nprogress from 'nprogress'
// 还要引入样式
import 'nprogress/nprogress.css'

const request = axios.create({
  // 会拼接到请求的路径的前面，当proxy发现有/api就会去代理，把主机地址http://39.98.123.211拼到
  // /api/xxxx的前面。由于本来的地址就有/api，所以在配置proxy时不要把/api替换为空。
  baseURL: '/api',
  // 如果五秒之后没有响应就是请求超时
  timeout: 5000
})

// 配置请求拦截器
request.interceptors.request.use(
  (config) => {
    // 发起请求之前，开始进度条
    nprogress.start()
    // 在发送请求之前会走这个回调函数，主要用来设置token

    return config
  },
  (e) => {
    // 请求失败之后会走这个回调
    return Promise.reject(e)
  }
)

request.interceptors.response.use(
  function (response) {
    // 响应成功之后，结束进度条
    nprogress.done()

    // 响应成功之后走这里，response就是响应的数据，由于axios会套一层壳，可以直接返回response.data，就是真实数据
    return response.data
  },
  function (e) {
    // 响应失败走这里，大于200的状态码，统一处理报错信息
    return Promise.reject(e)
  }
)

export default request
