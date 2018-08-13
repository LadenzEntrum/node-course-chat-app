const moment = require('moment');
//01.01.1970 00:00:00 am


// var date = new Date();
// console.log(date.getMonth());

// var date = moment();
// date.add(100, 'years').subtract(9, 'months');
// console.log(date.format('MMM Do, YYYY'));

//10:45 am
//6:01 am

var time = moment();
console.log(time.format('h:mm a'));
