<!-- omit in toc -->
# Clientサイド解説

<!-- omit in toc -->
## 目次
- [HTML](#html)
  - [viewport](#viewport)
- [CSS](#css)
  - [margin](#margin)
  - [!important](#important)
  - [cursor](#cursor)
- [JS](#js)
- [JSライブラリ](#jsライブラリ)
  - [axios](#axios)
- [tool](#tool)
  - [nodemon](#nodemon)
  - [eslint](#eslint)
- [参考](#参考)

## HTML

- シンプルに作成
- 基本はリセットボタンのみ表示するようにしている
- tableタグの中にセルを表示するようにしている
- セルはJSで記載している

### viewport

- 仮想的な画面の大きさ(表示領域)のこと
- test
- レスポンシブルデザインに必要な設定
- ブラウザはviewport内にレンダリング(画面描画)する
- viewportが実際の液晶画面と差があるときブラウザは自動的に表示を調整してくれる
  - viewportが実際の液晶画面より大きいとき = 文字がはみ出るのでブラウザがはみ出ないように調整する
  - viewportが実際の液晶画面より小さいとき = 余白ができるのでブラウザが余白を見えないように調整する


**以下Google 推奨タグ**

```html
<head>
<meta name=”viewport” content=”width=device-width,initial-scale=1″>
</head>
```

| 用語               | 意味                                           | メリット                                                   |
| :----------------- | :--------------------------------------------- | :--------------------------------------------------------- |
| width=device-width | viewportの幅をデバイス毎に自動的に変えてくれる | どのデバイス(PC/スマホ/タブレットなど)でも同じ見え方になる |
| initial-scale      | 初期のズーム倍率                               | どのデバイス(PC/スマホ/タブレットなど)でも同じ見え方になる |

[参考1](https://gmotech.jp/semlabo/seo/blog/howto-viewport/#:~:text=initial%2Dscale%E3%81%AF%E3%80%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AD%E3%83%BC%E3%83%89,scale%EF%BC%9D1%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82)

[参考2](https://qiita.com/ryounagaoka/items/045b2808a5ed43f96607)

## CSS


### margin

要素の周りの余白を設定する
要素の一番外枠

| 用語         | 用途                              |
| :----------- | :-------------------------------- |
| margin: auto | 自動調整/中央位置に持ってくる場合 |

ex) テーブルを真ん中に配置する

```css
table {
    margin: auto;
}
```
- 参考：[margin/padding/contentの違い](https://developer.mozilla.org/ja/docs/Web/CSS/Containing_block)

### !important

対象のプロパティの優先度が一番高くなり、後から追加したプロパティは有効にならない

```css
button {
    display: block;
    margin: auto;
    margin-bottom: 10px !important;
}

button {
    /* 有効にならない */
    margin-bottom: 10000px ;
}

```


### cursor

マウスカーソルの表示を決める

ex) ポインターに変更
```css
/**　未開封のクラス　*/
.closed {
    ・・・
    cursor: pointer;
}

```
## JS


## JSライブラリ

### axios

ブラウザーが内包している通信系のWeb APIをより使いやすくしてくれるJSベースのHTTPクライアントライブラリ。
Promiseベースでやり取りできる。
- ブラウザに内包されているAPIはW3Cが標準化しており、interfaceとして定義されている
  - interface = 引数(input)とreturn値(output)だけが決まっている
  - つまり、結果は同じだが、処理の過程はブラウザ毎に異なる
  - ex) DOM操作 = Web APIの中にDOM APIがあり、それを使用する事


1. Axiosを使用できるように設定。
    ■HTML側
    ```html
    <head>
        ・・・
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        ・・・
    </head>
    ```
2. jsに記載


## tool

### nodemon

### eslint


## 参考

- HTML
  - https://gmotech.jp/semlabo/seo/blog/howto-viewport/#:~:text=initial%2Dscale%E3%81%AF%E3%80%81%E3%83%9A%E3%83%BC%E3%82%B8%E3%83%AD%E3%83%BC%E3%83%89,scale%EF%BC%9D1%E3%81%A8%E3%81%AA%E3%82%8A%E3%81%BE%E3%81%99%E3%80%82
  - https://qiita.com/ryounagaoka/items/045b2808a5ed43f96607
- CSS
  - https://www.sejuku.net/blog/75524
  - https://magazine.techacademy.jp/magazine/9424
  - https://developer.mozilla.org/ja/docs/Web/CSS/Specificity
  - https://developer.mozilla.org/ja/docs/Web/CSS/margin
  - https://developer.mozilla.org/ja/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model
  - https://developer.mozilla.org/ja/docs/Web/CSS/Containing_block
  - https://developer.mozilla.org/ja/docs/Web/CSS/cursor
- JS
  - https://developer.mozilla.org/ja/docs/Web/API/HTMLTableCellElement
- JSライブラリ
  - https://reffect.co.jp/vue/vue-axios-learn
  - https://qiita.com/alt_yamamoto/items/0d72276c80589493ceb4
  - https://qiita.com/busyoumono99/items/9b5ffd35dd521bafce47
