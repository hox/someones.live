import { TWITCH_CLIENT_ID } from "./../utils/config";
import { redisClient } from "./../utils/redis";
import fetch from "node-fetch";

interface TwitchResponse {
  data: [
    {
      id: string;
      user_id: string;
      user_login: string;
      user_name: string;
      game_id: string;
      game_name: string;
      type: string;
      title: string;
      viewer_count: number;
      started_at: string;
      language: string;
      thumbnail_url: string;
      tag_ids: string[];
      is_mature: boolean;
    },
  ];
  pagination: {
    cursor: string;
  };
}

export async function fetchStreams() {
  const json: TwitchResponse = await fetch(
    "https://api.twitch.tv/helix/streams?first=100",
    {
      headers: {
        Accept: "application/vnd.twitchtv.v5+json",
        "Client-ID": TWITCH_CLIENT_ID,
        Authorization:
          "Bearer " + (await redisClient.get("someones-live:token")) || "",
      },
    },
  ).then((req) => req.json());

  console.log(`Fetched ${json.data.length} streams`);

  return json.data.map((twitchUser) => twitchUser.user_login);
}
