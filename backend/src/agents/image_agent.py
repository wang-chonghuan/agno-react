import os
from dotenv import load_dotenv
from agno.agent import Agent
from agno.models.openai import OpenAIChat
from agno.storage.sqlite import SqliteStorage
from agno.tools.duckduckgo import DuckDuckGoTools
from agno.tools.dalle import DalleTools

# Load environment variables from .env file
load_dotenv()

def create_image_agent():
    # Get OpenAI API key from environment variables
    openai_api_key = os.getenv("OPENAI_API_KEY")
    
    agent_storage: str = "../tmp/agents.db"
    
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
    
    return image_agent 