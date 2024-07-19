const TelegramBot = require('node-telegram-bot-api');

// Мой токен
const token = '7345012579:AAEpRCqweK2FLpRMfILGIf4Y9geDkpGdlHw';

// Создание нового объекта типа TelegramBot
const bot = new TelegramBot(token, {polling: true});
const helpCommands = ["/site - отправляет в чат ссылку на сайт октагона", "/creator - отправляет в чат ФИО разработчика"];
//Функция для отправки текста конкретному chatId
function tell(id, message)
{
	bot.sendMessage(id, message);
}

bot.onText(/\/help/, (msg) => {
	let finalText = "Список команд:\n";
	helpCommands.forEach((cmd) => {
		finalText += cmd + "\n";
	});
	tell(msg.chat.id, finalText);
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