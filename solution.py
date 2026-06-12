from abc import ABC, abstractmethod

# ---------------------------
# 1. ORDER CLASSES
# ---------------------------

class Order(ABC):

    def __init__(self, order_id, amount):
        self.order_id = order_id
        self.amount = amount

    @abstractmethod
    def get_total(self):
        pass

    @abstractmethod
    def get_order_type(self):
        pass


class RegularOrder(Order):

    def get_total(self):
        return self.amount

    def get_order_type(self):
        return "Regular Order"


class DiscountedOrder(Order):

    def __init__(self, order_id, amount, discount):
        super().__init__(order_id, amount)
        self.discount = discount

    def get_total(self):
        return self.amount - self.discount

    def get_order_type(self):
        return "Discounted Order"


class PriorityOrder(Order):

    def __init__(self, order_id, amount, priority_fee):
        super().__init__(order_id, amount)
        self.priority_fee = priority_fee

    def get_total(self):
        return self.amount + self.priority_fee

    def get_order_type(self):
        return "Priority Order"


# ---------------------------
# 2. PAYMENT SYSTEM
# ---------------------------

class PaymentMethod(ABC):

    @abstractmethod
    def pay(self, amount):
        pass


class CreditCardPayment(PaymentMethod):

    def pay(self, amount):
        print(f"Paid {amount} using Credit Card")


class UPIPayment(PaymentMethod):

    def pay(self, amount):
        print(f"Paid {amount} using UPI")


class WalletPayment(PaymentMethod):

    def pay(self, amount):
        print(f"Paid {amount} using Wallet")


# ---------------------------
# 3. NOTIFICATION SYSTEM
# ---------------------------

class Notification(ABC):

    @abstractmethod
    def send(self, message):
        pass


class EmailNotification(Notification):

    def send(self, message):
        print(f"Email sent: {message}")


class SMSNotification(Notification):

    def send(self, message):
        print(f"SMS sent: {message}")


class PushNotification(Notification):

    def send(self, message):
        print(f"Push Notification: {message}")


# ---------------------------
# 4. STORAGE SYSTEM
# ---------------------------

class Storage(ABC):

    @abstractmethod
    def save(self, order):
        pass


class DatabaseStorage(Storage):

    def save(self, order):
        print(f"Order {order.order_id} ({order.get_order_type()}) saved to Database")


class FileStorage(Storage):

    def save(self, order):
        print(f"Order {order.order_id} ({order.get_order_type()}) saved to File")


# ---------------------------
# 5. ORDER SERVICE
# ---------------------------

class OrderService:

    def __init__(self, payment_method, notification, storage):

        self.payment_method = payment_method
        self.notification = notification
        self.storage = storage

    def place_order(self, order):

        total_amount = order.get_total()

        # Payment
        self.payment_method.pay(total_amount)

        # Save Order
        self.storage.save(order)

        # Notification
        self.notification.send(
            f"{order.get_order_type()} with ID {order.order_id} placed successfully. Amount: {total_amount}"
        )


# ---------------------------
# 6. MAIN PROGRAM WITH USER INPUT
# ---------------------------

if __name__ == "__main__":

    # User Inputs
    order_id = int(input("Enter Order ID: "))
    amount = float(input("Enter Order Amount: "))

    print("\nSelect Order Type")
    print("1. Regular Order")
    print("2. Discounted Order")
    print("3. Priority Order")

    order_choice = int(input("Enter choice: "))

    # Create Order
    if order_choice == 1:
        order = RegularOrder(order_id, amount)

    elif order_choice == 2:
        discount = float(input("Enter Discount Amount: "))
        order = DiscountedOrder(order_id, amount, discount)

    elif order_choice == 3:
        priority_fee = float(input("Enter Priority Fee: "))
        order = PriorityOrder(order_id, amount, priority_fee)

    else:
        print("Invalid Order Type")
        exit()

    # Payment Method
    print("\nSelect Payment Method")
    print("1. Credit Card")
    print("2. UPI")
    print("3. Wallet")

    payment_choice = int(input("Enter choice: "))

    if payment_choice == 1:
        payment = CreditCardPayment()

    elif payment_choice == 2:
        payment = UPIPayment()

    elif payment_choice == 3:
        payment = WalletPayment()

    else:
        print("Invalid Payment Method")
        exit()

    # Notification Method
    print("\nSelect Notification Method")
    print("1. Email")
    print("2. SMS")
    print("3. Push Notification")

    notification_choice = int(input("Enter choice: "))

    if notification_choice == 1:
        notification = EmailNotification()

    elif notification_choice == 2:
        notification = SMSNotification()

    elif notification_choice == 3:
        notification = PushNotification()

    else:
        print("Invalid Notification Method")
        exit()

    # Storage Method
    print("\nSelect Storage Method")
    print("1. Database")
    print("2. File")

    storage_choice = int(input("Enter choice: "))

    if storage_choice == 1:
        storage = DatabaseStorage()

    elif storage_choice == 2:
        storage = FileStorage()

    else:
        print("Invalid Storage Method")
        exit()

    # Create Service
    service = OrderService(
        payment,
        notification,
        storage
    )

    # Place Order
    print("\n----- ORDER PROCESSING -----")
    service.place_order(order)
