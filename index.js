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
    if (isNumber(a) && isNumber(b) && isNumber(c)) {
		//parseFloat - cast в тип float 
        const aNum = parseFloat(a);
        const bNum = parseFloat(b);
        const cNum = parseFloat(c);
        
        const result = (aNum * bNum * cNum) / 3;
        
        response.json({
            header: "Calculated",
            body: result.toString()
        });
    } else {
		//Если a или b или c - NaN или после trim length = 0
        response.json({
            header: "Error"
        });
    }
});

//Прослушивание порта port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

