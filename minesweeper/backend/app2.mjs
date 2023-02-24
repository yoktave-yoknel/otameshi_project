import express from "express";

const app = express();
app.use(express.urlencoded({extended:true}));

app.post('/', (req, res) => {
    // MEMO: ローカル確認の際には以下を有効にする
    //res.setHeader("Access-Control-Allow-Origin", "*");

    console.log(req.body.cleartime);
    if(req.body.cleartime <= 60){
        res.send("MARVELOUS!!!");
    } else {
        res.send("GOOD JOB.");
    }
});

app.listen(8080, () => {
    console.log("server running...");
});
