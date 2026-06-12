#include <stdio.h>
#include <time.h>

void constantTime(int n) {
    int x = n * n;
}

void linearTime(int n) {
    int sum = 0;
    for(int i = 0; i < n; i++) {
        sum += i;
    }
}

void quadraticTime(int n) {
    int sum = 0;
    for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            sum += i + j;
        }
    }
}

int main() {
    clock_t start, end;
    double time_taken;
    int n;

    printf("Enter input size: ");
    scanf("%d", &n);

    start = clock();
    constantTime(n);
    end = clock();
    time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Constant Time O(1): %f seconds\n", time_taken);

    start = clock();
    linearTime(n);
    end = clock();
    time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Linear Time O(n): %f seconds\n", time_taken);

    start = clock();
    quadraticTime(n);
    end = clock();
    time_taken = ((double)(end - start)) / CLOCKS_PER_SEC;
    printf("Quadratic Time O(n^2): %f seconds\n", time_taken);

    return 0;
}
