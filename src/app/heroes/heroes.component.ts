import { Component, OnInit } from '@angular/core';
// Return to the HeroesComponent class and import the Hero interface.
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';

/**
 * Component 与 Html template 交互，数据绑定
 * ng generate component heroes
 */
//@Component 是个装饰器函数，用于为该组件指定 Angular 所需的元数据。
//@Component is a decorator function that specifies the Angular metadata for the component.
@Component({
  //ng generate created three metadata properties:
  selector: 'app-heroes', //组件的 CSS 元素选择器，matches the name of the HTML element that identifies this component within a parent component's template
  templateUrl: './heroes.component.html', //组件模板文件的位置。
  styleUrls: ['./heroes.component.css'] // 组件私有 CSS 样式表文件的位置
})


//Always export the component class so you can import it elsewhere … like in the AppModule
//  implements OnInit
// The component's ngOnInit lifecycle hook calls the HeroService method, not the constructor.
export class HeroesComponent implements OnInit{

  //注入：Inject the HeroService, 往构造函数中添加一个私有的 heroService，其类型为 HeroService
  // 注入多个service的写法 。You used Angular Dependency Injection to inject it into a component.
  // constructor(private heroService: HeroService, private messageService: MessageService){}
  // message 单独显示，去掉 messageService
  constructor(private heroService: HeroService){}

  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  // hero = 'Windstorm';
  /**
   * Refactor the component's hero property to be of type Hero. 
   * Initialize it with an id of 1 and the name Windstorm.
   */
  //定义了一个Hero 接口（接口首字母大写），接着定义一个对象 hero，它的类型定义为Hero
 
  hero: Hero = {
    id: 1, 
    name: 'WindStorm'
  };
 //define a component property called heroes to expose the HEROES array for binding.
  heroes: Hero[] = [];
  
 //Add the click event handler
 // 这里的？表示这个selectedHero 属性有可能不存在

 /** message 单独显示，去掉 messageService
  *   selectedHero?: Hero;
  //添加如下 onSelect() 方法，它会把模板中被点击的英雄赋值给组件的 selectedHero 属性。
  // 用void来定义一个没有返回值的函数
  onSelect(hero: Hero): void {
  this.selectedHero = hero;
  // Add MessageService to HeroesComponent
  this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);
}
  */

// 创建一个方法，以从服务中获取这些英雄数据。
// HeroService.getHeroes 方法之前返回一个 Hero[]，现在它返回的是 Observable<Hero[]>。
getHeroes(): void{
  // 使用这种异步方式，subscribe() 方法把这个英雄数组传给这个回调函数，该函数把英雄数组赋值给组件的 heroes 属性。
  //subscribe(observerOrNext?: Partial<Observer<T>> | ((value: T) => void)): Subscription;
  // Arrow 函数，lambda表达式
  // .subscribe(function(heroes) {
  //   _this.heroes = heroes;
  this.heroService.getHeroes().subscribe(newheroes => this.heroes = newheroes);
}
// 选择在 ngOnInit 生命周期钩子hook 中调用 getHeroes()，之后 Angular 会在构造出 
// HeroesComponent 的实例之后的某个合适的时机调用 ngOnInit()。
// The component's ngOnInit lifecycle hook calls the HeroService method, not the constructor.
ngOnInit(): void{
  this.getHeroes();
}
}
