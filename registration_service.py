import re


class InvalidEmailError(ValueError):
    def __init__(self, email):
        super().__init__(f"Invalid email address: '{email}'")


class UnderageError(ValueError):
    def __init__(self, age):
        super().__init__(f"User age {age} is below the minimum required age of 18")


class RegistrationService:
    EMAIL_PATTERN = r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$"

    def register_user(self, email: str, age: int) -> bool:
        assert isinstance(age, int), "Age must be an integer"

        if email is None or email.strip() == "":
            raise InvalidEmailError(email)

        if not re.fullmatch(self.EMAIL_PATTERN, email):
            raise InvalidEmailError(email)

        if age < 18:
            raise UnderageError(age)

        return True
