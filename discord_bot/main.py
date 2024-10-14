import discord
from discord.ext import commands
from model import RLChatbot
from memory import update_shared_memory
from learning_data import get_learning_data
from dotenv import load_dotenv
import os

load_dotenv()

intents = discord.Intents.default()
intents.message_content = True
bot = commands.Bot(command_prefix="!", intents=intents)

model = RLChatbot()
model.load_model()  # Load pre-trained chatbot model

@bot.event
async def on_ready():
    print(f'Logged in as {bot.user}')

@bot.command(name="talk")
async def talk(ctx, *, message: str):
    response = model.get_response(message)
    await ctx.send(response)
    update_shared_memory("discord_bot", message, response)  # Update shared memory

@bot.command(name="learning_data")
@commands.has_permissions(administrator=True)
async def learning_data(ctx):
    data = get_learning_data()  # Get learning data
    await ctx.send(f'Learning Data: {data}')

bot.run(os.getenv('DISCORD_TOKEN'))
