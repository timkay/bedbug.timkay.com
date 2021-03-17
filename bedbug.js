/* Better Debugging == bedbug
 *
 * Provides tags for template literals to pretty print variables.
 *
 * import {f, g} from './bedbug.js';
 * console.log(f`The answer is a=${9.12345678} =Math.PI`);
 *
 * displays
 *
 *    The answer is a=9.123 Math.PI=3.142
 *
 * To access local variables using the =k syntax, you must add to the top of
 * each scope:
 *
 *    const f = bedbug.g(x=>eval(x));
 *
 * In this case, no need to import f and g:
 *
 *    import bedbug from '//bedbug.timkay.com/bedbug.js';
 *
 * To set display precision:
 *
 *    bedbug.precision(1e-4);
 */
export let p = 1e3;

const precision = v => p = 1 / v;

// round numbers (recursively), unpack everything else
const fv = v => typeof v === 'string' ? v
                : typeof v === 'boolean' || typeof v === 'function'? String(v)
                : v === null || v === undefined ? String(v)
                : typeof v === 'number' ? String(Math.round(v * p) / p)
                : Array.isArray(v) ? '[' + v.map(fv).join(', ') + ']'
                : '{' + Object.getOwnPropertyNames(v)
                    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
                    .map(k => `${fv(k)}: ${fv(v[k])}`).join(', ') + '}'
                ;
// replace =x with x=fv(value)
const fs = (e, s) => s.replace(/=\S+/ig, t => {
                        try {
                            return t.substr(1) + '=' + fv(e(t.substr(1)));
                        } catch (e) {return t;}
                    });
// assemble all parts
const fe = (e, s, v) => v.reduce((o, v, i) => o += fv(v) + fs(e, s[i+1]), fs(e, s[0]));
// any variables (including locals) with =x
export const g  = (e) => (s, ...v) => fe(e, s, v);
// only global variables with =x
export const f = (s, ...v) => g(x=>eval(x))(s, ...v);

export default {precision, g, f};