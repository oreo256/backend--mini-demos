# 02. Authentication API with Express × Prisma × JWT

## 概要

TypeScript・Express・Prisma・PostgreSQL を用いて、  
ユーザー登録・ログイン・JWT による認証を行う API を実装した。

- パスワードは bcrypt によってハッシュ化
- ログイン成功時に JWT を発行
- JWT を用いた 保護された API（認可）を実装

REST API における 認証 / 認可の基本構成を理解することを目的としている。

---

## 使用技術

- TypeScript  
- Express  
- Prisma (ORM)  
- PostgreSQL  
- bcrypt（パスワードハッシュ化）  
- jsonwebtoken（JWT 発行・検証）  
- dotenv  

---

## ディレクトリ構成
```
02auth-jwt/
├── .env
├── README.md
├── package.json
├── prisma/
│   └── schema.prisma
├── src/
│   ├── app.ts
│   ├── controllers/
│   │   └── authController.ts
│   ├── middlewares
│   │   └── auth.ts
│   └── routes/
│       ├── authRoutes.ts
│       └── protectedRoutes.ts
└── tsconfig.json
```

---

## ER 図
```
User
├─ id Int @id @default(autoincrement())
├─ email String @unique
├─ password String
└─ createdAt DateTime @default(now())
```


---

## 認証フロー概要
```
[Register]
Client
→ POST /api/auth/register
→ password を bcrypt でハッシュ化
→ User 作成

[Login]
Client
→ POST /api/auth/login
→ password を bcrypt.compare
→ JWT 発行

[Protected API]
Client
→ Authorization: Bearer <JWT>
→ JWT 検証（middleware）
→ req.user に userId をセット
```


---

## セットアップ手順

1. 依存関係をインストール

    ```
    npm install
    ```

2. DB を作成

    ```
    createdb auth_demo
    ```

3. `.env` を作成

    ```
    DATABASE_URL="postgresql://leo@localhost:5432/auth_demo?schema=public"
    JWT_SECRET="super-secret-key"
    ```

4. マイグレーション実行

    ```
    npx prisma migrate dev --name init
    ```

5. サーバー起動

    ```
    npx ts-node-dev src/app.ts
    ```

---

## API エンドポイント

### 認証系

| メソッド | エンドポイント        | 説明             |
| -------- | --------------------- | ---------------- |
| POST     | `/api/auth/register`      | ユーザー登録     |
| POST     | `/api/auth/login`         | ログイン（JWT発行） |

### 認可付き（例）

| メソッド | エンドポイント | 説明               |
| -------- | -------------- | ------------------ |
| GET      | `/api/profile`   | JWT必須のAPI例     |

---

## 動作確認例（curl）

### ユーザー登録

```
curl -X POST http://localhost:3000/api/auth/register
-H "Content-Type: application/json"
-d '{"email":"test@example.com","password":"password123"}'
```


### ログイン
```
curl -X POST http://localhost:3000/api/auth/login
-H "Content-Type: application/json"
-d '{"email":"test@example.com","password":"password123"}'
```


### JWT付きリクエスト
```
curl http://localhost:3000/api/profile
-H "Authorization: Bearer <JWT>"
```