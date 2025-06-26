<template>
  <div class="modal">
    <el-dialog
      v-model="DialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" width="80px" size="large">
          <!-- 1.用户名 -->
          <el-form-item label="用户名" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <!-- 2.真实姓名 -->
          <el-form-item label="真实姓名" prop="realname">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <!--3.密码  -->
          <el-form-item v-if="isNewRef" label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <!-- 4.手机号码 -->
          <el-form-item label="手机号码" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <!-- 5.选择角色 -->
          <el-form-item label="选择角色" prop="roleId">
            <!-- <el-input v-model="formData.roleId" placeholder="请选择角色" /> -->
            <el-select v-model="formData.roleId" placeholder="请选择角色">
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <!-- 6.选择部门 -->
          <el-form-item label="选择部门" prop="departmentId">
            <!-- <el-input
              v-model="formData.departmentId"
              placeholder="请选择部门"
            /> -->
            <el-select v-model="formData.departmentId" placeholder="请选择部门">
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="DialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import useMainStore from '@/stores/main/main'
import useSystemStore from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { reactive, ref } from 'vue'
// 1.定义内部的属性
const DialogVisible = ref(false)
const formData = reactive<any>({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})
const isNewRef = ref(true)
const editData = ref()
//2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
// 2.定义设置dialogVisible方法
function setModalVisible(isNew: boolean = true, rowData?: any) {
  DialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew && rowData) {
    for (const key in formData) {
      formData[key] = rowData[key]
    }
    editData.value = rowData
  } else {
    for (const key in formData) {
      formData[key] = ''
    }
    editData.value = null
  }
}
// 3.点击了确定的逻辑
function handleConfirmClick() {
  //先关闭组件
  DialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    //编辑用户数据,要传入两个参数
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 创建新的用户,记得要给newUserDataAction传入参数 formData
    systemStore.newUserDataAction(formData)
  }
}
// 暴露的属性和方法
defineExpose({ setModalVisible })
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
