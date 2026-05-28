import httpx
import redis
import json
import os
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse

router = APIRouter()

TASK_SERVICE_URL = os.getenv("TASK_SERVICE_URL", "http://localhost:8001")
REDIS_HOST = os.getenv("REDIS_HOST", "localhost")

r = redis.Redis(host=REDIS_HOST, port=6379, decode_responses=True)


async def forward(method: str, url: str, **kwargs):
    async with httpx.AsyncClient() as client:
        response = await client.request(method, url, **kwargs)
    return JSONResponse(status_code=response.status_code, content=response.json())


@router.get("/tasks")
async def get_tasks():
    return await forward("GET", f"{TASK_SERVICE_URL}/tasks")


@router.post("/tasks")
async def create_task(request: Request):
    body = await request.json()
    response = await forward("POST", f"{TASK_SERVICE_URL}/tasks", json=body)

    event = {"type": "task_created", "title": body.get("title")}
    r.rpush("task_events", json.dumps(event))

    return response


@router.get("/tasks/{task_id}")
async def get_task(task_id: int):
    return await forward("GET", f"{TASK_SERVICE_URL}/tasks/{task_id}")


@router.patch("/tasks/{task_id}")
async def update_task(task_id: int, request: Request):
    body = await request.json()
    return await forward("PATCH", f"{TASK_SERVICE_URL}/tasks/{task_id}", json=body)


@router.delete("/tasks/{task_id}")
async def delete_task(task_id: int):
    async with httpx.AsyncClient() as client:
        response = await client.delete(f"{TASK_SERVICE_URL}/tasks/{task_id}")
    return JSONResponse(status_code=response.status_code, content=None)