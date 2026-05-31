import pytest

from django.core.exceptions import ValidationError

from api.constants import MAX_FILE_SIZE
from api.validators import validate_file_extension, validate_file_size


class MockFile:
    def __init__(self, name, size=100):
        self.name = name
        self.size = size


def test_valid_image_extensions():
    for ext in ['photo.jpg', 'photo.jpeg', 'image.png', 'car.webp']:
        validate_file_extension(MockFile(name=ext))


def test_invalid_image_extensions():
    for ext in ['doc.pdf', 'script.exe', 'data.txt']:
        with pytest.raises(ValidationError):
            validate_file_extension(MockFile(name=ext))


def test_file_size_within_limit():
    validate_file_size(MockFile(name='photo.jpg', size=MAX_FILE_SIZE - 1))


def test_file_size_exceeds_limit():
    with pytest.raises(ValidationError):
        validate_file_size(MockFile(name='photo.jpg', size=MAX_FILE_SIZE + 1))


@pytest.mark.django_db
def test_car_list_returns_200(api_client):
    response = api_client.get('/api/v1/cars/')
    assert response.status_code == 200


@pytest.mark.django_db
def test_car_detail_not_found(api_client):
    response = api_client.get('/api/v1/cars/99999/')
    assert response.status_code == 404


@pytest.mark.django_db
def test_brands_returns_200(api_client):
    response = api_client.get('/api/v1/brands/')
    assert response.status_code == 200


@pytest.mark.django_db
def test_services_returns_200(api_client):
    response = api_client.get('/api/v1/services/')
    assert response.status_code == 200


@pytest.mark.django_db
def test_cars_main_returns_200(api_client):
    response = api_client.get('/api/v1/cars-main/')
    assert response.status_code == 200
