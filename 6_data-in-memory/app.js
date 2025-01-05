import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";

const app = new Hono();

let count = 0;
let response = "";

app.get("/", (c) => {
  count++;
  if (count === 1) {
    response = c.text("3");
  } else if (count === 2) {
    response = c.text("2");
  } else if (count === 3) {
    response = c.text("1");
  } else {
    response = c.text("Kaboom!");
  }
  return response;
});

export default app;
