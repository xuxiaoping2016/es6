then方法
    state == pending  添加回调函数
    state == fulfilled  直接执行回调函数
    return this 实现链式调用


resolve 参数函数
    改变 state，保存运算值，执行回调函数，并且将运算值传递给回调函数

