import { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } from "./../utils/config";
import { redisClient } from "./../utils/redis";
import fetch from "node-fetch";

interface TwitchResponse {
  access_token: string;
  expires_in: string;
  token_type: string;
}

export async function fetchAuth() {
  const json: TwitchResponse = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${TWITCH_CLIENT_ID}&client_secret=${TWITCH_CLIENT_SECRET}&grant_type=client_credentials`,
    { method: "POST" },
  ).then((req) => req.json());

  await redisClient.set(
    "someones-live:token",
    json.access_token,
    "EX",
    parseInt(json.expires_in),
  );
  console.log("Set redis token.");
}
