# 拉去代码
git pull

# 安装依赖
cnpm install && cnpm run build

# 删除容器
docker rm -f myBlog &> /dev/null

# 重启容器
docker run -d --restart=on-failure:5 \
    -p 80:80 \
    -v $PWD/public:usr/share/nginx/html \
    --name myBlog nginx
