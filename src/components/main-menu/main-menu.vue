<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="../../assets/img/logo.svg" alt="" />
      <h2 v-show="!isFold" class="title">JF管理系统</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="defaultActive"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component :is="item.icon.split('el-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item
                :index="subitem.id + ''"
                @click="handleItemClick(subitem)"
                >{{ subitem.name }}</el-menu-item
              >
            </template>
          </el-sub-menu>
        </template>
        <!-- 1.系统总览 -->
        <!--         <el-sub-menu>
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>系统总览</span>
          </template>
<el-menu-item>核心技术</el-menu-item>
<el-menu-item>商品统计</el-menu-item>
</el-sub-menu> -->
        <!-- 2.系统管理 -->
        <!--         <el-sub-menu>
          <template #title>
            <el-icon>
              <Mug />
            </el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>部门管理</el-menu-item>
          <el-menu-item>菜单管理</el-menu-item>
          <el-menu-item>角色管理</el-menu-item>
        </el-sub-menu> -->
        <!-- 3.商品中心 -->
        <!--        <el-sub-menu>
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item>商品类别</el-menu-item>
          <el-menu-item>商品信息</el-menu-item>
        </el-sub-menu> -->
        <!-- 4.随便聊聊 -->
        <!--         <el-sub-menu>
          <template #title>
            <el-icon>
              <Monitor />
            </el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item>你的故事</el-menu-item>
          <el-menu-item>故事列表</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import useLoginStore from '@/stores/login/login'
import { firstMenu, mapMathToMenu } from '@/utils/map-menus'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
// 0.定义props
defineProps({
  isFold: {
    type: Boolean,
    defalu: false
  }
})
// 1.获取动态的菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
//2.监听item的点击
const router = useRouter()
function handleItemClick(item: any) {
  const url = item.url
  router.push(url)
}
// 3.ElMenu的默认激活选中菜单
const route = useRoute()
const defaultActive = computed(() => {
  const pathMenu = mapMathToMenu(route.path, userMenus)
  return pathMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  height: 100%;
  background-color: #001529;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 10px 8px 10px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
