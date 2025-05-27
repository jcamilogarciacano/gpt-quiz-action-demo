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
  ],
  algebra: [
    { question: "What is the solution to the equation 2x + 3 = 7?", answer: "x = 2" },
    { question: "What is the name of a mathematical expression with variables and constants?", answer: "An algebraic expression" },
    { question: "What is the inverse operation of addition?", answer: "Subtraction" }
  ]
};

function getClosestTopic(input) {
  const threshold = 0.4;
  let bestMatch = null;
  let bestScore = 0;

  const score = (a, b) => {
    const shared = [...a].filter(char => b.includes(char)).length;
    return shared / Math.max(a.length, b.length);
  };

  for (const topic of Object.keys(topics)) {
    const s = score(input, topic);
    if (s > bestScore && s >= threshold) {
      bestMatch = topic;
      bestScore = s;
    }
  }

  return bestMatch;
}

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname === "/quiz" && url.searchParams.has("topic")) {
    const input = url.searchParams.get("topic").toLowerCase();
    const exact = topics[input];

    if (exact) {
      return event.respondWith(new Response(JSON.stringify({ topic: input, questions: exact }), {
        headers: { "Content-Type": "application/json" }
      }));
    }

    const suggestion = getClosestTopic(input);
    const message = suggestion
      ? `Topic not found. Did you mean "${suggestion}"?`
      : `Topic "${input}" is not available.`;

    return event.respondWith(new Response(JSON.stringify({ error: message }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    }));
  }
});
