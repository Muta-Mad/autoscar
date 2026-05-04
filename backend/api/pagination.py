from rest_framework.pagination import PageNumberPagination

from api.constants import PAGE_SIZE, MAX_PAGE_SIZE


class PageNumberPagination(PageNumberPagination):
    page_size = PAGE_SIZE
    page_size_query_param = 'limit'
    max_page_size = MAX_PAGE_SIZE # максимальное количество записей на странице, которое может запросить клиент
