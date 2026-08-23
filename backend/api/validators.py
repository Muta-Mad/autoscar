from django.core.exceptions import ValidationError

from api.constants import ALLOWED_EXTENSIONS, MAX_FILE_SIZE


def validate_file_extension(file):
    """Проверка расширения загружаемого фото."""
    ext = file.name.split('.')[-1].lower()

    if ext not in ALLOWED_EXTENSIONS:
        raise ValidationError('Разрешены только JPEG, PNG и WebP')


def validate_file_size(file):
    """Проверка размера загружаемого фото."""
    if file.size > MAX_FILE_SIZE:
        raise ValidationError('Максимальный размер файла — 6MB')
