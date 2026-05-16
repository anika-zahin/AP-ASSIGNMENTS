import sys
import gc

# Enable automatic garbage collection debugging
gc.set_debug(gc.DEBUG_SAVEALL)

# -----------------------------
# Node class
# -----------------------------
class Node:
    def __init__(self, name):
        self.name = name
        self.link = None

    def __del__(self):
        print(f"{self.name} is being garbage collected")


# -----------------------------
# Create objects
# -----------------------------
A = Node("Node A")
B = Node("Node B")

# -----------------------------
# Create circular reference
# -----------------------------
A.link = B
B.link = A

# -----------------------------
# Check reference counts
# -----------------------------
print("Reference count of A:", sys.getrefcount(A))
print("Reference count of B:", sys.getrefcount(B))

# -----------------------------
# Delete references from program
# -----------------------------
del A
del B

print("\nDeleted A and B variables")

# -----------------------------
# At this point:
# Objects still exist because
# they reference each other
# -----------------------------
print("\nObjects still remain in memory due to circular reference")

# -----------------------------
# Force garbage collection
# -----------------------------
collected = gc.collect()

print("\nGarbage Collector collected",
      collected,
      "unreachable objects")

# -----------------------------
# Show unreachable objects found
# -----------------------------
print("\nObjects found by GC:")

for obj in gc.garbage:
    if isinstance(obj, Node):
        print(obj.name)
