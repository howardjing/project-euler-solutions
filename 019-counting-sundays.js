/*
You are given the following information, but you may prefer to do some 
research for yourself.

    1 Jan 1900 was a Monday.
    Thirty days has September,
    April, June and November.
    All the rest have thirty-one,
    Saving February alone,
    Which has twenty-eight, rain or shine.
    And on leap years, twenty-nine.
    A leap year occurs on any year evenly divisible by 4, 
    but not on a century unless it is divisible by 400.

How many Sundays fell on the first of the month during the twentieth century 
(1 Jan 1901 to 31 Dec 2000)?
*/

var isLeapYear = function(year) {
  return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
}

var daysInMonth = function(month, year) {
  var thirtyOne = [1,3,5,7,8,10,12];
  var thirty = [4,6,9,11];

  if (thirtyOne.indexOf(month) != -1) {
    return 31;
  }
  if (thirty.indexOf(month) != -1) {
    return 30;
  }

  // special case for february
  if (month == 2 && isLeapYear(year)) {
    return 29;
  } else {
    return 28;
  }
}

var daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
var startYear = 1900;
var endYear = 2000;
var dayOfWeek = 0; // monday
var sundays = 0;
for (var year=startYear; year<=endYear; year++) {
  for (var month=1; month <=12; month++) {
    var daysLimit = daysInMonth(month, year);
    // console.log(month + "/" + year + " has " + daysLimit + " days")
    for (var day=1; day<=daysLimit; day++) {
      // console.log(daysOfWeek[dayOfWeek] + ", " + month + "/" + day + "/" + year);
      if (year > 1900 && day == 1 && daysOfWeek[dayOfWeek] == 'sunday') {
        sundays += 1;
      }
      dayOfWeek = (dayOfWeek + 1) % 7;
    }
  }
}
console.log(sundays + " Sundays fell on the first of the month during the twentieth century.");
