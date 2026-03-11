<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/sparkles.svg" width="60" alt="StarMarket Logo" />
  <h1>StarMarket CRM</h1>
  <p><strong>Премиальная AI-платформа для селлеров на маркетплейсах (Wildberries, Ozon)</strong></p>

  <p>
    <img src="https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=flat-square&logo=tailwind-css" alt="Tailwind" />
    <img src="https://img.shields.io/badge/Laravel-12.x-FF2D20?style=flat-square&logo=laravel" alt="Laravel" />
  </p>
</div>

---

## 📋 О проекте

**StarMarket CRM** — это SaaS-решение уровня Tier-1, разработанное для автоматизации рутины продавцов на маркетплейсах. Система объединяет в себе продвинутый интерфейс (Dark Luxury UI) и мощный AI-движок для работы с отзывами, а также инструменты финансовой аналитики и мониторинга состояния бизнеса в реальном времени.

Проект спроектирован с упором на **Zero-wait UI** (асинхронная обработка данных без блокировки интерфейса) и масштабируемую микросервисную архитектуру.

## 🚀 Ключевые возможности

### 🤖 AI Оркестратор Отзывов (Review Engine)
*   **Генерация ответов:** Автоматическое создание персонализированных ответов на отзывы с использованием LLM (DeepSeek / OpenAI).
*   **Quality Gate:** Встроенная система оценки тональности отзыва и качества сгенерированного ответа перед публикацией.
*   **Асинхронная обработка:** Фоновая генерация ответов через WebSockets (Laravel Echo + Reverb) без блокировки интерфейса пользователя.

### ⚙️ Правила Авто-ответов (Rule Engine)
*   **Гибкие триггеры:** Настройка правил на основе оценки (например, 1-2 звезды) и ключевых слов (например, "брак", "размер").
*   **Режимы работы:** 
    *   *Suggest (Черновик)* — ИИ готовит ответ и оставляет его на проверку менеджеру.
    *   *Auto (Авто-публикация)* — ИИ самостоятельно отвечает на 5-звездочные отзывы по заданным промптам.

### 📊 Юнит-экономика в реальном времени
*   **Динамический расчет:** Автоматический пересчет ROI, чистой прибыли и маржинальности с учетом комиссий WB/Ozon, логистики, налогов и себестоимости (COGS).
*   **ABC-анализ:** Автоматическое присвоение тегов товарам на основе их рентабельности.

### 🔔 Центр уведомлений (Alert Center)
*   Мониторинг критических изменений: скачки комиссий маркетплейсов, падение ROI ниже допустимого уровня, предупреждения об окончании стока (Out of Stock).

---

## 🛠 Технологический стек

### Frontend (SPA)
*   **Core:** React 18, TypeScript, Vite.
*   **Styling:** Tailwind CSS (кастомная дизайн-система "Dark Luxury", CSS Variables).
*   **Animations:** Motion (Framer Motion) для плавных переходов и микро-взаимодействий.
*   **Icons:** Lucide React.
*   **Real-time:** Laravel Echo, Pusher-js.

### Backend (API & Workers) - *Архитектура*
*   **Framework:** Laravel 12.
*   **Database:** PostgreSQL (Хранение токенов, правил, логов генерации).
*   **Queue & Cache:** Redis (Обработка фоновых задач генерации ответов).
*   **WebSockets:** Laravel Reverb (Push-уведомления на клиент).
*   **Auth:** Laravel Sanctum (SPA Authentication).

---

## 📂 Структура проекта (Frontend)

```text
src/
├── components/       # Переиспользуемые UI компоненты (кнопки, модалки)
├── constants/        # Статические данные, локализация (i18n)
├── contexts/         # React Context (ThemeProvider и др.)
├── lib/              # Утилиты и настройки библиотек (axios, echo)
├── views/            # Основные экраны приложения
│   ├── DashboardView.tsx       # Дашборд и Alert Center
│   ├── ReviewsView.tsx         # Управление отзывами и AI-генерация
│   ├── AutoReplyRulesView.tsx  # Настройка правил (Rule Engine)
│   ├── UnitEconomicsView.tsx   # Таблица юнит-экономики
│   └── SettingsView.tsx        # Настройки системы и API ключей
├── App.tsx           # Корневой компонент и Layout (Sidebar, Header)
├── index.css         # Глобальные стили и Tailwind директивы
└── types.ts          # TypeScript интерфейсы
```

---

## 💻 Установка и запуск (Frontend)

1. **Клонируйте репозиторий:**
   ```bash
   git clone https://github.com/your-org/starmarket-crm.git
   cd starmarket-crm
   ```

2. **Установите зависимости:**
   ```bash
   npm install
   ```

3. **Запустите сервер разработки:**
   ```bash
   npm run dev
   ```
   Приложение будет доступно по адресу `http://localhost:3000`.

---

## 🔗 Интеграция с Backend (Laravel)

Для полноценной работы системы требуется развертывание Laravel API. 
Контракты взаимодействия:

1.  **Аутентификация:** SPA аутентификация через cookie (Sanctum).
2.  **Генерация ответа:** 
    *   `POST /api/reviews/{id}/generate` -> Возвращает `202 Accepted`.
    *   Ожидание WebSocket события `ReviewGenerated` в приватном канале `store.{id}`.
3.  **Безопасность:** API ключи маркетплейсов (WB/Ozon) передаются на бэкенд и хранятся в зашифрованном виде (AES-256-CBC) с использованием кастинга `encrypted` в моделях Eloquent.

---

<div align="center">
  <p>Спроектировано с ❤️ для селлеров, ценящих свое время и прибыль.</p>
</div>
