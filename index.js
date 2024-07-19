const TelegramBot = require('node-telegram-bot-api');

// Мой токен
const token = '7345012579:AAEpRCqweK2FLpRMfILGIf4Y9geDkpGdlHw';

// Создание нового объекта типа TelegramBot
const bot = new TelegramBot(token, {polling: true});

//Функция для отправки текста конкретному chatId
function tell(id, message)
{
	bot.sendMessage(id, message);
}

bot.onText(/\/help/, (msg) => {
    tell(msg.chat.id, "Список команд:\n/site - отправляет в чат ссылку на сайт октагона\n/creator - отправляет в чат ФИО разработчика");
});

bot.onText(/\/site/, (msg) => {
	tell(msg.chat.id, "https://forus.ru/");
});

bot.onText(/\/creator/, (msg) => {
	tell(msg.chat.id, "Стрельцов Алексей Романович");
});

bot.on('polling_error', (error) => {
  console.error('polling_error', error);
});