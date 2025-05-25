import "dotenv/config";
import express from "express";
import crypto from "crypto";
const app = express();
const PORT = 5959;

const JWTHeader = {
  alg: "HS256",
  typ: "JWT",
};

// const JWTPayload = {
//   sub: "090999",
//   name: "einzeL",
//   admin: true,
// };
// const dateTime = new Date();
const JWTPayload = {
  sub: new Date(),
  name: "einzeL",
  admin: true,
};

console.log(JWTPayload);

const base64urlEncode = (obj) =>
  Buffer.from(JSON.stringify(obj))
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

const headerEncoded = base64urlEncode(JWTHeader);
const payloadEncoded = base64urlEncode(JWTPayload);

const secret = process.env.SECRET_KEY;

const signatureEncoded = crypto
  .createHmac("sha256", secret)
  .update(`${headerEncoded}.${payloadEncoded}`)
  .digest("base64")
  .replace(/=/g, "")
  .replace(/\+/g, "-")
  .replace(/\//g, "_");

const JWT = `${headerEncoded}.${payloadEncoded}.${signatureEncoded}`;
console.log(JWT);
console.log("\n");
