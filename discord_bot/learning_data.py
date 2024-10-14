learning_data = {
    "conversations": [],
}

def log_conversation(user_input, bot_response):
    learning_data["conversations"].append({"user": user_input, "bot": bot_response})

def get_learning_data():
    return learning_data
