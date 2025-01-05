const kv = await Deno.openKv();

const setStore = async (store) => {
  await kv.set(["store"], store);
};

const getStore = async () => {
  const store = await kv.get(["store"]);
  return store.value ?? "Nothing.";
};

export { setStore, getStore };
