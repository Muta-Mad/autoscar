import pytest
from django.core.exceptions import ValidationError
from unittest.mock import MagicMock

from api.validators import validate_file_extension, validate_file_size
from api.constants import MAX_FILE_SIZE


def make_file(name, size):
    f = MagicMock()
    f.name = name
    f.size = size
    return f


class TestValidateFileExtension:
    def test_allows_jpg(self):
        validate_file_extension(make_file('photo.jpg', 100))

    def test_allows_jpeg(self):
        validate_file_extension(make_file('photo.jpeg', 100))

    def test_allows_png(self):
        validate_file_extension(make_file('photo.png', 100))

    def test_allows_webp(self):
        validate_file_extension(make_file('photo.webp', 100))

    def test_rejects_pdf(self):
        with pytest.raises(ValidationError):
            validate_file_extension(make_file('doc.pdf', 100))

    def test_rejects_exe(self):
        with pytest.raises(ValidationError):
            validate_file_extension(make_file('virus.exe', 100))

    def test_rejects_gif(self):
        with pytest.raises(ValidationError):
            validate_file_extension(make_file('anim.gif', 100))


class TestValidateFileSize:
    def test_allows_small_file(self):
        validate_file_size(make_file('photo.jpg', 1024))

    def test_allows_file_at_limit(self):
        validate_file_size(make_file('photo.jpg', MAX_FILE_SIZE))

    def test_rejects_file_over_limit(self):
        with pytest.raises(ValidationError):
            validate_file_size(make_file('photo.jpg', MAX_FILE_SIZE + 1))
