import redis
import json
import os
import time

REDIS_HOST = os.getenv("REDIS_HOST", "localhost")

r = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)

print("Worker started. Waiting for tasks...")

while True:
    result = r.blpop("task_events", timeout=5)

    if result is None:
        continue

    _, raw = result
    event = json.loads(raw)

    print(f"[worker] received event: {event}")