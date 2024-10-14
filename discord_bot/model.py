import torch
import torch.nn as nn
from transformers import BertTokenizer, BertModel

class RLChatbot(nn.Module):
    def __init__(self):
        super(RLChatbot, self).__init__()
        self.tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
        self.bert = BertModel.from_pretrained('bert-base-uncased')
        self.fc = nn.Linear(768, 4)  # Output layer adjusted for 4 classes

    def forward(self, input_text):
        tokens = self.tokenizer(input_text, return_tensors='pt')
        outputs = self.bert(**tokens)
        hidden_state = outputs.last_hidden_state
        pooled_output = hidden_state[:, 0]
        return self.fc(pooled_output)

    def get_response(self, user_input):
        with torch.no_grad():
            logits = self.forward(user_input)
            response_index = torch.argmax(logits, dim=1).item()
            return self.generate_response(response_index)

    def generate_response(self, response_index):
        responses = ["Yes", "No", "Maybe", "I'm not sure"]
        return responses[response_index]

    def save_model(self, filepath='pytorch_models/chatbot_model.pth'):
        torch.save(self.state_dict(), filepath)

    def load_model(self, filepath='pytorch_models/chatbot_model.pth'):
        self.load_state_dict(torch.load(filepath))

# Placeholder for saving model
