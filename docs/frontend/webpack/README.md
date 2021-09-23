---
title: webpack基础
---

# 概念  

![](/assets/webpack/introduce.png)

本质上，webpack 是一个用于现代 JavaScript 应用程序的 静态模块打包工具。当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 依赖图(dependency graph)，然后将你项目中所需的每一个模块组合成一个或多个 bundles，它们均为静态资源，用于展示你的内容。

# 入口

## 单个入口（简写）语法  

用法：`entry:string | [string]`

**webpack.config.js**  

```ts
module.exports = {
    entry: './path/to/my/entry/file.js',
}
```

`entry`属性的单个入口语法，参考下面的简写：  

**webpack.config.js**

```ts
module.exports = {
    entry: {
        main: './path/to/my/entry/file.js',
    }
}
```

我们也可以将一个文件路径数组传递给`entry`属性，这将创建一个所谓的 **“multi-main entry”**。在你想要一次注入多个依赖文件，并且将它们的依赖关系绘制在一个"chunk"中时，这种方式就很有用。

**webpack.config.js**

```ts
module.exports = {
    entry: ['./src/file_1.js', './src/file_2.js'],
    output: {
        filename: 'bundle.js'
    }
}
```

当你希望通过一个入口（例如一个库）为应用程序或工具快速设置webpack配置时，单一入口的语法方式是不错的选择。然而，使用这种语法方式来扩展或调整配置的灵活性不大。

## 对象语法

用法：`entry: {<entryChunkName>string | [string]} | {}`

**webpack.config.js**  

```ts
module.exports = {
    entry: {
        app: './src/app.js',
        admminApp: './src/adminApp.js'
    }
}
```

对象语法会比较繁琐。然而，这是应用程序中定义入口的最可扩展的方式。

>[Info]

>“webpack 配置的可扩展” 是指，这些配置可以重复使用，并且可以与其他配置组合使用。这是一种流行的技术，用于将关注点从环境(environment)、构建目标(build target)、运行时(runtime)中分离。然后使用专门的工具（如 webpack-merge）将它们合并起来。

### 描述入口的对象  

用于描述入口的对象。你可以使用如下属性：  

- `dependOn`: 当前入口所依赖的入口。他们必须在该入口被加载前被加载。

- `filename`: 指定要输出的文件名称。

- `import`: 启动时需加载的模块。

- `library`: 指定library选项，为当前entry构建一个library。

- `runtime`: 运行时chunk的名字。如果设置了，就会创建一个新的运行时chunk。在webpack5.43.0之后可将其设为`false`以避免一个新的运行时chunk。

- `publicPath`: 当该入口的输出文件在浏览器中被引用时，为他们指定一个公共URL地址。

**webpack.config.js**  

```ts
module.exports = {
    entry: {
        a2: 'dependingfile.js',
        b2: {
            dependOn: 'a2',
            import: './src/app.js'
        }
    }
}
```

`runtime`和`dependOn`不应在同一个入口上同时使用，所以如下配置无效，并且会抛出错误：  

**webpack.config.js**  

```ts
module.exports = {
    entry: {
        a1: './a',
        b1: {
            runtime: 'a1',
            import: './b'
        }
    }
}
```

确保`runtime`不能指向已存在的入口名称，例如下面配置会抛出一个错误：

```ts
module.exports = {
    entry: {
        a1: './a',
        b1: {
            runtime: 'a1',
            import: './b'
        }
    }
}
```

另外`dependOn`不能是循环引用的，下面的例子也会出现错误：  

```ts
module.exports = {
    entry: {
        a3: {
            import: './a',
            dependOn: 'b3',
        }
        b3: {
            import: './b',
            dependOn: 'a3'
        }
    }
}
```

# 出口  

可以通过配置 `output` 选项，告知 webpack 如何向硬盘写入编译文件。注意，即使可以存在多个 `entry` 起点，但只能指定一个 `output` 配置。

## 用法

在 webpack 配置中，`output` 属性的最低要求是，将它的值设置为一个对象，然后为将输出文件的文件名配置为一个 `output.filename`：  

```ts
//webpack.config.js

module.exports = {
    output: {
        filename: 'main.js'
    }
}
```

上述配置将一个单独的`main.js`文件输出到`dist`目录下。

## 多个入口

如果配置的入口多于一个，则使用**占位符**来确保每个文件具有唯一的名称。

```ts
//webpack.config.js  

module.exports = {
    entry: {
        app: './src/app..js',
        search: './src/search.js',
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
}
```

# loader  

loader 用于对模块的源代码进行转换。loader 可以使你在 import 或 "load(加载)" 模块时预处理文件。因此，loader 类似于其他构建工具中“任务(task)”，并提供了处理前端构建步骤的得力方式。loader 可以将文件从不同的语言（如 TypeScript）转换为 JavaScript 或将内联图像转换为 data URL。loader 甚至允许你直接在 JavaScript 模块中 import CSS 文件！

## 安装  

转化文件前，需要先安装对应的loader，我们以webpack加载css文件及ts转为js为例：  

```ts
npm install --save-dev css-loader ts-loader
```

接着对每个`.css`使用`css-loader`，`.ts`使用`ts-loader`:  

```ts
//webpack.config.js

module.exports = {
    module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader',
            },
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    }
}
``` 

## 配置方式  

`module.rules` 允许你在 webpack 配置中指定多个 loader。 这种方式是展示 loader 的一种简明方式，并且有助于使代码变得简洁和易于维护。

```ts
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // [style-loader](/loaders/style-loader)
          { loader: 'style-loader' },
          // [css-loader](/loaders/css-loader)
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      }
    ]
  }
};
```

loader 从右到左（或从下到上）地取值(evaluate)/执行(execute)。在上面的示例中，从 `sass-loader` 开始执行，然后继续执行 `css-loader`，最后以 `style-loader` 结束。  

# plugin 

插件目的在于解决loader无法实现的其他事。Webpack 提供很多开箱即用的插件。

## 用法  

由于插件可以携带参数/选项，你必须在 webpack 配置中，向 `plugins` 属性传入一个 `new` 实例。

### 配置方式  

```ts
//webpack.config.js

const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const webpack = require('webpack'); // 访问内置的插件
const path = require('path');

module.exports = {
  entry: './path/to/my/entry/file.js',
  output: {
    filename: 'my-first-webpack.bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({ template: './src/index.html' }),
  ],
};
```

`ProgressPlugin` 用于自定义编译过程中的进度报告，`HtmlWebpackPlugin` 将生成一个 HTML 文件，并在其中使用 script 引入一个名为 `my-first-webpack.bundle.js` 的 JS 文件。

# 配置  

由于 webpack 遵循 CommonJS 模块规范，因此，你可以在配置中使用：

- 通过 require(...) 引入其他文件
- 通过 require(...) 使用 npm 下载的工具函数
- 使用 JavaScript 控制流表达式，例如 ?: 操作符
- 对 value 使用常量或变量赋值
- 编写并执行函数，生成部分配置

## 基本配置  

```ts
//webpack.config.js

const path = require('path');

module.exports = {
  mode: 'development',
  entry: './foo.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'foo.bundle.js',
  },
};
```

# 模块  

在模块化编程中，开发者将程序分解为功能离散的 chunk，并称之为 **模块**。

每个模块都拥有小于完整程序的体积，使得验证、调试及测试变得轻而易举。 精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具备了条理清晰的设计和明确的目的。

## 支持的模块类型  

Webpack 天生支持如下模块类型：

- ECMAScript 模块
- CommonJS 模块
- AMD 模块
- Assets
- WebAssembly 模块

通过 loader 可以使 webpack 支持多种语言和预处理器语法编写的模块。loader 向 webpack 描述了如何处理非原生模块，并将相关依赖引入到你的 bundles中。 webpack 社区已经为各种流行的语言和预处理器创建了 loader，其中包括：  

- CoffeeScript
- TypeScript
- ESNext (Babel)
- Sass
- Less
- Stylus
- Elm

# 模块解析

resolver 是一个帮助寻找模块绝对路径的库。 一个模块可以作为另一个模块的依赖模块，然后被后者引用，如下：  

```ts
import foo from 'path/to/module';
// 或者
require('path/to/module');
```

所依赖的模块可以是来自应用程序的代码或第三方库。 `resolver` 帮助webpack从每个 `require/import` 语句中，找到需要引入到 `bundle` 中的模块代码。 当打包模块时webpack使用 `enhanced-resolve` 来解析文件路径。

## webpack中的解析规则

使用 `enhanced-resolve`，webpack能解析三种文件路径：

**绝对路径**  

```ts
import '/home/me/file';
import 'C:\\Users\\me\\file';
```

由于已经获得文件的绝对路径，因此不需要再做进一步解析。

**相对路径**

```ts
import '../src/file1';
import './file2';
```

在这种情况下，使用 `import` 或 `require` 的资源文件所处的目录，被认为是上下文目录。在 `import/require` 中给定的相对路径，会拼接此上下文路径，来生成模块的绝对路径。

**模块路径**  

```ts
import 'module';
import 'module/lib/file';
```

在 resolve.modules 中指定的所有目录检索模块。 你可以通过配置别名的方式来替换初始模块路径。

- 如果 package 中包含 `package.json` 文件，那么在 `resolve.exportsFields` 配置选项中指定的字段会被依次查找，package.json 中的第一个字段会根据 package 导出指南确定 package 中可用的 export。
- 
一旦根据上述规则解析路径后，resolver 将会检查路径是指向文件还是文件夹。如果路径指向文件：

- 如果文件具有扩展名，则直接将文件打包。
- 否则，将使用 `resolve.extensions` 选项作为文件扩展名来解析，此选项会告诉解析器在解析中能够接受那些扩展名（例如 .js，.jsx）。
- 
如果路径指向一个文件夹，则进行如下步骤寻找具有正确扩展名的文件：

- 如果文件夹中包含 `package.json` 文件，则会根据 `resolve.mainFields` 配置中的字段顺序查找，并根据 `package.json` 中的符合配置要求的第一个字段来确定文件路径。
- 如果不存在 `package.json` 文件或 `resolve.mainFields` 没有返回有效路径，则会根据 `resolve.mainFiles` 配置选项中指定的文件名顺序查找，看是否能在 `import/require` 的目录下匹配到一个存在的文件名。
- 然后使用 `resolve.extensions` 选项，以类似的方式解析文件扩展名。

Webpack 会根据构建目标，为这些选项提供合理的默认配置。

