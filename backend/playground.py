from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.playground import Playground
from agno.storage.sqlite import SqliteStorage
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.yfinance import YFinanceTools
from agno.tools.dalle import DalleTools
from agno.media import Image
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

agent_storage: str = "tmp/agents.db"

# Get OpenAI API key from environment variables
openai_api_key = os.getenv("OPENAI_API_KEY")

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

finance_agent = Agent(
    name="Finance Agent",
    model=OpenAIChat(
        id="gpt-4o",
        api_key=openai_api_key,
    ),
    tools=[
        YFinanceTools(
            stock_price=True,
            analyst_recommendations=True,
            company_info=True,
            company_news=True,
        )
    ],
    instructions=["Always use tables to display data"],
    storage=SqliteStorage(table_name="finance_agent", db_file=agent_storage),
    add_datetime_to_instructions=True,
    add_history_to_messages=True,
    num_history_responses=5,
    markdown=True,
)

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

# Add a new image agent - can handle image input and output
image_agent = Agent(
    name="Image Agent",
    model=OpenAIChat(
        id="gpt-4o",
        api_key=openai_api_key,
    ),
    tools=[
        DuckDuckGoTools(),
        DalleTools(api_key=openai_api_key),  # Provide API key for DalleTools
    ],
    description="I am a visual image expert who can analyze images and generate new images.",
    instructions=[
        "When users upload images, analyze the image content in detail",
        "When asked to create images, use DALLE tool to generate high-quality images",
        "Provide detailed and professional image analysis",
        "Use markdown format to beautify output",
        "When you use DALLE tool to generate images, mention in your text description that you have generated an image. The framework will automatically display the image, you don't need to insert the image again using markdown in your reply.",
    ],
    storage=SqliteStorage(table_name="image_agent", db_file=agent_storage),
    add_datetime_to_instructions=True,
    add_history_to_messages=True,
    num_history_responses=5,
    markdown=True,
    show_tool_calls=True,
)

playground = Playground(
    agents=[web_agent, finance_agent, reasoning_agent, image_agent]
)
app = playground.get_app()

if __name__ == "__main__":
    playground.serve("playground:app", reload=True)
