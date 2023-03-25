const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));

const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, PutCommand } = require('@aws-sdk/lib-dynamodb');
const REGION = "ap-northeast-1"; // EC2およびDynamoDBのリージョンを指定

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
    var nowDate = new Date();
    var params = {
        TableName: 'scores',
        Item: {
            'date': nowDate.toLocaleString('ja-JP'),
            'cleartime': parseInt(req.body.cleartime, 10),
        }
    };
    const run = async () => {
        try {
            const data = await ddbDocClient.send(new PutCommand(params));
            console.log("Success - item added or updated", data);
        } catch (err) {
            console.log("Error", err);
        }
        return;
    };
    run();

    // TODO: DBからランキング取得

    console.log(req.body.cleartime);
    if(req.body.cleartime <= 60){
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
