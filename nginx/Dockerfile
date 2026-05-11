FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ .
ARG VITE_API_URL=
ARG VITE_WHATSAPP=34600000000
RUN VITE_API_URL=$VITE_API_URL VITE_WHATSAPP=$VITE_WHATSAPP npm run build

FROM nginx:1.27-alpine
COPY --from=frontend-builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
