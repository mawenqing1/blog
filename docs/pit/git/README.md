---
title: 生成并添加SSH Key
---

1.安装git bash
<https://git-scm.com/downloads>

2.在项目文件中右击鼠标

![](/assets/git/git1.png)

3.依次输入指令

git config --global user.name "your name"  your name指你的github用户名  

git config --global user.email "your email"  同上  

ssh-keygen -t rsa -C "your email"  生成密匙  


4.找到.ssh文件中的id_rsa.pub文件，右击用记事本打开，复制其中的内容

![](/assets/git/git2.png)

5.登录github，点击个人头像后点击settings，进入后点击SSH and GPG keys

![](/assets/git/git3.png)

再次点击SSH Keys后的New SSH key，将文本内容复制进key的文本框点击下方添加即可

![](/assets/git/git4.png)