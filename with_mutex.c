#include <stdio.h>
#include <pthread.h>

#define NUM_THREADS 5
#define INCREMENTS 100000

// Shared global counter
int counter = 0;

// Mutex variable
pthread_mutex_t lock;

// Function executed by each thread
void* increment_counter(void* arg)
{
    for(int i = 0; i < INCREMENTS; i++)
    {
        // Lock the mutex
        pthread_mutex_lock(&lock);

        // Critical section
        counter++;

        // Unlock the mutex
        pthread_mutex_unlock(&lock);
    }

    return NULL;
}

int main()
{
    pthread_t threads[NUM_THREADS];

    // Initialize mutex
    pthread_mutex_init(&lock, NULL);

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

    // Destroy mutex
    pthread_mutex_destroy(&lock);

    return 0;
}
