# AutoScar

Веб-сайт автосалона — каталог автомобилей с фильтрацией, мультиязычными описаниями и административной панелью управления.

## Стек технологий

**Backend**
- Python 3.12, Django 6.0, Django REST Framework
- PostgreSQL 17, Redis
- Gunicorn, Nginx

**Frontend**
- React 18, Vite

**Инфраструктура**
- Docker, Docker Compose
- GitHub Actions CI/CD

---

## Быстрый старт (локально)

### 1. Клонировать репозиторий

```bash
git clone git@github.com:Muta-Mad/Autoscar.git
cd Autoscar
```

### 2. Создать `.env` файл

```bash
cp backend/.env.example .env
```

Заполнить значения (минимальный набор для локального запуска):

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=127.0.0.1,localhost

POSTGRES_DB=autoscar
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your-password
POSTGRES_HOST=db
POSTGRES_PORT=5432

REDIS_URL=redis://redis:6379

CSRF_TRUSTED_ORIGINS=http://localhost:8000
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3. Запустить через Docker Compose

```bash
docker compose up -d
docker compose exec backend python manage.py migrate
docker compose exec backend python manage.py createsuperuser
```

Сайт доступен на `http://localhost:8000`  
Админ-панель: `http://localhost:8000/admin`

---

## Запуск тестов

```bash
# Через Docker
docker compose run --rm backend python -m pytest tests/ -v

# Локально (без Docker)
cd backend
source venv/bin/activate
SECRET_KEY=test DEBUG=False ALLOWED_HOSTS=localhost REDIS_URL=redis://localhost:6379 POSTGRES_DB= \
  python -m pytest tests/ -v
```

---

## API

Базовый URL: `/api/v1/`

| Метод | Эндпоинт | Описание |
|-------|----------|----------|
| GET | `/cars/` | Список автомобилей с пагинацией |
| GET | `/cars/<id>/` | Карточка автомобиля |
| GET | `/cars-main/` | Автомобили для главной страницы |
| GET | `/brands/` | Список брендов |
| GET | `/services/` | Каталог услуг |

### Фильтры для `/cars/`

| Параметр | Тип | Описание |
|----------|-----|----------|
| `min_price` | int | Цена от |
| `max_price` | int | Цена до |
| `min_year` | int | Год от |
| `max_year` | int | Год до |
| `brand` | int | ID бренда |
| `fuel` | string | `petrol` / `diesel` / `hybrid` / `electric` / `gas` |
| `transmission` | string | `manual` / `automatic` / `cvt` / `robot` |
| `color` | string | Цвет кузова |
| `available` | bool | В наличии |
| `eco_sticker` | string | `zero` / `eco` / `c` / `b` |
| `ordering` | string | `price` / `-price` |
| `limit` | int | Размер страницы (макс. 48, по умолчанию 6) |

---

## Деплой

CI/CD настроен через GitHub Actions. При пуше в `master`:

1. Запускаются линтер (ruff) и тесты
2. Собираются и пушатся Docker-образы на DockerHub
3. Происходит автодеплой на сервер по SSH

### Необходимые GitHub Secrets

| Secret | Описание |
|--------|----------|
| `DOCKER_USERNAME` | Логин DockerHub |
| `DOCKER_PASSWORD` | Токен DockerHub |
| `HOST` | IP сервера |
| `USER` | Пользователь на сервере |
| `SSH_KEY` | Приватный SSH-ключ |


## Структура проекта

```
Autoscar/
├── backend/
│   ├── api/                  # Приложение: модели, вьюхи, сериализаторы
│   │   ├── migrations/
│   │   ├── models.py
│   │   ├── views.py
│   │   ├── serializer.py
│   │   ├── filters.py
│   │   └── validators.py
│   ├── autoscar/             # Настройки Django
│   ├── tests/                # Тесты
│   └── requirements.txt
├── frontend/                 # React приложение
├── nginx/                    # Конфиг Nginx
├── docker-compose.yml        # Локальная разработка
└── docker-compose.production.yml
```
