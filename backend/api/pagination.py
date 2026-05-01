from rest_framework.pagination import PageNumberPagination

from api.constants import PAGE_SIZE, MAX_PAGE_SIZE


class CarPagination(PageNumberPagination):
    page_size = PAGE_SIZE
    page_size_query_param = 'page_size'
    max_page_size = MAX_PAGE_SIZE

    def get_page_size(self, request):
        page_size = super().get_page_size(request)
        if page_size is not None and page_size <= 0:
            return self.page_size
        return page_size
