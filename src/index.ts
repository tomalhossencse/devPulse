import app from "./app";
import config from "./config";
import { initDB } from "./db";

const port = config.port;

const main = async () => {
  initDB();
  app.listen(port, () => {
    console.log(`server is running on port ${port}`);
  });
};

main();
