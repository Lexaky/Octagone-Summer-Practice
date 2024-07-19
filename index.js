//Импорт модуля express и создание экземпляра app от express
const express = require('express');
const app = express();
const port = 3000; //открытый порт для подключения к localhost
const mysql = require("mysql2"); // Импорт модуля для MySQL

//Создание объекта от экземпляра mysql 
//с данными для подключения к локальной БД
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "chatbottests",
  password: "12345"
});

//Функция подключения к БД по заданным параметрам
connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else {
      console.log("Подключение к серверу MySQL успешно установлено");
    }
});

//Функция для вывода всех результатов с ключом id
function selectAllWithId(id, returnAsNullResult, response) {
  const selectQuery = 'SELECT * FROM items WHERE id = ?';
  connection.query(selectQuery, [id], (error, results, fields) => {
    if (error) {
      response.status(500).send(error);
      return;
    }

    if (results.length === 0) {
      response.send([returnAsNullResult]);
    } else {
      response.send(results);
    }
  });
}

//Получение всех записей из БД
app.get('/getAllItems', (request, response) => {
	connection.query('SELECT * FROM items', function(err, results, fields) {
		if (err) {
			response.json(err); // Была обнаружена ошибка
		}
		else if (results.length === 0) {
			response.send([{}]); //В бд не хранится ни одной записи, вывод массива, состоящего из пустого объекта.
		}
		else {
			response.send(results); //Обычный вывод объектов
		}
	});
});

app.use(express.json()); // для парсинга json-данных

// POST-запрос для добавления элемента (получает name и descr)
app.post('/addItem', (request, response) => {
	const { name, descr } = request.query; // Извлечение параметров из строки запроса

	if (!name || !descr) {
		response.status(500).send(null); // При неправильно введённых данных вернётся NULL (по ТЗ)
		return;
	}
	
	//Вставка ч/з запрос
	const query = 'INSERT INTO items (name, descr) VALUES (?, ?)';
	connection.query(query, [name, descr], (error, results, fields) => {
    //Если values содержали ошибки, вернётся статус 500 с описанием ошибок
	if (error) {
      response.status(500).send(error);
      return;
    }
	
	//Вывод результата вставки
	selectAllWithId(results.insertId, {}, response);
  });
});

//POST-запрос на удаление элемента из БД (получает id удаляемого элемента)
app.post('/deleteItem', (request, response) => {
	const strId = request.query.id;
	
	//Проверка на существование
	if (!strId) {
		response.status(400).send("ID не предоставлен");
		return;
	}
	//Cast в число
	const id = Number(strId);
	
	//Если после каста NaN, то ошибка клиента
	if (isNaN(id)) {
		response.status(400).send("ID не является числом");
		return;
	}
	selectAllWithId(id, {}, response);
	//Запрос к БД на удаление элементов с условием совпадения с id
	const deleteQuery = 'DELETE FROM items WHERE id = ?';
	connection.query(deleteQuery, [id], (error, results, fields) => {
		if (error) {
			response.status(500).send(error);
			return;
		} else {
			return;
		}
	});
});

//POST-запрос на обновление элементов
app.post('/updateItem', (request, response) => {
  const { id, name, descr } = request.query;

  // Проверка на существование id, name и desc из строки запроса
  if (!id || !name || !descr) {
    response.status(400).send("ID, name и desc должны быть предоставлены");
    return;
  }

  const numericId = Number(id);

  // Проверка, является ли id числом
  if (isNaN(numericId)) {
    response.status(400).send("ID не является числом");
    return;
  }

  // Обновление записи в базе данных
  const updateQuery = 'UPDATE items SET name = ?, descr = ? WHERE id = ?';
  connection.query(updateQuery, [name, descr, numericId], (error, results, fields) => {
    if (error) {
      response.status(500).send(error);
      return;
    }

    // Проверка, была ли запись обновлена
    if (results.affectedRows === 0) {
      response.send([{}]); // Если запись не была обновлена (например, id не найден)
    } else {
      // Возвращение обновленной записи
      selectAllWithId(numericId, {}, response);
    }
  });
});

//Прослушивание порта port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

