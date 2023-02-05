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
    if(req.url === "/hello"){
        // http://localhost:8080/helloのとき画面に表示
        dispMessage = "Hello!";
    } else if (req.url === "/bye"){
        // http://localhost:8080/byeのとき画面に表示
        dispMessage = "Bye!";
    }
    console.log("Hello");
    // responseを返す際はresのメソッドを使用する
    res.end(dispMessage);
});

// 引数に指定したポート番号でサーバーが立ち上がるようになる
server.listen(8080);
