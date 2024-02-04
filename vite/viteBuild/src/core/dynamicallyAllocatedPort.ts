import net from "net";

export function dynamicallyAllocatedPort(port: number = 1): Promise<number> {

  return new Promise((resolve) => {
    const server = net.createServer();

    server.on("error", (err) => {
      // @ts-ignore
      if (err.code === "EADDRINUSE") {
        console.log(`Port ${port} is in use, trying another one -> Port: ${port + 1}`);
        // 端口被占用，尝试下一个
        dynamicallyAllocatedPort(port + 1).then(resolve);
      }
    });

    server.listen(port, () => {
      server.close(() => {
        // 找到可用端口，传递给回调函数
        resolve(port);
      });
    });
  });
}
