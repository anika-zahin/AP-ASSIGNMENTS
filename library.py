from abc import ABC, abstractmethod

class LibraryItem(ABC):
    """Abstract base — enforces displayInfo() on every subclass."""

    total_items: int = 0  # class/static counter

    def __init__(self, title: str, year: int):
        self.title = title
        self.year  = year
        LibraryItem.total_items += 1

    @abstractmethod
    def display_info(self) -> None:
        """Every subclass must implement this."""
        ...

    def __str__(self) -> str:
        return f"[{self.__class__.__name__}] '{self.title}' ({self.year})"

    @classmethod
    def get_total(cls) -> int:
        return cls.total_items

# SUBCLASS 1 — Book

class Book(LibraryItem):
    """Constructor overloading via default argument: genre defaults to 'Fiction'."""

    def __init__(self, title: str, year: int, author: str, genre: str = "Fiction"):
        super().__init__(title, year)
        self.author = author
        self.genre  = genre

    def display_info(self) -> None:           # method override
        print("📖 BOOK")
        print(f"   Title  : {self.title}")
        print(f"   Author : {self.author}")
        print(f"   Year   : {self.year}")
        print(f"   Genre  : {self.genre}")

# SUBCLASS 2 — DVD

class DVD(LibraryItem):
    """Duration in minutes; genre defaults to 'Drama'."""

    def __init__(self, title: str, year: int, duration: int, genre: str = "Drama"):
        super().__init__(title, year)
        self.duration = duration
        self.genre    = genre

    def display_info(self) -> None:           # method override
        print("💿 DVD")
        print(f"   Title    : {self.title}")
        print(f"   Year     : {self.year}")
        print(f"   Genre    : {self.genre}")
        print(f"   Duration : {self.duration} min")


# DRIVER — Polymorphism in action

if __name__ == "__main__":
    catalog: list[LibraryItem] = [
        Book("Dune",          1965, "Frank Herbert"),
        Book("Clean Code",    2008, "Robert C. Martin", "Tech"),
        DVD("Inception",      2010, 148, "Sci-Fi"),
        DVD("The Godfather",  1972, 175),
    ]

    for item in catalog:
        item.display_info()    # Python picks the right override at runtime
        print("-" * 30)

    print(f"Total items registered: {LibraryItem.get_total()}")
