//Импорт модуля express и создание экземпляра app от express
const express = require('express');
const app = express();
const port = 3000; //открытый порт для подключения к localhost

//Маршрут для корня '/', возврат сервером сообщения
app.get('/', (req, res) => {
  res.send('<h1>Привет, Октагон!</h1>');
});

//Запуск сервера на порту port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});