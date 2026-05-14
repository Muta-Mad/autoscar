docker exec backend python manage.py collectstatic --noinput собрать статику для админки
docker exec backend python manage.py makemigrations 
docker exec backend python manage.py migrate