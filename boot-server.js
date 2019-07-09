const next = require("next");
const CakeBackServer = require("./server/cake-bake-server");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const requestHandle = app.getRequestHandler();

app
  .prepare()
  .then(async () => {
    const cakeBackServer = new CakeBackServer(requestHandle);
    try {
      await cakeBackServer.start();
    } catch (e) {
      console.error(`Error in starting Server`, e);
    }
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
