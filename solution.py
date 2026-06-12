class Address:
    def __init__(self, street: str, city: str, zip_code: str):
        self.street = street
        self.city = city
        self.zip_code = zip_code

    def __str__(self):
        return f"{self.street}, {self.city} - {self.zip_code}"


class Student:
    def __init__(self, name: str, age: int, address: Address):
        self.name = name
        self._age = None   # protected attribute
        self.age = age     # use setter for validation
        self.address = address  # Composition (HAS-A)
        self.courses = []  # mutable list

    # Property for age with validation
    @property
    def age(self):
        return self._age

    @age.setter
    def age(self, value):
        if not isinstance(value, int):
            raise TypeError("Age must be an integer.")
        if value <= 0 or value > 120:
            raise ValueError("Age must be between 1 and 120.")
        self._age = value

    # Method to add course
    def add_course(self, course: str):
        if course not in self.courses:
            self.courses.append(course)

    # Display method
    def display(self):
        print(f"Name: {self.name}")
        print(f"Age: {self.age}")
        print(f"Address: {self.address}")
        print(f"Courses: {', '.join(self.courses) if self.courses else 'None'}")


# Inheritance
class ScholarshipStudent(Student):
    def __init__(self, name, age, address, scholarship_amount):
        super().__init__(name, age, address)
        self.scholarship_amount = scholarship_amount

    # Override display()
    def display(self):
        super().display()  # call parent version
        print(f"Scholarship Amount: ₹{self.scholarship_amount}")



# Create Address object (Composition)
addr = Address("MG Road", "Guwahati", "781001")

# Create Student
s1 = Student("Aditi", 20, addr)
s1.add_course("Math")
s1.add_course("Python")

# Mutable behavior demonstration
s1.add_course("AI")  # persists in same list

print("---- Student ----")
s1.display()

# Create ScholarshipStudent
s2 = ScholarshipStudent("Riya", 21, addr, 50000)
s2.add_course("Data Science")

print("\n---- Scholarship Student ----")
s2.display()
