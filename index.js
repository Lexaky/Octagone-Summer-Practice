const TelegramBot = require('node-telegram-bot-api');

// Мой токен
const token = '7345012579:AAEpRCqweK2FLpRMfILGIf4Y9geDkpGdlHw';

// Создание нового объекта типа TelegramBot
const bot = new TelegramBot(token, {polling: true});


//При вводе текста /start бот отправит сообщение "Привет, октагон!"
bot.onText(/\/*/, (msg) => {
  const chatId = msg.chat.id;
  const message = "Привет, октагон!";

  bot.sendMessage(chatId, message);
});