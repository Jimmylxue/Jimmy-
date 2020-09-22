---
title: docker中安装mysql数据库
date: 2020-09-22
sidebar: auto
categories:
  - 项目部署
tags:
  - 服务器端
  - docker
  - mysql
---

## docker 中安装 mysql 数据库

- 安装这 mysql 之前需要先安装一下 docker,[点击查看安装](http://39.96.42.170/docs/docker/%E5%89%8D%E7%AB%AF%E9%A1%B9%E7%9B%AE%E9%83%A8%E7%BD%B2.html#%E7%8E%AF%E5%A2%83%E7%9A%84%E9%83%A8%E7%BD%B2)

1. 查询 mysql

   ```
     docker search mysql
   ```

   ![查询mysql](https://img-blog.csdnimg.cn/20200922105439565.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

2. 拉取安装 mysql

   ```
     docker pull mysql
   ```

   ![安装mysql](https://img-blog.csdnimg.cn/20200922105608712.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

3. 检测是否安装成功（查看镜像）

   ```
     docker images
   ```

   ![查看镜像](https://img-blog.csdnimg.cn/20200922110005420.png#pic_center)

4. 配置环境（在 opt 下创建文件夹）

   ```
     cd /opt/
     mkdir mysql_docker
     cd mysql_docker/
   ```

5. 启动 mysql 容器，在 var/lib/docker/containers/下查看容器

   ```
     docker run --name mysqlserver -v $PWD/conf:/etc/mysql/conf.d -v $PWD/logs:/logs -v $PWD/data:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=123456 -d -i -p 3306:3306 mysql:latest
     cd /var/lib/docker/containers/
   ```

   ![在这里插入图片描述](https://img-blog.csdnimg.cn/20200922110305609.png#pic_center)

6. 查看 docker 中 mysql 镜像是否已经在运行

   ```
     docker ps
   ```

   ![查看运行镜像](https://img-blog.csdnimg.cn/20200922110502273.png#pic_center)

7. 进入 mysql 容器，并登陆 mysql

   ```
     docker exec -it mysqlserver bash
     mysql -u root -p
   ```

   ![登录mysql](https://img-blog.csdnimg.cn/2020092212553534.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

8. 开启远程访问权限

   ```
     use mysql;
     select host,user from user;
     ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY '123456';
     flush privileges;
   ```

   ![开启权限](https://img-blog.csdnimg.cn/20200922125640409.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

9. 使用本地的 mysql 软件登录远端的 mysql

这里推荐使用 Navicat 软件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200922125852662.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80NjI0MDE2Mg==,size_16,color_FFFFFF,t_70#pic_center)

10. 如果连接失败的处理（可选）

- 首先就是要检查一下服务器的 3306 端口是否开启（进阿里云服务器控制台）

只需要完成以上的步骤，在 docker 中就可以正常的使用 mysql
