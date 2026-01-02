# Googleアナリティクス・Googleサーチコンソール設定ガイド

このガイドでは、CARSELLウェブサイトにGoogleアナリティクスとGoogleサーチコンソールを設定する手順を説明します。

## 📊 Googleアナリティクス（GA4）の設定

### 1. Googleアナリティクスアカウントの作成

1. [Googleアナリティクス](https://analytics.google.com/)にアクセス
2. 「測定を開始」をクリック
3. アカウント名を入力（例: CARSELL）
4. プロパティ名を入力（例: CARSELL Website）
5. レポートのタイムゾーンを「日本時間」に設定
6. 通貨を「日本円」に設定
7. 「次へ」をクリック

### 2. ビジネス情報の入力

1. 業種を選択（例: ビジネス・産業用サービス）
2. ビジネスの規模を選択
3. 「次へ」をクリック

### 3. ビジネス目標の選択

1. 該当する目標にチェック（例: ブランド認知度と顧客体験、収益の獲得）
2. 「作成」をクリック

### 4. 測定IDの取得

1. 「データストリーム」セクションで「ウェブ」を選択
2. ウェブサイトのURLを入力: `https://carsell.jp`
3. ストリーム名を入力（例: CARSELL Website）
4. 「ストリームを作成」をクリック
5. **測定ID**（`G-XXXXXXXXXX`形式）をコピー

### 5. 環境変数の設定

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下の内容を追加してください：

```bash
# Google Analytics 4 (GA4) 測定ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

**重要**: `G-XXXXXXXXXX` を実際の測定IDに置き換えてください。

### 6. 動作確認

1. サイトをビルドして起動:
   ```bash
   npm run build
   npm start
   ```

2. ブラウザでサイトにアクセス
3. Googleアナリティクスの「リアルタイム」レポートでアクセスが記録されているか確認

---

## 🔍 Googleサーチコンソールの設定

### 1. Googleサーチコンソールアカウントの作成

1. [Googleサーチコンソール](https://search.google.com/search-console/)にアクセス
2. 「プロパティを追加」をクリック
3. 「URLプレフィックス」を選択
4. プロパティのURLを入力: `https://carsell.jp`
5. 「続行」をクリック

### 2. 所有権の確認方法を選択

**推奨方法: HTMLタグ方式**

1. 「HTMLタグ」を選択
2. 表示されたメタタグの `content` 属性の値をコピー
   - 例: `<meta name="google-site-verification" content="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />`
   - この場合、`xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` の部分をコピー

### 3. 環境変数の設定

`.env.local` ファイルに以下を追加してください：

```bash
# Google Search Console 所有権確認用メタタグ
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

**重要**: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` を実際の確認コードに置き換えてください。

### 4. サイトを再デプロイ

環境変数を設定した後、サイトを再ビルド・再デプロイしてください：

```bash
npm run build
npm start
```

### 5. 所有権の確認

1. Googleサーチコンソールに戻る
2. 「確認」をクリック
3. 確認が完了すると、プロパティが追加されます

### 6. サイトマップの送信

1. Googleサーチコンソールの左メニューから「サイトマップ」を選択
2. 「新しいサイトマップを追加」をクリック
3. サイトマップのURLを入力: `https://carsell.jp/sitemap.xml`
4. 「送信」をクリック

---

## 📝 環境変数の完全な例

`.env.local` ファイルの完全な例：

```bash
# Google Analytics 4 (GA4) 測定ID
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Google Search Console 所有権確認用メタタグ
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## ✅ 設定後の確認事項

### Googleアナリティクスの確認

- [ ] サイトにアクセスして、Googleアナリティクスの「リアルタイム」レポートでアクセスが記録されているか確認
- [ ] ページビューが正しく記録されているか確認
- [ ] イベントが正しく記録されているか確認（必要に応じて）

### Googleサーチコンソールの確認

- [ ] 所有権の確認が完了しているか確認
- [ ] サイトマップが正常に送信されているか確認
- [ ] カバレッジレポートでページがインデックスされているか確認（数日後）

---

## 🚀 デプロイ時の注意事項

### Netlifyでのデプロイ

1. Netlifyのダッシュボードにアクセス
2. サイトの「Site settings」→「Environment variables」を選択
3. 以下の環境変数を追加：
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: `G-XXXXXXXXXX`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. 「Save」をクリック
5. サイトを再デプロイ

### Vercelでのデプロイ

1. Vercelのダッシュボードにアクセス
2. プロジェクトの「Settings」→「Environment Variables」を選択
3. 以下の環境変数を追加：
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: `G-XXXXXXXXXX`
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: `xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
4. 「Save」をクリック
5. サイトを再デプロイ

---

## 📚 参考リンク

- [Googleアナリティクス公式サイト](https://analytics.google.com/)
- [Googleサーチコンソール公式サイト](https://search.google.com/search-console/)
- [Next.js環境変数のドキュメント](https://nextjs.org/docs/basic-features/environment-variables)

---

## ⚠️ トラブルシューティング

### Googleアナリティクスが動作しない場合

1. `.env.local` ファイルが正しく設定されているか確認
2. 測定IDが正しい形式（`G-XXXXXXXXXX`）か確認
3. ブラウザのコンソールでエラーがないか確認
4. サイトを再ビルド・再起動

### Googleサーチコンソールの所有権確認が失敗する場合

1. `.env.local` ファイルが正しく設定されているか確認
2. 確認コードが正しくコピーされているか確認
3. サイトが正しくデプロイされているか確認
4. HTMLタグが正しく出力されているか確認（ブラウザの開発者ツールで確認）

---

設定が完了したら、数日後にGoogleアナリティクスとGoogleサーチコンソールでデータが正しく収集されているか確認してください。

