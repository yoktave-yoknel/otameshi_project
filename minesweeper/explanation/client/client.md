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
  - [class](#class)
    - [コンストラクター関数](#コンストラクター関数)
    - [class構文](#class構文)
  - [Promise](#promise)
    - [コールバック地獄](#コールバック地獄)
- [JS Library](#js-library)
  - [axios](#axios)
- [Tool](#tool)
  - [nodemon](#nodemon)
  - [eslint](#eslint)
- [ChatGPTでコードレビュー結果](#chatgptでコードレビュー結果)
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

### class

`オブジェクト`のひな形を作成する物。
Javaのclassとは概念が少し異なる。

- 同じプロパティを持つけど、値が異なるオブジェクトを作成したい！、そんなときに役に立つ
- 従来で使用可能だったコンストラクター関数をより使いやすくしたもの
  - 裏側ではコンストラクター関数と同様の処理が行われている。
- ES6以降で使用できkる
- ホイスティング(巻き上げ)が発生しない = new するより前の行にclassを定義する必要がある

#### コンストラクター関数

- 特別な関数
  - アロー関数は使用できない
- newで呼び出し可能
  1. Personの作成
  2. 空のオブジェクトがつくられる
  3. thisキーワードが空のオブジェクトにセットされる
  4. 空のオブジェクトがprototypeにリンクされる
  5. 関数から自動的に空のオブジェクトをreturnされる
  6. 空のオブジェクトが変数に格納される
-



通常のクラス作成
```js
//コンストラクタ関数を作成
const Person = function(firstName, birthYear) {
    console.log(this);//Person {}
    this.firstName = firstName;
    this.birthYear = birthYear;
}

//インスタンスを作成
const yamada = new Person('Yamada', 1988);
console.log(yamada);//Person {firstName: "Yamada", birthYear: 1988}
```

継承
- classに対してextendsキーワードを使用する

```js
//親クラス
class PersonConstructor {
  constructor(lastName, birthYear) {
    this.lastName = lastName;
    this.birthYear = birthYear;
  }
}

//子クラス
class Student extends PersonConstructor {
  constructor(lastName, birthYear, course) {
    // PersonConstructorのコンストラクターに値を設定している
    super(lastName, birthYear);
    this.course = course;
  }
  introduce() {
    console.log(`私は${this.lastName}です。${this.course}を勉強しています。`);
  }
}

const kobayashi = new Student('小林', 2030, '数学');
// Student {lastName: "小林", birthYear: 2030, course: "数学"}
console.log(kobayashi);

// 私は小林です。数学を勉強しています。
kobayashi.introduce();

```


#### class構文

通常のクラス作成
```js
//コンストラクタ関数を作成
class Person {
    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }
}

//インスタンスを作成
const yamada = new Person('Yamada', 1988);
console.log(yamada);//Person {firstName: "Yamada", birthYear: 1988}
```


継承
```js
//親クラス
  class PersonConstructor {
    constructor(firstName, birthYear){
        this.firstName = firstName;
        this.birthYear = birthYear;
    }

  };

  //子クラス
  class Student extends PersonConstructor{
    constructor(firstName, birthYear, course){
        // PersonConstructorのコンストラクターに値を設定している
        super(firstName, birthYear);
        this.course = course;
    }
    introduce() {
        console.log(`私は${this.lastName}です。${this.course}を勉強しています。`);
    };
  };

  const kobayashi = new Student('小林', 2030, '数学');
  console.log(kobayashi); //Student {lastName: "小林", birthYear: 2030, course: "数学"}

```


### Promise


#### コールバック地獄

非同期処理を順次実行したい場合は、
ex) 1秒毎(非同期処理)に処理を順番に実行したい場合

```js
function a(callbackFn, val) {
  // 非同期処理
  setTimeout(function () {
    console.log(`setTimeOut ${val++}だよｰ`);
    callbackFn(val);
  }, 1000);
}
// 3秒後に実行
a(function (val) {
  // 2秒後に実行
  a(function (val) {
    // 1秒後に実行
    a(function (val) {}, val);
  }, val);
}, 0);
```


## JS Library

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
    ```js
    // GETメソッドでデータを取得
    axios.get("http://localhost:8080", {})
    .then((res) => {
        // 成功時の処理
    }).catch((err) => {
        // エラー時の処理
    }).finally(() => {
        // 成功/エラー関係なく、実行される処理
    });
    ```

## Tool

### nodemon

### eslint


## ChatGPTでコードレビュー結果

ちなみに、最近流行りのChatGPTのAIにコードレビューしてもらいました。

```text
以下が、コードレビューの結果になります。

コード全体的には、可読性が高く、コメントも付けられており、
分かりやすい実装になっていると思います。

init() メソッドでセルの初期設定を行っていますが、
その中でクラスのスタイルを変更するコードがあります。
init() メソッドはあくまでセルの初期設定を行うメソッドであるべきなので、
スタイルの変更は show() メソッドに移した方が良いと思います。

setArounds() メソッドで、this.aroundBombCount を計算していますが、
aroundBombCount の値は変更されることがないため、
コンストラクタで初期化するのが良いと思います。

show() メソッドでは、爆弾のセルかどうかで表示する内容を変えていますが、
init() メソッドで bombFlg の値が確定しているため、
初期表示時に処理できるようにするとより簡潔なコードになると思います。

clickFunc() メソッド内で、msCells.forEach() を使用しているため、
その msCells 変数をどこかで定義している必要がありますが、
どこにも定義がないため、コードがエラーになる可能性があります。
このような変数をグローバルスコープで定義することは避けるべきです。
代わりに、クラスのインスタンス変数として定義することをおすすめします。

上記の点を改善すると、より良いコードになると思います。
```

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
  - https://devsakaso.com/javascript-constructor-function/
  - https://developer.mozilla.org/ja/docs/Web/API/HTMLTableCellElement
  - https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes
- JSライブラリ
  - https://reffect.co.jp/vue/vue-axios-learn
  - https://qiita.com/alt_yamamoto/items/0d72276c80589493ceb4
  - https://qiita.com/busyoumono99/items/9b5ffd35dd521bafce47
- ChatGPT
  - https://openai.com/blog/chatgpt/
