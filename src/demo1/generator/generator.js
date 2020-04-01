var co = require('co');
var fs = require('fs');

var gen = function* () {
  var f1 = yield fs.readFile('../../../package.json');
  var f2 = yield fs.readFile('../../../README.md');
  console.log(f1.toString());
  console.log(f2.toString());
};

co(gen)
// .then(function (){
//   console.log('Generator 函数执行完成');
// });
