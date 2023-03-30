<template>
  <button class="coco-button" :class="buttonDynamicClass" :disabled="disabled">
    <i class="coco-icon" v-if="icon">
      <component :is="icon" />
    </i>
    <span :class="spanDynamicClass">
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'plain',
  },
  size: {
    type: String,
    default: 'default',
  },
  icon: Object,
  disabled: {
    type: Boolean,
    default: false,
  },
})
const buttonDynamicClass = reactive([{ primary: props.type === 'primary' }, { success: props.type === 'success' }, { warning: props.type === 'warning' }, { danger: props.type === 'danger' }, { info: props.type === 'info' }])
const spanDynamicClass = reactive([{ small: props.size === 'small' }, { large: props.size === 'large' }])

</script>

<style lang="less" scoped>
// 颜色变量
@defaultColor: #fff;
@primaryColor: #409eff;
@successColor: #67c23a;
@warningColor: #e6a23c;
@dangerColor: #f56c6c;
@infoColor: #909399;

// 尺寸大小变量
@smallSize: 12px;
@defaultSize: 14px;
@largeSize: 20px;

.coco-button {
  box-sizing: border-box;
  border: none;
  padding: 8px 10px;
  border-radius: 6px;
  background-color: @defaultColor;
  border: 1px solid #ddd;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: @defaultSize;
    &.small {
      font-size: @smallSize;
    }
    &.large {
      font-size: @largeSize;
    }
  }
  .coco-icon {
    width: 1em;
    height: 1em;
    margin-right: 8px;
    font-size: inherit;
    display: inline-flex;
    svg {
      width: 1em;
      height: 1em;
    }
  }
  &:hover {
    background-color: #eef5fe;
    border: 1px solid #cbe1fc;
    color: #5a9cf8;
  }
  &.primary {
    background-color: @primaryColor;
    border: 1px solid @primaryColor;
    color: #fff;
    &:hover {
      background-color: #79bbff;
      border: 1px solid #79bbff;
      color: #fff;
    }
    &[disabled] {
      cursor: not-allowed;
      background-color: #79bbff;
      border: 1px solid #79bbff;
    }
  }
  &.success {
    background-color: @successColor;
    border: 1px solid @successColor;
    color: #fff;
    &:hover {
      background-color: #95d475;
      border: 1px solid #95d475;
      color: #fff;
    }
    &[disabled] {
      cursor: not-allowed;
      background-color: #95d475;
      border: 1px solid #95d475;
    }
  }
  &.warning {
    background-color: @warningColor;
    border: 1px solid @warningColor;
    color: #fff;
    &:hover {
      background-color: #eebe77;
      border: 1px solid #eebe77;
      color: #fff;
    }
    &[disabled] {
      cursor: not-allowed;
      background-color: #eebe77;
      border: 1px solid #eebe77;
    }
  }
  &.danger {
    background-color: @dangerColor;
    border: 1px solid @dangerColor;
    color: #fff;
    &:hover {
      background-color: #f89898;
      border: 1px solid #f89898;
      color: #fff;
    }
    &[disabled] {
      cursor: not-allowed;
      background-color: #f89898;
      border: 1px solid #f89898;
    }
  }
  &.info {
    background-color: @infoColor;
    border: 1px solid @infoColor;
    color: #fff;
    &:hover {
      background-color: #b1b3b8;
      border: 1px solid #b1b3b8;
      color: #fff;
    }
    &[disabled] {
      cursor: not-allowed;
      background-color: #b1b3b8;
      border: 1px solid #b1b3b8;
    }
  }
}

.coco-button:focus {
  outline: none;
}

.coco-button:active {
  transform: scale(0.98);
}
.coco-button[disabled]:active {
  transform: none;
}
</style>