from agno.playground import Playground
from agents.web_agent import create_web_agent
from agents.finance_agent import create_finance_agent
from agents.reasoning_agent import create_reasoning_agent
from agents.image_agent import create_image_agent

# Create all agents
web_agent = create_web_agent()
finance_agent = create_finance_agent()
reasoning_agent = create_reasoning_agent()
image_agent = create_image_agent()

playground = Playground(
    agents=[web_agent, finance_agent, reasoning_agent, image_agent]
)
app = playground.get_app()

if __name__ == "__main__":
    playground.serve("main:app", reload=True)
