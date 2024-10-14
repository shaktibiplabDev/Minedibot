import torch
import torch.optim as optim
from model import RLChatbot
from learning_data import log_conversation

def train_model():
    model = RLChatbot()
    optimizer = optim.Adam(model.parameters(), lr=1e-4)
    criterion = torch.nn.CrossEntropyLoss()

    for epoch in range(100):  # Placeholder epochs
        input_text = "How are you?"  # Sample input
        labels = torch.tensor([1])  # Example target

        logits = model(input_text)
        loss = criterion(logits, labels)

        optimizer.zero_grad()
        loss.backward()
        optimizer.step()

        # Log conversation to learning data
        bot_response = model.generate_response(1)  # Placeholder response
        log_conversation(input_text, bot_response)

        print(f'Epoch {epoch}, Loss: {loss.item()}')

    model.save_model()

train_model()
