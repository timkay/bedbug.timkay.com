# bedbug.timkay.com

    Better Debugging == bedbug
    by Tim Kay
    timkay@not.com

Working with numbers, debug output often looks cluttered due to too many decimal places.
Bedbug enhances JavaScript template literals ("backtick" strings) to improve readability.

Instead of this output:

    console.log(`The answer is a=${9.12345678} 1/3=${1/3} Math.PI=${Math.PI}`);
    > The answer is a=9.12345678 1/3=0.3333333333333333 Math.PI=3.141592653589793 

add the letter "f", and you get this output:

    console.log(f`The answer is a=${9.12345678} 1/3=${1/3} Math.PI=${Math.PI}`);
    > The answer is a=9.123 1/3=0.333 Math.PI=3.142

You can also abbreviate. Instead of `x=${x}`, simply use `=x`:

    console.log(f`The answer is a=${9.12345678} =1/3 =fred =Math.PI`);
    > The answer is a=9.123 1/3=0.333 fred=4.197 Math.PI=3.142

Bedbug provides "tag" functions that modify how template literals work. Import the "f" tag like this:

    import {f} from '//bedbug.timkay.com/bedbug.js';
    console.log(f`The answer is a=${9.12345678} =Math.PI`);
    > The answer is a=9.123 Math.PI=3.142

Using the builtin `f` tag, the `=x` syntax only works with global variables. To access local variables using the `=x` syntax, you need to add to the top of each scope:

    const f = bedbug.g(x=>eval(x));

This version of `f` works with `=x` syntax for both global and local variables.
Unfortunately, you need to include it in every scope where local variables need to be displayed. This way, no need to import `f`, so import this way instead:

    import bedbug from '//bedbug.timkay.com/bedbug.js';

To set display precision:

    bedbug.precision(1e-4);

Examples:

    let c = 3.1415;
    let abc = 8.1234;
    let u;
    let n = null;
    let a = [1, 2, 'tim', 0, u, n];
    let o = {'tim': Math.PI, 'bob': 'mary', [Math.PI]: 'PI'};
    let s = 'Hello, world!!';
    
    f`c=${c} b=${b} =s =abc =b` ➔ c=3.142 b=99.123 s=Hello, world!! abc=8.123 b=99.123
    f`=u =n =a` ➔ u=undefined n=null a=[1, 2, tim, 0, undefined, null]
    f`=o =f` ➔ o={3.141592653589793: PI, bob: mary, tim: 3.142} f=(s, ...v) => fe(e, s, v)
    f`pi found here... =Math.PI` ➔ pi found here... Math.PI=3.142
    f`=o` ➔ o={3.141592653589793: PI, bob: mary, tim: 3.142}
