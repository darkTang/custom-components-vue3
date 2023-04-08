<template>
  <div class="coco-tree-node" v-for="node in treeData" :key="node.id">
    <div
      class="coco-tree-content"
      :style="{'padding-left': node.level * 26 + 'px'}"
      @click="handleNode(node)"
    >
      <i
        class="icon"
        :style="{visibility: node.children? 'visible':'hidden', transform: node.isShow? 'rotate(90deg)':'rotate(0)'}"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
          <path fill="currentColor" d="M384 192v640l384-320.064z" />
        </svg>
      </i>
      <label class="checkbox">
        <input
          type="checkbox"
          :checked="node.checked"
          :indeterminate="node.indeterminate"
          @change="updateNode(node, $event.target.checked)"
          @click.stop
        />
      </label>
      <span class="label">{{node.label}}</span>
    </div>
    <div class="coco-tree-children" v-show="node.isShow">
      <coco-tree-node v-if="node.children" :data="node.children" @node-click="handleNodeClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { treeNodes } from '@/store/global-tree-node'
const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
})
const treeData = reactive(props.data)

const emit = defineEmits(['nodeClick'])

const handleNode = data => {
  handleNodeClick(data)
  data.isShow = !data.isShow
}

const handleNodeClick = data => {
  emit('nodeClick', data)
}

const updateNode = (node, checked) => {
  updateCurrentNodeAndChildrenNodes(node, checked)
  updateParentNode(node)
}
const updateCurrentNodeAndChildrenNodes = (node, checked) => {
  node.checked = checked
  node.indeterminate = false
  if (node.children) {
    for (const child of node.children) {
      updateCurrentNodeAndChildrenNodes(child, checked)
    }
  }
}
const updateParentNode = node => {
  const parent = findParentNode(node)
  if (!parent) {
    return
  }
  let allChecked = true
  let allUnchecked = true
  for (const child of parent.children) {
    if (child.checked) {
      allUnchecked = false
    } else {
      allChecked = false
    }
    if (child.indeterminate) {
      allChecked = false
      allUnchecked = false
    }
  }
  if (allChecked) {
    parent.checked = true
    parent.indeterminate = false
  } else if (allUnchecked) {
    parent.checked = false
    parent.indeterminate = false
  } else {
    parent.checked = false
    parent.indeterminate = true
  }
  parent && updateParentNode(parent)
}
const findParentNode = node => {
  for (const parent of treeNodes) {
    if (parent.children && parent.children.includes(node)) {
      return parent
    }
  }
  return null
}
</script>

<style lang="less" scoped>
.coco-tree-node {
  width: 100%;
  .coco-tree-content {
    display: flex;
    height: 26px;
    cursor: pointer;
    align-items: center;
    &:hover {
      background-color: #f5f7fa;
    }
    .icon {
      svg {
        width: 1em;
        height: 1em;
      }
      padding: 6px;
      font-size: 12px;
      color: #a8abb2;
      transform: rotate(0);
      transition: transform 0.3s ease-in-out;
    }
    .checkbox {
      margin-right: 8px;
    }
    .label {
      font-size: 14px;
      color: #606266;
    }
  }
  .coco-tree-children {
    transition: height 0.3s ease-in-out;
  }
}
</style>