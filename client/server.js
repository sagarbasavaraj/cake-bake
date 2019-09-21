const next = require("next");
const express = require("express");
const PORT = parseInt(process.env.PORT, 10) || 5000;

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const requestHandle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("*", (req, res) => {
      return requestHandle(req, res);
    });

    server.listen(PORT, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch(ex => {
    console.error(ex.stack);
    process.exit(1);
  });
