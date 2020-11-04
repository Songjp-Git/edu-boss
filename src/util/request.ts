import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import qs from 'qs'
import router from '@/router'

const request = axios.create({
  // 配置项
  // baseUrl
})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    // 同一个refresh_token，该接口只能使用一次！！！否者会报错
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = store.state.user.access_token
  }
  // 必须返回 config
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 刷新token状态
let isRefreshing = false
// 刷新token状态期间被挂起的请求
let requests: any [] = []

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 响应状态码 2xx 会进入到这里
  return response
}, async function (error) {
  // 对响应错误做点什么
  // 响应状态码 不是2xx 或 出现其他问题，会进入到这里
  if (error.response) {
    // 有响应 但是响应状态码 不是2xx
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      // 无token 就直接去登陆页
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 token 失败')
          }
          store.commit('setUser', res.data.content)
          // 刷新 toekn 成功， 就讲所有挂起的请求执行掉
          requests.forEach(cb => cb())
          // 将执行过的 请求数组 清空
          requests = []
          return request(error.config)
        }).catch(error => {
          // 清空token
          store.commit('setUser', null)
          // 跳转首页
          redirectLogin()
          // 传递 错误
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }
      // 在刷新 token 期间用 promise 讲其他请求挂起
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
      // token 无效 （无 token、token错误、token过期等等）
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('资源不存在')
    } else if (status >= 500) {
      Message.error('服务器错误，请联系管理员')
    }
  } else if (error.request) {
    // 请求发出后，无响应。 一般可能是接口超时或者断网了
    Message.error('请求超时， 请刷新重试')
  } else {
    // 设置请求的时候出了不可预料的错误
    Message.error(error.message)
  }
  // 请求错误继续抛出， 交给下一个调用者
  return Promise.reject(error)
})

export default request
