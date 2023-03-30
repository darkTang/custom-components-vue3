<template>
  <div class="coco-skeleton">
    <div class="coco-skeleton-item" :style="{width, height}" :class="{animated, circle}"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  width: {
    type: String,
    default: '100%',
  },
  height: {
    type: String,
    default: '16px',
  },
  animated: {
    type: Boolean,
    default: false,
  },
  circle: {
    type: Boolean,
    default: false
  }
})
</script>

<style lang="less" scoped>
.coco-skeleton {
  width: 100%;
  .coco-skeleton-item {
    border-radius: 5px;
    background: linear-gradient(90deg, #f0f2f5 25%, #e6e8eb 37%, #f0f2f5 63%);
    background-size: 400% 100%;
    &.animated {
      animation: el-skeleton-loading 1.4s ease infinite;
    }
    &.circle {
      border-radius: 50%;
    }
  }
}

@keyframes el-skeleton-loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>