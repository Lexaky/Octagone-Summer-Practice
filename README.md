Все записи хранятся в БД chatBotTests в таблице Items; Таблица представляет собой 3 домена:
id - Primary key, INT, Auto Increment;
name - Varchar(255), Not Null;
descr - Text, Not Null.
![изображение](https://github.com/user-attachments/assets/a97b0465-9403-4bf8-b7b6-7fe4541b29bf)
![изображение](https://github.com/user-attachments/assets/65db3439-4023-4558-b324-3e5949fa5abb)



GET-Запрос на получение всех записей, хранящихся в данной БД в таблице Items
![изображение](https://github.com/user-attachments/assets/f36eb048-3408-4cc1-ae57-1a6991f91891)


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
   ![изображение](https://github.com/user-attachments/assets/abb2a609-123b-478f-b993-7801c36d6b81)
   Вывод ошибки клиента - 400 и возврат null по ТЗ

   
2.2) С указанием ID, которого не хранится в таблице Items
   ![изображение](https://github.com/user-attachments/assets/051b2646-8283-45ad-a51f-a35bd57584fb)
   Возврат пустого объекта {} (По ТЗ объекта не нашлось, следовательно пустой объект), запрос составлен корректно.
   
2.3) С указанием ID, который хранится в таблице Items
   ![изображение](https://github.com/user-attachments/assets/ca7ccb78-3b5f-42d0-9902-00d907c65084)
   ![изображение](https://github.com/user-attachments/assets/3f71df7f-1702-470b-950d-bb43cc299f5d)
   В БД больше третий объект не хранится. Возврат пустого объекта, т.к. запрос составлен правильно, сервер вернул ответ 200, обновлённый объект после выполненной команды - это объект, которого нет в БД, следовательно возврат пустого объекта, а не NULL (т.к. запрос составлен корректно).

3) Запрос на обновление записи в таблице Items

   
3.1) Обновление записи с указанием корректных данных
   ![изображение](https://github.com/user-attachments/assets/0cd27cef-f990-4a80-a290-d40eb16f2e98)
   Возврат обновлённого объекта из БД в формате JSON. В БД объект с таким ID тоже изменён:
   ![изображение](https://github.com/user-attachments/assets/7069408d-fa93-4ce8-8d8b-f883639c4dcd)


   
3.2) Обновление записи с указанием ID, которого нет в таблице Items. Без указания какого-либо из полей. С указанием ошибочного ID.
   ![изображение](https://github.com/user-attachments/assets/bbaf98da-502c-44fa-acdd-a5057e351846)
   
   Возврат NULL по ТЗ, неверные входные параметры (отсутствуют):
   ![изображение](https://github.com/user-attachments/assets/9579eefd-c1f6-434c-b699-a17b1773d406)
   ![изображение](https://github.com/user-attachments/assets/d3245249-07a2-4d62-8c1b-8de032befdd3)
   ![изображение](https://github.com/user-attachments/assets/5d62f22d-d434-49c3-8322-7e1a74d1b794)


   
