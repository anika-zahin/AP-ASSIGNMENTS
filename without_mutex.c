#include <stdio.h>
#include <pthread.h>

#define NUM_THREADS 5
#define INCREMENTS 100000

// Shared global counter
int counter = 0;

// Function executed by each thread
void* increment_counter(void* arg)
{
    for(int i = 0; i < INCREMENTS; i++)
    {
        counter++;
    }

    return NULL;
}

int main()
{
    pthread_t threads[NUM_THREADS];

    // Create threads
    for(int i = 0; i < NUM_THREADS; i++)
    {
        pthread_create(&threads[i], NULL, increment_counter, NULL);
    }

    // Wait for all threads to finish
    for(int i = 0; i < NUM_THREADS; i++)
    {
        pthread_join(threads[i], NULL);
    }

    printf("Expected Counter Value: %d\n", NUM_THREADS * INCREMENTS);
    printf("Actual Counter Value: %d\n", counter);

    return 0;
}
