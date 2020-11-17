/**
 * 资源分类相关请求模块
 */
import request from '@/util/request'

export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
