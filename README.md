Все записи хранятся в данной БД chatBotTests. Таблица Items в БД представляет собой 3 домена:
id - Primary key, INT, Auto Increment;
name - Varchar(255), Not Null;
descr - Text, Not Null.

GET-Запрос на получение всех записей, хранящихся в данной БД в таблице Items
![изображение](https://github.com/user-attachments/assets/e02012e0-87af-49a1-b5b8-fb6d668d60e8)

POST-Запросы
1) Запрос на добавление новой записи в таблицу Items
1.1) Без указания атрибута name и descr
   ![изображение](https://github.com/user-attachments/assets/40e9a59e-89d3-41e5-9f4c-d3930e6e1932)
    Возврат ошибки 500 сервером, возврат NULL (по ТЗ)
1.2) Без указания атрибута name или descr
   ![изображение](https://github.com/user-attachments/assets/903a22a0-8894-4140-9468-d2d79266f019)
   ![изображение](https://github.com/user-attachments/assets/c9acd7c5-00ba-4c45-93aa-9ff859f076b3)
    Аналогичная ситуация в п. 1.1.
1.3) Правильно составленный запрос (указание всех атрибутов)
   ![изображение](https://github.com/user-attachments/assets/0ad189e2-a6cc-426a-89a1-d65c66513d6c)
   Получение и вывод в JSON-формате записанного в БД объекта

2) Запрос на удаление записи из таблицы Items
2.1) Без указания ID удаляемой записи
   ![изображение](https://github.com/user-attachments/assets/22b5b67e-ea77-4093-b59c-3d14a97e9885)
   Вывод ошибки клиента - 400 и текста соответствующего действия
2.2) С указанием ID, которого не хранится в таблице Items
   ![изображение](https://github.com/user-attachments/assets/051b2646-8283-45ad-a51f-a35bd57584fb)
   Возврат пустого объекта {} (По ТЗ объекта не нашлось, следовательно пустой объект)
2.3) С указанием ID, который хранится в таблице Items
   ![изображение](https://github.com/user-attachments/assets/9f0bbf06-095c-48dd-b53b-e396333a2716)
   Возврат удаляемого объекта в JSON-формате (Объект найден, следовательно был возвращён сервером, затем удалён)
   ![изображение](https://github.com/user-attachments/assets/c5b43b6d-0bb7-4d55-9735-d4d89c709933)
   В БД удалённый объект больше не хранится.

3) Запрос на обновление записи в таблице Items
3.1) Обновление записи с указанием корректных данных
   ![изображение](https://github.com/user-attachments/assets/fdd0d172-7b66-4530-836d-b615ef4b90ef)
   Возврат обновлённого объекта из БД в формате JSON. В БД объект с таким ID тоже изменён:
   ![изображение](https://github.com/user-attachments/assets/f28abd27-7976-47de-b9d9-643e9e2a9d4d)
3.2) Обновление записи с указанием ID, которого нет в таблице Items. Без указания какого-либо из полей. С указанием ошибочного ID.
   ![изображение](https://github.com/user-attachments/assets/bbaf98da-502c-44fa-acdd-a5057e351846)
   ![изображение](https://github.com/user-attachments/assets/8fc0679f-d73c-40e5-8a45-267ef552fd38)
   ![изображение](https://github.com/user-attachments/assets/0aadd68c-4ead-4f95-bec6-f0d38831c825)
   ![изображение](https://github.com/user-attachments/assets/3da57b7b-83fa-48bf-bce4-6fc3d0fa53d9)

   
