<template>
  <div class="user">
    <user-search
      @queryClick="queryClick"
      @resetClick="resetClick"
    ></user-search>
    <user-content
      ref="contentRef"
      @newClick="newClick"
      @editClick="editClick"
    ></user-content>
    <UserModal ref="modelRef" />
  </div>
</template>

<script setup lang="ts">
import userSearch from './c-cpns/user-search.vue'
import userContent from './c-cpns/user-content.vue'
import { ref } from 'vue'
import UserModal from './c-cpns/user-modal.vue'

//对content组件进行操作,需要先拿到组件元素
const contentRef = ref<InstanceType<typeof userContent>>()
function queryClick(searchForm: any) {
  contentRef.value?.fetchUserListData(searchForm)
}
function resetClick() {
  contentRef.value?.fetchUserListData()
}
//对model组件进行操作,需要先拿到 组件元素
const modelRef = ref<InstanceType<typeof UserModal>>()
function newClick() {
  modelRef.value?.setModalVisible()
}
function editClick(rowData: any) {
  modelRef.value?.setModalVisible(false, rowData)
}
</script>

<style lang="less" scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
