let pipeline;
let modelReady = false;

async function loadModel() {
  try {
    const { pipeline: pipe } = window.transformers;
    pipeline = await pipe('text-generation', 'Xenova/gpt2');
    modelReady = true;
    addMessage("Angel loaded 👼", 'ai');
  } catch (err) {
    console.error('Failed to load model:', err);
    addMessage("Couldn't load Angel 😢", 'ai');
  }
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

  if (!modelReady) {
    addMessage("Angel's still loadin ⏳", 'ai');
    return;
  }

  const userText = input.value.trim();
  if (!userText) return;

  addMessage(userText, 'user');
  input.value = '';
  addMessage('Angel typin...', 'ai');

  try {
    const output = await pipeline(userText, { max_new_tokens: 40 });
    const reply = output[0].generated_text.replace(userText, '').trim();
    document.querySelector('.message.ai:last-child').remove();
    addMessage(reply || "Angel ain't got nun to say 😶", 'ai');
  } catch (err) {
    console.error('AI error:', err);
    addMessage("Angel messed up 😢", 'ai');
  }
});
