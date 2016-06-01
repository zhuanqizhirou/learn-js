//node.js 学习javascript 对象部分
var Student={
	name:'小明',
	age:14,
	fly:function(){
		console.log(this.name+'is flying');
	}
};

var xm={
	name:'xiaoming'
};
//通过node Student.js执行,必须用console.log()才能打印.
console.log(xm);
xm.__proto__=Student;
xm.fly();

function createStudent(name){
	var s = Object.create(Student);
	s.name=name;
	return s;
}
var xh=createStudent('小红');
xh.fly();
console.log(xh.__proto__===Student);
console.log(xh.__proto__==Student);

console.log(Object.protocol)
console.log(Object.prototype)
//Object,Array,Function,

//Function.apply()
//Function.call()
var f=function(name,age){
	console.log(name+"'s age is:"+age)
}
f('小红',15)
f.apply(null,['小明',14]);
f.call(null,'小婉',13)
//通过构造函数创建对象. 已经存在类Student,此处不能用Student作为Student的构造函数名.
function Student1(name){
	this.name=name;
	this.hello=function(){
		console.log('hello,'+name);
	}
}
var xs = new Student1('小s');
var log = console.log//
log(xs.name);
xs.hello()
log(xs.__proto__)//Student1 {}
log(xs.constructor===xs.__proto__.constructor)//true
log(xs.constructor===Student1.prototype.constructor)//true
log(Student1.prototype.constructor===Student1)//true
log(xs.__proto__===Student1.prototype)//true
log(xs.__proto__===Student1)//false
log(Object.getPrototypeOf(xs)===Student1.prototype)//true
log(xs instanceof Student1)//true
log(xs.constructor===Student1.constructor)//false
log(xs.constructor===Student1.__proto__.constructor)//false
log(xs.prototype)//undefined
log(Student1.prototype)//Student1 {}

var xw =new Student1('小5');
log(xs.hello===xw.hello)//false

function Stu(name){
	this.name=name;
}
Stu.prototype.hello=function(){
	log('Hello,'+this.name);
}
Stu.call(null,'xiaoming')
log(Stu.call(null,'xiaoming'));//undefined
log(typeof Student1);//function
log(typeof Stu)//function
var a1=new Stu('a1');
var a2=new Stu('a2');
log(a1.hello===a2.hello)//true

log('==原型继承=======================')
function Student(props) {
    this.name = props.name || 'Unnamed';
}

Student.prototype.hello = function () {
    alert('Hello, ' + this.name + '!');
}
// PrimaryStudent构造函数:
function PrimaryStudent(props) {
    Student.call(this, props);
    this.grade = props.grade || 1;
}

// 空函数F:
function F() {
}

// 把F的原型指向Student.prototype:
F.prototype = Student.prototype;

// 把PrimaryStudent的原型指向一个新的F对象，F对象的原型正好指向Student.prototype:
PrimaryStudent.prototype = new F();

// 把PrimaryStudent原型的构造函数修复为PrimaryStudent:
PrimaryStudent.prototype.constructor = PrimaryStudent;

// 继续在PrimaryStudent原型（就是new F()对象）上定义方法：
PrimaryStudent.prototype.getGrade = function () {
    return this.grade;
};

// 创建xiaoming:
var xiaoming = new PrimaryStudent({
    name: '小明',
    grade: 2
});
xiaoming.name; // '小明'
xiaoming.grade; // 2

// 验证原型:
xiaoming.__proto__ === PrimaryStudent.prototype; // true
xiaoming.__proto__.__proto__ === Student.prototype; // true

// 验证继承关系:
xiaoming instanceof PrimaryStudent; // true
xiaoming instanceof Student; // true


