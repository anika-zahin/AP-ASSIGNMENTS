#include <stdio.h>
#include <pthread.h>
#include <semaphore.h>
#include <unistd.h>

#define MAX_ITEMS 5

// Shared resource (buffer)
int buffer = 0;

// Semaphores
sem_t empty;
sem_t full;

// Producer function
void* producer(void* arg)
{
    for(int i = 1; i <= MAX_ITEMS; i++)
    {
        // Wait if buffer is full
        sem_wait(&empty);

        // Produce item
        buffer = i;
        printf("Producer produced item %d\n", buffer);

        sleep(1);

        // Signal that buffer is full
        sem_post(&full);
    }

    return NULL;
}

// Consumer function
void* consumer(void* arg)
{
    for(int i = 1; i <= MAX_ITEMS; i++)
    {
        // Wait if buffer is empty
        sem_wait(&full);

        // Consume item
        printf("Consumer consumed item %d\n", buffer);

        sleep(1);

        // Signal that buffer is empty
        sem_post(&empty);
    }

    return NULL;
}

int main()
{
    pthread_t producerThread, consumerThread;

    // Initialize semaphores
    sem_init(&empty, 0, 1); // Buffer initially empty
    sem_init(&full, 0, 0);  // No items initially

    // Create threads
    pthread_create(&producerThread, NULL, producer, NULL);
    pthread_create(&consumerThread, NULL, consumer, NULL);

    // Wait for threads to finish
    pthread_join(producerThread, NULL);
    pthread_join(consumerThread, NULL);

    // Destroy semaphores
    sem_destroy(&empty);
    sem_destroy(&full);

    return 0;
}
