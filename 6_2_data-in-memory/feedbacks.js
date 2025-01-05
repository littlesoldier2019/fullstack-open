const kv = await Deno.openKv();

const setFeedback = async (feedbackId) => {
  const feedback = await kv.get([`${feedbackId}`]);
  const feedbackValue = feedback?.value ?? 0;
  await kv.set([`${feedbackId}`], feedbackValue + 1);
};

const getFeedback = async (feedbackId) => {
  const feedback = await kv.get([`${feedbackId}`]);
  return feedback.value ?? 0;
};

export { setFeedback, getFeedback };
