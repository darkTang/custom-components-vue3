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
    <!-- <coco-calendar lang="en" /> -->
    <div>
      <coco-tree :data="data" @node-click="handleNodeClick" />
    </div>


    
    <el-tree :data="data" default-expand-all @node-click="handleNodeClick" />
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload, Plus, Check, Close } from '@element-plus/icons-vue'
import CocoButton from '@/components/coco-button.vue'
import CocoSwitch from '@/components/coco-switch.vue'
import CocoSkeleton from '@/components/coco-skeleton.vue'
import CocoCalendar from '@/components/coco-calendar.vue'
import CocoTree from '@/components/coco-tree.vue'
import { ref } from 'vue'

const data: Tree[] = [
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
            children: [
              {
                label: 'Level four 1-1-1-1',
                children: [
                  {
                    label: 'Level five 1-1-1-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 3',
    children: [
      {
        label: 'Level two 3-1',
        children: [
          {
            label: 'Level three 3-1-1',
          },
        ],
      },
      {
        label: 'Level two 3-2',
        children: [
          {
            label: 'Level three 3-2-1',
          },
        ],
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}

const handleNodeClick = data => {
  // console.log(data)
}

defineExpose({ handleNodeClick })
</script>
<style scoped>
div {
  width: 400px;
  margin: 200px auto;
  text-align: center;
}

button {
  margin-top: 50px;
}
</style>

