import java.util.ArrayList;
import java.util.Scanner;

public class BookSearch {
    public static void main(String[] args) {

       ArrayList<String> books = new ArrayList<>();

        books.add("The Alchemist");
        books.add("To Kill a Mockingbird");
        books.add("Introduction to Algorithms");
        books.add("Harry Potter and the Sorcerer's Stone");
        books.add("The Lord of the Rings");

        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a word to search in book titles: ");
        String searchWord = sc.nextLine().toLowerCase();

        System.out.println("\nBooks containing \"" + searchWord + "\":");

        boolean found = false;

        for (String book : books) {
            if (book.toLowerCase().contains(searchWord)) {
                System.out.println(book);
                found = true;
            }
        }

        if (!found) {
            System.out.println("No matching books found.");
        }

        sc.close();
    }
}
