/*
 * @Author: your name
 * @Date: 2021-03-02 19:35:55
 * @LastEditTime: 2021-03-02 20:12:48
 * @LastEditors: Please set LastEditors
 * @Description: https://gitee.com/bald_club/LOL-Web/blob/master/web/lib/lol/dispatch.js
 * @FilePath: /three.js-lessions/教程/examples/lol-engine/dispatch.js
 */
var noop = { value: function () {} };

function dispatch() {
    for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
        if (!(t = arguments[i] + '') || t in _ || /[\s.]/.test(t))
            throw new Error('illegal type: ' + t);
        _[t] = [];
    }
    return new dispatch(_);
}

function Dispatch(_) {
    this._ = _;
}

function parseTypenames(typenames, types) {
    // 匹配任意空白字符
    return typenames.trim().split(/^|\s+/).map(function(t) {
        var name = 
    });
}
