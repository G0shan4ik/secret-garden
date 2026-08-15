# Secret Garden 🌱 (персональный подарок)

Маленький статический сайт-подарок в виде «ботанического дневника». Два пакетика семян
обозначены только как **«Растение 1»** и **«Растение 2»** — названия раскрываются лишь
в финале каждой главы. Дизайн: глубокий бордовый, кремовый, тонкие золотые акценты.

Сайт полностью статический (HTML + CSS + Vanilla JS) и работает на GitHub Pages.
Без backend, баз данных и фреймворков.

## Живой сайт

<https://g0shan4ik.github.io/secret-garden/>

QR-код ведёт именно на этот адрес.

## Структура

```text
secret-garden/
├── index.html          # Приветствие («Открыть»)
├── plants.html         # Две карточки-тайны
├── plant1.html         # Растение 1 (главы-аккордеон + финальное раскрытие)
├── plant2.html         # Растение 2 (главы-аккордеон + финальное раскрытие)
├── card.html           # Карточка для печати с QR (открой и распечатай)
├── qr-code.png         # QR-код (PNG, для печати)
├── qr-code.svg         # QR-код (SVG, векторный)
├── css/style.css       # Весь дизайн
├── js/main.js          # Аккордеон, reveal, fade-in
├── assets/icons/favicon.svg
└── README.md
```

## Запуск локально

```bash
python -m http.server 8000
# открой http://localhost:8000
```

## Публикация на GitHub Pages

Репозиторий уже опубликован из ветки `main` (корень, `legacy` build).
Если нужно включить заново:

```bash
gh api repos/OWNER/secret-garden/pages -X POST \
  -f build_type=legacy -f "source[branch]=main" -f "source[path]=/"
```

## Как обновлять сайт (QR не меняется)

QR-код ведёт на **адрес сайта**, а не на конкретный файл, поэтому текст можно менять
сколько угодно — QR останется тем же.

1. Отредактируй `plant1.html` / `plant2.html` (тексты инструкций) или `css/style.css`.
2. `git add . && git commit -m "update" && git push`.
3. Через ~1 минуту изменения появятся на <https://g0shan4ik.github.io/secret-garden/>.

Чтобы поменять сам URL (и тогда нужен новый QR), меняй имя репозитория/username.

## QR-код

- `qr-code.png` — 444×444 px, чёрно-белый, с quiet-zone (4 модуля), пригоден для печати.
- `qr-code.svg` — векторная версия для типографии.
- Закодирован URL: `https://g0shan4ik.github.io/secret-garden/`

Перегенерировать (если URL изменится):

```bash
python -m pip install qrcode pillow
python -c "import qrcode; qrcode.make('ТВОЙ_URL', box_size=12, border=4).save('qr-code.png')"
```

## Печать карточки

Открой `card.html` в браузере и напечатай (формат A6). На карточке — QR и обещание
не искать ответы в интернете. Названия растений на карточке не раскрываются.

## Важно

Слова-написания растений присутствуют в коде **только** в блоках финального раскрытия
(`.reveal__answer`) и нигде в интерфейсе, title, description или alt-текстах до финала.
