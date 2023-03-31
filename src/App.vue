<template>
  <div>
    <!-- Vue3中组件的click事件会自动给组件的根元素添加click事件 -->
    <!-- <coco-button type="success" :icon="Plus">添加员工</coco-button> -->
    <!-- <el-button type="success">你好</el-button> -->
    <!-- <coco-switch
      v-model="flag"
      off-color="green"
      on-color="pink"
      :active-icon="Check"
      :inactive-icon="Close"
    />-->

    <!-- <coco-skeleton width="400px" style="margin: 10px" animated /> -->
    <!-- <coco-skeleton width="400px" style="margin: 10px" animated />
    <coco-skeleton width="400px" style="margin: 10px" animated />
    <coco-skeleton width="200px" height="200px" style="margin: 10px" circle animated />-->
    <!-- <el-skeleton animated /> -->
    <coco-calendar :have-month="true" lang="zh" />
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload, Plus, Check, Close } from '@element-plus/icons-vue'
import CocoButton from '@/components/coco-button.vue'
import CocoSwitch from '@/components/coco-switch.vue'
import CocoSkeleton from '@/components/coco-skeleton.vue'
import CocoCalendar from '@/components/coco-calendar.vue'
import { ref } from 'vue'
</script>
<style scoped>
div {
  text-align: center;
}

button {
  margin-top: 50px;
}
</style>

