let pipeline;

async function loadModel() {
  const { pipeline: pipe } = window.transformers;
  pipeline = await pipe('text-generation', 'Xenova/gpt2');
  console.log('Angel loaded 👼');
}

loadModel();

const chatBox = document.getElementById('chat');
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');

function addMessage(text, sender) {
  const msg = document.createElement('div');
  msg.className = `message ${sender}`;
  msg.textContent = text;
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  input.value = '';

  addMessage('Angel typin...', 'ai');

  const outputs = await pipeline(userText, { max_new_tokens: 50 });
  document.querySelector('.message.ai:last-child').remove();
  addMessage(outputs[0].generated_text.replace(userText, '').trim(), 'ai');
});
