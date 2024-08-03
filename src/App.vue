

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
      :isConsecutive="true"
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
      defaultDate: ''
    }
  },
  methods: {
    clice1() {
      this.start = '2019-05-01'
      this.end = '2024-11-30'
      this.defaultDate = '2024-06-15'
      setTimeout(() => {
        this.$refs.calendar.show()
      })
      
    },
    clice2() {
      this.start = '2020-01-01'
      this.end = '2025-12-31'
      this.defaultDate = '2025-06-15'
      setTimeout(() => {
        this.$refs.calendar.show()
      })
    },
    clice3() {
      this.start = '2021-07-01'
      this.end = '2026-10-31'
      this.defaultDate = '2026-06-15'
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
