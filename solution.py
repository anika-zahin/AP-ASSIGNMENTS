from collections import defaultdict
from functools import reduce
from typing import Optional

logs = [
    {"user": "S101", "action": "YouTube", "duration": 45.5},
    {"user": "S102", "action": "Instagram", "duration": 30.0},
    {"user": "S101", "action": "WhatsApp", "duration": 20.0},
    {"user": "S103", "action": "YouTube", "duration": 60.0},
    {"user": "S102", "action": "Discord", "duration": 25.5},
    {"user": "S101", "action": "Discord", "duration": 15.0},
    {"user": "S103", "action": "Instagram", "duration": 40.0},
    {"user": "S104", "action": "WhatsApp", "duration": 55.0},
    {"user": "S104", "action": "YouTube", "duration": 35.0},
    {"user": "S105", "action": "Discord", "duration": 10.0},
]


def total_time_per_user(logs: list[dict]) -> dict[str, float]:
    time_map = defaultdict(float)
    for log in logs:
        time_map[log["user"]] += log["duration"]
    return dict(time_map)


def most_active_users(logs: list[dict], k: int) -> list[str]:
    totals = total_time_per_user(logs)
    return [user for user, _ in sorted(totals.items(), key=lambda x: x[1], reverse=True)[:k]]


def unique_actions(logs: list[dict]) -> set[str]:
    return {log["action"] for log in logs}


total_activity_time: float = reduce(lambda acc, log: acc + log["duration"], logs, 0.0)

print("Total time per user:", total_time_per_user(logs))
print("Top 3 most active users:", most_active_users(logs, 3))
print("Unique actions:", unique_actions(logs))
print("Total activity time (reduce):", total_activity_time)

print("""
Complexity Analysis:
- total_time_per_user    : Time O(n), Space O(u) where u = unique users
- most_active_users(k)   : Time O(n + u log u), Space O(u)
- unique_actions         : Time O(n), Space O(a) where a = unique actions
- reduce total time      : Time O(n), Space O(1)
""")
