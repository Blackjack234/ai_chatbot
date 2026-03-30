# 🤖 MemoryBot — Context-Aware AI Chatbot

> A hands-on learning project to understand how AI memory, context windows, and conversational AI work under the hood — built with NestJS, MongoDB, and Google Gemini.

---

## 📌 What Is This?

MemoryBot is a **context-aware chatbot API** that remembers your conversation history across messages. Unlike a stateless AI call, every message you send includes the full conversation history — which is exactly how tools like ChatGPT maintain context.

This project is intentionally small and educational. The goal is not to build the next big product, but to **deeply understand how AI APIs work**.

---

## 🧠 What You'll Learn From This Project

| Concept | Where it happens |
|---|---|
| How LLMs use conversation history | `chat.service.ts` — history is rebuilt on every request |
| What a context window is | Try sending 100+ messages and watch Gemini's behavior |
| Prompt engineering basics | System prompt in `gemini.service.ts` |
| Stateful vs stateless AI | Compare with/without history (see Experiments section) |
| REST API design | `chat.controller.ts` |
| NoSQL data modeling | `session.schema.ts` |

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Backend Framework** | [NestJS](https://nestjs.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) + Mongoose |
| **AI Model** | [Google Gemini 1.5 Flash](https://aistudio.google.com/) (free tier) |
| **Language** | TypeScript |

---

## 📁 Project Structure

```
src/
├── chat/
│   ├── chat.controller.ts        # API routes
│   ├── chat.service.ts           # Core chatbot logic
│   ├── chat.module.ts
│   └── dto/
│       └── send-message.dto.ts   # Request validation
├── session/
│   ├── session.schema.ts         # MongoDB schema
│   ├── session.service.ts        # DB operations
│   └── session.module.ts
├── gemini/
│   ├── gemini.service.ts         # Gemini API wrapper
│   └── gemini.module.ts
└── app.module.ts
```

---

## ⚙️ How Memory Works (Core Concept)

This is the most important thing to understand about this project:

```
User sends "What did I say earlier?"
        ↓
Load ALL past messages from MongoDB
        ↓
Build payload = [system prompt] + [message 1] + [message 2] + ... + [new message]
        ↓
Send the ENTIRE history to Gemini on every request  ← This IS the memory
        ↓
Save AI reply back to MongoDB
        ↓
Return response to user
```

> 💡 AI models are stateless by nature. They don't remember anything between API calls.
> Memory is an illusion created by re-sending history every time.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/chat` | Send a message. Creates a new session if no `sessionId` is provided |
| `GET` | `/chat/sessions` | List all chat sessions |
| `GET` | `/chat/:sessionId` | Get full message history of a session |
| `DELETE` | `/chat/:sessionId` | Delete a session and its history |

### Example Request

```json
POST /chat
{
  "sessionId": "optional-existing-session-id",
  "message": "What is the capital of France?"
}
```

### Example Response

```json
{
  "sessionId": "64f1a2b3c4d5e6f7a8b9c0d1",
  "reply": "The capital of France is Paris.",
  "messageCount": 3
}
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas) free tier)
- Google Gemini API Key → [Get it free at aistudio.google.com](https://aistudio.google.com)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/memorybot.git
cd memorybot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Fill in your GEMINI_API_KEY and MONGO_URI in .env

# 4. Start the development server
npm run start:dev
```

### Environment Variables

```env
# .env
GEMINI_API_KEY=your_gemini_api_key_here
MONGO_URI=mongodb://localhost:27017/memorybot
PORT=3000
```

---

## 🧪 Experiments to Try

These experiments are the real learning value of this project:

### 1. 🔕 Turn Off Memory
Comment out the history loading in `chat.service.ts` and send follow-up questions. The AI will have no context — you'll see firsthand why memory management matters.

### 2. 🏴‍☠️ Change the System Prompt
In `gemini.service.ts`, change the system prompt to `"You are a pirate"`. See how a single instruction shapes the entire personality of the AI.

### 3. 📏 Hit the Token Limit
Send 50+ messages in one session. At some point Gemini will start to lose early context. This is the **context window** in action.

### 4. 🗜️ Implement History Summarization
Instead of sending all messages, summarize older ones: `"Earlier the user discussed X and Y..."`. This is a real technique used in production AI apps to extend effective memory.

---

## 📚 Resources

- [Google Gemini API Docs](https://ai.google.dev/docs)
- [NestJS Official Docs](https://docs.nestjs.com/)
- [Mongoose Docs](https://mongoosejs.com/docs/)
- [Understanding LLM Context Windows](https://ai.google.dev/gemini-api/docs/long-context)

---

## 🤝 Contributing

This is a learning project — feel free to fork it, experiment, and break things. PRs are welcome if you've built one of the experiments above into a proper feature!

---

## 📄 License

MIT — do whatever you want with it.