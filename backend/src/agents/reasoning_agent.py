import os
from dotenv import load_dotenv
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.storage.sqlite import SqliteStorage
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.yfinance import YFinanceTools

# Load environment variables from .env file
load_dotenv()

def create_reasoning_agent():
    # Get OpenAI API key from environment variables
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    agent_storage: str = "../tmp/agents.db"
    
    # Add a new Agent with reasoning steps - configured according to documentation
    reasoning_agent = Agent(
        name="Reasoning Agent",
        model=OpenAIChat(
            id="gpt-4o",
            api_key=openai_api_key,
        ),
        tools=[
            DuckDuckGoTools(),
            YFinanceTools(
                stock_price=True,
                company_info=True,
            ),
        ],
        instructions=[
            "Show your thinking process",
            "Solve problems step by step",
            "Use your tools to get information",
            "Use tables and charts to display data",
        ],
        storage=SqliteStorage(table_name="reasoning_agent", db_file=agent_storage),
        add_datetime_to_instructions=True,
        add_history_to_messages=True,
        num_history_responses=5,
        markdown=True,
        show_tool_calls=True,  # Show tool calls
        reasoning=True,  # Enable reasoning functionality
    )
    
    return reasoning_agent 