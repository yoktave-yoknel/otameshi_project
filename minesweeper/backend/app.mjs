import * as http from "http";

/**
 * expressは使用していない
 * ターミナルで"node app.mjsのファイルパス"を入力する事でサーバーが起動
 * その後、http://localhost:8080をブラウザで入力すると、サーバーにリクエスト情報が送信される
 * localhost = 127.0.0
 * @param {*} req : URL叩いたときのリクエスト情報
 * @param {*} res : URL叩いた元に返すレスポンス情報
 */
const server = http.createServer(function(req, res){

    let dispMessage = "No Message!";

    // 文字化けを防ぐため、content-typeを設定
    res.writeHead(200,{'content-type': 'text/html; charset=UTF-8'});
    if(req.url === "/hello"){
        // http://localhost:8080/helloのとき画面に表示
        dispMessage = "Hello!";
    } else if (req.url === "/bye"){
        // http://localhost:8080/byeのとき画面に表示
        dispMessage = "Bye!";
    }
    console.log(dispMessage);
    // responseを返す際はresのメソッドを使用する
    // responseとHTML両方に文字コードの情報を詰めるのが一般的
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
    </head>
    <body>
      <h1>テストテスト</h1>
    </body>
    </html>`);
});

// 引数に指定したポート番号でサーバーが立ち上がるようになる
server.listen(8080);
