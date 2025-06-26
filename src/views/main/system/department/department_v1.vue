<template>
  <div class="department">
    <page-search
      @queryClick="queryClick"
      @resetClick="resetClick"
    ></page-search>
    <page-content
      @newClick="newClick"
      @editClick="editClick"
      ref="contentRef"
    ></page-content>
    <pageModal ref="modalRef"></pageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from './cpns/page-search.vue'
import pageContent from './cpns/page-content.vue'
import pageModal from './cpns/page-modal.vue'
import { ref } from 'vue'
// 点击search, content的操作
const contentRef = ref<InstanceType<typeof pageContent>>()
function queryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function resetClick() {
  contentRef.value?.fetchPageListData()
}
// 点击content, modal的操作
const modalRef = ref<InstanceType<typeof pageModal>>()
function newClick() {
  modalRef.value?.setModalVisible()
}
function editClick(rowData: any) {
  modalRef.value?.setModalVisible(false, rowData)
}
</script>

<style scoped></style>
