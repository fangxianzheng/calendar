
<template>
  <div>
    <div v-for="(yearObj, year) in dateData" :key="year">
      <div>{{year}}年</div>
      <div v-for="(monthObj, month) in yearObj.months" :Key="month">
        <div>{{month}}月</div>
        <div class="days-wrap">
          <div class="day" 
            :class="[
              day == 1 ? `week-${dayObj.week}`:'', 
              dayObj.selected ? 'active':'', 
            ]" 
            v-for="(dayObj, day) in monthObj.days" :key="day">
            <div @click="select(dayObj)">{{day}}</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Calendar from '../calendar/calendar.js'
export default {
  name: 'Calendar',
  props: {
    start: {
      type: String,
      default: '2019-05-01'
    },
    end: {
      type: String,
      default: '2024-11-30'
    },
    defaultDate: {
      type: String,
      default: '2024-06-15'
    }
  },
  data() {
    return {
      dateData: {},
      calendar: new Calendar({
        start: this.start,
        end: this.end,
        defaultDate: this.defaultDate
      })
    }
  },
  beforeMount() {

    this.dateData = this.calendar.data

  },
  mounted () {

  },
  methods: {
    select(day){
      this.calendar.select(day)

      this.$emit('complete', day)
    },
    show () {

      this.calendar = new Calendar({  
        start: this.start,
        end: this.end,
        defaultDate: this.defaultDate
      })
      this.dateData = this.calendar.data

    }

  }
}
</script>


<style scoped>
.read-the-docs {
  color: #888;
}
.days-wrap{
  width: 370px;
  display: flex;
  flex-wrap: wrap;
  margin: auto;
}
.day{
  width: 45px;
  height: 45px;
  margin-top: 5px;
  margin-left: 5px;
  background-color: #c8c6c6;

}
.week-1{
  margin-left: 55px;
}
.week-2{
  margin-left: 105px;
}
.week-3{
  margin-left: 155px;
}
.week-4{
  margin-left: 205px;
}
.week-5{
  margin-left: 255px;
}
.week-6{
  margin-left: 305px;
}
.active{
  background-color: #3b59f0;
}
</style>
