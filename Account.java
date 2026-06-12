package banking;

/**
 * Base class representing a bank account.
 * Demonstrates: Encapsulation, Constructor Chaining, Validation
 */
public class Account {

    // Private fields (Encapsulation) 
    private String accountNumber;
    private String ownerName;
    private double balance;

    // Constructor 1: Minimal (chains to Constructor 2) 
    public Account(String accountNumber, String ownerName) {
        this(accountNumber, ownerName, 0.0);          // constructor chaining
    }

    // Constructor 2: Full 
    public Account(String accountNumber, String ownerName, double initialBalance) {
        if (accountNumber == null || accountNumber.isBlank())
            throw new IllegalArgumentException("Account number cannot be empty.");
        if (ownerName == null || ownerName.isBlank())
            throw new IllegalArgumentException("Owner name cannot be empty.");
        if (initialBalance < 0)
            throw new IllegalArgumentException("Initial balance cannot be negative.");

        this.accountNumber = accountNumber;
        this.ownerName     = ownerName;
        this.balance       = initialBalance;
    }

    // Getters
    public String getAccountNumber() { return accountNumber; }
    public String getOwnerName()     { return ownerName; }
    public double getBalance()       { return balance; }

    // Setters
    public void setOwnerName(String ownerName) {
        if (ownerName == null || ownerName.isBlank())
            throw new IllegalArgumentException("Owner name cannot be empty.");
        this.ownerName = ownerName;
    }

    // accountNumber and balance are intentionally NOT directly settable
    // balance is mutated only through deposit/withdraw

    // deposit() 
    public void deposit(double amount) {
        if (amount <= 0)
            throw new IllegalArgumentException("Deposit amount must be positive. Got: " + amount);
        balance += amount;
        System.out.printf("[DEPOSIT]  %s | +₹%.2f | Balance: ₹%.2f%n",
                          accountNumber, amount, balance);
    }

    // withdraw() 
    public void withdraw(double amount) {
        if (amount <= 0)
            throw new IllegalArgumentException("Withdrawal amount must be positive. Got: " + amount);
        if (amount > balance)
            throw new IllegalStateException(
                String.format("Insufficient funds. Requested ₹%.2f, Available ₹%.2f", amount, balance));
        balance -= amount;
        System.out.printf("[WITHDRAW] %s | -₹%.2f | Balance: ₹%.2f%n",
                          accountNumber, amount, balance);
    }

    //  Protected helper so subclasses can adjust balance 
    protected void adjustBalance(double delta) {
        this.balance += delta;
    }

    // display() 
    public void display() {
        System.out.println("┌─────────────────────────────────────┐");
        System.out.println("│           ACCOUNT DETAILS           │");
        System.out.println("├─────────────────────────────────────┤");
        System.out.printf( "│  Number  : %-26s│%n", accountNumber);
        System.out.printf( "│  Owner   : %-26s│%n", ownerName);
        System.out.printf( "│  Balance : ₹%-25.2f│%n", balance);
        System.out.println("└─────────────────────────────────────┘");
    }

    @Override
    public String toString() {
        return String.format("Account[%s | %s | ₹%.2f]", accountNumber, ownerName, balance);
    }
}
