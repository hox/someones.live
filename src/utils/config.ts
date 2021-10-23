export const {
  REDIS_PORT = "5379",
  REDIS_HOST = "127.0.0.1",
  REDIS_DB = "1",
  TWITCH_CLIENT_ID = "",
  TWITCH_CLIENT_SECRET = "",
  API_PORT = "8080",
} = process.env;

if (TWITCH_CLIENT_ID == "" || TWITCH_CLIENT_SECRET == "")
  throw new Error("Twitch environment vairables are required.");
