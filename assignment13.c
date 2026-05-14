#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/* ─────────────────────────────────────────────
   1.  Struct definition
   ───────────────────────────────────────────── */
typedef struct {
    char   *data;      /* null-terminated character buffer          */
    size_t  length;    /* current string length (excluding '\0')    */
    size_t  capacity;  /* total bytes allocated for data            */
} StringBuffer;


/* ─────────────────────────────────────────────
   2.  sb_init – allocate struct + data buffer
   ───────────────────────────────────────────── */
StringBuffer *sb_init(size_t initial_capacity)
{
    /* Require at least 1 byte so we can always store '\0' */
    if (initial_capacity == 0) initial_capacity = 1;

    StringBuffer *sb = malloc(sizeof(StringBuffer));
    if (!sb) {
        fprintf(stderr, "sb_init: failed to allocate StringBuffer struct\n");
        return NULL;
    }

    sb->data = malloc(initial_capacity);
    if (!sb->data) {
        fprintf(stderr, "sb_init: failed to allocate data buffer\n");
        free(sb);
        return NULL;
    }

    sb->data[0]  = '\0';
    sb->length   = 0;
    sb->capacity = initial_capacity;
    return sb;
}


/* ─────────────────────────────────────────────
   3.  sb_append – grow buffer when necessary
   ───────────────────────────────────────────── */
int sb_append(StringBuffer *sb, const char *str)
{
    if (!sb || !str) return -1;

    size_t str_len   = strlen(str);
    size_t needed    = sb->length + str_len + 1; /* +1 for '\0' */

    /* Grow capacity (double each time) until it is large enough */
    if (needed > sb->capacity) {
        size_t new_cap = sb->capacity;
        while (new_cap < needed) new_cap *= 2;

        /* Safe realloc: keep original pointer intact on failure */
        char *tmp = realloc(sb->data, new_cap);
        if (!tmp) {
            fprintf(stderr, "sb_append: realloc failed (capacity %zu → %zu)\n",
                    sb->capacity, new_cap);
            return -1;   /* original sb->data is still valid */
        }

        printf("  [GROW] capacity %zu → %zu\n", sb->capacity, new_cap);
        sb->data     = tmp;
        sb->capacity = new_cap;
    }

    /* Append and update length */
    memcpy(sb->data + sb->length, str, str_len + 1); /* copies '\0' too */
    sb->length += str_len;
    return 0;
}


/* ─────────────────────────────────────────────
   4.  sb_free – destructor, prevents leaks
   ───────────────────────────────────────────── */
void sb_free(StringBuffer *sb)
{
    if (!sb) return;
    free(sb->data);   /* free the character buffer first  */
    sb->data     = NULL;
    sb->length   = 0;
    sb->capacity = 0;
    free(sb);         /* then free the struct itself      */
}


/* ─────────────────────────────────────────────
   Helper: pretty-print current buffer state
   ───────────────────────────────────────────── */
static void sb_print_state(const StringBuffer *sb, const char *label)
{
    printf("  %-20s | length=%-4zu | capacity=%-4zu | data=\"%s\"\n",
           label, sb->length, sb->capacity, sb->data);
}


/* ─────────────────────────────────────────────
   5.  Demo – buffer must grow at least twice
   ───────────────────────────────────────────── */
int main(void)
{
    puts("=== Dynamic String Buffer Demo ===\n");

    /* Start small (8 bytes) so we trigger multiple growths quickly */
    StringBuffer *sb = sb_init(8);
    if (!sb) return EXIT_FAILURE;

    printf("Initial state:\n");
    sb_print_state(sb, "after sb_init(8)");
    puts("");

    /* ── Append 1 ── */
    printf("Appending \"Hello, \":\n");
    if (sb_append(sb, "Hello, ") != 0) { sb_free(sb); return EXIT_FAILURE; }
    sb_print_state(sb, "after append #1");
    puts("");

    /* ── Append 2 – triggers first growth (8 → 16) ── */
    printf("Appending \"World! \":\n");
    if (sb_append(sb, "World! ") != 0) { sb_free(sb); return EXIT_FAILURE; }
    sb_print_state(sb, "after append #2");
    puts("");

    /* ── Append 3 – triggers second growth (16 → 32) ── */
    printf("Appending \"This buffer grows automatically.\":\n");
    if (sb_append(sb, "This buffer grows automatically.") != 0) {
        sb_free(sb);
        return EXIT_FAILURE;
    }
    sb_print_state(sb, "after append #3");
    puts("");

    /* ── Append 4 – fits within current capacity ── */
    printf("Appending \" No leaks!\":\n");
    if (sb_append(sb, " No leaks!") != 0) { sb_free(sb); return EXIT_FAILURE; }
    sb_print_state(sb, "after append #4");
    puts("");

    /* ── Final result ── */
    printf("Final string:\n  \"%s\"\n\n", sb->data);

    /* ── Free everything ── */
    sb_free(sb);
    /* sb is now a dangling pointer – set to NULL for safety */
    sb = NULL;
    puts("Memory freed. All done.");

    return EXIT_SUCCESS;
}