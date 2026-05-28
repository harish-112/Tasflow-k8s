# TaskFlow

A microservices task manager built to learn Docker, Kubernetes, AKS, and GitHub Actions.

## Stack

- Frontend: React (Vite)
- API Gateway: FastAPI
- Task Service: FastAPI + SQLite
- Worker: Python + Redis
- Container Registry: Azure Container Registry
- Kubernetes: Azure Kubernetes Service
- CI/CD: GitHub Actions

## Services

| Service | Port | Role |
|---|---|---|
| frontend | 80 | React UI |
| api-gateway | 8000 | Entry point for frontend |
| task-service | 8001 | Task CRUD and storage |
| worker | - | Background event processor |
| redis | 6379 | Event queue |

## Local Development

```bash
docker compose up --build
```

Frontend: http://localhost:3000  
API: http://localhost:8000

## CI/CD

Push to `main` → builds images → pushes to ACR → deploys to AKS.

## Kubernetes

```bash
kubectl get pods -n taskflow
kubectl get svc -n taskflow
kubectl get ingress -n taskflow
```
