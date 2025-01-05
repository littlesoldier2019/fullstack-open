import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import { getStore, setStore } from "./store.js";

const app = new Hono();

app.get("/", async (c) => {
  const storeParam = c.req.query("store");
  if (storeParam) {
    console.log(storeParam);
    setStore(storeParam);
  }
  const store = await getStore();
  const response = `Store: ${store}`;
  return c.text(response);
});

export default app;
