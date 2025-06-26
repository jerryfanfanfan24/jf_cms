<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button v-if="isCreate" type="primary" @click="handleNewUserClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table
        :data="pageList"
        border
        style="width: 100%"
        v-bind="contentConfig.childrenTree"
      >
        <template v-for="item in contentConfig.propsList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'handler'">
            <el-table-column v-bind="item" align="center">
              <template #default="scope">
                <el-button
                  v-if="isUpdate"
                  size="small"
                  type="primary"
                  text
                  icon="Edit"
                  @click="handleEditClick(scope.row)"
                  >编辑</el-button
                >
                <el-button
                  v-if="isDelete"
                  size="small"
                  type="danger"
                  text
                  icon="Delete"
                  @click="handleDeleteClick(scope.row.id)"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot
                  :name="item.slotName"
                  v-bind="scope"
                  :prop="item.prop"
                  hName="why"
                ></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column v-bind="item" align="center"></el-table-column>
          </template>
        </template>
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
import usePermissions from '@/hooks/usePermissions'
import useSystemStore from '@/stores/main/system/system'
import { formatUTC } from '@/utils/format'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    propsList: any[]
    childrenTree?: any
  }
}
const props = defineProps<IProps>()

//定义事件
const emit = defineEmits(['newClick', 'editClick'])
//0.获取是否有对应的增删改查的权限
// const isCreate = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:create`)
// )
// const isDelete = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:delete`)
// )
// const isUpdate = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:update`)
// )
// const isQuery = permissions.find((item) =>
//   item.includes(`${props.contentConfig.pageName}:query`)
// )
const isCreate = usePermissions(`${props.contentConfig.pageName}:create`)
const isDelete = usePermissions(`${props.contentConfig.pageName}:delete`)
const isUpdate = usePermissions(`${props.contentConfig.pageName}:update`)
const isQuery = usePermissions(`${props.contentConfig.pageName}:query`)
//1.发起action,请求userList的数据
const SystemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
SystemStore.$onAction(({ name, after }) => {
  after(() => {
    if (
      name === 'deletePageByIdAction' ||
      name === 'newPageDataAction' ||
      name === 'editPageDataAction'
    ) {
      currentPage.value = 1
    }
  })
})
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
//4.定义函数,用于发送网络请求;  如果角色管理页面中 isQuery的按钮查询权限为false,那么直接return,就完全不需要发生网络请求数据.
function fetchPageListData(searchForm: any = {}) {
  if (!isQuery) return
  //1.获取offset/size
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size
  const PageInfo = { size, offset }
  //2.发送网络请求
  const queryInfo = { ...PageInfo, ...searchForm }
  SystemStore.postPageListAction(props.contentConfig.pageName, queryInfo)
}
// 5.删除/增加/编辑的操作
function handleDeleteClick(id: number) {
  SystemStore.deletePageByIdAction(props.contentConfig.pageName, id)
}
function handleNewUserClick() {
  emit('newClick')
}
function handleEditClick(rowData: any) {
  emit('editClick', rowData)
}
//6.监听systemStore里面的actions被执行  (要求要在网络请求数据前面 去监听)
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
