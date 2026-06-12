#include <stdio.h>
#include <stdlib.h>
#include <time.h>

void constantTime(int n) {
    int a = 10, b = 20, c;
    c = a + b;   
}
void linearTime(int n) {
    int *arr = (int *)malloc(n * sizeof(int)); 
    for(int i = 0; i < n; i++) {
        arr[i] = i;
    }
    free(arr);
}
void quadraticTime(int n) {
    int **arr = (int **)malloc(n * sizeof(int *));
    for(int i = 0; i < n; i++) {
        arr[i] = (int *)malloc(n * sizeof(int));
    }
	for(int i = 0; i < n; i++) {
        for(int j = 0; j < n; j++) {
            arr[i][j] = i + j;
        }
    }
	for(int i = 0; i < n; i++) {
        free(arr[i]);
    }
    free(arr);
}
int main() {
    int n;
	printf("Enter input size: ");
    scanf("%d", &n);

    printf("\nO(1) Space: %lu bytes\n", sizeof(int));
	printf("O(n) Space: %lu bytes\n", n * sizeof(int));
	printf("O(n^2) Space: %lu bytes\n", n * n * sizeof(int));

    return 0;
}
