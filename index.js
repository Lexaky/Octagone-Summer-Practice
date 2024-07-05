//Импорт модуля express и создание экземпляра app от express
const express = require('express');
const app = express();
const port = 3000; //открытый порт для подключения к localhost

//Проверка на то, что пришло какое-то число (не NaN и после трима не пустое)
const isNumber = (value) => { 
    return !isNaN(value) && value.trim() !== '';
};

//Маршрут для корня '/' (1-ое задание)
app.get('/', (request, response) => {
  response.send('<h1>Привет, Октагон!</h1>');
});

//static возвращает json с "Hello" в Header и "Octagon NodeJS Test" в body
app.use("/static", function(request, response){
    response.json({
        header: "Hello",
        body: "Octagon NodeJS Test"
    });
});

//dynamic возвращает json с результатом (a*b*c)/3, если a, b, c существуют
app.get('/dynamic', (request, response) => {
    const { a, b, c } = request.query;
	const values = [a, b, c];
	let result = 1;
	for (const value of values) {
		if (!isNumber(value)) {
			response.json({ header: "Error" });
		}
		result *= parseFloat(value);
	}
	result /= 3;

	response.json({
		header: "Calculated",
		body: result.toString()
	});
});

//Прослушивание порта port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

