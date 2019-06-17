module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 这里的选项会传递给 css-loader 开启less
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        bypass: function(req, res /*proxyOptions*/) {
          if (req.headers.accept.indexOf("html") !== -1) {
            console.log("Skipping proxy for browser request.");
            return "/index.html";
          } else if (process.env.MOCK !== "none") {
            // 获得请求地址并进行处理
            const name = req.path
              .split("/api/")[1]
              .split("/")
              .join("_");
            const mock = require(`./mock/${name}`);
            const result = mock(req.method); //传输请求模式，如果需要其他请求信息，直接传入req进行解析
            // 清理缓存 使更改mock数据的时候可以实时生效
            delete require.cache[require.resolve(`./mock/${name}`)];
            return res.send(result);
          }
        }
      }
    }
  }
};
