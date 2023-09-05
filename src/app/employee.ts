/**
 * 相当于Model层
 * 创建 employee class，定义属性，提供给Service 调用
 * 
 * TypeScript 是一种由微软开发的自由和开源的编程语言，它是 JavaScript 的一个超集，扩展了 JavaScript 的语法。
 *   语法特性
   类 Classes
   接口 Interfaces
   模块 Modules 
   类型注解 Type annotations
   编译时类型检查 Compile time type checking 
   Arrow 函数 (类似 C# 的 Lambda 表达式)
 * 
 * 通过export关键字，模块可以把它的某些对象声明为公共的。 其它 模块可以使用import 语句来访问这些公共对象。
 * Angular also uses the Interface or class as a structure when retrieving data via http.
 */
export interface Employee{
     // 对于基本类型是number, bool和string。而弱或动态类型的结构则是any类型。
     //public 变量：数据类型=数据值。
     id: number;
     name: string;
     email: string;
     jobTitle: string;
     phone: string;
     imageUrl: string;
     employeeCode: string;


}