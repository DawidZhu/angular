import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  // 这个类和 HeroesComponent 类很像

  heroes: Hero[] = [];
// 它的构造函数希望 Angular 把 HeroService 注入到私有的 heroService 属性中。
  constructor(private heroService: HeroService){}

// 在 ngOnInit() 生命周期钩子lifecycle hook 中调用 getHeroes()。
  ngOnInit(): void{
    this.getHeroes();
  }

  getHeroes(): void {
    // 这个 getHeroes() 函数会截取第 1 到 第 5 位英雄，也就是说只返回第二、第三、第四和第五个英雄。
    //   .subscribe(function(heroes) {
   //   _this.heroes = heroes;
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }
}
