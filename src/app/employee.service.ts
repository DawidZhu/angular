import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";

import { Employee } from "./employee";

/**
 * 
 * 相当于Service层，通过Http请求后台数据，无业务逻辑。
 * 提供各种操作方法，给Component调用，用 @Injectable()标签定义
 * 
 *  使用命令创建service: ng g service employee --skip-tests  
 *  创建组件： ng g comonent 组件名称
 *  创建 路由： ng generate route 路由名称
 *  创建指令： ng generate directive 指令名称
 *  创建项目： ng new myAngular
 *  启动项目：ng serve --open
 * 
 * @Injectable() 标识一个类可以被注入器实例化。建议为每个服务类都添加@ Injectable 
 * 依赖装饰器 decorator，(把一个类定义为服务)，组件使用服务。
   对于与特定视图无关并希望跨组件共享的数据或逻辑，可以创建服务类。
 */

//选项	                类型	                         
//providedIn	  Type<any> | 'root' | null	      
// 依赖装饰器(把一个类定义为服务)
@Injectable({   
  //指明当前服务注入的地方
     providedIn: 'root'
})

 //通过export关键字，模块可以把它的某些对象声明为公共的。 其它模块可以使用import来访问
export class EmployeeService {
  //  public 变量：数据类型=数据值。
  private apiServerUrl = 'http://localhost:8080'; //服务地址，可放到配置文件

 
  // 构造方法 添加 HttpClient，发起请求到Server端
  constructor(private http: HttpClient){}

  /**
   * 查询所有
   * Observer & subscribe 设计模式
   * Observable（可观察对象），是属于RxJS库里面的一个对象，HTTP请求返回的都是Observable，可以用来处理异步事件
   * Angular also uses the Interface or class as a structure when retrieving data via http.
   *    HttpClient.get() 默认情况下把响应体当做无类型的 JSON 对象进行返回。
       如果指定了可选的模板类型 <Hero[]>，就会给返回你一个类型化的对象。

    Observables 是使用 Rx.Observable.create 或创建操作符创建的
    并使用观察者Observer来订阅Subscribe它
    然后执行它并发送 next / error / complete 通知给观察者
    而且执行可能会被清理
   */
  public getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }
  /**
   * 新增： Post， Employee 接口可以作为一个类型批注。注意是数组还是对象
   */
  public addEmployee(employee: Employee): Observable<Employee> {
     return this.http.post<Employee>(`${this.apiServerUrl}/employee/add`, employee);
   }
     /**
      * 修改 put
      */
   public updateEmployee(employee: Employee): Observable<Employee> {
     return this.http.put<Employee>(`${this.apiServerUrl}/employee/update`, employee);
   }
     /**
      * 删除
      */
   public deleteEmployee(employeeId: Number): Observable<void> {
     return this.http.delete<void>(`${this.apiServerUrl}/employee/delete/${employeeId}`);
   }


}