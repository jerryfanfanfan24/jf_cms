<template>
  <div class="modal">
    <el-dialog
      v-model="DialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="500"
      center
    >
      <div class="form">
        <el-form :model="formData" width="80px" size="large">
          <!-- 1.部门名称 -->
          <el-form-item label="部门名称" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <!-- 2.部门领导 -->
          <el-form-item label="部门领导" prop="leader">
            <el-input
              v-model="formData.leader"
              placeholder="请输入部门领导姓名"
            />
          </el-form-item>
          <!-- 6.选择上级部门 -->
          <el-form-item label="选择上级部门" prop="parentId">
            <el-select v-model="formData.parentId" placeholder="请选择上级部门">
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
  leader: '',
  parentId: ''
})
const isNewRef = ref(true)
const editData = ref()
//2.获取roles/departments数据
const mainStore = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStore)
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
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 创建新的用户,记得要给newUserDataAction传入参数 formData
    systemStore.newPageDataAction('department', formData)
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
