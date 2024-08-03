

<template>
  <div>
    <div class="buttons">
      <div @click="clice1">button1</div>
      <div @click="clice2">button2</div>
      <div @click="clice3">button3</div>
    </div>
    <calendar
      ref="calendar"
      :start="start"
      :end="end"
      :defaultDate="defaultDate"
      :disable="disable"
      :extra="extra"
      :isConsecutive="isConsecutive"
      :festival="festival"
      @complete="complete"
    ></calendar>
  </div>

</template>

<script>
import calendar from './components/calendar.vue'
export default {
  components: {
    calendar
  },
  data() {
    return {
      count: 0,
      start: '',
      end: '',
      defaultDate: '',
      isConsecutive: false,
      disable: function(){},
      extra: function(){},
      festival: []
    }
  },
  methods: {
    clice1() {
      this.start = '2019-05-01'
      this.end = '2024-11-30'
      this.defaultDate = '2024-06-15'
      this.isConsecutive = false
      setTimeout(() => {
        this.$refs.calendar.show()
      })
      
    },
    clice2() {
      this.start = '2024-01-01'
      this.end = '2024-03-20'
      this.defaultDate = '2024-02-15'
      this.isConsecutive = true
      this.disable = function (day) {
        return day.str == '2024-01-10'
      }
      this.extra = function (day) {

        if (day.week == 1) {
          return {
            good: '牛马'
          }
        } else {
          return {}
        }
      }
      this.festival = [
        {
          date: '2024-01-01',
          text: '元旦'
        }, 
        {
          date: '2024-02-10',
          text: '春节'
        }, 
        {
          date: '2024-02-24',
          text: '元宵节'
        },
      ]
      setTimeout(() => {
        this.$refs.calendar.show()
      })
    },
    clice3() {
      this.start = '2021-07-01'
      this.end = '2026-10-31'
      this.defaultDate = '2026-06-15'
      this.isConsecutive = false
      setTimeout(() => {
        this.$refs.calendar.show()
      })
    },
    complete(date) {
      // console.log(date)
    }
  }

}
</script>

<style scoped>
  .buttons{
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;  
 
  }
  .buttons div{
    flex: 1;
    height: 40px;
    background-color: #3aa36d;
  }
</style>
