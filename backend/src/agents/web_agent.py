import os
from dotenv import load_dotenv
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.storage.sqlite import SqliteStorage
from agno.tools.duckduckgo import DuckDuckGoTools

# Load environment variables from .env file
load_dotenv()

def create_web_agent():
    # Get OpenAI API key from environment variables
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    agent_storage: str = "../tmp/agents.db"
    
    web_agent = Agent(
        name="Web Agent",
        model=OpenAIChat(
            id="gpt-4o",
            api_key=openai_api_key,
        ),
        tools=[DuckDuckGoTools()],
        instructions=["Always include sources"],
        storage=SqliteStorage(table_name="web_agent", db_file=agent_storage),
        add_datetime_to_instructions=True,
        add_history_to_messages=True,
        num_history_responses=5,
        markdown=True,
    )
    
    return web_agent 