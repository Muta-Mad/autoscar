import pytest

from django.core.exceptions import ValidationError

from api.constants import MAX_FILE_SIZE
from api.validators import validate_file_extension, validate_file_size


class MockFile:
    def __init__(self, name, size=100):
        self.name = name
        self.size = size


@pytest.mark.parametrize('filename', ['photo.jpg', 'photo.jpeg', 'image.png', 'car.webp'])
def test_valid_extension(filename):
    validate_file_extension(MockFile(name=filename))


@pytest.mark.parametrize('filename', ['doc.pdf', 'script.exe', 'data.txt', 'video.mp4', 'archive.zip'])
def test_invalid_extension(filename):
    with pytest.raises(ValidationError):
        validate_file_extension(MockFile(name=filename))


def test_uppercase_extension_is_accepted():
    validate_file_extension(MockFile(name='PHOTO.JPG'))


def test_valid_file_size():
    validate_file_size(MockFile(name='photo.jpg', size=MAX_FILE_SIZE - 1))


def test_file_size_exactly_at_limit():
    validate_file_size(MockFile(name='photo.jpg', size=MAX_FILE_SIZE))


def test_file_size_exceeds_limit():
    with pytest.raises(ValidationError):
        validate_file_size(MockFile(name='photo.jpg', size=MAX_FILE_SIZE + 1))


def test_large_file_rejected():
    with pytest.raises(ValidationError):
        validate_file_size(MockFile(name='photo.jpg', size=10 * 1024 * 1024))
