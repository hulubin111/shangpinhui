import request from '@/utils/request.js'
// 三级联动
export const categoryList = () => {
  return request.get('/product/getBaseCategoryList')
}
