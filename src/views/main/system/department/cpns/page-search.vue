<template>
  <div class="search">
    <!-- 1.输入搜索关键字的表单 -->
    <el-form :model="searchForm" ref="formRef" label-width="80px" size="large">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-form-item prop="name" label="部门名称">
            <el-input
              v-model="searchForm.name"
              placeholder="请输入查询的部门名称"
          /></el-form-item>
        </el-col>

        <el-col :span="8">
          <el-form-item prop="realname" label="部门领导">
            <el-input
              v-model="searchForm.leader"
              placeholder="请输入查询的部门领导名字"
            /> </el-form-item
        ></el-col>

        <el-col :span="8">
          <el-form-item prop="createAt" label="创建时间">
            <el-date-picker
              v-model="searchForm.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            /> </el-form-item
        ></el-col>
      </el-row>
    </el-form>
    <!-- 2.重置和查询按钮 -->
    <div class="btns">
      <el-button icon="Refresh" @click="handleResetClick">重置</el-button>
      <el-button type="primary" icon="Search" @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ElForm } from 'element-plus'
import { reactive, ref } from 'vue'
// 定义自定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
// 定义form的数据
const searchForm = reactive({
  name: '',
  leader: '',
  createAt: ''
})
const formRef = ref<InstanceType<typeof ElForm>>()
//重置操作
function handleResetClick() {
  // 1.form中的数据全部重置
  formRef.value?.resetFields()
  //重置操作, 会触发定义的resetClick事件
  emit('resetClick')
}
//查询操作, 会触发定义的queryClick事件,并且带参数searchForm(整个search表单的数据)
function handleQueryClick() {
  emit('queryClick', searchForm)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px 30px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 0 50px 10px 0;

    .el-button {
      height: 36px;
    }
  }
}
</style>
