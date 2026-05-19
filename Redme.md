docker compose -f docker-compose.production.yml up -d # поднять контейнеры
docker exec backend python manage.py collectstatic --noinput #собрать статику для админки
docker exec backend python manage.py makemigrations # создать миграции
docker exec backend python manage.py migrate # применить миграции