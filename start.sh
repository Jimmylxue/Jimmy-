# 拉去代码
git pull

# 安装依赖
cnpm install && cnpm run build

# 删除容器
docker rm -f myblog &> /dev/null

# 重启容器
docker run -d --restart=on-failure:5\
    -p 80:80 \
    -v $PWD/dist:/usr/share/nginx/html \
    --name myblog nginx
