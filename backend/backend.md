# Backend API Design (Future)

**Backend not implemented yet.  
Frontend currently runs fully in DEMO mode.**

---

## Overview

This document describes the future backend API for the Flowx application. The backend will provide authentication, strategy management, deployment, and analytics.

**Recommended stack:** Spring Boot + PostgreSQL

---

## Entities

### User
- `id` (UUID)
- `email` (string, unique)
- `passwordHash` (string)
- `name` (string)
- `createdAt`, `updatedAt` (timestamp)

### Strategy
- `id` (UUID)
- `userId` (FK)
- `name` (string)
- `description` (string, optional)
- `status` (enum: DRAFT | LIVE | CLOSED | DEPLOYED)
- `timeSettings` (JSON or embedded: timezone, session start/end)
- `createdAt`, `updatedAt` (timestamp)

### StrategyLeg
- `id` (UUID)
- `strategyId` (FK)
- `symbol` (string)
- `direction` (BUY | SELL)
- `quantity` (number)
- `orderType` (string, e.g. MARKET, LIMIT)
- `days` (array of weekday codes or similar)
- `sortOrder` (int)

### Deployment
- `id` (UUID)
- `strategyId` (FK)
- `deployedAt` (timestamp)
- `closedAt` (timestamp, optional)
- `status` (ACTIVE | CLOSED)

### Analytics
- Aggregated/summary data per strategy and globally (e.g. P&L, win rate, trade count). Structure TBD; can be views/materialized from Strategy, Deployment, and trade data.

---

## Future API Endpoints

### Auth

| Method | Endpoint        | Description        |
|--------|-----------------|--------------------|
| POST   | `/auth/login`   | Login              |
| POST   | `/auth/register`| Register           |
| GET    | `/auth/me`      | Current user       |

**POST /auth/login**

Request:
```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

Response (200):
```json
{
  "token": "jwt-access-token",
  "refreshToken": "jwt-refresh-token",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "name": "User Name"
  }
}
```

**POST /auth/register**

Request:
```json
{
  "email": "user@example.com",
  "password": "secret",
  "name": "User Name"
}
```

Response (201):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name"
}
```

**GET /auth/me**

Headers: `Authorization: Bearer <token>`

Response (200):
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "name": "User Name"
}
```

---

### Strategies

| Method | Endpoint                      | Description        |
|--------|-------------------------------|--------------------|
| GET    | `/strategies`                 | List strategies    |
| GET    | `/strategies/{id}`            | Get strategy       |
| POST   | `/strategies`                 | Create strategy    |
| PUT    | `/strategies/{id}`            | Update strategy    |
| POST   | `/strategies/{id}/deploy`     | Deploy strategy    |
| POST   | `/strategies/{id}/close`      | Close strategy     |

**GET /strategies**

Query: `?status=LIVE|CLOSED|DEPLOYED` (optional)

Response (200):
```json
{
  "items": [
    {
      "id": "uuid",
      "name": "Strategy A",
      "description": "Description",
      "status": "LIVE",
      "createdAt": "2025-03-05T10:00:00Z"
    }
  ],
  "total": 1
}
```

**GET /strategies/{id}**

Response (200):
```json
{
  "id": "uuid",
  "name": "Strategy A",
  "description": "Description",
  "status": "LIVE",
  "timeSettings": {
    "timezone": "Asia/Kolkata",
    "sessionStart": "09:15",
    "sessionEnd": "15:30"
  },
  "legs": [
    {
      "id": "uuid",
      "symbol": "NIFTY",
      "direction": "BUY",
      "quantity": 1,
      "orderType": "MARKET",
      "days": ["MON", "TUE", "WED", "THU", "FRI"]
    }
  ],
  "createdAt": "2025-03-05T10:00:00Z",
  "updatedAt": "2025-03-05T10:00:00Z"
}
```

**POST /strategies**

Request:
```json
{
  "name": "Strategy A",
  "description": "Description",
  "timeSettings": {
    "timezone": "Asia/Kolkata",
    "sessionStart": "09:15",
    "sessionEnd": "15:30"
  },
  "legs": [
    {
      "symbol": "NIFTY",
      "direction": "BUY",
      "quantity": 1,
      "orderType": "MARKET",
      "days": ["MON", "TUE", "WED", "THU", "FRI"]
    }
  ]
}
```

Response (201): Same shape as GET /strategies/{id}

**PUT /strategies/{id}**

Request: Same as POST /strategies (full or partial update TBD)

Response (200): Same shape as GET /strategies/{id}

**POST /strategies/{id}/deploy**

Response (200):
```json
{
  "deploymentId": "uuid",
  "strategyId": "uuid",
  "deployedAt": "2025-03-05T10:00:00Z",
  "status": "ACTIVE"
}
```

**POST /strategies/{id}/close**

Response (200):
```json
{
  "deploymentId": "uuid",
  "closedAt": "2025-03-05T15:30:00Z",
  "status": "CLOSED"
}
```

---

### Analytics

| Method | Endpoint                    | Description           |
|--------|-----------------------------|------------------------|
| GET    | `/analytics/summary`        | Global summary        |
| GET    | `/analytics/strategies/{id}`| Analytics for strategy|

**GET /analytics/summary**

Response (200):
```json
{
  "totalStrategies": 10,
  "liveStrategies": 3,
  "totalPnl": 15000.50,
  "winRate": 0.65,
  "totalTrades": 120
}
```

**GET /analytics/strategies/{id}**

Response (200):
```json
{
  "strategyId": "uuid",
  "strategyName": "Strategy A",
  "pnl": 5000.25,
  "winRate": 0.70,
  "tradeCount": 45,
  "period": { "from": "2025-03-01", "to": "2025-03-05" }
}
```

---

*End of API design. No backend code exists in this repository.*
