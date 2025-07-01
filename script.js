let pipeline;

window.onload = async () => {
  document.getElementById("chat-log").innerHTML += `<div class="message bot">Loading model...`;
  pipeline = await window.transformers.pipeline('text-generation', 'Xenova/gpt2');
  document.getElementById("chat-log").innerHTML += `<div class="message bot">Angel AI ready. Ask anything.</div>`;
};

window.sendMessage = async () => {
  const inputField = document.getElementById("user-input");
  const userText = inputField.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  inputField.value = '';

  const response = await pipeline(userText, {
    max_new_tokens: 60,
    temperature: 0.7,
    top_k: 50,
    repetition_penalty: 1.1,
  });

  const botText = response[0].generated_text.replace(userText, '').trim();
  addMessage(botText, 'bot');
};

function addMessage(text, sender) {
  const message = document.createElement('div');
  message.className = `message ${sender}`;
  message.innerText = text;
  document.getElementById("chat-log").appendChild(message);
  document.getElementById("chat-log").scrollTop = document.getElementById("chat-log").scrollHeight;
}
