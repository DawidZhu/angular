import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/**
 * 
 * Angular 框架：重量级框架
 * 用 Angular 扩展语法编写 HTML 模板， composing HTML templates with Angularized markup
 * 用组件类管理这些模板，writing component classes to manage those templates
 * 用服务添加应用逻辑， adding application logic in services, 还是component???
 * 用模块打包发布组件与服务。and boxing components and services in modules.
 * 然后，我们通过引导根模块来启动该应用。 Then you launch the app by bootstrapping the root module.
 * 我们通过引导根模块来启动应用。 在开发期间，你通常在一个main.ts文件中引导AppModule
 * 
 * 引用主入口
 * Angular 是一个重型框架，更贴近后台的逻辑
 * 
 * Angular 架构中的核心概念：
 * 模块，
 * 组件，
 * 模板，
 * 元数据，
 * 数据绑定
 * 指令，
 * 服务，
 * 依赖注入
 * 
 * 在Angular中提供了以下19个内置的装饰器
装饰器类型内置装饰器
类装饰器    5个@Component、@NgModule、@Pipe、@Injectabl、@Directive
属性装饰器  6个@Input、@Output、@ContentChild、@ContentChildren、@ViewChild、@ViewChildren
方法装饰器  2个@HostListener、@HostBinding
参数装饰器  6个@Attribute、@Inject、@Optional、@Self、@SkipSelf、@Host


 */
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
