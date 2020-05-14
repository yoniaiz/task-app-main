const app = require("./app");

const port = process.env.PORT;

app.listen(port, () => {
  console.log("====================================");
  console.log(`server is running on port ${port}`);
  console.log("====================================");
});
