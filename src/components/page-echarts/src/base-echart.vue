<template>
  <div class="base-echart">
    <div class="echart" ref="echartRef"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { onMounted, ref, watchEffect } from 'vue'
import type { EChartsOption } from 'echarts'
import ChinaJSON from '../data/china.json'

echarts.registerMap('china', ChinaJSON as any)

interface IProps {
  option: EChartsOption
}
const props = defineProps<IProps>()
// 3.echarts相关的逻辑
const echartRef = ref<HTMLElement>()
onMounted(() => {
  //1.初始化ecahrts
  const echartInstance = echarts.init(echartRef.value!, 'light', {
    renderer: 'canvas'
  })
  //2.设置options(配置去echarts官网里复制)
  //第一次执行setOption
  // watchEffect监听option变化, 重新执行
  watchEffect(() => echartInstance.setOption(props.option))
  // 3.监听window缩放
  window.addEventListener('resize', () => {
    echartInstance.resize()
  })
})
</script>

<style lang="less" scoped>
.base-echart {
  color: red;
}
.echart {
  height: 300px;
}
</style>
