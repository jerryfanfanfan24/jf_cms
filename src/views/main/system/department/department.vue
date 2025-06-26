<template>
  <div class="department">
    <page-search
      :searchConfig="searchConfig"
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    ></page-search>
    <page-content
      :contentConfig="contentConfig"
      @newClick="handleNewClick"
      @editClick="handleEditClick"
      ref="contentRef"
    >
      <template #leader="scope">
        <span class="leader">哈哈哈: {{ scope.row[scope.prop] }}</span>
        <span>{{ scope.hName }}</span>
      </template>
      <template #parent="scope">
        <span class="parent">呵呵呵: {{ scope.row[scope.prop] }}</span>
      </template>
    </page-content>
    <pageModal :modalConfig="modalConfigRef" ref="modalRef"></pageModal>
  </div>
</template>

<script setup lang="ts" name="department">
import pageSearch from '@/components/page-search/page-search.vue'
import pageContent from '@/components/page-content/page-content.vue'
import pageModal from '@/components/page-modal/page-modal.vue'

import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig from './config/modal.config'

import { computed, ref } from 'vue'
import useMainStore from '@/stores/main/main'
import usePageContent from '@/hooks/usePageContent'
import usePageModal from '@/hooks/usePageModal'
//对modalConfig进行操作,compute计算属性可以动态展示数据,map映射拿到自己想要的label,value.
const modalConfigRef = computed(() => {
  const mainStore = useMainStore()
  const departments = mainStore.entireDepartments.map((item) => {
    return { label: item.name, value: item.id }
  })
  modalConfig.formItems.forEach((item) => {
    if (item.prop === 'parentId') {
      item.options.push(...departments)
    }
  })
  return modalConfig
})

// setup相同的逻辑的抽取: hooks
// 点击search, content的操作
const { contentRef, handleQueryClick, handleResetClick } = usePageContent()

// 点击content, modal的操作
const { modalRef, handleNewClick, handleEditClick } = usePageModal()
</script>

<style scoped>
.leader {
  color: red;
}

.parent {
  color: blue;
}
</style>
