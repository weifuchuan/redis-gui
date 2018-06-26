const {
  connect
} = require("../index.ts");

test("success connect at redis server is started", async () => {
  const result = await connect({
    host: "127.0.0.1",
    port: 6379,
    path: "",
    url: "",
    string_numbers: false,
    socket_keepalive: true,
    password: "",
    db: "",
    family: "IPv4",
    prefix: "",
    keepSetting: true,
    autoConnect: false
  });
  expect(result.ok).toBe(true);
})
          
test("faild connect at redis server is started", async () => {
  const result = await connect({
    host: "127.0.0.1",
    port: 1111, // error
    path: "",
    url: "",
    string_numbers: false,
    socket_keepalive: true,
    password: "",
    db: "",
    family: "IPv4",
    prefix: "",
    keepSetting: true,
    autoConnect: false
  });
  expect(result.ok).toBe(false);
  console.log(JSON.stringify(result.error));
})
