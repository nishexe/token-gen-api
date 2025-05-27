import "dotenv/config";
import crypto from "crypto";
import express from "express";
async function validateAccessToken(token) {
  const [headerEncoded, payloadEncoded, signatureEncoded] = token.split(".");
  const recreatedSignature = crypto
    .createHmac("sha256", process.env.JWT_SECRET_KEY)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return recreatedSignature === signatureEncoded;
}

const validateAccessTokenRouter = express.Router();

validateAccessTokenRouter.route("/").post(async (req, res) => {
  const isValidToken = await validateAccessToken(req.body);
  if (isValidToken) {
    res.status(200).send("Authenticated");
  } else {
    res.status(403).send("Invalid Token");
  }
});

export default validateAccessTokenRouter;
