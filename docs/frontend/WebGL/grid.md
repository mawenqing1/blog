---
title: 如何生成重复图案、分形图案以及随机效果
---

# 如何生成重复图案、分形图案以及随机效果  

## 如何绘制出网格图案  

请开动脑筋想一下，网格这种经典的重复图案我们该怎么绘制呢？下面介绍两分钟绘制网格图案的方法

### 1.使用css绘制重复图案  

css中的`background-image`属性中有一个`linear-gradient`属性，使用例子如下：  

```js
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        canvas {
            background-image: linear-gradient(to right, transparent 90%, #ccc 0),
            linear-gradient(to bottom, transparent 90%, #ccc 0);
            background-repeat: repeat;
            background-size: 8px 8px;
        }
    </style>
</head>
<body>
    <canvas width="600" height="600"></canvas>
    
</body>
</html>
```  

![网格效果图](/assets/webgl/gurd.png) 

我们创建了一个600*600的画布，设置了两个`linear-gradient`属性，一个是从左到右，一个是从上到下，0-90%区域是透明的，剩下的区域为#ccc。另外，在`linear-gradient`中定义过渡区域颜色时，如果后一个过渡颜色的值和前面相同，我们可以简写为0。

此方法固然简单，但也有些限制。首先，因为它设置的是canvas的背景，所以它和直接绘制在画布上的图形就属于不同的层，这样就无法将其覆盖在图形上。其次，当我们用坐标变换来缩放或移动元素时，作为背景的网格是不会根据图片的转变而转变的。


### 2.使用WebGL绘制重复图案  

使用WebGL，我们可以利用GPU并行计算的特点，使用着色器来绘制背景网格这样的重复图案。


