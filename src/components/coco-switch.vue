<template>
  <div
    class="coco-switch"
    :class="{'open': modelValue}"
    :style="{'backgroundColor': modelValue? onColor:offColor}"
    @click="switchState"
  >
    <input type="checkbox" />
    <span v-if="activeIcon" class="icon active-icon">
      <component :is="activeIcon" />
    </span>
    <span v-if="inactiveIcon" class="icon inactive-icon">
      <component :is="inactiveIcon" />
    </span>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps({
  offColor: {
    type: String,
    default: '#ccc',
  },
  onColor: {
    type: String,
    default: '#409eff',
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
  activeIcon: Object,
  inactiveIcon: Object,
})

const emit = defineEmits()
const switchState = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<style lang="less" scoped>
.coco-switch {
  position: relative;
  display: inline-flex;
  width: 40px;
  height: 20px;
  border-radius: 10px;
  background-color: #ccc;
  cursor: pointer;
  &.open {
    background-color: #409eff;
    &::after {
      content: '';
      position: absolute;
      top: 2px;
      left: 22px;
      width: 16px;
      height: 16px;
      border-radius: 50%;
      background-color: #fff;
      transition: 0.3s;
    }
  }
  .icon {
    position: absolute;
    top: 0;
    left: 7px;
    width: 12px;
    height: 12px;
    color: #fff;
    &.inactive-icon {
      left: 20px;
    }
  }
  input {
    width: 0;
    height: 0;
    opacity: 0;
  }
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.3s;
  }
}
</style>