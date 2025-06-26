<template>
  <div class="content">
    <div class="header">
      <h3 class="title">部门列表</h3>
      <el-button type="primary" @click="handleNewUserClick">新建部门</el-button>
    </div>
    <div class="table">
      <el-table :data="pageList" border style="width: 100%">
        <el-table-column type="selection" width="50px" align="center" />
        <el-table-column
          type="index"
          label="序号"
          width="=60px"
          align="center"
        />

        <el-table-column
          prop="name"
          label="部门名称"
          width="150px"
          align="center"
        />
        <el-table-column
          prop="leader"
          label="部门领导"
          width="150px"
          align="center"
        />
        <el-table-column
          prop="parentId"
          label="上级部门"
          width="150px"
          align="center"
        />

        <el-table-column prop="createAt" label="创建时间" align="center">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column prop="updateAt" label="更新时间" align="center">
          <template #default="scope">{{
            formatUTC(scope.row.updateAt)
          }}</template>
        </el-table-column>

        <el-table-column label="操作" width="150px" align="center">
          <template #default="scope">
            <el-button
              size="small"
              type="primary"
              text
              icon="Edit"
              @click="handleEditClick(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="small"
              type="danger"
              text
              icon="Delete"
              @click="handleDeleteClick(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
//定义事件
const emit = defineEmits(['newClick', 'editClick'])
//1.发起action,请求userList的数据
const SystemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
//2.获取userList数据,进行展示
// const usersList = SystemStore.usersList 有问题,第一次数据为空
const { pageList, pageTotalCount } = storeToRefs(SystemStore)
//3.分页器,页码相关的逻辑
function handleSizeChange() {
  fetchPageListData()
}
function handleCurrentChange() {
  fetchPageListData()
}
//4.定义函数,用于发送网络请求
function fetchPageListData(searchForm: any = {}) {
  //1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const PageInfo = { size, offset }
  //2.发送网络请求
  const queryInfo = { ...PageInfo, ...searchForm }
  SystemStore.postPageListAction('department', queryInfo)
}
// 5.删除/增加/编辑的操作
function handleDeleteClick(id: number) {
  SystemStore.deletePageByIdAction('department', id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditClick(rowData: any) {
  emit('editClick', rowData)
}

defineExpose({ fetchPageListData })
</script>

<style lang="less" scoped>
.content {
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 10px;

    .title {
      font-size: 22px;
    }
  }
}

.el-table {
  .el-table__cell {
    padding: 12px 0;
  }

  .el-button {
    margin-left: 0;
    padding: 5px 8px;
  }
}

.pagination {
  display: flex;
  justify-content: right;
  margin-top: 10px;
}
</style>
