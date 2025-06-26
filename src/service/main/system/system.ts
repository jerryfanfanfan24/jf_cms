import hyRequest from '@/service'

/** 用户的网络请求*/
export function postUsersListData(queryinfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryinfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

export function newUserData(formData: any) {
  return hyRequest.post({
    url: '/users',
    data: formData
  })
}

export function editUserData(id: number, formData: any) {
  return hyRequest.patch({
    url: `/users/${id}`,
    data: formData
  })
}
/**针对页面的网络请求 去增删改查  */
export function postPageListData(pageName: string, queryinfo: any) {
  return hyRequest.post({
    url: `/${pageName}/list`,
    data: queryinfo
  })
}
export function deletePageById(pageName: string, id: number) {
  return hyRequest.delete({
    url: `/${pageName}/${id}`
  })
}
export function newPageData(pageName: string, formData: any) {
  return hyRequest.post({
    url: `/${pageName}`,
    data: formData
  })
}
export function editPageData(pageName: string, id: number, formData: any) {
  return hyRequest.patch({
    url: `/${pageName}/${id}`,
    data: formData
  })
}
