const TelegramBot = require('node-telegram-bot-api');
const mysql = require("mysql2");
const axios = require('axios');

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
// Токен для api сервиса со скриншотами сайтов
const SCREENSHOTAPI_KEY = '6BE42G4-F6T4YWN-NBRJZCK-F7DEVFN';
// Создание нового объекта типа TelegramBot
const bot = new TelegramBot(token, {polling: true});

const helpCommands = ["/site - отправляет в чат ссылку на сайт октагона", 
					  "/creator - отправляет в чат ФИО разработчика",
					  "/randomItem - возвращает случайный предмет",
					  "/deleteItem [id] - удаляет предмет из БД по ID",
					  "/getItemByID [id] - возвращает предмет из БД по ID",
					  "!qr [text] - возвращает QR-код текста text",
					  "!webscr [link] - отправляет изображение сайта с ссылкой link"];
					  
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

bot.onText(/^\!qr/, function(msg) {
  var userId = msg.from.id;
  var data = msg.text.substring(3).trim();
  var imageqr = "https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=" + data;
bot.sendMessage(msg.chat.id, "[✏️](" + imageqr + ")QR код для сообщения: " + data,{parse_mode : "Markdown"});
});

bot.onText(/^\!webscr/, async (msg) => {
  var url = msg.text.substring(8).trim();
  var apiUrl = `https://shot.screenshotapi.net/screenshot?token=${SCREENSHOTAPI_KEY}&url=${encodeURIComponent(url)}&width=1280&height=720&full_page=true`;
   try {
    const response = await axios.get(apiUrl);
    const imageUrl = response.data.screenshot;
    bot.sendPhoto(msg.chat.id, imageUrl, {caption: `Картинка сайта: ${url}`});
  } catch (error) {
    bot.sendMessage(msg.chat.id, `Произошла ошибка при получении изображения сайта: ${error.message}`);
  }
});

bot.on('polling_error', (error) => {
  console.error('polling_error', error);
});