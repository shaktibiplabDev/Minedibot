# Discord and Minecraft Reinforcement Learning Bot

## Overview
This project combines a **Discord bot** and a **Minecraft bot**, both enhanced with **reinforcement learning (RL)** capabilities. The bots can learn from their environment and user interactions, allowing for adaptive behavior in both chat and game contexts. 

The Discord bot can respond to user messages, while the Minecraft bot can interact with the Minecraft world and learn from gameplay experiences. This dual functionality creates an innovative system where the bots can improve their interactions over time.

## Features
- **Discord Bot**:
  - Responds to user messages with contextually appropriate replies.
  - Logs conversations for future learning.
  - Admin command to display learning data.

- **Minecraft Bot**:
  - Connects to a Minecraft server and interacts with the environment.
  - Learns from chat interactions and gameplay experiences using reinforcement learning techniques.
  - Can perform actions based on learned behaviors.

## Technologies Used
- **Python**: For the Discord bot and reinforcement learning model.
- **Node.js**: For the Minecraft bot using Mineflayer.
- **PyTorch**: For building and training the reinforcement learning model.
- **Discord.py**: A Python wrapper for the Discord API.
- **Mineflayer**: A Minecraft bot framework for Node.js.
- **JSON**: For shared memory storage.

## Installation

### Prerequisites
- **Python 3.x**: Make sure you have Python installed. You can download it from [python.org](https://www.python.org/downloads/).
- **Node.js**: Ensure Node.js is installed. Download it from [nodejs.org](https://nodejs.org/).
- **pip**: Python package installer, usually included with Python installations.

### Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/shaktibiplabDev/Minedibot.git
   cd Minedibot
   ```

2. **Install Python Dependencies**:
   Navigate to the Discord bot directory and install the required libraries:
   ```bash
   pip install -r requirements.txt
   ```

3. **Install Node.js Dependencies**:
   Navigate to the Minecraft bot directory and install Mineflayer:
   ```bash
   npm install mineflayer
   ```

4. **Configure Your Tokens**:
   - Open `discord_bot/main.py` and replace `YOUR_DISCORD_TOKEN` with your actual Discord bot token. You can create a bot and get a token from the [Discord Developer Portal](https://discord.com/developers/applications).

5. **Initialize Shared Memory**:
   The `shared_memory.json` file will be automatically created when you run the bot for the first time.

6. **Run the Bots**:
   - Start the Discord bot:
     ```bash
     python discord_bot/main.py
     ```
   - Start the Minecraft bot:
     ```bash
     node minecraft_bot/bot.js
     ```

## Usage
- **Discord Bot Commands**:
  - Use the command `!talk <message>` to interact with the bot. For example:
    ```
    !talk Hello, how are you?
    ```
  - Admin command `!learning_data` to view the learning data stored by the bot (requires admin permissions).

- **Minecraft Bot**:
  - Once the Minecraft bot is running, it will automatically connect to the specified Minecraft server. It will learn from its environment and chat messages, executing actions based on its learning.

## Contributing
Contributions are welcome! If you'd like to contribute, please follow these guidelines:

1. **Fork the Repository**: Create a personal copy of the repository.
2. **Make Changes**: Implement your changes in a new branch.
3. **Submit a Pull Request**: Open a pull request with a description of your changes.

### Guidelines
- Ensure code is well-commented for clarity.
- Follow the project's coding standards.
- Test your changes thoroughly before submitting.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments
- Thanks to the contributors and the community for their support.
- Special thanks to the maintainers of the libraries used in this project, including Discord.py, Mineflayer, and PyTorch.

## Contact
For questions or suggestions, feel free to reach out to me through [GitHub](https://github.com/shaktibiplabDev).
