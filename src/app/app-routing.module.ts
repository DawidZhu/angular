import { NgModule } from '@angular/core';
// 导入 RouterModule 和 Routes，以便该应用具有路由功能
import { RouterModule, Routes } from '@angular/router';
// 导入 HeroesComponent，它将告诉路由器要去什么地方
import { HeroesComponent } from './heroes/heroes.component';
// 要导航到仪表盘，路由器中就需要一个相应的路由。
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

/**
 * 添加了 Angular 路由器在各个不同组件之间导航
 * ng generate module app-routing --flat --module=app
 * Routes tell the Router which view to display 
 * when a user clicks a link or pastes a URL into the browser address bar.
 */
const routes: Routes = [
  // path	用来匹配浏览器地址栏中 URL 的字符串。
  // component 导航到该路由时，路由器应该创建的组件。
  // 告诉路由器把该 URL 与 path：'heroes' 匹配。如果网址类似于 localhost:4200/heroes 就显示 HeroesComponent
  {path: 'heroes', component: HeroesComponent},
  //把一个指向 DashboardComponent 的路由添加到 routes 数组中。
  { path: 'dashboard', component: DashboardComponent },
  // 要让应用自动导航到这个仪表盘，请把下列路由添加到 routes 数组中
  // 这个路由会把一个与空路径“完全匹配”的 URL 重定向到路径为 '/dashboard' 的路由。
  // 浏览器刷新之后，路由器加载了 DashboardComponent，并且浏览器的地址栏会显示出 /dashboard 这个 URL。
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // 然后把一个参数化路由添加到 routes 数组中，它要匹配指向英雄详情视图的路径。
  // path 中的冒号（:）表示 :id 是一个占位符，它表示某个特定英雄的 id
  //配置 detail/id 到 HeroDetailComponent 的映射关系
  { path: 'detail/:id', component: HeroDetailComponent }
];

// @NgModule 元数据会初始化路由器，并开始监听浏览器地址的变化。
@NgModule({
  // 将 RouterModule 库 添加到 AppRoutingModule 的 imports 数组中，
  //同时通过调用 RouterModule.forRoot() 来用这些 routes 配置它， 让自己配置的routes 生效
  // forRoot() 方法会提供路由所需的服务提供者和指令，还会基于浏览器的当前 URL 执行首次导航
  imports: [RouterModule.forRoot(routes)],
  // AppRoutingModule 导出 RouterModule，以便它在整个应用程序中生效。
  exports: [RouterModule]
})
export class AppRoutingModule { }
