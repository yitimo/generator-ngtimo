# generator-ngtimo [![NPM version][npm-image]][npm-url]
> yitimo&#39;s yeoman angular(^4) generator

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ngtimo using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ngtimo
```

## 构建应用 (Generate a full application)
Then generate your new project:

```bash
yo ngtimo
```

## 构建模块 (Generate just a full module)
You can also generate an angular module, it will only generate a basic module for you:

```bash
yo ngtimo:module
```

构建模块示例1:
```bash
yo ngtimo:module --route
// enter name
// enter base path
// enter page1,page2,page3
// done!
```
构建模块示例2:
```bash
yo ngtimo:module
// enter name
// enter base path
// enter anything(will not use)
// done!
```

当构建模块时的可选参数如下：

1. --route *是否包含路由(并不是生成一个路由模块，而是生成一个包含子路由页面的完整模块)*

当构建模块时会出现的问题如下：

1. 模块名 (生成的模块名，目前会直接拿来当作类的命名, 所以使用特殊符号时需要在生成后做相应更改, 以后会改善)
2. 基地址 (模块会在哪个目录下生成, 默认为当前目录(.))
3. 包含的子页面(当添加--route参数时有效，值为页面(即组件)名以 "," 拼接)

You can also generate a component, include inline-style or with html file or generate with a service (personally I'd like to give each page component a service, while for common shared component just use inline-component)

## 构建组件 (Generate just a component)

```bash
yo ngtimo:component
```

## More ability is coming...

## License

MIT © [yitimo](www.yitimo.com)


[npm-image]: https://badge.fury.io/js/generator-ngtimo.svg
[npm-url]: https://npmjs.org/package/generator-ngtimo
[travis-image]: https://travis-ci.org/yitimo/generator-ngtimo.svg?branch=master
[travis-url]: https://travis-ci.org/yitimo/generator-ngtimo
[daviddm-image]: https://david-dm.org/yitimo/generator-ngtimo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/yitimo/generator-ngtimo
[coveralls-image]: https://coveralls.io/repos/yitimo/generator-ngtimo/badge.svg
[coveralls-url]: https://coveralls.io/r/yitimo/generator-ngtimo
