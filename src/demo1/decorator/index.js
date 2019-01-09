// function testable(isTestable) {
//     return function(target) {
//         target.isTestable = isTestable;
//     }
// }

// @testable(true)
// class MyTestableClass {}
// console.log(MyTestableClass.isTestable) // true

// @testable(false)
// class MyClass {}
// console.log(MyClass.isTestable) 


//================================================================
// function mixins(...list) {
//     return function (target) {
//       Object.assign(target.prototype, ...list)
//     }
//   }
  
  
//   const Foo = {
//     foo() { console.log('foo') }
//   };
  
//   @mixins(Foo)
//   class MyClass {}
  
//   let obj = new MyClass();
//   obj.foo() // 'foo'

//=============================================================================

// class Person {
//     @readonly
//     name() { return `${this.first} ${this.last}` }
// }

// function readonly(target, name, descriptor){
//     // descriptor对象原来的值如下
//     // {
//     //   value: specifiedFunction,
//     //   enumerable: false,
//     //   configurable: true,
//     //   writable: true
//     // };
//     descriptor.writable = false;
//     return descriptor;
//   }
  
//   readonly(Person.prototype, 'name', descriptor);
//   // 类似于
//   Object.defineProperty(Person.prototype, 'name', descriptor);


//============================================================================
class Math {
    @log
    add(a, b) {
      return a + b;
    }
}

class Reduce {
    @log
    rd(a, b) {
      return a - b;
    }
}
  
// 对类中的方法进行修饰时 target指向类实例, name修饰的方法名称, descriptor 修饰的方法的描述对象
function log(target, name, descriptor) {
    console.log(target, name, descriptor)
    var oldValue = descriptor.value;
  
    // 为什么descriptor.value 能访问arguments
    // rd的value就是descriptor.value，descriptor.value就是rd   oldValue 就是rd原始值
    // 这里对rd进行了修饰
    descriptor.value = function() {
      console.log(`Calling ${name} with`, arguments);
      return oldValue.apply(this, arguments);
    };
  
    return descriptor;
}
  
const math = new Math();
console.log( math.add(2, 4));

const r = new Reduce()
console.log(r.rd(4,2))