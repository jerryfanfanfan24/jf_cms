<template>
  <div>
    <el-form
      ref="formRef"
      :rules="rules"
      :model="account"
      label-width="60px"
      size="large"
      status-icon
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormRules, ElForm } from 'element-plus'
import useLoginStore from '@/stores/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'
// 1.定义整个account数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
// 2.定义校验数据
const rules: FormRules = {
  name: [
    { required: true, message: '请输入账号信息', trigger: 'blur' },
    { min: 6, max: 20, message: '必须是6~20位~', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '请输入3位以上的数字和字母密码',
      trigger: 'blur'
    }
  ]
}
// 3.执行账号的登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      console.log('验证成功')
      // 1.获取用户输入的账号和密码
      const name = account.name
      const password = account.password
      // 2.向服务器发送网络请求(携带账号和密码)
      loginStore.LoginAccountAction({ name, password }).then((res) => {
        // 3.判断是否需要记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      ElMessage.error('Oops, 请输入正确的账号或密码.')
    }
  })
}
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped></style>
