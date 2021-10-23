import { fastify } from "fastify";
import { API_PORT } from "./../utils/config";
import { currentStreams } from "./../twitch/poller";

const api = fastify();

api.get("/", (req, resp) => {
  const twitchUrl = `https://twitch.tv/${
    currentStreams[Math.floor(Math.random() * currentStreams.length)]
  }`;
  resp.status(307).redirect(twitchUrl);
  console.log("Redirected someone to " + twitchUrl);
});

api.listen(API_PORT, "0.0.0.0", () =>
  console.log(`API Started on :${API_PORT}`),
);
