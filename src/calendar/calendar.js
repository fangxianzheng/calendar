import  DateData  from './dateData.js'


class Calendar {
  constructor({start, end, defaultDate, isConsecutive}) {
    this.dateData = new DateData(start, end)
    this.isConsecutive = isConsecutive
    this.selectCounter = 0
    this.init()
  }
  init() {
    this.data = this.dateData.data

  }
  select (day) {
    this.selectCounter++
    
    if (!this.isConsecutive) {
      this.selectDay = day
    } else {
      if (this.selectCounter === 1) {
        this.selectSatrtDay = day
      } else if (this.selectCounter === 2) {
        this.selectEndDay = day

        const selectSatrtDayStr = this.numberStr(this.selectSatrtDay.str)
        const selectEndDayStr = this.numberStr(this.selectEndDay.str)
        if (selectEndDayStr < selectSatrtDayStr) {
          const startCopy = this.deepClone(this.selectSatrtDay)
          this.selectSatrtDay = this.deepClone(this.selectEndDay)
          this.selectEndDay = startCopy
        }


      }
      
    }

    this.loop()


    if (this.selectCounter === 2) {
      this.selectCounter = 0
    }

    if (!this.isConsecutive){
      return this.selectDay
    } else {
      return {
        selectSatrtDay: this.selectSatrtDay,
        selectEndDay: this.selectEndDay
      }
    }
  }
  numberStr (dateStr) {
    return dateStr.split('-').join('')
  }
  deepClone (obj, cache = new WeakMap()) {
    if (obj === null || typeof obj !== 'object') {
      return obj;
    }
  
    if (cache.has(obj)) {
      return cache.get(obj);
    }
  
    if (Array.isArray(obj)) {
      const arrCopy = [];
      cache.set(obj, arrCopy);
      for (let i = 0; i < obj.length; i++) {
        arrCopy[i] = this.deepClone(obj[i], cache);
      }
      return arrCopy;
    }
  
    const objCopy = {};
    cache.set(obj, objCopy);
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        objCopy[key] = this.deepClone(obj[key], cache);
      }
    }
    return objCopy;
  }
  setDay (year, month, day, dayObj) {
    const monthStr = month < 10? "0" + month : month
    const dayStr = day < 10? "0" + day : day

    if (!this.isConsecutive) {

      if (this.numberStr(this.selectDay.str) === `${year}${monthStr}${dayStr}`) {
        dayObj.selected = true
  
      } else{
        dayObj.selected = false
      }
    } else {
      const selectSatrtDayStr = this.numberStr(this.selectSatrtDay.str)
      
      if (this.selectCounter == 1) {
        if (`${year}${monthStr}${dayStr}` === selectSatrtDayStr) {
          dayObj.selectedStart = true
          dayObj.selected = true
        } else {
          dayObj.selectedStart = false
          dayObj.selectedEnd = false
          dayObj.selected = false
        }
      } else if (this.selectCounter == 2) {

        const selectEndDayStr = this.numberStr(this.selectEndDay.str)
        if (`${year}${monthStr}${dayStr}` === selectSatrtDayStr) {
          dayObj.selectedStart = true
          dayObj.selected = true
        } else if (`${year}${monthStr}${dayStr}` > selectSatrtDayStr && `${year}${monthStr}${dayStr}` < selectEndDayStr) {
          dayObj.selected = true
        } else if (`${year}${monthStr}${dayStr}` === selectEndDayStr) {
          dayObj.selectedEnd = true
          dayObj.selected = true
        } else {
          dayObj.selectedStart = false
          dayObj.selectedEnd = false
          dayObj.selected = false
        }

      }

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
