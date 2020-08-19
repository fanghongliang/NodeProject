
## 基于express框架的后台REST-API实现  
* author: Fanghl  
-----  
后台使用mysql数据库，ORM采用sequelize实现，进行了 token 验证以及本地日志打印(morgin),针对浏览器环境，处理了跨域请求。对前端来的请求进行了基本的增删改查登录等接口，并且已将本地项目部署在云服务器上，使用 pm2 进行进程管理，nginx进行负载均衡处理。最终暴露对外的公网接口可以访问 160.13.4.75：3000/api/login (post),在login接口获得access_token， 将token放置在之后的请求头内即可访问余下的api。  
[![22-B80342-4-A69-4e82-8-E81-56535-FFE0126.png](https://i.postimg.cc/MHHPNvh3/22-B80342-4-A69-4e82-8-E81-56535-FFE0126.png)](https://postimg.cc/gL9H6kc3)

### 前后端分离  

本项目是为前端Vue项目打造的后台api,前端项目之后会上传，本项目还在不断地丰富接口。

### 技术点  

> * express  
> * sequelize-ORM
> * mysql
> * centos8(服务器环境)
> * nginx 
> * pm2(进程管理)  

### 架构   
* app.js 是入口核心文件
* /models 数据库表模型文件
* /routes 存放我们所有的路由
* /routes/core.js 在该文件内，express应用所有的路由，新添加的路由文件也应该放在 core 内导出，最后在app.js内只需要use('core.js')即可应用所有路由
* /utils/log 该文件夹存储api调用日志，已天为单位，一个自然日的日志单独生成一个日志文件 
* /utils 内存放项目配置文件，包括中间件、数据库连接配置等。

### How to run 

* install dependencies
> npm install  
> npm install -g nodemon

* serve with hot reload at localhost:3000
> nodemon bin/www(推荐)  
> nodemon serves.js

### possible problem  

* 数据库配置文件（utils/sequelize.config）未更改为你自己的，或者直接使用我线上的数据库也可以
* 依赖是否全部已安装  

### supplement   

至于服务器部署，可以去 http://fanghl.top/2020/06/09/server/#more 查阅更多

-----

> 涉及到后端开发的知识点基本涵盖了，项目需要的就是业务逻辑的填充了，本项目适合新手和前端了解一下后端开发思想和流程。如有更好的意见，欢迎大家积极提出。  

https://github.com/fanghongliang/NodeProject
