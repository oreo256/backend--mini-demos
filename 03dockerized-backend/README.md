# 03. Dockerized Backend (Express × Prisma × PostgreSQL)

## 概要

01（REST API）・02（認証 API）で実装したバックエンドを、  
Docker / docker compose を用いてローカル環境に依存せず起動できる構成にした。

- Node.js / PostgreSQL をローカルにインストールせずに実行可能
- API と DB を compose で一括起動
- Prisma migrate をコンテナ内で実行
- DB は volume により永続化
- 01 / 02 を同一ホスト上で同時起動可能

---

## ディレクトリ構成
```
03dockerized-backend/
├── 01dockerized-rest/ # CRUD API（01）を Docker 化
│ ├── Dockerfile
│ ├── docker-compose.yml
│ └── ...
├── 02dockerized-auth-jwt/ # 認証 API（02）を Docker 化
│ ├── Dockerfile
│ ├── docker-compose.yaml
│ └── ...
└── README.md
```

---

## 各デモの内容

### 01dockerized-rest
- Express × Prisma × PostgreSQL
- 投稿リソースの CRUD API
- REST API と RDB の基本構成

詳細は `01dockerized-rest/README.md` を参照。

### 02dockerized-auth-jwt
- ユーザー登録 / ログイン API
- bcrypt によるパスワードハッシュ化
- JWT を用いた認証・認可

詳細は `02dockerized-auth-jwt/README.md` を参照。

---

## 起動方法

### 01 を起動する場合
```
cd 01dockerized-rest
docker compose up --build
```

### 02 を起動する場合
```
cd 02dockerized-auth-jwt
docker compose up --build
```

停止：
```
docker compose down
```

DB を初期化（volume 削除）：
```
docker compose down -v
```


---

## Prisma migrate（コンテナ内で実行）

Prisma migrate は **DB コンテナではなく API コンテナ**で実行する。

```
docker compose exec api npx prisma migrate dev --name init
```

---

## DB 接続確認（psql）
```
docker compose exec db psql -U postgres -d <db_name>
```


psql 内での確認：
```
\dt
SELECT * FROM "User";
```

---

## ポート設計について

同一ホスト上で 01 / 02 を同時起動できるように、  
ホスト側ポートのみを分けている（コンテナ内ポートは共通）。


| デモ | API | DB |
|----|----|----|
| 01 | localhost:3000 | localhost:5432 |
| 02 | localhost:3001 | localhost:5433 |


---

