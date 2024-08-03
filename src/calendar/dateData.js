class DateData {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.today = new Date();
    this.init();
  }
  init (){
    this.noParams();
    this.start = this.dateRewite(this.start);
    this.end = this.dateRewite(this.end);
    this.startYear = this.start.getFullYear();
    this.endYear = this.end.getFullYear();
    this.todayYear = this.today.getFullYear();
    this.startMonth = this.start.getMonth() + 1;
    this.endMonth = this.end.getMonth() + 1;
    this.todayMonth = this.today.getMonth() + 1;
    this.startDay = this.start.getDate();
    this.endDay = this.end.getDate();
    this.todayDay = this.today.getDate();
    this.startMonthFirstDayWeek = new Date(this.startYear, this.startMonth - 1, 1).getDay();
    this.data = this.looper();
  }
  noParams() {
    if (!this.start) {
      this.start = new Date();
    }
    if (!this.end) {
      let currentDate = new Date();
      currentDate.setFullYear(currentDate.getFullYear() + 1);
      this.end = currentDate;
    }
  }
  dateRewite(date) {
    if (typeof date ==='string') {
      return new Date(date.replace(/-/g, '/'));
    } else {
      return new Date(date);
    }
  }
  isLeapYear(year) {
    // 如果年份能被4整除但不能被100整除，或者能被400整除，则是闰年
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      return true;
    } else {
      return false;
    }
  }
  getDaysOfMonth(year, month) {
    if (month === 2){
      return this.isLeapYear(year)? 29 : 28;
    } else {
      return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
    }
  }
  setYearObj(year) {
    let yearObj = {}
    yearObj.year = year;
    yearObj.months = {};
    yearObj.str = `${year}`;
    return yearObj;
  }
  setMonthObj(year, month) {
    let monthObj = {}
    monthObj.year = year;
    monthObj.month = month;
    monthObj.days = {}
    monthObj.str = `${year}-${month}`;

    return monthObj
  }
  setDayObj(year, month, day) {
    let dayObj = {}
    dayObj.year = year;
    dayObj.month = month;
    dayObj.day = day;

    dayObj.str = `${year}-${month < 10? '0' + month : month}-${day < 10? '0' + day : day}`;

    if (year === this.startYear && month === this.startMonth && day < this.startDay) {
      dayObj.isDisabled = true;
    } else if (year === this.endYear && month === this.endMonth && day > this.endDay) {
      dayObj.isDisabled = true;
    }

    if(year === this.todayYear && month === this.todayMonth && day === this.todayDay) {
      dayObj.isToday = true;
    }
    return dayObj;
  }
  setWeek (dayCount, startWeek) {
    const num = (dayCount + startWeek) % 7
    const obj = {
      1: {
        week: 1,
        weekText: '一'
      },
      2: {
        week: 2,
        weekText: '二'
      },
      3: {
        week: 3,
        weekText: '三'
      },
      4: {
        week: 4,
        weekText: '四'
      },
      5: {
        week: 5,
        weekText: '五'
      },
      6: {
        week: 6,
        weekText: '六'
      },
      0: {
        week: 7,
        weekText: '七'
      },
    }
    return obj[num]
  }

  looper() {
    let obj = {};
    let dayCount = 0
    for(let year = this.startYear; year <= this.endYear; year++) {
      obj[year] = this.setYearObj(year);
      
      let month = year === this.startYear ? this.startMonth : 1
      let endMonth = year === this.endYear? this.endMonth : 12
      for(; month <= endMonth; month++) {
        let monthObj = this.setMonthObj(year, month);
        obj[year].months[month] = monthObj;

        let days = this.getDaysOfMonth(year, month);
        for(let day = 1; day <= days; day++) {
          let oneDay = this.setDayObj(year, month, day);
          const week = this.setWeek(dayCount, this.startMonthFirstDayWeek)
          oneDay.week = week.week
          oneDay.weekText = week.weekText
          obj[year].months[month].days[day] = oneDay
          dayCount++;
        }
      }
    }
    return obj;
  }


}

export default DateData;