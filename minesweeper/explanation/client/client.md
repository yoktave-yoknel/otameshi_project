# Clientサイド解説

## HTML

- シンプルに作成
- 基本はリセットボタンのみ表示するようにしている
- tableタグの中にセルを表示するようにしている
- セルはJSで記載している

### viewport

- 仮想的な画面の大きさ(表示領域)のこと
- レスポンシブルデザインに必要な設定
- ブラウザはviewport内にレンダリング(画面描画)する
- viewportが実際の液晶画面と差があるときブラウザは自動的に表示を調整してくれる
  - viewportが実際の液晶画面より大きいとき = 文字がはみ出るのでブラウザがはみ出ないように調整する
  - viewportが実際の液晶画面より小さいとき = 余白ができるのでブラウザが余白を見えないように調整する

Google 推奨タグ

```html
<head>
<meta name=”viewport” content=”width=device-width,initial-scale=1″>
</head>
```
| 用語|意味|メリット|
|:--|:--|:--|
| width=device-width | viewportの幅をデバイス毎に自動的に変えてくれる |どのデバイス(PC/スマホ/タブレットなど)でも同じ見え方になる|
| initial-scale|初期のズーム倍率|どのデバイス(PC/スマホ/タブレットなど)でも同じ見え方になる|

[参考1](https://gmotech.jp/semlabo/seo/blog/howto-viewport/#:~:text=initial%2Dscale%E3%81%AF%E3%80%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AD%E3%83%BC%E3%83%89,scale%EF%BC%9D1%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82)
[参考2](https://qiita.com/ryounagaoka/items/045b2808a5ed43f96607)

## CSS


## JS


## JSライブラリ

### axios

- 

```html
<head>
    ・・・
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
</head>・・・
```

## tool

### nodemon

### eslint


## 参考


