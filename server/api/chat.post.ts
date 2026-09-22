export default defineEventHandler(async (event) => {
  const { messages } = await readBody(event);

  return await $fetch("http://localhost:11434/api/chat", {
    method: "POST",
    body: {
      model: "llama3.2:1b",
      messages: [
        {
          role: "system",
          content:
            "You are Tuku AI, a friendly and helpful assistant. Give clear answers under 150 words.",
        },
        ...messages,
      ],
      options: {
        num_predict: 250,
      },
      stream: false,
    },
  });
});
