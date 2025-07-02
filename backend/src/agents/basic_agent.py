import os
from dotenv import load_dotenv
from agno.agent import Agent
from agno.models.openai import OpenAIChat

# Load environment variables
load_dotenv()

def main():
    """Run basic Agno Agent"""
    
    # Check API key
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Error: Please set OPENAI_API_KEY in .env file")
        return
    
    # Create Agent
    agent = Agent(
        model=OpenAIChat(id="gpt-4o"),
        instructions="You are a helpful AI assistant.",
        markdown=True,
        show_tool_calls=True
    )
    
    print("🤖 Agno Agent is running!")
    print("💡 Tips: Type 'exit' or 'quit' to terminate the program")
    print("=" * 50)
    
    # Interactive loop
    while True:
        try:
            # Get user input
            user_input = input("\n👤 You: ").strip()
            
            # Check exit commands
            if user_input.lower() in ['exit', 'quit']:
                print("\n👋 Goodbye!")
                break
            
            if not user_input:
                continue
            
            print("\n🤖 Agent:")
            
            # Run agent with streaming output
            for chunk in agent.run(user_input, stream=True):
                if chunk and hasattr(chunk, 'content'):
                    print(chunk.content, end="", flush=True)
            print()  # Add newline
                
        except KeyboardInterrupt:
            print("\n\n👋 Program interrupted by user, goodbye!")
            break
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")
            print("Please try again...")

if __name__ == "__main__":
    main() 