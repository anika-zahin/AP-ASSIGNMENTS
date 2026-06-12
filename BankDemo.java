package banking;

import java.util.ArrayList;
import java.util.List;

/**
 * BankDemo — entry point.
 * Demonstrates: Polymorphism, Exception handling, assert
 */
public class BankDemo {

    public static void main(String[] args) {

        System.out.println("╔══════════════════════════════════════╗");
        System.out.println("║       JAVA BANKING SYSTEM DEMO       ║");
        System.out.println("╚══════════════════════════════════════╝\n");

        // ── 1. Create accounts (polymorphic list) ─────────────────────────────
        List<Account> accounts = new ArrayList<>();

        // SavingsAccount – minimal constructor (chains internally)
        SavingsAccount savings = new SavingsAccount("SAV-001", "Arjun Sharma");
        savings.deposit(50000);

        // SavingsAccount – full constructor
        SavingsAccount savings2 = new SavingsAccount("SAV-002", "Priya Nair", 100000, 0.065);

        // CurrentAccount – minimal constructor
        CurrentAccount current = new CurrentAccount("CUR-001", "Ravi Mehta");
        current.deposit(20000);

        // CurrentAccount – full constructor (₹10,000 overdraft)
        CurrentAccount current2 = new CurrentAccount("CUR-002", "Sunita Rao", 5000, 10000);

        accounts.add(savings);
        accounts.add(savings2);
        accounts.add(current);
        accounts.add(current2);

        // ── 2. Operations ─────────────────────────────────────────────────────
        System.out.println("\n─── TRANSACTIONS ───────────────────────────────────");

        savings.deposit(10000);
        savings.withdraw(5000);
        savings.applyMonthlyInterest();

        current.withdraw(15000);    // normal

        // Overdraft usage
        System.out.println("\n─── OVERDRAFT TEST ──────────────────────────────────");
        current2.withdraw(12000);   // goes ₹7,000 into overdraft

        // ── 3. Validation / Exception demos ──────────────────────────────────
        System.out.println("\n─── VALIDATION TESTS ────────────────────────────────");

        tryBlock("Negative deposit",  () -> savings.deposit(-500));
        tryBlock("Zero withdrawal",   () -> savings.withdraw(0));
        tryBlock("Exceeds savings",   () -> savings.withdraw(9_999_999));
        tryBlock("Exceeds overdraft", () -> current2.withdraw(99_999));

        // ── 4. assert demo (run with -ea JVM flag) ───────────────────────────
        assert savings.getBalance() >= 0 : "Savings balance should never go negative!";

        // ── 5. Polymorphic display() ───────────────────────────────────────────
        System.out.println("\n─── POLYMORPHIC display() ───────────────────────────");
        for (Account acc : accounts) {
            System.out.println();
            acc.display();   // dispatches to correct subclass at runtime
        }

        // ── 6. toString() ────────────────────────────────────────────────────
        System.out.println("\n─── toString() SUMMARY ──────────────────────────────");
        accounts.forEach(System.out::println);
    }

    // Helper: run a lambda and catch any exception (for demo purposes)
    private static void tryBlock(String label, Runnable op) {
        try {
            op.run();
            System.out.printf("[%-20s] OK (no exception)%n", label);
        } catch (IllegalArgumentException | IllegalStateException e) {
            System.out.printf("[%-20s] Caught: %s%n", label, e.getMessage());
        }
    }
}
