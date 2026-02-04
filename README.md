# Next.js + TypeScript + Tailwind CSS Starter Template

自分用にカスタマイズした Next.js (App Router) の初期構築テンプレートです。
開発体験（DX）を重視した設定（Prettier, Tailwind Class Sorting, コンポーネント設計）が適用済みです。

## 🚀 特徴

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Formatter**: Prettier (with `prettier-plugin-tailwindcss`)
- **Utility**: `clsx` + `tailwind-merge` (`cn` helper implemented)
- **Editor**: VS Code settings included (Format on Save enabled)

## 📂 ディレクトリ構成

ソースコードは `src` 配下に集約し、役割ごとに分離しています。

```text
src/
├── app/             # ルーティング・ページ本体 (page.tsx, layout.tsx)
├── components/      # 再利用可能なUIコンポーネント
│   ├── layouts/     # ヘッダー・フッターなど
│   └── ui/          # ボタン・入力欄など最小単位のパーツ
├── hooks/           # カスタムフック
├── lib/             # ユーティリティ関数・設定 (utils.ts, db.tsなど)
└── types/           # 型定義ファイル
```

## 🛠️ 開発のポイント・ルール（Memo）

### スタイリングと競合解決 (cn utility)

Tailwind CSS のクラス競合を解決するために、src/lib/utils.ts に cn 関数を用意しています。 コンポーネントを作成する際は、必ずこの cn 関数を通して className を結合してください。

**なぜ必要なのか？** Tailwind は後から書いたクラスが優先されるとは限りません（CSS定義順依存）。cn を使うことで、親コンポーネントから渡されたクラスで確実にスタイルを上書きできます。

**使用例:**

```TypeScript
import { cn } from "@/lib/utils";

type ButtonProps = {
  className?: string;
  children: React.ReactNode;
};

export function Button({ className, children }: ButtonProps) {
  return (
    <button
      // cnを使うことで、親から bg-red-500 が渡された時に bg-blue-500 を正しく消去・上書きできる
      className={cn(
        "rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600",
        className
      )}
    >
      {children}
    </button>
  );
}
```

---

### 自動整形 (Prettier & Sorting)

VS Code でファイルを 保存（Save）した瞬間 に、以下の処理が自動で走ります。

1. コードフォーマット: インデントやセミコロンの修正。

2. クラス名の並び替え: Tailwind のクラスが推奨順序に自動整列されます。
   - 例: class="p-4 flex bg-white" → class="flex bg-white p-4"

**注意点:**

- これを有効にするには、VS Code の拡張機能「Prettier - Code formatter」と「Tailwind CSS IntelliSense」が必要です。

- プロジェクトを開いた時に推奨拡張機能のポップアップが出るので、インストールしてください。

- 手動で全体を整形したい場合は npm run format を実行してください。

---

### 環境変数 (.env)

プロジェクトには .env.example が含まれています。 使用する際は、コピーして .env.local を作成してください。

```Bash
cp .env.example .env.local
```

---

### VS Code 設定

.vscode/settings.json により、以下の設定が適用されます。

- **Format On Save**: 保存時に自動整形。

- **Word Wrap**: エディタの右端でコードを折り返し表示（横スクロール防止）。

- **CSS Validation**: Tailwind の独自記法（@tailwind, @apply）による警告を抑制。

## 🧞 Commands

```Bash
npm run dev      # 開発サーバー起動
npm run build    # 本番ビルド
npm run start    # ビルド後の本番起動
npm run lint     # リントチェック
npm run format   # Prettierによる手動フォーマット実行
```

---
