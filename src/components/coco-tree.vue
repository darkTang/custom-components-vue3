<template>
  <div class="coco-tree">
    <coco-tree-node :data="data" @node-click="handleNodeClick" />
  </div>
</template>
<script setup lang="ts">
import CocoTreeNode from './coco-tree-node.vue'
import { treeNodes } from '@/store/global-tree-node'
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})

const emit = defineEmits(['nodeClick'])

// 递归给每一层添加层级
const addLevel = (data, level) => {
  data.forEach(node => {
    node.level = level
    level++
    node.children && addLevel(node.children, level)
    level--
  })
}
addLevel(props.data, 0)

// 递归将树形数据扁平化
const flatten = data => {
  data.forEach(node => {
    treeNodes.push(node)
    node.children && flatten(node.children)
  })
}
flatten(props.data)

const handleNodeClick = data => {
  emit('nodeClick', data)
}
</script>


<style lang="less" scoped>
.coco-tree {
  width: 100%;
}
</style>