
console.clear();

// import {f, g} from './bedbug.js';
import bedbug from './bedbug.js';

const print = (...args) => $('pre').append(args.join(' ').replace(/\s*$/, '\n'));

function go() {
    const f = bedbug.g(x=>eval(x));
    let c = 3.1415;
    let abc = 8.1234;
    let u;
    let n = null;
    let a = [1, 2, 'tim', 0, u, n];
    let o = {'tim': Math.PI, 'bob': 'mary', [Math.PI]: 'PI'};
    let s = 'Hello, world!!';
    print(f`c=${c} b=${b} =s =abc =b`);
    print(f`=u =n =a`);
    print(f`=o =f`);
    print(f`=Math.PI`);
}

const b = 99.123455;

go();

// for some reason, using just eval doesn't work, but x=>eval(x) does
// in the case of accessing global variables when f isn't defined in function








