const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand, QueryCommand } = require('@aws-sdk/lib-dynamodb');
require('dotenv').config({ path: '.env' });
const REGION = process.env.REGION;

const marshallOptions = {
    // Whether to automatically convert empty strings, blobs, and sets to `null`.
    convertEmptyValues: false, // false, by default.
    // Whether to remove undefined values while marshalling.
    removeUndefinedValues: false, // false, by default.
    // Whether to convert typeof object to map attribute.
    convertClassInstanceToMap: false, // false, by default.
};
const unmarshallOptions = {
    // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
    wrapNumbers: false, // false, by default.
};
const translateConfig = { marshallOptions, unmarshallOptions };
const ddbClient = new DynamoDBClient({ region: REGION });
const ddbDocClient = DynamoDBDocumentClient.from(ddbClient, translateConfig);

app.post('/minesweeper', (req, res) => {
    // MEMO: ローカル確認の際には以下を有効にする
    //res.setHeader('Access-Control-Allow-Origin', '*');

    // DBへのレコード追加
    const putParams = {
        TableName: 'scores_all',
        Item: {
            'User': 'DUMMY',  // TODO: クライアント側で入力可能になるまで固定値設定
            'ClearTime': parseInt(req.body.ClearTime, 10),
            'Date': req.body.Date,
            'GameKind': 'minesweeper',
        }
    };
    const runPut = async () => {
        try {
            const data = await ddbDocClient.send(new PutCommand(putParams));
            console.log("Success - item added or updated", data);
        } catch (err) {
            console.log("Error", err);
        }
        return;
    };

    // DBから上位スコアを取得
    const queryParams = {
        TableName: 'scores_all',
        IndexName: 'GameKind-ClearTime-index',
        KeyConditionExpression: '#gamekind = :gamekind',
        ExpressionAttributeNames: {
            "#gamekind": "GameKind",
        },
        ExpressionAttributeValues: {
            ":gamekind": 'minesweeper',
        },
        Limit: 3
    };
    const runQuery = async () => {
        var data = "";
        try {
            data = await ddbDocClient.send(new QueryCommand(queryParams));
            var rank = 1;
            data.Items.forEach(function (element) {
                console.log('score: ', rank);
                console.log(element.User);
                console.log(element.ClearTime);
                console.log(element.Date);
                rank++;
            });
        } catch (err) {
            console.log("Error", err);
        }
        return data;
    };
 
    // 新規レコード追加と上位レコード取得の処理を実行
    // また、戻り値として取得した上位レコードを返却
    const runProcess = async () => {
        await runPut();
        return await  runQuery();
    };

    runProcess().then(data => {
        // DBへの追加が即時実施されていない可能性があるため、
        // 上位レコードと新規レコードを付き合わせてクライアント表示用の上位レコードを作成
        var updatedTopRecords = new Array();
        var isUpdated = false;
        for (var highRecord of data.Items) {
            if (updatedTopRecords.length == 3) {
                break;
            }
            if (isUpdated) {
                // 新規レコード反映済みなので突合せ不要
                updatedTopRecords.push(highRecord);
                continue;
            }
            if (parseInt(highRecord.ClearTime, 10) >= parseInt(req.body.ClearTime, 10)) {
                // 新規レコードを上位レコードの中に挿入
                isUpdated = true;
                updatedTopRecords.push(req.body);
                if (updatedTopRecords.length < 3) {
                    if ((highRecord.ClearTime == req.body.ClearTime)
                        && (highRecord.Date == req.body.Date)) {
                        // 新規レコードと同じクリア時間&時刻であれば、反映済みとして上位レコードを破棄
                    } else {
                        updatedTopRecords.push(highRecord);
                    }
                }
            } else {
                updatedTopRecords.push(highRecord);
            }
        }
        res.send(updatedTopRecords);
        console.log(updatedTopRecords);
    });
});

// GETメソッドについては静的アセットを公開
app.use('/minesweeper', express.static('client'));
app.get('/minesweeper', (req, res) => {
});

app.listen(8080, () => {
    console.log('server running...');
});
