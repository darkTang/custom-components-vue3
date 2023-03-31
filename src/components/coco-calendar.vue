<template>
  <div class="coco-calendar" @click.stop>
    <div class="coco-calendar_header">
      <div
        class="title"
      >{{lang === 'en'?yy:lang === 'zh'? yy+'年': ''}} {{lang === 'en'?mm.en:lang === 'zh'? mm.zh+'月': ''}}</div>
      <div class="groups" v-if="lang === 'en'">
        <button @click="toggleMonth(-1)">Previous Month</button>
        <button @click="toggleToday">Today</button>
        <button @click="toggleMonth(1)">Next Month</button>
      </div>
      <div class="groups" v-else-if="lang === 'zh'">
        <button @click="toggleMonth(-1)">上一月</button>
        <button @click="toggleToday">今天</button>
        <button @click="toggleMonth(1)">下一月</button>
      </div>
    </div>
    <div class="coco-calendar_body">
      <!-- table是一个行内块元素 -->
      <table class="coco-calendar_table" cellspacing="0">
        <thead>
          <tr v-if="lang === 'en'">
            <th>Sun</th>
            <th>Mon</th>
            <th>Tue</th>
            <th>Wes</th>
            <th>Thu</th>
            <th>Fri</th>
            <th>Sat</th>
          </tr>
          <tr v-else-if="lang === 'zh'">
            <th>星期日</th>
            <th>星期一</th>
            <th>星期二</th>
            <th>星期三</th>
            <th>星期四</th>
            <th>星期五</th>
            <th>星期六</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item1, index1) in calendarDays" :key="index1">
            <td
              v-for="(item2, index2) in item1"
              :key="index2"
              :style="{color: item2.isCurrentMonth? '':'#a8abb2'}"
              :class="{today: item2.isCurrentMonth&&item2.month === date.getMonth()+1 && item2.date === dd, selected: (item2.isCurrentMonth&&item2.month !== date.getMonth()+1&&item2.date === selectedDate) || (item2.isCurrentMonth&&item2.month === date.getMonth()+1&&item2.date === selectedDate)}"
              @click="toggleDate(item2)"
              v-html="content(item2)"
            ></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'en',
  },
  haveMonth: {
    type: Boolean,
    default: false,
  },
})

const monthMapToEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Spt', 'Oct', 'Nov', 'Dec']
// 日期逻辑
const date = new Date()
let yy = ref(date.getFullYear())
let mm = reactive({
  zh: date.getMonth() + 1,
  en: monthMapToEn[date.getMonth()],
})
let dd = ref(date.getDate())
let selectedDate = ref(date.getDate())
const calendarDays = ref<number[][]>([])

const initialDate = () => {
  calendarDays.value = []
  // 当前月份的天数
  let currentMonthDays = new Date(yy.value, mm.zh, 0).getDate()
  // 上一个月份的天数
  let lastMonthDays = new Date(yy.value, mm.zh - 1, 0).getDate()
  let firstDayMapWeek = new Date(`${yy.value}/${mm.zh}/1`).getDay()
  let lastDayMapWeek = new Date(`${yy.value}/${mm.zh}/${currentMonthDays}`).getDay()
  const days = Array.from(Array(currentMonthDays), (_, i) => ({ date: i + 1, month: mm.zh, isCurrentMonth: true }))
  if (firstDayMapWeek > 0) {
    for (let i = 0; i < firstDayMapWeek; i++) {
      days.unshift({ date: lastMonthDays, month: mm.zh - 1, isCurrentMonth: false })
      lastMonthDays--
    }
  }
  if (lastDayMapWeek < 6) {
    let num = 1
    for (let i = 6; i > lastDayMapWeek; i--) {
      days.push({ date: num, month: mm.zh + 1, isCurrentMonth: false })
      num++
    }
  }
  for (let i = 0; i < days.length; i += 7) {
    calendarDays.value.push(days.slice(i, i + 7))
  }
}

onMounted(() => {
  initialDate()
})

const padZero = n => {
  return n > 9 ? n : '0' + n
}

const content = item2 => {
  if (props.haveMonth) {
    return padZero(item2.month) + '-' + padZero(item2.date)
  } else {
    return item2.date
  }
}

const toggleMonth = num => {
  if (num > 0) {
    if (mm.zh >= 12) {
      mm.zh = 0
      yy.value++
    }
  } else {
    if (mm.zh <= 1) {
      mm.zh = 13
      yy.value--
    }
  }
  mm.zh += num
  selectedDate.value = 1
  mm.en = monthMapToEn[mm.zh - 1]
  initialDate()
}

const toggleToday = () => {
  yy.value = date.getFullYear()
  yy.value = date.getFullYear()
  mm.zh = date.getMonth() + 1
  mm.en = monthMapToEn[mm.zh - 1]
  selectedDate.value = date.getDate()
  initialDate()
}

const toggleDate = dateObj => {
  if (dateObj.isCurrentMonth) {
    selectedDate.value = dateObj.date
  } else {
    if (dateObj.month < mm.zh) {
      toggleMonth(-1)
    } else {
      toggleMonth(1)
    }
  }
}
</script>

<style lang="less" scoped>
* {
  box-sizing: border-box;
}
.coco-calendar {
  width: 100%;
  // text-align: center;
  .coco-calendar_header {
    padding: 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    .groups {
      button {
        position: relative;
        background-color: #fff;
        border: 1px solid #ddd;
        padding: 5px 8px;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
          background-color: #cbe1fc;
          color: #5a9cf8;
        }
        &:active {
          z-index: 1;
          border-color: #5a9cf8;
        }
        & + button {
          margin-left: -1px;
        }
      }
    }
  }
  .coco-calendar_body {
    padding: 12px 20px 35px;
    .coco-calendar_table {
      // 保证单元格的宽度都是固定的，并不是由文字决定，默认为auto
      table-layout: fixed;
      width: 100%;
      thead {
        tr {
          th {
            font-weight: 400;
            padding: 12px 0;
          }
        }
      }
      tbody {
        tr {
          td {
            height: 85px;
            padding-top: 5px;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            vertical-align: top;
            cursor: pointer;
            &:nth-child(1) {
              border-left: 1px solid #ddd;
            }
            &:hover {
              background-color: #eef5fe;
            }
            &.today {
              color: #5a9cf8;
            }
            &.selected {
              background-color: #eef5fe;
            }
          }
          &:nth-child(1) {
            td {
              border-top: 1px solid #ddd;
            }
          }
        }
      }
    }
  }
}
</style>




