<template>
  <div class="login-panel">
    <!-- 顶部标题 -->
    <h1 class="title">JF后台管理系统</h1>

    <!-- 中间切换的tabs -->
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- tab-pane1账号登录 -->
        <el-tab-pane name="first">
          <template #label>
            <div class="label">
              <el-icon>
                <UserFilled />
              </el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <PaneAccount ref="accountRef"></PaneAccount>
        </el-tab-pane>

        <!-- tab-pane2手机登录 -->
        <el-tab-pane name="second">
          <template #label>
            <div class="label">
              <el-icon>
                <Cellphone />
              </el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanePhone></PanePhone>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 底部区域: 记住密码+忘记密码+立即登录 -->
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      size="large"
      type="primary"
      @click="handleLoginBtnClick"
    >
      立即登录
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PaneAccount from './pane-account.vue'
import PanePhone from './pane-phone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref<string>('first')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
watch(isRemPwd, (newvalue) => {
  localCache.setCache('isRemPwd', newvalue)
})
const accountRef = ref<InstanceType<typeof PaneAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'first') {
    console.log('点击了账号登录')
    accountRef.value?.loginAction(isRemPwd.value)
    if (isRemPwd.value) {
      console.log('点击了记住密码')
    }
  } else {
    console.log('点击了手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;
  margin-bottom: 150px;

  .title {
    text-align: center;
    margin-bottom: 5px;
  }

  .label {
    display: flex;
    align-items: center;
    justify-content: center;

    .text {
      margin-left: 5px;
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    margin-top: 10px;
    width: 100%;
  }
}
</style>
