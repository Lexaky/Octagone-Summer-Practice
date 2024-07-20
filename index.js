const TelegramBot = require('node-telegram-bot-api');
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: "12345"
});
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else {
      console.log("Подключение к серверу MySQL успешно установлено");
    }
});
// Мой тг токен
const token = '7345012579:AAEpRCqweK2FLpRMfILGIf4Y9geDkpGdlHw';

// Создание нового объекта типа TelegramBot
const bot = new TelegramBot(token, {polling: true});
const helpCommands = ["/site - отправляет в чат ссылку на сайт октагона", 
					  "/creator - отправляет в чат ФИО разработчика",
					  "/randomItem - возвращает случайный предмет",
					  "/deleteItem [id] - удаляет предмет из БД по ID",
					  "/getItemByID [id] - возвращает предмет из БД по ID"];
					  
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

bot.onText(/\/randomItem/, (msg) => {
	connection.query('SELECT * FROM items', function(err, results, fields) {
		if (err) {
			tell(msg.chat.id, err);
		} else if (results.length === 0) {
			tell(msg.chat.id, "Предметов в БД не найдено");
		} else {
			const randomIndex = Math.floor(Math.random() * results.length);
			const randomItem = results[randomIndex];
			const message = "(" + randomItem.ID + ")" + " - " + randomItem.NAME + ": " + randomItem.DESCR;
			tell(msg.chat.id, message);
		}
	});
});

bot.onText(/\/deleteItem (.+)/, (msg, match) => {
	const args = match[1];
	if (args.indexOf(' ') != -1)
	{
		tell(msg.chat.id, "Введите единственное число в поле ID");
		return;
	}
	const id = Number(args);
	if (isNaN(id))
	{
		tell(msg.chat.id, "Введите одно число в поле ID для удаляемого предмета");
		return;
	}
	connection.query('DELETE FROM items WHERE ID = ?', [args], function(err, results, fields) {
		if (err) {
			tell(msg.chat.id, "Ошибка БД при удалении предмета");
		} else if (results.affectedRows === 0) {
			tell(msg.chat.id, "Ошибка");
		} else {
			tell(msg.chat.id, "Удачно");
		}
	});
});

bot.onText(/\/getItemByID (.+)/, (msg, match) => {
	const args = match[1];
	if (args.indexOf(' ') != -1)
	{
		tell(msg.chat.id, "Введите единственное число в поле ID");
		return;
	}
	const id = Number(args);
	if (isNaN(id))
	{
		tell(msg.chat.id, "Введите одно число в поле ID искомого предмета");
		return;
	}
	connection.query('SELECT * FROM items WHERE id = ?', [args], function(err, results, fields) {
		if (err) {
			tell(msg.chat.id, err);
		} else if (results.length === 0) {
			tell(msg.chat.id, "Предметов в БД не найдено");
		} else {
			const message = "(" + results[0].ID + ")" + " - " + results[0].NAME + ": " + results[0].DESCR;
			tell(msg.chat.id, message);
		}
	});
});

bot.on('polling_error', (error) => {
  console.error('polling_error', error);
});