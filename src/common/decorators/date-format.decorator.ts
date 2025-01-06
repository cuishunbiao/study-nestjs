import 'reflect-metadata';

// 创建日期格式装饰器
export const DateFormat = (format: string = 'YYYY-MM-DD HH:mm:ss'): PropertyDecorator => {
  // target: 装饰的类的原型
  // propertyKey: 被装饰的属性名
  return (target: any, propertyKey: string | symbol) => {
    // 1. 检查并初始化元数据存储
    if (!Reflect.hasMetadata('dateFormat', target.constructor)) {
      Reflect.defineMetadata('dateFormat', {}, target.constructor);
    }

    // 2. 获取现有的日期格式元数据
    const dateFormats = Reflect.getMetadata('dateFormat', target.constructor);

    // 3. 为特定属性添加格式设置
    dateFormats[propertyKey] = format;
  };
};