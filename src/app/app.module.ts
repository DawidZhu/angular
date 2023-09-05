import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service'; // 引入组件，在ngModule中声明
// 要让 HttpClient 在应用中随处可用，需要两个步骤。首先，用导入语句把它添加到根模块 AppModule 中
// 接下来，仍然在 AppModule 中，把 HttpClientModule 添加到 imports 数组中
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

/**
 * 每个 Angular 项目有一个模块（根模块），习惯上命名为AppModule。
 * Angular 需要知道如何把应用程序的各个部分组合到一起，以及该应用需要哪些其它文件和库。这些信息被称为元数据（metadata）
 * 有些元数据位于 @Component 装饰器中，会把它加到组件类上。另一些关键性的元数据位于 @NgModule decorators装饰器中。
 * The most important @NgModule decorator annotates the top-level AppModule class.
 * 
 * Angular 框架：重量级框架， MVVM：Model, View, ViewModel.
 * 
 * Angular 模块（无论是根模块还是特性模块）都是一个带有@NgModule装饰器的类。
 * NgModule是一个装饰器函数，它接收一个用来描述模块属性的元数据对象。其中最重要的属性是：
 * declarations ： 声明本模块中拥有的视图类。Angular 有三种视图类：组件、指令和管道。
 * declarations - the view classes that belong to this module. Angular has three kinds of view classes: components, directives, and pipes.
 * exports - declarations 的子集，可用于其它模块的组件模板。
 * imports -  other modules whose exported classes are needed by component templates declared in this module.
 * providers - 服务的创建者，并加入到全局服务列表中，可用于应用任何部分。
 * bootstrap - 指定应用的主视图（称为根组件），它是所有其它视图的宿主。只有根模块才能设置bootstrap属性。
 * 
 */

/**
 * 模块装饰器 decorator
   NgModule 类装饰器，可以将其组件和一组相关代码(如服务)关联起来，形成功能单元。
   每个Angular应用都有一个根模块，通常命名为AppModule
   每个组件都必须声明在（且只能声明在）一个 NgModule 中。
   Every component must be declared in exactly one NgModule.
 */

@NgModule({
  //第一步：创建组件,ng g component ；第二步：引入组件，在ngModule中声明；第三步：在需要的位置通过selector名称 <app-root>使用
  declarations: [
    // 写普通组件,AppModule 声明了应用中的所有组件
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent // 创建Component后，自动添加到NgModule里面
  ],
  /**
   * 添加：HttpClientModule，FormsModule
   * DI：这里是全局注入， Component中是局部注入
   */
  imports: [
    //写核心库，通常不是自己写的
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,FormsModule
    
  ],
  //写服务的地方，添加：EmployeeService
  providers: [EmployeeService], 
  //引导组件
  bootstrap: [AppComponent]
})
/**
 * AppComponent的export语句只是用于演示如何导出的，并不是必须的。
 * 根模块不需要导出任何东西，因为其它组件不需要导入根模块。
 * ng new created an AppModule class in src/app/app.module.ts when it created the project. 
 * This is where you opt in to the FormsModule.
 */
export class AppModule { }
