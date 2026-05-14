import gc
import sys

SEPARATOR = "=" * 60

#  Helper

def scan_nodes(label: str, cls) -> list:
    found = [o for o in gc.get_objects() if isinstance(o, cls)]
    if found:
        for obj in found:
            print(f"  [!] {label}: {obj!r} still in memory")
    else:
        print(f"  [OK] {label}: no objects found -- memory clear")
    return found

#  DEMO A -- Cycle with NO __del__
#  gc.collect() returns the number of freed objects directly.
# ══════════════════════════════════════════════════════════════════════════════
print(SEPARATOR)
print("  DEMO A  --  Reference cycle WITHOUT __del__")
print(SEPARATOR)

class SimpleNode:
    """Plain node -- no finalizer."""
    def __init__(self, name):
        self.name  = name
        self.link  = None
    def __repr__(self):
        return f"SimpleNode({self.name!r})"

gc.disable()
gc.garbage.clear()

# -- Step 1 : build cycle
print("\n[A-1]  Create cycle")
A = SimpleNode("A")
B = SimpleNode("B")
A.link = B
B.link = A
print(f"  {A!r}.link -> {A.link!r}")
print(f"  {B!r}.link -> {B.link!r}")

# -- Step 2 : reference counts
print("\n[A-2]  Reference counts BEFORE del")
print(f"  refcount(A) - 1  =  {sys.getrefcount(A) - 1}   (local var + B.link)")
print(f"  refcount(B) - 1  =  {sys.getrefcount(B) - 1}   (local var + A.link)")

# -- Step 3 : delete local names
print("\n[A-3]  del A  and  del B")
del A, B
print("  Names deleted. Refcounts each drop to 1 (kept alive by the cycle).")
print("  Objects are UNREACHABLE but NOT yet freed.")

# -- Step 4 : prove they are still alive
print("\n[A-4]  Scan gc.get_objects()")
scan_nodes("before collect", SimpleNode)

# -- Step 5 : force GC
print("\n[A-5]  gc.collect()")
collected = gc.collect()
print(f"  gc.collect() => {collected} unreachable object(s) collected  [expected >= 2]")

# -- Step 6 : verify
print("\n[A-6]  Scan gc.get_objects() after collect")
scan_nodes("after collect", SimpleNode)

gc.enable()
gc.disable()   # keep disabled for Demo B


# ══════════════════════════════════════════════════════════════════════════════
#  DEMO B -- Cycle WITH __del__
#  CPython >= 3.4: gc.collect() still breaks the cycle and fires __del__.
#  CPython <  3.4: objects land in gc.garbage; we drain it manually.
# ══════════════════════════════════════════════════════════════════════════════
print("\n" + SEPARATOR)
print("  DEMO B  --  Reference cycle WITH __del__")
print(SEPARATOR)

_finalizer_log = []   # collect messages so they print in order

class FinalizableNode:
    """Node with a finalizer to prove when the object truly dies."""
    def __init__(self, name):
        self.name  = name
        self.link  = None
    def __repr__(self):
        return f"FinalizableNode({self.name!r})"
    def __del__(self):
        _finalizer_log.append(f"    checkmark  {self!r} finalizer ran -- object is gone.")

gc.garbage.clear()

# -- Step 1 : build cycle
print("\n[B-1]  Create cycle")
C = FinalizableNode("C")
D = FinalizableNode("D")
C.link = D
D.link = C
print(f"  {C!r}.link -> {C.link!r}")
print(f"  {D!r}.link -> {D.link!r}")

# -- Step 2 : reference counts
print("\n[B-2]  Reference counts BEFORE del")
print(f"  refcount(C) - 1  =  {sys.getrefcount(C) - 1}   (local var + D.link)")
print(f"  refcount(D) - 1  =  {sys.getrefcount(D) - 1}   (local var + C.link)")

# -- Step 3 : delete local names
print("\n[B-3]  del C  and  del D")
del C, D
print("  Names deleted. Objects are UNREACHABLE but still alive.")

# -- Step 4 : prove they are still alive
print("\n[B-4]  Scan gc.get_objects()")
scan_nodes("before collect", FinalizableNode)

# -- Step 5 : force GC
print("\n[B-5]  gc.collect()")
collected = gc.collect()

in_garbage = [o for o in gc.garbage if isinstance(o, FinalizableNode)]
print(f"  gc.collect() return value : {collected}")

if in_garbage:
    # Python < 3.4 path
    total = collected + len(in_garbage)
    print(f"  gc.garbage contains {len(in_garbage)} FinalizableNode(s)  [Python < 3.4 behaviour]")
    print(f"  Total unreachable objects found : {total}")
    print("\n[B-5b]  Draining gc.garbage to fire finalizers ...")
    gc.garbage.clear()   # drop GC's refs -> refcount hits 0 -> __del__ fires
else:
    # Python >= 3.4 path (PEP 442)
    print(f"  gc.garbage is empty -- Python >= 3.4 handled __del__ inside collect().")
    print(f"  Finalizers should have fired already.")

# flush finalizer log
if _finalizer_log:
    for msg in _finalizer_log:
        print(msg)
else:
    print("  (finalizer messages will appear at interpreter shutdown -- CPython quirk)")

# -- Step 6 : verify
print("\n[B-6]  Scan gc.get_objects() after collect")
scan_nodes("after collect", FinalizableNode)

gc.enable()

print("\n" + SEPARATOR)
print("  Both demos complete.  Automatic GC re-enabled.")
print(SEPARATOR)