🌊 鳴潮 - Resonator Archives (Webfrontkadai)
オープンワールドアクションRPG「鳴潮 (Wuthering Waves)」のキャラクター紹介サイトです。
Next.js (App Router) と microCMS を使用して構築されており、コンテンツ管理システムから動的にデータを取得して表示します。
🛠️ 使用技術
・Framework: Next.js 14 (App Router)
・Language: TypeScript
・Styling: CSS Modules, Scoped CSS
・CMS: microCMS (Headless CMS)
・Deployment: Vercel
・Font: Noto Sans JP
✨ 主な機能
・キャラクター一覧表示
　microCMS API連携によるデータ取得
　100件までの大量データ取得に対応 (limit パラメータ制御)
　主人公（漂泊者）の抽出・特別レイアウト表示
　属性別（回折、湮滅、融合など）の自動グルーピング表示
・キャラクター詳細ページ
　generateStaticParams による高速な静的ページ生成 (SSG)
　リッチテキストを含む詳細情報の表示 (dangerouslySetInnerHTML)
　未入力データに対するフォールバック表示（安全対策）
・UI/UX デザイン
　ゲームの世界観に合わせた「ダークモード × テック」デザイン
　CSS Animationによるタイトルのフローティング演出
　グラスモーフィズム（すりガラス）を取り入れたカードデザイン
　マウスホバー時のインタラクティブなズーム＆発光エフェクト
　美しい縦長ポートレート比率の画像表示（next/image 最適化）

Webfrontkadai/
├── app/
│   ├── globals.css         # 全体デザイン (Webフォント, 背景設定)
│   ├── page.tsx            # トップページ (属性分け・漂泊者ロジック)
│   ├── page.module.css     # トップページ用スタイル
│   └── characters/
│       └── [id]/           # 詳細ページ (Dynamic Routes)
│           ├── page.tsx
│           └── page.module.css
├── lib/
│   └── microcms.ts         # microCMS SDK設定・型定義
├── public/                 # 静的ファイル
└── ...config files