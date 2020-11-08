import request from '@/util/request'

interface Menu {
  id?: number
  parentId: number
  name: string
  href: string
  icon?: string
  orderNum?: number
  description?: string
  shown?: boolean
}

export const createOrUpdateMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    // 不用 qs 处理就是 application/json
    data
  })
}

export const getEditMenuInfo = (id: string | number = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

export const getAllMenu = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: '/boss/menu/' + id
  })
}
