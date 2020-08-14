git pull

cnpm install && cnpm run build

docker rm -f myBlog &> /dev/null

docker run -d --restart=on-failure:5 \
    -p 80:80 \
    -v $PWD/public:user/share/nginx/html \
    --name myBlog nginx

