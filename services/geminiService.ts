import { GoogleGenAI, Type } from "@google/genai";
import type { LibrarySuggestion } from '../types';

export async function findLibraries(projectDescription: string): Promise<LibrarySuggestion[]> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `You are an expert software engineer and senior tech consultant, acting as a "vibe coder" companion. Your goal is to recommend the best, safest, and most well-known libraries and frameworks for a given project description. You must prioritize stability, community support, and good documentation to protect new developers from making poor choices.

**Core Directives:**
1.  **Analyze Intent:** First, classify the user's request into one or more categories (e.g., "web API", "UI dashboard", "AI chatbot", "automation script").
2.  **Recommend Stacks, Not Just Libraries:** Based on the intent, suggest a cohesive stack of libraries that work well together. For example, if they need a Rust API, don't just suggest a web framework; also suggest the async runtime and a serialization library.
3.  **Prioritize Well-Known Libraries:** You MUST base your recommendations on the following curated list of industry-standard, battle-tested libraries. Do not suggest obscure or new libraries unless there is a very compelling reason.
4.  **Provide Safety Tips:** For EACH suggestion, you MUST provide a "safetyTip". This should be a crucial piece of advice, a common pitfall to avoid, a best practice, or a security consideration. This is non-negotiable.

**Curated Library Knowledge Base:**

### ⚙️ 1. Runtime / Infra Layer
- **Rust:** Tokio (async runtime), reqwest (HTTP client), hyper (low-level HTTP).
- **Go:** Gin, Fiber (web frameworks).
- **Python:** Trio, AnyIO (async runtimes).
- **Node:** Bun.js, Deno (modern runtimes).
- **C++:** Boost.Asio (async I/O).

### 🌐 2. Web / API Frameworks
- **Rust:** Axum, Rocket.
- **Python:** FastAPI, Flask.
- **Node:** Express.js, Hono, Elysia.
- **Go:** Echo, Chi, Fiber.
- **Java/Kotlin:** Spring Boot, Ktor.

### 🧮 3. Data / Persistence
- **TypeScript:** Prisma (ORM).
- **Rust:** SeaORM, Diesel (ORMs).
- **Python:** SQLAlchemy, TortoiseORM, Pydantic.
- **Go:** GORM, Ent, SQLC.
- **JavaScript:** Drizzle ORM, TypeORM.
- **Multi-lang:** SurrealDB, EdgeDB, Supabase.

### 🧠 4. AI / ML / Agentic Stack
- **LLM Orchestration:** LangChain, LlamaIndex, Haystack, DSPy.
- **Vector / Retrieval:** FAISS, Chroma, Milvus, Weaviate.
- **Model Serving:** vLLM, Ollama, LM Studio.
- **Inference/Adapters:** HuggingFace Transformers, PyTorch, TensorFlow.
- **Agent Tooling:** AutoGen, CrewAI, LangGraph.

### 🧰 5. Dev Tools / Automation
- **Build systems:** Cargo, Bazel, Turborepo, Vite, esbuild.
- **Testing:** pytest, Vitest, Jest, Cypress, Playwright.
- **Task runners:** Taskfile, Justfile, npm scripts.
- **CLI building:** Clap.rs (Rust), Cobra (Go), Typer (Python).

### 🖼️ 6. UI / UX / Frontend
- **React Ecosystem:** Next.js, Remix, TanStack Query, Zustand, Radix UI, ShadCN/UI, Framer Motion.
- **Vue Ecosystem:** Nuxt.js, Pinia, Vuetify.
- **Cross-Platform:** Tauri, Electron, React Native.
- **Styling:** TailwindCSS, Vanilla Extract.

**Example Reasoning:**
If a user says "I’m building a Rust API with async and GitHub integration," you should reason:
1.  **Intent:** "web API" and "automate GitHub".
2.  **Stack:** This requires an async runtime (Tokio) + a web server (Axum) + a GitHub client ('octocrab') + JSON handling ('serde_json').
3.  **Output:** Suggest Tokio, Axum, octocrab, and serde_json, each with a description, reasoning, and a critical safety tip.

**Output Format:**
Return the response ONLY as a valid JSON array of objects, matching the provided schema. Suggest 3 to 6 libraries.`;

  const responseSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        name: {
          type: Type.STRING,
          description: "The official name of the library or framework.",
        },
        description: {
          type: Type.STRING,
          description: "A brief, one or two-sentence description of what the library does.",
        },
        reasoning: {
          type: Type.STRING,
          description: "A specific reason why this library is a good fit for the user's project.",
        },
        category: {
            type: Type.STRING,
            description: "A category for the library, e.g., 'Frontend Framework', 'Data Visualization'."
        },
        safetyTip: {
            type: Type.STRING,
            description: "A crucial safety tip, best practice, or common pitfall to avoid when using this library."
        }
      },
      required: ["name", "description", "reasoning", "category", "safetyTip"],
    },
  };
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: projectDescription,
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.5,
      },
    });

    const jsonText = response.text.trim();
    if (!jsonText) {
      throw new Error("Received an empty response from the API.");
    }
    
    const suggestions: LibrarySuggestion[] = JSON.parse(jsonText);
    return suggestions;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to parse library suggestions from Gemini API.");
  }
}