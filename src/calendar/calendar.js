import  DateData  from './dateData.js'


class Calendar {
  constructor({start, end, defaultDate}) {
    this.dateData = new DateData(start, end, defaultDate)
    this.init()
  }
  init() {
    this.data = this.dateData.data

  }
  select (day) {
    this.selectDay = day
    this.loop()

  }
  setDay (year, month, day, dayObj) {
    if (this.selectDay.year == year && this.selectDay.month == month && this.selectDay.day == day) {
      // 注意 year month day 都是字符串类型,而this.selectDay.year this.selectDay.month this.selectDay.day 是数字类型

      dayObj.selected = true

    } else{
      dayObj.selected = false
    }
  }
  loop () {
    for (let year in this.data) {
      // 年的逻辑写这里
      
      for (let month in this.data[year].months) {
        // 月的逻辑写这里

        for (let day in this.data[year].months[month].days) {
          // 日的逻辑写这里

          this.setDay(year, month, day, this.data[year].months[month].days[day])

        }

      }
      return this.data
    }
  }
}
export default Calendar
