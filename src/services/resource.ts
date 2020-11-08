import request from '@/util/request'

export interface Filter {
  'id'?: number
  'name'?: string
  'startCreateTime'?: string
  'url'?: string
  'categoryId'?: number
  'endCreateTime'?: string
  'current'?: number
  'size'?: number
}

export interface Resource {
  'id'?: number
  'name'?: string
  'categoryId'?: number
  'url'?: string
  'description'?: string
}

export interface Order {
  'id'?: number
  'name'?: string
  'sort'?: number
}

export const getResourcePagesgin = (data: Filter) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

export const saveOrUpdate = (data: Resource) => {
  return request({
    method: 'POST',
    url: '/boss/resource/saveOrUpdate',
    data
  })
}

export const getCategoryAll = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}

export const getResourceById = (id: number) => {
  return request({
    method: 'GET',
    url: '/boss/resource/' + id
  })
}

export const deleteResourceById = (id: number) => {
  return request({
    method: 'DELETE',
    url: '/boss/resource/' + id
  })
}

export const saveOrderUpdate = (data: Order) => {
  return request({
    method: 'POST',
    url: '/boss/resource/category/saveOrderUpdate',
    data
  })
}

export const deleteDategory = (id: number) => {
  return request({
    method: 'DELETE',
    url: '/boss/resource/category/' + id
  })
}
