/**
 * 课程课时相关请求模块
 */

import request from '@/util/request'

export const saveOrUpdateLesson = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/lesson/saveOrUpdate',
    data
  })
}
