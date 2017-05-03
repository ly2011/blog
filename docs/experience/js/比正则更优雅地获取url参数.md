# 比正则更优雅地获取url参数

---

```javascript

/**
 * 获取 QueryString
 * @param  {string} [name] 参数名，可空
 * @param  {string} [search] search部分值，可空
 * @return {string|object} 值或整个对象
 */
function getQueryString(name, search) {
    var url = search || location.search;
    var params = {};

    if (url.indexOf('?') != -1) {
        var arr = url.substring(1).split('&'); // 分割参数
        for(var i = 0, l = arr.length; i < l; i ++) { // 遍历参数
            var kv = arr[i].split('='); // 分隔键值对
            params[kv.shift()] = kv.length ? decodeURIComponent(kv.join('=')) : undefined; // 如果有值就解码存储
        }
    }

    return name ? params[name] : params; // 输出 name 的值或整个参数对象
}

// 假设 search 值为 ?uid=KB1R+qyhl24II350DQ=&name=abc&DEBUG
console.log( getQueryString() ); // => {uid: "KB1R+qyhl24II350DQ=", name: "abc", DEBUG: undefined}
console.log( getQueryString('uid') ); // => KB1R+qyhl24II350DQ=
// 或
console.log( getQueryString('name', '?uid=KB1R+qyhl24II350DQ=&name=abc&DEBUG') ); // => abc

```

```javascript

/**
 * 获取 pathname
 * @param  {string} [name] 参数名，可空
 * @param  {string} [path] pathname部分值，可空
 * @return {string|object} 值或整个对象
 */
function getPathNmae(name, path) {
    var params = {};
    path = (path || location.pathname)
        .split('.html')[0] // 获取 .html 之前的部分
        .split('/'); // 分隔目录

    while (path.length) { // 从后遍历数组
        var val = path.pop(); // 得到值
        var key = path.pop(); // 得到键

        if (key) {
            params[key] = decodeURIComponent(val); // 解码存储
        }
    }

    return name ? params[name] : params; // 输出name的值或整个参数对象
}

// 假设 pathname 值为 /index/id/22/name/abc.html
console.log( getPathNmae() ); // {id: "22", name: "abc"}
console.log( getPathNmae('name') ); // abc
// 或
console.log( getPathNmae('name', '/index/id/22/name/abc.html') ); // abc


```
