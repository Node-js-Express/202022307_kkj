import express from "express";
import { router } from "./routes/route.js"

const app = express();
const port = 8080;

app.listen(port, () => {
    console.log('server is listening on port 8080...');
  });

app.use(express.json());
app.use('/api/poketmons', router);