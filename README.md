# Практична робота №4 — REST API на NestJS

**Варіант 9: онлайн-курси та підписки**  
Базовий маршрут: `/courses`.

## Предметна сутність

Курс містить поля:

| Поле | Тип | Опис |
|---|---|---|
| `id` | string | Унікальний ідентифікатор |
| `title` | string | Назва курсу |
| `price` | number | Ціна |
| `durationHours` | number | Тривалість у годинах |
| `difficultyLevel` | string | `beginner`, `intermediate` або `advanced` |
| `instructor` | string | Ім’я викладача |

## Реалізовано

- модульну структуру NestJS (`AppModule`, `CoursesModule`);
- `CoursesController` з маршрутами GET, POST, PATCH і DELETE;
- DTO створення й часткового оновлення;
- сервіс `CoursesService` з in-memory масивом із трьома початковими записами;
- ін’єкцію сервісу через конструктор;
- пошук за `search` у назві без урахування регістру;
- обмеження результатів через `limit`;
- заголовки `X-API-Version: 1.0` і `X-Service-Status: operational` для GET `/courses`;
- статуси 201 для POST і 204 для DELETE;
- `NotFoundException` для невідомого ID;
- перевірку DTO через `class-validator` і глобальний `ValidationPipe`.

> Дані зберігаються в оперативній пам’яті. Після перезапуску сервера створені/змінені/видалені записи повертаються до початкового стану.

## Встановлення та запуск

Потрібні Node.js 18+ і npm.

```bash
npm install
npm run start:dev
```

Сервер: `http://localhost:3000`.

Перевірка збірки:

```bash
npm run build
```

## REST API

| Метод | Маршрут | Призначення | Успішний статус |
|---|---|---|---|
| GET | `/courses` | Усі курси; підтримує `search` і `limit` | 200 |
| GET | `/courses/:id` | Один курс | 200 |
| POST | `/courses` | Створення курсу | 201 |
| PATCH | `/courses/:id` | Часткове оновлення | 200 |
| DELETE | `/courses/:id` | Видалення | 204 |

Для невідомого ID повертається 404. Некоректне тіло запиту або невідомі поля DTO відхиляються з 400.

## Тестування

Відкрийте `requests.http` у Visual Studio Code з розширенням REST Client. Запускайте запити послідовно. Для PATCH і DELETE скопіюйте `id` з відповіді POST у змінну `@createdId`.

Очікувані результати сценаріїв:

| Сценарій | Очікуваний результат |
|---|---|
| GET `/courses` | 200, три початкові курси |
| GET `/courses?search=typescript` | 200, курс TypeScript |
| GET `/courses?limit=2` | 200, не більше двох курсів |
| GET `/courses/1` | 200, курс з ID `1` |
| GET `/courses/99999` | 404 Not Found |
| POST `/courses` з валідним JSON | 201 Created, об’єкт з UUID |
| PATCH `/courses/:id` | 200, змінені лише передані поля |
| DELETE `/courses/:id` | 204 No Content |
| POST з некоректними даними | 400 Bad Request |

**Примітка щодо доказів виконання:** наведена таблиця описує очікувані результати за реалізованою логікою. Фактичні результати потрібно отримати після локального запуску. Додайте до звіту власні скриншоти термінала з успішним запуском і відповідей REST Client/Postman; скриншоти не підміняються макетами.

## Структура проєкту

```text
src/
  app.module.ts
  main.ts
  courses/
    courses.module.ts
    courses.controller.ts
    courses.service.ts
    dto/
      create-course.dto.ts
      update-course.dto.ts
    entities/
      course.entity.ts
requests.http
README.md
REPORT.md
```

## Публікація на GitHub

Створіть порожній репозиторій на GitHub, потім виконайте в терміналі з каталогу проєкту:

```bash
git init
git add .
git commit -m "Практична робота 4: NestJS Courses REST API"
git branch -M main
git remote add origin https://github.com/ВАШ_АКАУНТ/pr4-nestjs-courses.git
git push -u origin main
```

Замініть адресу `origin` на URL власного репозиторію.
