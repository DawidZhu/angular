import { Injectable } from '@angular/core';
import { HEROES } from './mock-heros';
import { Hero } from './hero';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';
/**
 * ng generate service hero
 * 默认情况下，Angular CLI 命令 ng generate service 会通过给 @Injectable() 装饰器添加 
 * providedIn: 'root' 元数据的形式，用根注入器将你的服务注册成为提供者。
 */
@Injectable({
  //在根注入器中把 HeroService 注册为该服务的提供者，以便在别处可以注入它。
  providedIn: 'root'
})
// shared the HeroService with other components
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  //修改这个构造函数，添加一个私有的 messageService 属性参数。
  //Angular 将会在创建 HeroService 时把 MessageService 的单例注入到这个属性中。
  /**
   * 这是一个典型的“服务中的服务”场景，把 MessageService 注入到了 HeroService 中，
   * 而 HeroService 又被注入到了 HeroesComponent 中。
   */
  // 把 HttpClient 注入到构造函数中一个名叫 http 的私有属性中。
  //inject HttpClient into the constructor in a private property called http.
  constructor(
    private messageService: MessageService,
    private http: HttpClient) { }
  
  // 添加一个 getHeroes 方法，使用 RxJS 的 of() 函数来模拟从服务器返回数据
  // Observable is one of the key classes in the RxJS library
  // Angular HttpClient 的方法会返回 RxJS 的 Observable
  // 返回一个 Observable<Hero[]>
  getHeroes(): Observable <Hero[]> {
    // 使用http.get, 去掉 of()
    const heroes = of(HEROES);
    this.messageService.add('HeroService中: heroes');
    return heroes;
    //用 http.get() 替换了 of()
    // HTTP is a request/response protocol. You make a request, it returns a single response.
    //HttpClient.get() 默认情况下把响应体当做无类型的 JSON 对象进行返回。
    // 如果指定了可选的模板类型 <Hero[]>，就会给返回你一个类型化的对象。
    // return this.http.get<Hero[]>(this.heroesUrl)
    // 使用 pipe() 方法来扩展 Observable 的结果，并给它一个 catchError() 操作符。
    //catchError() 操作符会拦截 intercepts 失败的 Observable。它把错误对象传给错误处理器，错误处理器会处理这个错误
      // .pipe(
      //  catchError(this.handleError<Hero[]>('getHeroes', []))
      // );

  }

  getHero(id: number): Observable<Hero> {
    // For now, assume that a hero with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService中:  hero id=${id}`);
    return of(hero);
  }
  // Log a HeroService message with the MessageService
  private log(message: string){
    this.messageService.add('HeroMessage: ${message}');
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * 在控制台中汇报了这个错误之后，这个处理器会汇报一个用户友好的消息，并给应用返回一个安全值，让应用继续工作。
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}
}
