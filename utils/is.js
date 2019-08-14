/*!
 * 类型判断
 * @dwdjs/utils
 */

/**
 * 常用类型判断
 * 是否定义 字符串 数字 纯对象 空对象 数组 函数
 * 整理参考
 * https://github.com/vuejs/vue/blob/dev/src/shared/util.js
 * https://github.com/enricomarino/is
 */

const objProto = Object.prototype;
const owns = objProto.hasOwnProperty;
const toString = objProto.toString;

// 对象自身属性中是否具有指定的属性
export function hasOwn(obj, prop) {
  return owns.call(obj, prop);
}

export function isUnDef(v) {
  return v === 'undefined' || v === null;
}

export function isDef(v) {
  return v !== 'undefined' && v !== null;
}

export function isNumber(v) {
  return toString.call(v) === '[object Number]';
}
export function isInteger(v) {
  return isNumber(v) && parseInt(v) === v;
}

export function isString(v) {
  return toString.call(v) === '[object String]';
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isObject(v) {
  return v !== null && typeof v === 'object' && Array.isArray(v) === false;
}

export function isFunction(v) {
  var isAlert = typeof window !== 'undefined' && v === window.alert;
  if (isAlert) {
    return true;
  }
  var str = toString.call(v);
  return (
    str === '[object Function]' ||
    str === '[object GeneratorFunction]' ||
    str === '[object AsyncFunction]'
  );
}

export const isFn = isFunction;

export function isEmptyObject(v) {
  return JSON.stringify(v) === '{}';
}

export function isPromise(v) {
  return v && typeof v.then === 'function';
}

/**
 * looseEqual
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 *
 * @export
 * @param {*} a 比较值1
 * @param {*} b 比较值2
 * @returns {boolean} 布尔值
 */
export function looseEqual(a, b) {
  if (a === b) return true;
  const isObjectA = isObject(a);
  const isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      const isArrayA = isArray(a);
      const isArrayB = isArray(b);
      if (isArrayA && isArrayB) {
        return (
          a.length === b.length &&
          a.every((e, i) => {
            return looseEqual(e, b[i]);
          })
        );
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime();
      } else if (!isArrayA && !isArrayB) {
        const keysA = Object.keys(a);
        const keysB = Object.keys(b);
        return (
          keysA.length === keysB.length &&
          keysA.every(key => {
            return looseEqual(a[key], b[key]);
          })
        );
      } else {
        /* istanbul ignore next */
        return false;
      }
    } catch (e) {
      /* istanbul ignore next */
      return false;
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b);
  } else {
    return false;
  }
}

export const isEqual = looseEqual;
