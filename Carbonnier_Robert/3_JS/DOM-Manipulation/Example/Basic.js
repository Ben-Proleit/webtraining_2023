

let numberTest = 1;
let stringTest = 'Hello World';

console.log(stringTest + ' '+ typeof(stringTest));

console.log(stringTest.length);
console.log(stringTest.toLocaleLowerCase());

//Arrays 

let colors = ['gray','green','red']

console.log(colors)

colors.unshift('yellow')
console.log(colors)
colors.push('orange')
console.log(colors)
console.log(colors.shift())
console.log(colors.pop())

console.log(colors)

colors.splice(1, 1)

console.log(colors)

var copiedcolors = colors.slice(0,3)

console.log(colors)
console.log(copiedcolors)
