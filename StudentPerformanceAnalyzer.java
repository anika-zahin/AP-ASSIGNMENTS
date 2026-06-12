import java.util.*;
import java.util.stream.*;

class Student {

    private final int        id;
    private final String     name;
    private final List<String>         courses;  
    private final Map<String, Integer> scores;    

    public Student(int id, String name,
                   List<String> courses,
                   Map<String, Integer> scores) {
        this.id      = id;
        this.name    = new String(name);               
        this.courses = new ArrayList<>(courses);       
        this.scores  = new HashMap<>(scores);          
    }

    public int               getId()      { return id; }
    public String            getName()    { return name; }
    public List<String>      getCourses() { return Collections.unmodifiableList(courses); }
    public Map<String,Integer> getScores(){ return Collections.unmodifiableMap(scores); }

    public double getAverageScore() {
        if (courses.isEmpty()) return 0.0;
        return courses.stream()
                      .mapToInt(c -> scores.getOrDefault(c, 0))
                      .average()
                      .orElse(0.0);
    }

    @Override
    public String toString() {
        return String.format("Student{id=%d, name='%s', avg=%.2f, scores=%s}",
                             id, name, getAverageScore(), scores);
    }
}

class StudentAnalyzer {

    public List<Student> getTopNStudents(List<Student> students, int n) {
        return students.stream()
                       .sorted(Comparator.comparingDouble(Student::getAverageScore)
                                         .reversed())            
                       .limit(n)
                       .collect(Collectors.toCollection(ArrayList::new)); 
    }

    public Map<String, Double> getAverageScorePerCourse(List<Student> students) {
       
        Map<String, int[]> accumulator = new HashMap<>();  

        students.forEach(student ->
            student.getCourses().forEach(course -> {
                int mark = student.getScores().getOrDefault(course, 0); 
                accumulator.merge(course, new int[]{mark, 1},
                                  (existing, incoming) -> {
                                      existing[0] += incoming[0];
                                      existing[1] += incoming[1];
                                      return existing;
                                  });
            })
        );

    
        return accumulator.entrySet().stream()
                          .collect(Collectors.toMap(
                              Map.Entry::getKey,
                              e -> (double) e.getValue()[0] / e.getValue()[1],
                              (a, b) -> a,
                              HashMap::new          
                          ));
    }

    public Set<String> getAllUniqueCourses(List<Student> students) {
        return students.stream()
                       .flatMap(s -> s.getCourses().stream())
                       .collect(Collectors.toCollection(HashSet::new));
    }
}

public class StudentPerformanceAnalyzer {

    public static void main(String[] args) {

        List<Student> batch = new ArrayList<>();

        batch.add(new Student(1, "Alice",
            List.of("Math", "Physics", "CS"),
            Map.of("Math", 92, "Physics", 88, "CS", 95)));

        batch.add(new Student(2, "Bob",
            List.of("Math", "Chemistry"),
            Map.of("Math", 75, "Chemistry", 80)));

        batch.add(new Student(3, "Carol",
            List.of("Math", "Physics", "Chemistry", "CS"),
            Map.of("Math", 85, "Physics", 90, "Chemistry", 88, "CS", 91)));

        batch.add(new Student(4, "Dave",
            List.of("CS", "Chemistry"),
            Map.of("CS", 70)));  

        batch.add(new Student(5, "Eve",
            List.of("Math", "Physics"),
            Map.of("Math", 98, "Physics", 96)));

        StudentAnalyzer analyzer = new StudentAnalyzer();
        System.out.println("  STUDENT PERFORMANCE ANALYZER");

        System.out.println(" Top 3 Students (by average score):");
        List<Student> top3 = analyzer.getTopNStudents(batch, 3);
        top3.forEach(s -> System.out.printf("   [%d] %-8s  avg = %.2f%n",
                                             s.getId(), s.getName(), s.getAverageScore()));

        // 2. Average score per course
        System.out.println("\n Average Score per Course:");
        Map<String, Double> courseAvg = analyzer.getAverageScorePerCourse(batch);
        courseAvg.entrySet().stream()
                 .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                 .forEach(e -> System.out.printf("   %-12s  %.2f%n", e.getKey(), e.getValue()));

        // 3. All unique courses
        System.out.println("\nAll Unique Courses in Batch:");
        Set<String> courses = analyzer.getAllUniqueCourses(batch);
        System.out.println("   " + courses);
        System.out.println("  COMPLEXITY ANALYSIS");
       
        System.out.println("""
          Let S = number of students, C = average courses per student.

          1. getAverageScorePerCourse  →  O(S × C)
             • Outer loop over S students, inner loop over C courses each.
             • HashMap.merge / put are O(1) amortised.
             • Final stream conversion is O(S × C) in the worst case.
             • Space: O(S × C) for the accumulator map.

          2. getTopNStudents (sort + limit N)  →  O(S × C + S log S)
             • Computing getAverageScore() for each student is O(C).
             • Sorting S students with a Comparator is O(S log S).
             • Stream.limit(N) is O(1) after sorting.
             • Combined: O(S·C + S·log S)  →  dominant term depends on C vs log S.
             • Space: O(S) for the sorted stream; output list is O(N).
          """);
    }
}
