package banking;

public class SavingsAccount extends Account {

    // ── Additional field ──────────────────────────────────────────────────────
    private double interestRate;   // annual rate, e.g. 0.045 = 4.5%

    // ── Constructor 1: chains to Constructor 2 ────────────────────────────────
    public SavingsAccount(String accountNumber, String ownerName) {
        this(accountNumber, ownerName, 0.0, 0.04);   // default 4% interest
    }

    // ── Constructor 2: chains to super ────────────────────────────────────────
    public SavingsAccount(String accountNumber, String ownerName,
                          double initialBalance, double interestRate) {
        super(accountNumber, ownerName, initialBalance);   // super constructor
        if (interestRate < 0 || interestRate > 1)
            throw new IllegalArgumentException(
                "Interest rate must be between 0 and 1 (e.g., 0.045 for 4.5%).");
        this.interestRate = interestRate;
    }

    // ── Getter / Setter ───────────────────────────────────────────────────────
    public double getInterestRate() { return interestRate; }

    public void setInterestRate(double rate) {
        if (rate < 0 || rate > 1)
            throw new IllegalArgumentException("Invalid interest rate: " + rate);
        this.interestRate = rate;
    }

    // ── Apply monthly interest ────────────────────────────────────────────────
    public double applyMonthlyInterest() {
        double interest = getBalance() * (interestRate / 12);
        adjustBalance(interest);
        System.out.printf("[INTEREST] %s | +₹%.2f (%.1f%% p.a.) | Balance: ₹%.2f%n",
                          getAccountNumber(), interest, interestRate * 100, getBalance());
        return interest;
    }

    // ── Overridden display() ──────────────────────────────────────────────────
    @Override
    public void display() {
        super.display();   // reuse parent display
        double monthlyInterest = getBalance() * (interestRate / 12);
        System.out.println("├─────────────────────────────────────┤");
        System.out.printf( "│  [SAVINGS] Rate : %-3.1f%% p.a.%13s│%n",
                           interestRate * 100, "");
        System.out.printf( "│  Est. Monthly Interest : ₹%-10.2f│%n", monthlyInterest);
        System.out.println("└─────────────────────────────────────┘");
    }

    @Override
    public String toString() {
        return String.format("SavingsAccount[%s | %s | ₹%.2f | %.1f%%]",
                             getAccountNumber(), getOwnerName(),
                             getBalance(), interestRate * 100);
    }
}
