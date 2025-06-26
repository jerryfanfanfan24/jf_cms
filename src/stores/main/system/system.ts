import {
  deletePageById,
  deleteUserById,
  editPageData,
  editUserData,
  newPageData,
  newUserData,
  postPageListData,
  postUsersListData
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
import useMainStore from '../main'

const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    usersList: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    async postUsersListAction(queryinfo: any) {
      const userListResult = await postUsersListData(queryinfo)
      const { totalCount, list } = userListResult.data
      this.usersList = list
      this.usersTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 1.删除数据操作
      const deleteResult = await deleteUserById(id)
      console.log(deleteResult)
      // 2.重新请求新的数据
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async newUserDataAction(formData: any) {
      // 1.创建新的用户
      const newResult = await newUserData(formData)
      console.log(newResult)
      // 2.重新请求新的数据
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    async editUserDataAction(id: number, formData: any) {
      //1.编辑新的用户
      const editResult = await editUserData(id, formData)
      console.log(editResult)
      //2.重新请求新的数据
      this.postUsersListAction({ size: 10, offset: 0 })
    },
    //上面的数据只是针对用户的
    /**下面的是针对页面的数据  去增删改查 */
    async postPageListAction(pageName: string, queryinfo: any) {
      const pageListResult = await postPageListData(pageName, queryinfo)
      const { totalCount, list } = pageListResult.data
      this.pageList = list
      this.pageTotalCount = totalCount
    },
    async deletePageByIdAction(pageName: string, id: number) {
      const deleteResult = await deletePageById(pageName, id)
      console.log(deleteResult)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      //获取完整的数据,给除了用户页面的其他三个页面 在增删改 这三种操作后去 更新最新的完整数据.
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async newPageDataAction(pageName: string, formData: any) {
      const newResult = await newPageData(pageName, formData)
      console.log(newResult)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      //获取完整的数据,给除了用户页面的其他三个页面 在增删改 这三种操作后去 更新最新的完整数据.
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    },
    async editPageDataAction(pageName: string, id: number, formData: any) {
      const editResult = await editPageData(pageName, id, formData)
      console.log(editResult)
      this.postPageListAction(pageName, { size: 10, offset: 0 })
      //获取完整的数据,给除了用户页面的其他三个页面 在增删改 这三种操作后去 更新最新的完整数据.
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()
    }
  }
})
export default useSystemStore
