<template>
  <div class="pie-echart">
    <baseEchart :option="option"></baseEchart>
  </div>
</template>

<script setup lang="ts">
import type { EChartsOption } from 'echarts'
import baseEchart from './base-echart.vue'
import { computed } from 'vue'
interface IEchartValueType {
  value: number
  name: string
}
interface IProps {
  pieData: IEchartValueType[]
}
const props = defineProps<IProps>()
const option = computed<EChartsOption>(() => {
  return {
    // 手指放上去的时候显示的文本
    tooltip: {
      trigger: 'item'
    },
    // 图例:
    legend: {
      orient: 'horizontal',
      left: 'left'
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '50%',
        bottom: '-10%',
        data: props.pieData,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  }
})
</script>
<style lang="less" scoped>
.pie-echart {
  color: red;
}
</style>
