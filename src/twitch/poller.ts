import { redisClient } from "./../utils/redis";
import { fetchAuth } from "./fetchAuth";
import { fetchStreams } from "./fetchStreams";

export let currentStreams: string[] = [];

runPoller();
setInterval(runPoller, 2 * 60 * 1000);

export async function runPoller() {
  const token = await redisClient.get("someones-live:token");
  if (!token) await fetchAuth();
  currentStreams = await fetchStreams();
}
