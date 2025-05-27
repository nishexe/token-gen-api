import express from "express";
import getAccessTokenRouter from "../routes/getAccessTokenRouter.js";
import validateAccessTokenRouter from "../routes/validateAccessToken.js";

const app = express();
const PORT = 5959;

app.use(express.json());
app.use(express.text());

app.use("/getAccessToken", getAccessTokenRouter);
app.use("/validateAccessToken", validateAccessTokenRouter);

app.listen(PORT, () => {
  console.log(`token-gen-api running at : ${PORT}`);
});
