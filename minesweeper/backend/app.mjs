import * as http from "http";

/**
 * expressは使用していない
 * ターミナルで"node app.mjsのファイルパス"を入力する事でサーバーが起動
 * その後、http://localhost:8080をブラウザで入力すると、サーバーにリクエスト情報が送信される
 * @param {*} req : URL叩いたときのリクエスト情報
 * @param {*} res : URL叩いた元に返すレスポンス情報
 */
const server = http.createServer(function(req, res){
    console.log("request：urlだよー",req.url);

    // responseを返す際はresのメソッドを使用する
    res.end('response test');
});

// 引数に指定したポート番号でサーバーが立ち上がるようになる
server.listen(8080);
