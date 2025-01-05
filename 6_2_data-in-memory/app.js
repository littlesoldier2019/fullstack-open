import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { setFeedback, getFeedback } from "./feedbacks.js";

const app = new Hono();

app.get("/feedbacks/:id", async (c) => {
  const feedbackId = c.req.param("id");
  const count = await getFeedback(feedbackId);
  const response = `Feedback ${feedbackId}: ${count}`;
  return c.text(response);
});

app.post("/feedbacks/:id", async (c) => {
  const feedbackId = c.req.param("id");
  setFeedback(feedbackId);
  return c.text("Feedback received!");
});

export default app;
