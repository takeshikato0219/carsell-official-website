# EmailJS設定ガイド

このガイドでは、CARSELLウェブサイトの問い合わせフォームにEmailJSを設定する手順を説明します。

## 📧 EmailJS設定情報

以下の認証情報が設定されています：

- **Service ID**: `service_47wjggu`
- **Public Key**: `62fy23UHQA1peUUj7`
- **Template ID**: `template_66essgm`

## 🔧 環境変数の設定（オプション）

デフォルト値がコードに設定されているため、環境変数の設定は必須ではありませんが、変更したい場合は以下の環境変数を設定できます：

### ローカル開発環境

プロジェクトのルートディレクトリに `.env.local` ファイルを作成し、以下を追加：

```bash
# EmailJS設定
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_47wjggu
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=62fy23UHQA1peUUj7
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_66essgm
```

### 本番環境（Netlify/Vercel）

ホスティングサービスの環境変数設定で以下を追加：

- `NEXT_PUBLIC_EMAILJS_SERVICE_ID`: `service_47wjggu`
- `NEXT_PUBLIC_EMAILJS_PUBLIC_KEY`: `62fy23UHQA1peUUj7`
- `NEXT_PUBLIC_EMAILJS_TEMPLATE_ID`: `template_66essgm`

## ✅ 動作確認

1. サイトにアクセス
2. 問い合わせフォームに必要事項を入力
3. 「送信する」ボタンをクリック
4. 成功メッセージが表示されれば正常に動作しています

## 📝 注意事項

- Private Keyはサーバー側でのみ使用するため、クライアント側のコードには含まれていません
- 環境変数が設定されていない場合、デフォルト値が使用されます
- EmailJSの無料プランでは月間200通まで送信可能です

## 🔗 参考リンク

- [EmailJS公式サイト](https://www.emailjs.com/)
- [EmailJSドキュメント](https://www.emailjs.com/docs/)

