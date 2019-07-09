// function* dataConsumer() {
//     console.log('Started');
//     console.log(`1. ${yield}`);
//     console.log(`2. ${yield}`);
//     return 'result';
// }

// let genObj = dataConsumer();
// console.log(genObj.next());
// console.log(genObj.next('a'))
// console.log(genObj.next('b'))

// Started
// { value: undefined, done: false }
// 1. a
// { value: undefined, done: false }
// 2. b
// { value: 'result', done: true }



//=============================================================
// function wrapper(generatorFunction) {
//     return function (...args) {
//       let generatorObject = generatorFunction(...args);
//       generatorObject.next();
//       return generatorObject;
//     };
// }
  
// const wrapped = wrapper(function* () {
//     console.log(`First input: ${yield}`);
//     return 'DONE';
// });
  
// wrapped().next('hello!')

//=============================================================
// function* foo() {
//     yield 1;
//     yield 2;
//     yield 3;
//     yield 4;
//     yield 5;
//     return 6;
// }
  
// for (let v of foo()) {
//     console.log(v);
// }


// function* fibonacci() {
//     let [prev, curr] = [0, 1];
//     for (;;) {
//       yield curr;
//       [prev, curr] = [curr, prev + curr];
//     }
// }
  
// for (let n of fibonacci()) {
//     if (n > 1000) break;
//     console.log(n);
// }


// function fibonacci(){
//     const init = [0,1];
//     let [prev, curr] = init;
//     const arr = [curr];
//     for(;;){
//         [prev, curr] = [curr, prev+curr]
//         if(curr > 1000) break;
//         arr.push(curr)
//     }
//     return arr;
// }

// const s = fibonacci();
// console.log(s)

//======================================================================

// let jane = { first: 'Jane', last: 'Doe' }

// function* objectEntries(){
//     let propsKeys = Reflect.ownKeys(this)
//     for(let propKey of propsKeys){
//         yield [propKey,this[propKey]]
//     }
// }

// jane[Symbol.iterator] = objectEntries

// for(let [key,val] of jane){
//     console.log(val,'.')
// }

//======================================================================
// function * s (){
//     let i = 0;
//     for(;i<10;i++){
//         yield i;
//     }
// }
// const ss = s();
// for(let v of ss){
//     console.log(v)
// }

//======================================================================
// var g = function* () {
//     try {
//       yield;
//     } catch (e) {
//       console.log('内部捕获', e);
//     }
//   };
  
//   var i = g();
//   i.next()
  
//   try {
//     i.throw('a');
//     i.throw('b');
//   } catch (e) {
//     console.log('外部捕获', e);
//   }

//======================================================================
// function* foo() {
//     var x = yield 3;
//     var y = x.toUpperCase();
//     yield y;
//   }
  
//   var it = foo();
  
//   it.next(); // { value:3, done:false }
  
//   try {
//     it.next(42);  //TypeError: x.toUpperCase is not a function
//   } catch (err) {
//     console.log(err);
//   }


//======================================================================
// 一旦 Generator 执行过程中抛出错误，且没有被内部捕获，就不会再执行下去了。
// 如果此后还调用next方法，将返回一个value属性等于undefined、done属性等于true的对象，
// 即 JavaScript 引擎认为这个 Generator 已经运行结束了。

// function* g() {
//     yield 1;
//     console.log('throwing an exception');
//     throw new Error('generator broke!');
//     yield 2;
//     yield 3;
//   }
  
//   function log(generator) {
//     var v;
//     console.log('starting generator');
//     try {
//       v = generator.next();
//       console.log('第一次运行next方法', v);
//     } catch (err) {
//       console.log('捕捉错误', v);
//     }
//     try {
//       v = generator.next();
//       console.log('第二次运行next方法', v);
//     } catch (err) {
//       console.log('捕捉错误', v);
//     }
//     try {
//       v = generator.next();
//       console.log('第三次运行next方法', v);
//     } catch (err) {
//       console.log('捕捉错误', v);
//     }
//     console.log('caller done');
//   }
  
//   log(g());
//   starting generator
// 第一次运行next方法 { value: 1, done: false }
// throwing an exception
// 捕捉错误 { value: 1, done: false }
// 第三次运行next方法 { value: undefined, done: true }
// caller done


//======================================================================


//======================================================================