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

    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      :props="defaultProps"
      @node-click="handleNodeClick"
    />
  </div>
</template>

<script setup lang="ts">
import { Delete, Edit, Search, Share, Upload, Plus, Check, Close } from '@element-plus/icons-vue'
import CocoButton from '@/components/coco-button.vue'
import CocoSwitch from '@/components/coco-switch.vue'
import CocoSkeleton from '@/components/coco-skeleton.vue'
import CocoCalendar from '@/components/coco-calendar.vue'
import CocoTree from '@/components/coco-tree.vue'
import { onMounted, ref } from 'vue'

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
            children: [
              {
                id: 11,
                label: 'Level three 1-1-2-1',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

const defaultProps = {
  children: 'children',
  label: 'label',
}

const handleNodeClick = data => {
  console.log(data)
}
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

