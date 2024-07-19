const TelegramBot = require('node-telegram-bot-api');

// Мой токен
const token = '7345012579:AAEpRCqweK2FLpRMfILGIf4Y9geDkpGdlHw';

// Создание нового объекта типа TelegramBot
const bot = new TelegramBot(token, {polling: true});

const alreadyGreetUsers = {};

// При вводе любого текста вначале диалога бот отправит сообщение "Привет, октагон!"
bot.onText(/\/*/, (msg) => {
  const chatId = msg.chat.id;

  if (!alreadyGreetUsers[chatId]) {
    const message = "Привет, октагон!";
    bot.sendMessage(chatId, message);
    alreadyGreetUsers[chatId] = true;
  }
  //Иначе - пользователю уже было отправлено приветствие
});

bot.on('polling_error', (error) => {
  console.error('polling_error', error);
});