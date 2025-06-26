import { LOGIN_TOKEN } from '@/global/constants'
import router from '@/router'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/service/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import { mapMenustoPermissions, mapMenusToRoutes } from '@/utils/map-menus'
import { defineStore } from 'pinia'
import useMainStore from '../main/main'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
  permissions: string[] //数组类型, 并且数组中存放的字符串类型
}
const useLoginStore = defineStore('login', {
  state: (): ILoginState => ({
    token: '',
    userInfo: {},
    userMenus: [],
    permissions: []
  }),
  actions: {
    async LoginAccountAction(account: IAccount) {
      //1.账号登录, 获取token等信息
      const loginResult = await accountLoginRequest(account)
      const id = loginResult.data.id
      this.token = loginResult.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)
      //2.获取登录用户的详细信息(role信息)
      const getUserInfoResult = await getUserInfoById(id)
      const userInfo = getUserInfoResult.data
      this.userInfo = userInfo
      //3.根据角色请求用户的权限(菜单menus)
      const userMenusResult = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusResult.data
      this.userMenus = userMenus
      //4.进行本地缓存
      localCache.setCache('userInfo', userInfo)
      localCache.setCache('userMenus', userMenus)
      // 5.请求所有roles/departments数据
      const mainStore = useMainStore()
      mainStore.fetchEntireDataAction()

      //重要:获取登录用户的所有按钮的权限
      const permissions = mapMenustoPermissions(userMenus)
      this.permissions = permissions

      //重要:动态的添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))

      //5.页面跳转到main页面
      router.push('/main')
    },
    loadLocalCacheAction() {
      // 1.用户进行刷新默认加载数据
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache('userInfo')
      const userMenus = localCache.getCache('userMenus')
      if (token && userInfo && userMenus) {
        this.token = token
        this.userInfo = userInfo
        this.userMenus = userMenus

        // 1..请求所有roles/departments数据
        const mainStore = useMainStore()
        mainStore.fetchEntireDataAction()

        // 2.在本地缓存中获取按钮的权限
        const permissions = mapMenustoPermissions(userMenus)
        this.permissions = permissions

        // 3.动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
export default useLoginStore
