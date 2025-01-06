// 导入所需的 NestJS 装饰器和类型
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
// 导入 RxJS 的 Observable 类型，用于处理异步数据流
import { Observable } from 'rxjs';
// 导入 RxJS 的 map 操作符，用于转换数据
import { map } from 'rxjs/operators';
import * as dayjs from 'dayjs'; // 需要先安装 dayjs: npm install dayjs
import 'reflect-metadata';

// 定义响应数据的接口类型
export interface Response<T> {
    statusCode: number;    // HTTP 状态码
    message: string;       // 响应消息
    data: T;              // 实际数据，T 是泛型类型
}

// @Injectable() 装饰器标记这个类可以被依赖注入系统使用
@Injectable()
// 定义转换拦截器类，实现 NestInterceptor 接口
// T 是输入类型，Response<T> 是输出类型
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    private formatDate(data: any): any {
        if (data instanceof Date) {
          return dayjs(data).format('YYYY-MM-DD HH:mm:ss');
        }
        
        if (Array.isArray(data)) {
          return data.map(item => this.formatDate(item));
        }
        
        if (typeof data === 'object' && data !== null) {
          const formatted = {};
          // 检查是否有构造函数和元数据
          if (data.constructor) {
            const dateFormats = Reflect.getMetadata('dateFormat', data.constructor);
            console.log('Date formats:', dateFormats); // 调试用
    
            for (const key in data) {
              if (dateFormats && dateFormats[key] && data[key] instanceof Date) {
                // 使用自定义格式
                formatted[key] = dayjs(data[key]).format(dateFormats[key]);
              } else {
                formatted[key] = this.formatDate(data[key]);
              }
            }
            return formatted;
          }
        }
        
        return data;
      }
    // 实现 intercept 方法，这是拦截器的核心方法
    // context: 执行上下文，包含请求和响应对象
    // next: 调用处理程序，处理后续逻辑
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        // next.handle() 调用路由处理程序（controller 中的方法）
        return next.handle().pipe(
            // 使用 map 操作符转换原始响oggle Sidebar Visibility应数据
            map(data => ({
                // 获取 HTTP 响应状态码
                statusCode: context.switchToHttp().getResponse().statusCode,
                // 设置默认成功消息
                message: 'success',
                // 原始数据
                data: this.formatDate(data)
            }))
        )
    }
}