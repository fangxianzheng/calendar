import  DateData  from './dateData.js'


class Calendar {
  constructor({start, end, defaultDate, isConsecutive, disable, festival, extra}) {
    this.dateData = new DateData(start, end)
    this.defaultDate = defaultDate
    this.isConsecutive = isConsecutive
    this.selectCounter = 0
    this.disable = disable
    this.festival = festival
    this.extra = extra
    this.init()
  }
  init() {
    this.data = this.dateData.data
    this.defType = Object.prototype.toString.call(this.defaultDate)
    this.loop()
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

        // 当后选的日期早于前选的日期时，交换两个日期
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

    // 不可用日期
    if (this.disable) {
      if (this.disable(dayObj)) {
        dayObj.disable = true;
      }
    }

    // 节假日
    if (this.festival && this.festival.length) {
      const oneFestival= this.festival.find((festival) => {
        return festival.date === `${year}-${monthStr}-${dayStr}`
      })
      if (oneFestival) {
        dayObj.festival = oneFestival
      }

    }

    // 额外信息
    if (this.extra) {
      dayObj.extra = this.extra(dayObj);
    }

    // 默认日期
    if (this.defaultDate) {
      if (this.defType === '[object Array]') {
        const defStart = this.numberStr(this.defaultDate[0])
        const defEnd = this.numberStr(this.defaultDate[1])
        if (`${year}${monthStr}${dayStr}` === defStart) {
          dayObj.selectedStart = true
          dayObj.selected = true
        }
        if (`${year}${monthStr}${dayStr}` === defEnd) {
          dayObj.selectedEnd = true
          dayObj.selected = true
        }
        if (`${year}${monthStr}${dayStr}` > defStart && `${year}${monthStr}${dayStr}` < defEnd) {
          dayObj.selected = true
        }

      } else {
        
        if (`${year}${monthStr}${dayStr}` === this.numberStr(this.defaultDate)) {
          dayObj.selected = true
        }
      }
    }
    // 选日期时才执行
    if (this.selectDay || this.selectSatrtDay || this.selectEndDay) {

      // 单选--------------------------------------------------
      if (!this.isConsecutive) {

        if (this.numberStr(this.selectDay.str) === `${year}${monthStr}${dayStr}`) {
          dayObj.selected = true
    
        } else{
          dayObj.selected = false
        }

        // 连续选择--------------------------------------------------
      } else {
        const selectSatrtDayStr = this.numberStr(this.selectSatrtDay.str)
        
        if (this.selectCounter == 1) {
          if (`${year}${monthStr}${dayStr}` === selectSatrtDayStr) {
            dayObj.selectedStart = true
            dayObj.selected = true
          } else {
            dayObj.selectedStart = false
            dayObj.selected = false
          }
          dayObj.selectedEnd = false

        } else if (this.selectCounter == 2) {
  
          const selectEndDayStr = this.numberStr(this.selectEndDay.str)
          if (`${year}${monthStr}${dayStr}` === selectSatrtDayStr) {
            dayObj.selectedStart = true
            dayObj.selected = true
  
            // 当两次都是选的同一个日期时
            if (`${year}${monthStr}${dayStr}` === selectEndDayStr) {
              dayObj.selectedEnd = true
            } else {
              dayObj.selectedEnd = false
            }
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
