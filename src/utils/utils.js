/**
 * 清除无效数据
 *
 * @param { Object } [object={}] 对象
 * @param { Array } [invalid=['', undefined, null]] 指定过滤数据
 * @returns { Object } Returns the new object of filtered values.
 */
// invalid = ['', undefined, null，0, false, NaN]
export function compactObject(object = {}, invalid = ['', undefined, null]) {
  const result = {}
  for (const key in object) {
    if (!invalid.includes(object[key])) {
      result[key] = object[key]
    }
  }
  return result
}

/**
 * sleep
 *
 * @export
 * @param {number} timeout 延迟时间
 * @returns {function} promise
 */
export function sleep(timeout) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(timeout)
    }, timeout)
  })
}

export function noop() {}

// export function find(list, fn) {
//   return list.filter(fn)[0]
// }

// '_~0123456789' +
// 'abcdefghijklmnopqrstuvwxyz' +
// 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const randomString =
  '_~getRandomVcryp0123456789bfhijklqsuvwxzABCDEFGHIJKLMNOPQSTUWXYZ'

// https://github.com/ai/nanoid/blob/master/non-secure.js
// 指定范围，生成随机数
export function random(size) {
  const result = []
  while (0 < size--) {
    result.push(Math.floor(Math.random() * 256))
  }
  return result
}

export function randomRange(under, over) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * under + 1)
    case 2:
      return parseInt(Math.random() * (over - under + 1) + under)
    default:
      return 0
  }
}

export function uuid(size = 21) {
  const url = randomString
  let id = ''
  let bytes = []
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    bytes = crypto.getRandomValues(new Uint8Array(size))
    // console.warn(':::uuid crypto:', bytes.join(','));
  } else {
    bytes = random(size)
    // console.warn(':::uuid random:', bytes.join(','));
  }
  while (0 < size--) {
    id += url[bytes[size] & 63]
  }
  return id
}

export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key))
}
