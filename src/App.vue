<template>
  <div>
    <coco-button type="primary" size="small" :icon="Plus">添加员工</coco-button>
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload, Plus } from '@element-plus/icons-vue'
</script>
<style scoped>
div {
  text-align: center;
}

button {
  margin-top: 50px;
}
</style>

