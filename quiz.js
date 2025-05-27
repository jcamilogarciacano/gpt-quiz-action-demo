// quiz.js
const topics = {
  photosynthesis: [
    { question: "What is the main purpose of photosynthesis?", answer: "To convert light energy into chemical energy." },
    { question: "Which organelle is responsible for photosynthesis?", answer: "Chloroplast." },
    { question: "What gas is taken in during photosynthesis?", answer: "Carbon dioxide." }
  ],
  gravity: [
    { question: "Who formulated the law of universal gravitation?", answer: "Isaac Newton." },
    { question: "What does gravity do?", answer: "It attracts objects toward one another." },
    { question: "What is the acceleration due to gravity on Earth?", answer: "Approximately 9.8 m/s²." }
  ]
};

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);
  if (url.pathname === "/quiz" && url.searchParams.has("topic")) {
    const topic = url.searchParams.get("topic").toLowerCase();
    const questions = topics[topic] || [{ question: "No questions found.", answer: "" }];
    event.respondWith(new Response(JSON.stringify({ topic, questions }), {
      headers: { "Content-Type": "application/json" }
    }));
  }
});
