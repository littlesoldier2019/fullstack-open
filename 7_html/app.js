import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { setFeedback, getFeedback } from "./feedbacks.js";

const app = new Hono();

app.get("/", async (c) => {
  const html = await Deno.readTextFile("./index.html");
  return c.html(html);
});

export default app;
