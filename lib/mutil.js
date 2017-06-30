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
    },

    // 引用地址： http://www.cnblogs.com/jym-sunshine/p/5096711.html
    // 获取本周，周一和周日日期
    getCurrentWeek: function () {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = new Date();
        //返回date是一周中的某一天
        var week = currentDate.getDay();
        //返回date是一个月中的某一天
        var month = currentDate.getDate();

        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //减去的天数
        var minusDay = week != 0 ? week - 1 : 6;
        //alert(minusDay);
        //本周 周一
        var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
        //本周 周日
        var sunday = new Date(monday.getTime() + (6 * millisecond));
        //添加本周时间
        startStop.push(monday); //本周起始时间
        //添加本周最后一天时间
        startStop.push(sunday); //本周终止时间
        //返回
        return startStop;
    },

    // 引用地址： http://www.cnblogs.com/jym-sunshine/p/5096711.html
    // 获取本月，第一天和最后一天日期
    getCurrentMonth: function() {
        //起止日期数组
        var startStop = new Array();
        //获取当前时间
        var currentDate = new Date();
        //获得当前月份0-11
        var currentMonth = currentDate.getMonth();
        //获得当前年份4位年
        var currentYear = currentDate.getFullYear();
        //求出本月第一天
        var firstDay = new Date(currentYear, currentMonth, 1);


        //当为12月的时候年份需要加1
        //月份需要更新为0 也就是下一年的第一个月
        if (currentMonth == 11) {
            currentYear++;
            currentMonth = 0; //就为
        } else {
            //否则只是月份增加,以便求的下一月的第一天
            currentMonth++;
        }


        //一天的毫秒数
        var millisecond = 1000 * 60 * 60 * 24;
        //下月的第一天
        var nextMonthDayOne = new Date(currentYear, currentMonth, 1);
        //求出上月的最后一天
        var lastDay = new Date(nextMonthDayOne.getTime() - millisecond);

        //添加至数组中返回
        startStop.push(firstDay);
        startStop.push(lastDay);
        //返回
        return startStop;
    },

    mergeObjToArray: function( obj, ...x ) {

        const emptyArray = [];
        let arr = [];

        if (!obj || Object.keys(obj).length === 0) {
            return emptyArray;
        }

        arr = x.map(v => {
            if (!arr.includes(obj[v])) {
                return obj[v];
            }
        })

        return arr;
    },

    mergeArrayObjToArray: function(arr, ...x ) {
        const that = this;
        const emptyArray = [];
        if (!arr || !Array.isArray(arr) || arr.length === 0) {
            return emptyArray;
        }

        let list = [],
            tempArray = [];
        arr.map(v => {
            tempArray = that.mergeObjToArray(v, ...x);
            if (tempArray.length > 0) {
                tempArray.map(v => {
                    if (!list.includes(v)) {
                        list.push(v);
                    }
                })
            }
        })

        list.sort(function ( a, b ) {
            return a > b
        });
        return list;
    }
}