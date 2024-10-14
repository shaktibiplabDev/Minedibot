import json

def update_shared_memory(bot_name, user_input, bot_response):
    memory = {
        "bot_name": bot_name,
        "user_input": user_input,
        "bot_response": bot_response
    }
    with open('shared_memory.json', 'r+') as f:
        data = json.load(f)
        data[bot_name] = memory
        f.seek(0)
        json.dump(data, f, indent=4)
