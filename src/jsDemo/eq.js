"use strict";

function s(a,b){
    console.log(a, b, a != a)
    if(a != a){
        return b != b
    }
}

s(NaN, NaN)
console.log(null === null)