//Amend the @angular/core import statement to include the Input symbol.
import { Component,Input, OnInit } from '@angular/core';
import { Hero } from '../hero';
// 把 ActivatedRoute、HeroService 和 Location 服务注入到构造函数中，将它们的值保存到私有变量里
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';

/**
 * 把所有特性都放在同一个组件中，将会使应用“长大”后变得不可维护。
 * 你要把大型组件拆分成小一点的子组件，每个子组件都要集中精力处理某个特定的任务或工作流。
 * Keeping all features in one component as the application grows won't be maintainable. 
 * This tutorial splits up large components into smaller subcomponents, 
 * each focused on a specific task or workflow.
 * 第一步是把英雄详情移入一个独立的、可复用的 HeroDetailComponent。最终将：
  HeroesComponent 用来展示英雄列表。
  HeroDetailComponent 用来展示所选英雄的详情

  Refactoring the original HeroesComponent into two components yields benefits：
  1. You reduced the HeroesComponent responsibilities.
  2. You can evolve the HeroDetailComponent into a rich hero editor 
     without touching the parent HeroesComponent.
  3. You can re-use the HeroDetailComponent in the template of some future component.
 */
//A TypeScript file with a component class named HeroDetailComponent.
@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit{

  //@Input() 属性装饰器，父组件向子组件传递数据， 添加一个 @Input() 属性装饰器的 hero 属性。
  //用 @Input 装饰器来让 hero 属性可以在外部的 HeroesComponent 中绑定。
  //输入属性就是用@Input修饰器注解的属性，表明这是一个输入属性，用来从父组件接收数据。
  // 通过route 配置以后，不再需要input 传值
   // @Input() hero?: Hero;

   // 用于初始化变量为一个未定义的值
   hero: Hero | undefined;

  //把 ActivatedRoute、HeroService 和 Location 服务注入到构造函数中
  constructor(
    // ActivatedRoute 保存着到这个 HeroDetailComponent 实例的路由信息。
    // 这个组件对从 URL 中提取的路由参数。其中的 id 参数就是要显示的英雄的 id
    private route: ActivatedRoute,
    // HeroService 从远端服务器获取英雄数据，本组件将使用它来获取要显示的英雄
    private heroService: HeroService,
    // location 是一个 Angular 的服务，用来与浏览器打交道。 稍后，你就会使用它来导航回上一个视图
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    // route.snapshot 是一个路由信息的静态快照，抓取自组件刚刚创建完毕之后
    //paramMap 是一个从 URL 中提取的路由参数值的字典
    // JavaScript 的 Number 函数会把字符串转换成数字，英雄的 id 就是数字类型
    const id = Number(this.route.snapshot.paramMap.get('id'));
    /**
     * es6中的箭头函数
     * getHeroes(): void {
     var _this = this; 
     this.heroService.getHeroes()
     .subscribe(function(heroes) {
        _this.heroes = heroes;
    });
}
     */
    this.heroService.getHero(id)
      .subscribe(newhero => this.hero = newhero);
      // .subscribe(hero => this.hero = hero);
  }

 //在组件类中添加一个 goBack() 方法，利用你以前注入的 Location 服务在浏览器的历史栈中后退一步。
  goBack(): void {
    this.location.back();
  }


}
