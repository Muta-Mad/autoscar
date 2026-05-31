docker compose -f docker-compose.production.yml up -d # поднять контейнеры
docker exec backend python manage.py collectstatic --noinput #собрать статику для админки
docker exec backend python manage.py makemigrations # создать миграции
docker exec backend python manage.py migrate # применить миграции

docker compose -f docker-compose.production.yml run  --rm  -it backend ruff  
format # форматируем


docker compose -f docker-compose.production.yml run  --rm  -it backend ruff check . --fix # Исправляем более существенные проблемы (неиспользуемые импорты и т.п.):