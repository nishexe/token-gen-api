import express from "express";
import getAccessTokenRouter from "../routes/getAccessTokenRouter.js";
const app = express();
const PORT = 5959;
app.use(express.json());
app.use(express.text());
app.use("/getAccessToken", getAccessTokenRouter);

app.listen(PORT, () => {
  console.log(`token-gen-api running at : ${PORT}`);
});
