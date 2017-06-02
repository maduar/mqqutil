/**
 * Created by maduar on 25/05/2017.
 */
const assert = require('assert'),
    mqqutil = require('../lib/mutil');
describe('test', function (  ) {
    describe('t1', function (  ) {
        it('test fn', function (  ) {
            const ENMU = {
                true: true,
                false: false
            }
            const tempStr = 'abac';
            const tempObj = {};

            const uniqueArray = [
                {
                    a: 1,
                    b: 2
                },
                {
                    a: 2,
                    b: 2
                }
            ]

            // 1. toUpperCase
            const tempUpperStr = mqqutil.toUpperCase(tempStr);
            assert.equal(tempStr.toUpperCase(), tempUpperStr);

            // 2. has
            const hasElement = mqqutil.has.call(tempObj, 'element');
            assert.equal(ENMU.false, hasElement);

            // 3. uniqueMutilElementArray
            const uniqueResult = mqqutil.uniqueMutilElementArray(uniqueArray, 'b');
            const uniqueTemp = [
                {
                    a: 1,
                    b: 2
                }
            ]

            // assert.equal(uniqueResult, uniqueTemp);

            const str = 'abc1',
                replace = mqqutil.replace,
                toUpperCase = mqqutil.toUpperCase,
                req = /[\d]+/g,
                replaceAndToUpperCase = mqqutil.compose(replace(req, ''), toUpperCase);

            assert.equal(replaceAndToUpperCase(str), 'ABC');



        })
    })
})