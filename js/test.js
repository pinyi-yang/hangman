// var test = document.getElementById('DOM');
// console.log(test);

var arr = ['a','a', 'c', 'd', 'b'];
var setArr = new Set(arr.sort());

function printSet(array) {
    let str = ''
    array.forEach(function(value) {
        str = str + value;
    });
    console.log(str);
}
printSet(setArr);
var arr2 = ['a', 'b', 'c', 'd'];
var setArr2 = new Set(arr2.sort());
printSet(setArr2)

console.log(setArr == setArr2);

console.log(arr.sort().join('') === arr2.sort().join(''));

console.log(Math.floor(0.7));