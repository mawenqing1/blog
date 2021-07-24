---
title: 如何绘制多个点
---

WebGL如何绘制多个点
===


### 1.获取webgl的context

相信用到webgl的小伙伴对canvas也是很熟悉了，类似于canvas，我们首先要获取到webgl的context

```js
const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl');
```

命名习惯看个人爱好，这里习惯把webgl的context命名为gl

### 2.编写着色器源码

使用着色器语言（GLSL ES）编写着色器源码

```js
        // 顶点着色器源码
const vsSource = `
            attribute vec4 a_Position;
            attribute float a_PointSize;

            void main() {
                gl_Position = a_Position;
                gl_PointSize = a_PointSize;
            }
            `;

        // 片源着色器源码
const fsSource = `
            precision mediump float;
            uniform vec3 u_FragColor;

            void main() {
                gl_FragColor = vec4(u_FragColor, 1.0);
            }
        `;

```

特别注意：写完记得写分号！否则将会报错

uniform与attribute类似，都是存储限定符，主要的区别如下：

attribute

只能用于顶点着色器，用来表示逐顶点的数据（每个顶点中该值不一样）

uniform

可以用于顶点着色器，也可以用于片元着色器，用来表示一致的、不变的数据（每个顶点中该值都一样）

片源着色器需要声明浮点数精度`precision lowp/mediump/highp float`

### 3.创建着色器对象

```js
// 创建顶点着色器
const vsShader = gl.createShader(gl.VERTEX_SHADER);

// 创建片源着色器
const fsShader = gl.createShader(gl.FRAGMENT_SHADER);
```

### 4.将源码注入到对应的着色器中

```js
// 把源码注入到对应的着色器中
gl.shaderSource(vsShader, vsSource);
gl.shaderSource(fsShader, fsSource);
```

### 5.编译着色器代码并检查

```js
// 编译着色器代码
gl.compileShader(vsShader);
gl.compileShader(fsShader)
// 判断着色器是否创建成功
if (!gl.getShaderParameter(vsShader, gl.COMPILE_STATUS)) {
    console.error(`shader compile failed: ${gl.getShaderInfoLog(vsShader)}`);
    gl.deleteShader(vsShader);
};
```

### 6.创建着色程序

js与webgl内部交流主要依靠这个程序，这步可不能忘

```js
// 创建一个空的着色程序
const program = gl.createProgram();
```

### 7.将着色器注入程序

```js
// 将着色器注入程序
gl.attachShader(program, vsShader);
gl.attachShader(program, fsShader);
```

### 8.连接着色程序并判断是否成功

```js
// 连接程序
gl.linkProgram(program);
// 判断程序是否创建成功
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error(`program created failed: ${gl.getProgramInfoLog(program)}`);
    gl.deleteProgram(program);
};
```

### 9.使用程序

```js
gl.useProgram(program);
```

### 10.创建类型化数组存放顶点数据

这里是一次性传入一组坐标数据

```js
// 存放顶点数据
const vertices = new Float32Array([
    0.0, 0.0, 0.5, 0.5, -0.5, -0.5, -0.5, 0.5, 0.5, -0.5
]);
```

注意：向buffer写入的数据不是一般数组，需要new类型化数组，否则报错，错误信息如下：

```js
GL ERROR :GL_INVALID_OPERATION :glDrawArrays: attempt to access out of range vertices in attribute 0
```

因为GLSL ES是强类型语言，js是弱类型的，js数组元素没有限制，而GLSL ES需要非常严格的数据，所以才有了类型化数组。在webgl中，类型化数组有以下8种：

Int8Array

UInt8Array

Int16Array

UInt16Array

Int32Array

UInt32Array

Float32Array

Float64Array

### 11.创建buffer

buffer是webgl系统内部划分出的一块区域，可以存放一组顶点数据，比如顶点坐标，把顶点数据写入buffer后，着色器程序执行时就可以从buffer中读取数据，在数据量较大时尤为方便

```js
// 创建缓冲对象
const buffer = gl.createBuffer();
```

### 12.缓冲器与着色器连接

因为无法直接向缓冲区写入数据，只能向target写入，所以要向缓冲区写数据，必须要先绑定target与buffer。target表示缓冲区对象的用途，值为`gl.ARRAY_BUFFER`或者`gl.ELEMENT_ARRAY_BUFFER`，前者表示缓冲区对象包含了顶点数据，后者表示包含了顶点的索引值

```js
// 缓冲器与着色器建立连接
gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
```

### 13.往缓冲器写入数据

```js
// 往缓冲器写入数据
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
```

通过`gl.bufferData(target, data, usage)`写入数据

data就是我们上面所说的类型化数组

usage表示缓冲区数据用途，WebGL会根据用途进行优化，值为`gl.STATIC_DRAW`（只向缓冲区对象写入一次数据，但需要绘制很多次）、`gl.STREAM_DRAW`（只向缓冲区对象中写入一次数据，然后绘制若干次）或`gl.DYNAMIC_DRAW`（向缓冲区对象多次写入数据，并绘制很多次），区别不很明显，而且只可能会影响性能，不会影响最终结果

### 14.将缓冲区对象分配给a_Position

```js
// 将缓冲区对象分配给a_Position
const a_Position = gl.getAttribLocation(program, 'a_Position');
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
```

`gl.vertexAttribPointer(location, size, type, normalized, stride, offset)`具体参数含义如下：

```js
size        //缓冲区中每个顶点的分量个数（1~4），表示每个顶点数据中要赋值给着色器变量的分量个数
type        //数据格式，值为gl.UNSIGNED_BYTE、gl.SHORT、gl.UNSIGNED_SHORT、gl.INT、gl.UNSIGNED_INT、gl.FLOAT五种
normalized  //true|false，表示是否把非浮点型数据归一化到[0, 1]或者[-1, 1]区间
stride      //指定相邻两个顶点间的字节数，默认为0
offset      //缓冲区对象中的偏移量，从缓冲区的offset位置开始写，从头开始就是0
```

### 15.开启顶点数据处理

```js
// 开启顶点数据处理
gl.enableVertexAttribArray(a_Position);
```

### 16.设置像素点大小和颜色

像素点大小和颜色也可以在写源码时直接设定死

```js
// 像素点大小
const a_PointSize = gl.getAttribLocation(program, 'a_PointSize');
gl.vertexAttrib1f(a_PointSize, 10.0);
// 颜色
const u_FragColor = gl.getUniformLocation(program, 'u_FragColor');
gl.uniform3f(u_FragColor, 0.5, 0.0, 1.0);
```

### 17.设置绘制的窗口

```js
// 设置绘制的窗口
gl.viewport(0, 0, canvas.width, canvas.height);
```

### 18.清除画布

```js
// 清除画布颜色
gl.clearColor(0, 0, 0, 0)
// 清除颜色缓冲区
gl.clear(gl.COLOR_BUFFER_BIT);
```

### 19.开始绘制

```js
        // 绘制点
        gl.drawArrays(gl.POINTS, 0, 5);
```
