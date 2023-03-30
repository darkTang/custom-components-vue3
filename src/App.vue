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
    /> -->
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload, Plus, Check, Close } from '@element-plus/icons-vue'
import CocoButton from '@/components/coco-button.vue'
import CocoSwitch from '@/components/coco-switch.vue'
import { ref } from 'vue'

let flag = ref(false)
</script>
<style scoped>
div {
  text-align: center;
}

button {
  margin-top: 50px;
}
</style>

