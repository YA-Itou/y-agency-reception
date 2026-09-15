# 株式会社 Y Agency タブレット受付システム

タブレット横置きのブラウザで動く受付アプリです。完了時に Chatwork 全社共通ルームへ `[toall]` 通知を送り、受付内容は Supabase に保存します。

## できること

- お約束 / 面接 / 配送 / 営業の受付
- 無操作 15 秒でトップへ復帰
- Chatwork 通知（置き配も含む）
- 管理者向け受付履歴（`/admin`）

## セットアップ

```bash
npm install
cp .env.example .env.local
```

`.env.local` に以下を設定します。

| 変数 | 内容 |
| --- | --- |
| `CHATWORK_API_TOKEN` | Chatwork API トークン |
| `CHATWORK_ROOM_ID` | 全社共通ルーム ID |
| `SUPABASE_URL` | Supabase プロジェクト URL |
| `SUPABASE_SERVICE_ROLE_KEY` | サービスロールキー |
| `ADMIN_PASSWORD` | 履歴画面の共有パスワード |
| `ADMIN_SESSION_SECRET` | セッション署名用の長いランダム文字列 |

Supabase の SQL Editor で `supabase/migrations/001_reception_logs.sql` を実行してください。RLS を有効化しているため、来訪者からの直接アクセスはできません。サーバーはサービスロールで読み書きします。

```bash
npm run dev
```

- 受付画面: http://localhost:3000
- 履歴画面: http://localhost:3000/admin

## デプロイ（Vercel）

1. GitHub 等へリポジトリを置く
2. Vercel で Import
3. 上記の環境変数を Production に設定
4. Deploy

タブレットではブラウザからホーム画面に追加すると全画面表示しやすくなります。端末の画面回転は横向きにロックしてください。

## 履歴画面

受付キオスクからはリンクしません。スタッフが `/admin` を直接開きます。
