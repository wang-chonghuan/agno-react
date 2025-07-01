# Agno React

A full-stack application combining Agno AI agents with React frontend.

## Project Structure

```
agno-react/
├── frontend/          # React TypeScript Vite TailwindCSS frontend
├── backend/           # Python Agno AI agents backend
├── README.md
└── .gitignore
```

## Backend Setup

The backend contains Agno AI agents built with Python.

### Prerequisites

- Python 3.8+
- pip

### Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate virtual environment:
   ```bash
   python -m venv venv
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   # Option 1: Install from requirements.txt (recommended)
   pip install -r requirements.txt
   
   # Option 2: Install manually
   pip install agno openai python-dotenv duckduckgo-search yfinance pillow 'fastapi[standard]' uvicorn sqlalchemy
   ```

4. Create `.env` file in the backend directory:
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   ```

### Running Backend

#### Basic Agent (CLI)
```bash
python basic_agent.py
```

#### Playground (Web UI)
```bash
python playground.py
```
Then visit `http://localhost:7777` or connect via `http://app.agno.com/playground`

## Frontend Setup

The frontend is built with React, TypeScript, Vite, and TailwindCSS.

### Prerequisites

- Node.js 16+
- npm/yarn/pnpm

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running Frontend

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Available Agents

The backend includes the following AI agents:

- **Web Agent**: Web search capabilities using DuckDuckGo
- **Finance Agent**: Financial data analysis using YFinance
- **Reasoning Agent**: Step-by-step problem solving with tools
- **Image Agent**: Image analysis and generation using DALL-E

## Features

- 🤖 Multiple specialized AI agents
- 🔄 Real-time streaming responses
- 💾 Persistent conversation history
- 🎨 Image generation and analysis
- 📊 Financial data analysis
- 🌐 Web search integration
- 📱 Modern React frontend (coming soon)

## Development

This project uses:

### Backend Stack
- **Agno**: AI agent framework
- **FastAPI**: Web framework
- **SQLite**: Database for agent storage
- **OpenAI GPT-4o**: Language model

### Frontend Stack
- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool
- **TailwindCSS**: Styling framework

## License

[Add your license here]

## Contributing

[Add contributing guidelines here]
