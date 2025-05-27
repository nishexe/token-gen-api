import "dotenv/config";
import crypto from "crypto";
import express from "express";
function generateToken() {
  const JWTHeader = {
    alg: "HS256",
    typ: "JWT",
  };
  const JWTPayload = {
    sub: new Date(),
    name: "einzeL",
    admin: true,
  };
  const base64urlEncode = (obj) =>
    Buffer.from(JSON.stringify(obj))
      .toString("base64")
      .replace(/=/g, "")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");
  const headerEncoded = base64urlEncode(JWTHeader);
  const payloadEncoded = base64urlEncode(JWTPayload);
  const secret = process.env.JWT_SECRET_KEY;
  const signatureEncoded = crypto
    .createHmac("sha256", secret)
    .update(`${headerEncoded}.${payloadEncoded}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const JWT = `${headerEncoded}.${payloadEncoded}.${signatureEncoded}`;
  return JWT;
}

const getAccessTokenRouter = express.Router();

getAccessTokenRouter.route("/").post(async (req, res) => {
  try {
    if (!req.body || typeof req.body === "undefined") {
      return res.status(417).send(`client_id is required in the body`);
    } else {
      const req_client_id = req.body.split("=")[1].trim();
      if (req_client_id === process.env.CLIENT_ID) {
        return res.status(202).send(generateToken());
      } else {
        return res.status(401).send(`Unauthorized!`);
      }
    }
  } catch (error) {
    // console.log(error);
    return res.status(500);
  }
});

export default getAccessTokenRouter;
