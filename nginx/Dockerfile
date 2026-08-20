FROM nginx:1.22.1

# Удаляем стандартный шаблон, чтобы envsubst не перезаписал наш конфиг
RUN rm -f /etc/nginx/templates/default.conf.template

# Копируем наш локальный конфиг в нужное место
COPY nginx.local.conf /etc/nginx/conf.d/default.conf
