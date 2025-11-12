# 01. REST API with Express × Prisma × PostgreSQL

## 概要

TypeScript・Express・Prisma・PostgreSQL を使って基本的な CRUD API（Create / Read / Update / Delete）を実装した。  
RDB と REST API の連携の仕組みを理解することを目的としている。

---

## 使用技術

- TypeScript
    
- Express
    
- Prisma (ORM)
    ****
- PostgreSQL
    
- ts-node-dev（ホットリロード）
    
- dotenv
    

---

## ディレクトリ構成

```
01rest-api-prisma/
├── prisma/
│   └── schema.prisma        # DBスキーマ定義
├── src/
│   ├── app.ts               # エントリーポイント
│   ├── controllers/
│   │   └── postController.ts # CRUD処理
│   └── routes/
│       └── postRoutes.ts     # ルーティング設定
├── .env                      # DB接続設定（git管理外）
├── package.json
├── tsconfig.json
└── README.md
```
---

## ER 図

```
Post
├─ id         Int       @id @default(autoincrement())
├─ title      String
├─ content    String?
├─ createdAt  DateTime  @default(now())
└─ updatedAt  DateTime  @updatedAt
```

---

## セットアップ手順

1. 依存関係をインストール
    
    `npm install`
    
2. DB を作成
    
    `createdb rest_demo`
    
3. `.env` に接続情報を記載
    
    `DATABASE_URL="postgresql://leo@localhost:5432/rest_demo?schema=public"`
    
4. マイグレーション実行
    
    `npx prisma migrate dev --name init`
    
5. サーバー起動
    
    `npx ts-node-dev src/app.ts`
    

---

## API エンドポイント

| メソッド | エンドポイント   | 説明     |
| -------- | ---------------- | -------- |
| GET      | `/api/posts`     | 全件取得 |
| GET      | `/api/posts/:id` | 1件取得  |
| POST     | `/api/posts`     | 新規作成 |
| PUT      | `/api/posts/:id` | 更新     |
| DELETE   | `/api/posts/:id` | 削除     |

---

## 動作確認例（curl）

```
# 全件取得
curl http://localhost:3000/api/posts

# 新規作成
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title":"Hello","content":"First post!"}'

# 更新
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Updated"}'

# 削除
curl -X DELETE http://localhost:3000/api/posts/1
```

