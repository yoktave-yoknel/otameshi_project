const express = require('express');
const app = express();
app.use(express.urlencoded({extended:true}));

// GETメソッドについては静的アセットを公開
app.use('/minesweeper', express.static('client'));
app.get('/minesweeper', (req, res) => {
});

app.get('/', (req, res) => {
    res.send("access: root");
});


// POSTメソッドはクリア時にクライアントから呼ばれる
app.post('/minesweeper', (req, res) => {
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
