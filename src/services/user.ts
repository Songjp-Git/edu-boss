import request from '@/util/request'
import qs from 'qs'

interface User {
  phone: string
  password: string
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    // headers: { 'content-type': 'application/x-www-form-urlencoded' },
    // axios data 数据是 qs.stringify(data) 会默认使用application/x-www-form-urlencoded
    // axios data 数据是 object 会默认使用application/json
    // axios data 数据是 formData 会默认使用application/form-data
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/front/user/getInfo'
  })
}
