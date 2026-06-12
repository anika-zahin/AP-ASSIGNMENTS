package banking;

/**
 * CurrentAccount extends Account.
 * Demonstrates: Inheritance, Method Overriding, Overdraft logic
 */
public class CurrentAccount extends Account {

    // ── Additional field ──────────────────────────────────────────────────────
    private double overdraftLimit;   // how far below zero balance may go

    // ── Constructor 1: chains to Constructor 2 ────────────────────────────────
    public CurrentAccount(String accountNumber, String ownerName) {
        this(accountNumber, ownerName, 0.0, 5000.0);  // default ₹5,000 overdraft
    }

    // ── Constructor 2: chains to super ────────────────────────────────────────
    public CurrentAccount(String accountNumber, String ownerName,
                          double initialBalance, double overdraftLimit) {
        super(accountNumber, ownerName, initialBalance);
        if (overdraftLimit < 0)
            throw new IllegalArgumentException("Overdraft limit cannot be negative.");
        this.overdraftLimit = overdraftLimit;
    }

    // ── Getter / Setter ───────────────────────────────────────────────────────
    public double getOverdraftLimit()              { return overdraftLimit; }
    public double getEffectiveLimit()              { return getBalance() + overdraftLimit; }

    public void setOverdraftLimit(double limit) {
        if (limit < 0)
            throw new IllegalArgumentException("Overdraft limit cannot be negative.");
        this.overdraftLimit = limit;
    }

    // ── Overridden withdraw(): allows dipping into overdraft ──────────────────
    @Override
    public void withdraw(double amount) {
        if (amount <= 0)
            throw new IllegalArgumentException("Withdrawal amount must be positive. Got: " + amount);

        double effective = getBalance() + overdraftLimit;
        if (amount > effective)
            throw new IllegalStateException(
                String.format("Exceeds overdraft limit. Requested ₹%.2f, Effective limit ₹%.2f",
                              amount, effective));

        adjustBalance(-amount);
        System.out.printf("[WITHDRAW] %s | -₹%.2f | Balance: ₹%.2f%s%n",
                          getAccountNumber(), amount, getBalance(),
                          getBalance() < 0 ? " ⚠ (OVERDRAFT)" : "");
    }

    // ── Overridden display() ──────────────────────────────────────────────────
    @Override
    public void display() {
        super.display();
        System.out.println("├─────────────────────────────────────┤");
        System.out.printf( "│  [CURRENT] Overdraft : ₹%-11.2f│%n", overdraftLimit);
        System.out.printf( "│  Effective Limit     : ₹%-11.2f│%n", getEffectiveLimit());
        if (getBalance() < 0)
            System.out.printf("│  ⚠ OVERDRAWN by      : ₹%-11.2f│%n", Math.abs(getBalance()));
        System.out.println("└─────────────────────────────────────┘");
    }

    @Override
    public String toString() {
        return String.format("CurrentAccount[%s | %s | ₹%.2f | Overdraft: ₹%.2f]",
                             getAccountNumber(), getOwnerName(),
                             getBalance(), overdraftLimit);
    }
}
