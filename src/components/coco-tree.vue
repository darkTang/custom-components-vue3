<template>
  <div class="coco-tree">
    <div class="coco-tree-node" v-for="item in treeData" :key="item.label">
      <div
        class="coco-tree-content"
        :style="{'padding-left': item.depth * 20 + 'px'}"
        @click.stop="toggle(item,treeData)"
      >
        <i
          class="icon"
          :class="{rotate: item.flag}"
          :style="{color: item.children? '':'transparent'}"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
            <path fill="currentColor" d="M384 192v640l384-320.064z" />
          </svg>
        </i>
        <span class="label">{{item.label}}</span>
      </div>
      <div class="coco-tree-children" v-show="item.flag" ref="cocoTreeChildren">
        <coco-tree v-if="item.children" :data="item.children" @node-click="handleNodeClick" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type } from 'os'
import { reactive, ref, nextTick, getCurrentInstance, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
  props: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['nodeClick'])
const cocoTreeChildren = ref(null)
const treeData = ref([])
function handleData(data, num) {
  if (typeof data !== 'object') return data
  let target
  if (Array.isArray(data)) {
    target = []
  } else {
    target = {}
    target.bgColor = false
    target.depth = num
    target.flag = false
  }
  if (data.children) num++
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      target[key] = handleData(data[key], num)
    }
  }
  return target
}

onMounted(() => {
  treeData.value = handleData(props.data, 0)
})

const toggle = (item, treeData) => {
  // function toggleProperty(data) {
  //   data.forEach(item => {
  //     item.children && toggleProperty(item.children)
  //     item.bgColor = false
  //   })
  // }
  // toggleProperty(window.treeData)
  // item.bgColor = true
  // console.log(window.treeData)
  item.flag = !item.flag

  emit('nodeClick', deleteProperties(item))
  function deleteProperties(obj) {
    if (typeof obj !== 'object') return obj
    const target = Array.isArray(obj) ? [] : {}
    for (let key in obj) {
      if (obj.hasOwnProperty(key) && key !== 'depth' && key !== 'flag' && key !== 'bgColor') {
        target[key] = deleteProperties(obj[key])
      }
    }
    return new Proxy(target, {})
  }
}
const { proxy } = getCurrentInstance()
const handleNodeClick = data => {
  proxy.$parent.handleNodeClick(data)
}

defineExpose({ handleNodeClick })
</script>


<style lang="less" scoped>
.coco-tree {
  width: 100%;
  .coco-tree-node {
    width: 100%;
    .coco-tree-content {
      height: 26px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      cursor: pointer;
      .icon {
        display: inline-block;
        padding: 6px;
        font-size: 12px;
        color: #a8abb2;
        svg {
          width: 1em;
          height: 1em;
        }
        &.rotate {
          transform: rotate(90deg);
        }
      }
      .label {
        display: inline-block;
        font-size: 14px;
        color: #606266;
      }
      &:hover {
        background-color: #f5f7fa;
      }
    }
    .coco-tree-children {
      background: transparent;
      overflow: hidden;
      transition: height 0.3s ease-in-out;
    }
  }
}

// .fade-enter-active {
//   animation: fade 0.3s ease-in-out;
// }

// .fade-leave-active {
//   animation: fade 0.3s ease-in-out reverse;
// }

// @keyframes fade {
//   0% {
//     max-height: 0;
//   }
//   100% {
//     max-height: 1000px;
//   }
// }
</style>