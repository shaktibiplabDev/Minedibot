const mineflayer = require('mineflayer');
const { updateSharedMemory } = require('./shared_memory');
const rlAgent = require('./rl_agent'); // Import the RL agent
const worldModel = require('./world_model'); // Import the world model
require('dotenv').config();
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalNear, GoalBlock, GoalXZ, GoalY } = goals;

const bot = mineflayer.createBot({
  host: process.env.host, // Replace with your server IP
  port: process.env.port, // Replace with your server port
  username: process.env.username, // Username for the bot
});
bot.loadPlugin(pathfinder);
bot.on('login', () => {
  console.log('Minecraft bot logged in!');
  bot.chat('Hello world! Ready to explore and learn!');
});
bot.on('spawn', () => {
  console.log('Bot has spawned in the world!');
  const defaultMove = new Movements(bot);
  bot.pathfinder.setMovements(defaultMove);
  rlAgent.startLearning(bot); 
});
bot.on('chat', (username, message) => {
  if (username === bot.username) return;
  console.log(`Chat from ${username}: ${message}`);
  rlAgent.observeChat(username, message); 

  if (message === 'come here') {
    const player = bot.players[username].entity;
    if (player) {
      const { x, y, z } = player.position;
      bot.pathfinder.setGoal(new GoalNear(x, y, z, 1));
      bot.chat(`On my way, ${username}!`);
    }
  }
});
bot.on('death', () => {
  console.log('Bot has died! Respawning...');
  bot.chat('Oh no, I died! Respawning...');
  bot.respawn(); 
});
function performAction(action) {
  if (action === 'move') {
    bot.setControlState('forward', true);
    setTimeout(() => bot.setControlState('forward', false), 1000); 
    bot.setControlState('jump', true);
    setTimeout(() => bot.setControlState('jump', false), 500); 
  }
}
bot.on('whisper', (username, message) => {
  if (message === 'follow me') {
    const target = bot.players[username]?.entity;
    if (target) {
      bot.chat(`Following you, ${username}!`);
      bot.pathfinder.setGoal(new GoalNear(target.position.x, target.position.y, target.position.z, 1));
    } else {
      bot.chat(`I can't see you, ${username}!`);
    }
  }
});
bot.on('blockUpdate', (oldBlock, newBlock) => {
  console.log(`Block updated: ${oldBlock.type} -> ${newBlock.type}`);
  if (newBlock.name === 'diamond_ore') {
    bot.chat('I found diamonds! Time to mine!');
    bot.dig(newBlock);
  }
});
bot.on('entitySpawn', (entity) => {
  if (entity.kind === 'player') {
    bot.chat(`Hello, ${entity.username}! Nice to see you!`);
  } else if (entity.kind === 'hostile') {
    bot.chat(`Warning! Hostile entity detected: ${entity.name}`);
  }
  console.log(`Entity spawned: ${entity.username || entity.name}`);
});
bot.on('rain', () => {
  bot.chat('It\'s raining! Time to find shelter.');
  const shelter = findShelter();
  if (shelter) {
    bot.pathfinder.setGoal(new GoalBlock(shelter.x, shelter.y, shelter.z));
  }
});
bot.on('time', () => {
  if (bot.time.isNight) {
    bot.chat('It\'s nighttime, better be careful!');
  }
});
function explore() {
  const goalX = Math.floor(Math.random() * 100) - 50; 
  const goalZ = Math.floor(Math.random() * 100) - 50; 
  bot.pathfinder.setGoal(new GoalXZ(goalX, goalZ));
  bot.chat(`Exploring the world... Headed to (${goalX}, ${goalZ})`);
}
function findShelter() {
  const nearbyBlocks = bot.findBlocks({
    matching: block => block.name.includes('wood') || block.name.includes('stone'),
    maxDistance: 20,
    count: 5,
  });

  if (nearbyBlocks.length > 0) {
    return bot.blockAt(nearbyBlocks[0]);
  }
  return null;
}
setTimeout(explore, 5000);
