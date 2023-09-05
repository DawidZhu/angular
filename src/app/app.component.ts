import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 * Componnet，是构成 Angular 应用的基础和核心，一个组件包装了一个特定的功能。
 * 给View 层 &html页面提供数据
 * Components define views，Components use services。
 * Modules, components and services are classes that use decorators.
 * 
 * 组件是 Angular 应用中的基本构造块。它们在屏幕上显示数据，监听用户输入，并且根据这些输入执行相应的动作。
 * View and ViewModel are often connected via data binding. 
 * That means, that changes in the ViewModel, for example on a property, 
 * are instantly applied to the view, changing e.g. the text shown on the screen. 
 * In angular, the ViewModel is represented by the Typescript part of a component.
 * 大括号：  curly brace 
 * 
 * 组件的创建&使用步骤：
 * 第一步：创建组件,ng g component ；
 * 第二步：引入组件，在ngModule中声明；
 * 第三步：在需要的位置通过selector名称 <app-root>使用
 * 
 * 组件（Component）
   一般来说，一个组件就是一个用于控制视图模板的JavaScript类。
    我们在类中定义组件的应用逻辑，为视图提供支持。 包含：增删改查 方法
 */
//组件装饰器 decorator，也叫 注解，声明当前类AppComponent是一个组件，用来定义方法或者类的信息
@Component({
  //元数据 metadata , 通过装饰器描述的信息叫元数据，告诉Angular如何处理一个类
  selector: 'app-root', // 当前组件的引用名称
  templateUrl: './app.component.html', //组件模板
  styleUrls: ['./app.component.css']  //组件样式文件
})

// 在Class类中，给组件添加属性和方法（业务逻辑），它们会绑定到相应的视图和行为。
export class AppComponent implements OnInit{
  title(title: any) {
    throw new Error('Method not implemented.');
  }  // 组件名称 ：AppComponent
  // title = 'EmployeeApp';
 // 打开 app.component.ts，并把 title 属性的值修改为 'Tour of Heroes'
  title1= 'Tour of Heroes';
  //定义变量
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;

  /**
   * 构造方法， 这里做局部注入， NgModule是全局注入
   * 主要作用是注入依赖 DI，在 Component 中注入 Service
   */
  constructor(private employeeService: EmployeeService){}

  //重写OnInit 接口中的方法,数据初始化
  ngOnInit(): void {
    // 首页自动查出所有 employees
    this.getEmployees();
  }

 
  // Component， 调用service层的方法， 返回值类型为什么是 void?
public getEmployees(): void {
  //Observable必须通过 subscribe 来订阅，返回subscription对象，subscribe 处理subscription对象的返回数据
  //subscribe()函数接收一个observer（观察者）对象作为入参，而这一整个过程，称为：流。
  
  /**
   * Observer观察者是Observable可观察对象发送值的消费者，即接收可观察对象推送的data。
     Observer观察者实际上是一组回调函数的集合
      Observable 执行可以传递三种类型的值：

     "Next" 通知： 发送一个值，比如数字、字符串、对象，等等。
      "Error" 通知： 发送一个 JavaScript 错误 或 异常。
     "Complete" 通知： 不再发送任何值。
     "Next" 通知是最重要，也是最常见的类型：它们表示传递给观察者的实际数据。
     "Error" 和 "Complete" 通知可能只会在 Observable 执行期间发生一次，并且只会执行其中的一个。
     var observer = {
       next: x => console.log('Observer got a next value: ' + x),
       error: err => console.error('Observer got an error: ' + err),
       complete: () => console.log('Observer got a complete notification'),
   };

   .subscribe(
    (data) => {
       //Called when success
     },
    (error) => {
       //Called when error
    }
   */
  //Observer & subscribe 设计模式
  this.employeeService.getEmployees().subscribe( 
    /**
      * Arrow 函数，lambda表达式
      * ()=>{something}或()=>something 相当于js中的函数,
      * 它的好处是可以自动将函数中的this附加到上下文中。
      * 把 function() 替换为 () =>：
     */
    // subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, 
    //complete?: (() => void) | null): Subscription;
  (res: Employee[]) => { // response 可替换为任意字符串
    this.employees = res; //取数据
  },
  //error：出错的情况下执行，可选
  (error: HttpErrorResponse) => {
    alert(error.message);
  }

  );
}

/**
 * 修改后保存方法
 * @param employee 
 */
public onUpdateEmloyee(employee: Employee): void {
  this.employeeService.updateEmployee(employee).subscribe(
    // subscribe(next?: ((value: T) => void) | null, error?: ((error: any) => void) | null, 
    //complete?: (() => void) | null): Subscription;
    (response: Employee) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}
/**
 * 删除操作
 */
public onDeleteEmloyee(employeeId: number): void {
  this.employeeService.deleteEmployee(employeeId).subscribe(
    (response: void) => {
      console.log(response);
      this.getEmployees();
    },
    (error: HttpErrorResponse) => {
      alert(error.message);
    }
  );
}

/**
 *  按钮的CRUD 操作方法入口，与 Html 多次交互
 */
public onOpenModal(employee: Employee, mode: string): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  if (mode === 'add') {
    button.setAttribute('data-target', '#addEmployeeModal');
  }
  // this.editEmployee = employee;
  if (mode === 'edit') {
    this.editEmployee = employee;
    //通过button 属性来区分CRUD操作
    button.setAttribute('data-target', '#updateEmployeeModal');
  }
  if (mode === 'delete') {
    this.deleteEmployee = employee;
    button.setAttribute('data-target', '#deleteEmployeeModal');
  }
  // 修改为 container?
  container?.appendChild(button);

  //触发 button
  button.click();
}


}
