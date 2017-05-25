# mqqutil
## Installation
###### $ npm install mqqutil --save
## Funcion
1. toUpperCase
2. toLowerCase
3. has
4. translateArrayToSqlStr
5. uniqueMutilElementArray
6. getObj
7. getArray
8. replace
9. compose
```
const str = 'abc1',
    replace = mqqutil.replace,
    toUpperCase = mqqutil.toUpperCase,
    req = /[\d]+/g,
    replaceAndToUpperCase = mqqutil.compose(replace(req, ''), toUpperCase);
    
console.log('result : %s',replaceAndToUpperCase(str));

// result : ABC
```


