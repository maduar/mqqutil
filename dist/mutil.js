/**
 * Created by maduar on 23/03/2017.
 */

"use strict";
//api公共模块
const _ = require( 'lodash' ),
    path = require( 'path' ),
    curry = require('lodash').curry
    ;
module.exports = {

    verityObjValue: function (obj) {

        const SUCCESS = 'SUCCESS',
            ERROR = 'ERROR',
            EMPTEY_OBJ = '空对象';

        const result = {
            status: SUCCESS,
            message: ''
        }

        if (Object.keys(obj).length === 0) {
            result.status = ERROR;
            result.message = EMPTEY_OBJ;
        }

        for (let key in obj) {
            if (!obj[key]) {
                result.status = ERROR;
                result.message = `参数'${key}'出错`;
            }
        }

        return result;
    },

    replace: curry(function(what, replacement, str) {
        return str.replace(what, replacement);
    }),

    compose: function(f,g) {
        return function(x) {
            return f(g(x));
        };
    },

    toUpperCase: curry(x => {
        return x.toUpperCase();
    }),

    toLowerCase: curry(x => {
        return x.toLowerCase();
    }),

    has: Object.prototype.hasOwnProperty,

    isArray: curry(arr => {
        return Object.prototype.toString.call(arr);
    }),

    translateArrayToSqlStr: function ( arr ) {
        const ERROR = -1;
        if (!isArray(arr) || arr.length === 0) return ERROR;

        let result = '';

        arr.map(v => {
            result += `'${v}',`;
            return '';
        });

        return result.substr(0, result.length - 1);
    },

    success: function (msg, code, data){
        return new Result(Result.OK, msg, code, data);
    },

    failed: function (msg, code, data){
        return new Result(Result.ERROR, msg, code, data);
    },

    getCreateObj: function (active_user){

        const createObj = {
            create_id: active_user.user_id,
            create_name: active_user.user_name,
            create_code: active_user.user_code,
            optr_id: active_user.user_id,
            optr_name: active_user.user_name,
            optr_code: active_user.user_code
        }
        return createObj;
    },

    getUpdateObj: function (active_user){

        const createObj = {
            optr_id: active_user.user_id,
            optr_name: active_user.user_name,
            optr_code: active_user.user_code
        };

        return createObj;
    },

    uniqueArray: function(arr, key) {
        var n = [arr[0]];
        for (var i = 1; i < arr.length; i++) {
            if (key === undefined) {
                if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
            } else {
                inner: {
                    var has = false;
                    for (var j = 0; j < n.length; j++) {
                        if (arr[i][key] == n[j][key]) {
                            has = true;
                            break inner;
                        }
                    }
                }
                if (!has) {
                    n.push(arr[i]);
                }
            }
        }
        return n;
    },

    // 数组内的对象根据N个对象属性去重
    uniqueMutilElementArray: function(arr, ...x) {
        var n = [arr[0]];
        let len = x.length,
            count = 0;

        for (var i = 1; i < arr.length; i++) {
            if (x.length === 0) {
                if (n.indexOf(arr[i]) == -1) n.push(arr[i]);
            } else {
                inner: {
                    var has = false;
                    for (var j = 0; j < n.length; j++) {
                        count = 0;
                        x.forEach(v => {
                            if (arr[i][v] === n[j][v]) count++;
                        })

                        if (count === len) {
                            has = true;
                            break inner;
                        }
                    }
                }
                if (!has) {
                    n.push(arr[i]);
                }
            }
        }
        return n;
    },

    // 数组推平
    getObj: function( obj ) {

        const result = {}
        for(let key in obj) {

            if (obj[key] && typeof obj[key] === 'object' && Object.keys(obj[key]).length > 0) {
                for(let x in obj[key]) {
                    result[x] = obj[key][x]
                }
            } else {
                result[key] = obj[key];
            }
        }

        return result;
    },

    // 两数组，根据数组对象的N个属性比较
    getArray: function (cookBook, articleBook, ...x  ) {
        let sign = false,
            len = x.length,
            tempLen = 0,
            result = [];

        if (x.length === 0) return cookBook;

        // v 不存在与 v2
        result = cookBook.filter(v => {
            sign = true;
            articleBook.map(v2 => {
                tempLen = 0;
                x.map(vx => {
                    if (v[vx] === v2[vx]) tempLen++;
                })
                if (tempLen > 0 && tempLen === len) sign = false;
            });

            return sign;
        })

        return result;
    }
}