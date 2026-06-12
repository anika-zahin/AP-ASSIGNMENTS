from score_processor import ScoreProcessor

processor = ScoreProcessor()

print("----- Demo 1: Valid File -----")
try:
    result = processor.process_score_file("score.txt")
    print("Result:", result)
except Exception:
    pass

print("\n----- Demo 2: Missing File -----")
try:
    result = processor.process_score_file("missing.txt")
    print("Result:", result)
except Exception:
    pass

print("\n----- Demo 3: Invalid Data -----")
try:
    result = processor.process_score_file("invalid.txt")
    print("Result:", result)
except Exception:
    pass
