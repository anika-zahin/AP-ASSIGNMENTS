from registration_service import (
    RegistrationService,
    InvalidEmailError,
    UnderageError
)

service = RegistrationService()

test_cases = [
    ("john.com", 20),                  # Invalid email
    ("john@", 20),                     # Missing domain
    ("", 20),                          # Empty email
    (None, 20),                        # None email
    ("john@example.com", 16),          # Underage
    ("adult@example.com", 18),         # Boundary age
    ("alice.smith@gmail.com", 25),     # Valid registration
    ("user123@yahoo.in", 30),          # Valid registration
]

for email, age in test_cases:
    print("-" * 50)
    print(f"Testing: Email={email}, Age={age}")

    try:
        result = service.register_user(email, age)
        print("Registration successful:", result)

    except InvalidEmailError as e:
        print("InvalidEmailError:", e)

    except UnderageError as e:
        print("UnderageError:", e)

    except AssertionError as e:
        print("AssertionError:", e)
