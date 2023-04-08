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
    const nowDate = new Date();
    const putParams = {
        TableName: 'scores_all',
        Item: {
            'User': 'DUMMY',  // TODO: クライアント側で入力可能になるまで固定値設定
            'Date': nowDate.toLocaleString('ja-JP'),
            'ClearTime': parseInt(req.body.cleartime, 10),
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
    runPut();

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
        try {
            const data = await ddbDocClient.send(new QueryCommand(queryParams));
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
        return;
    };
    runQuery();

    console.log(req.body.cleartime);
    if (req.body.cleartime <= 60) {
        res.send('MARVELOUS!!!');
    } else {
        res.send('GOOD JOB.');
    }
});

// GETメソッドについては静的アセットを公開
app.use('/minesweeper', express.static('client'));
app.get('/minesweeper', (req, res) => {
});

app.listen(8080, () => {
    console.log('server running...');
});
