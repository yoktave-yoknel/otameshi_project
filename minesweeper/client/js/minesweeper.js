'use strict';

//===================================
// マインスイーパ用のセルクラス
// セルはこのクラスのインスタンスとする
//===================================
class MSCell extends HTMLTableCellElement {

    //-----------------------------------
    // コンストラクタ
    //-----------------------------------
    constructor() {
        super();

        // イベント登録
        this.addEventListener('click', this.clickFunc);
        this.addEventListener('contextmenu', this.clickRightFunc);
        this.addEventListener('dblclick', this.clickDblFunc);
    }

    //-----------------------------------
    // マインスイーパ初期設定
    // x座業、y座標、爆弾かどうかをパラメータにとる
    //-----------------------------------
    init(x, y, bombFlg) {

        // 開封フラグ（未開封のときfalse/開封済みのときtrue）
        this.openedFlg = false;
        // x座標
        this.x = x;
        // y座標
        this.y = y;
        // 爆弾フラグ（爆弾のときtrue/爆弾でなければfalse）
        this.bombFlg = bombFlg;
        // 見た目のクラス
        this.classList.add('closed');

    }

    //-----------------------------------
    // 周辺セルを設定する
    // 周辺セルと、周辺セルの合計爆弾数を設定する
    //-----------------------------------
    setArounds(arounds) {
        // 周辺セル
        this.arounds = arounds;
        // 周辺セルの爆弾数
        this.aroundBombCount = this.arounds.filter(around => around.bombFlg).length;
    }

    //-----------------------------------
    // そのセルの中身を表示する
    //-----------------------------------
    show() {
        if (this.bombFlg) {
            // 爆弾のときは「爆」
            this.textContent = '爆';

            // 見た目の変更
            this.classList.remove('closed');
            this.classList.add('bombed');
        } else {
            // 爆弾ではないとき
            if (this.aroundBombCount > 0) {
                // 周辺の爆弾数が1個以上のときは数を表示
                this.textContent = this.aroundBombCount;
            }

            // 見た目の変更
            this.classList.remove('closed');
            this.classList.add('opened');
        }
    }

    //-----------------------------------
    // セルを左クリックしたときの関数
    //-----------------------------------
    clickFunc() {
        if (gameStage === GAME_NOT_STARTED) {
            countTimer();
            gameStage = GAME_ONGOING;
        } else if (gameStage === GAME_FINISHED) {
            // クリア後は何もしない
            return;
        }

        if (this.openedFlg) {
            // 開封済みのときは何もしない
            return;
        }

        if (this.textContent === '旗' || this.textContent === '？') {
            // 「旗」や「？」がついてるときも何もしない
            return;
        }

        // 開封済みにする
        this.openedFlg = true;

        // このセルを開く
        this.show();

        if (this.bombFlg) {
            // このセルが爆弾のときはゲームオーバーなので全セルを開く
            msCells.forEach(button => button.show());
            clearTimeout(timeoutID);
        } else {
            // このセルが爆弾でないとき
            if (this.aroundBombCount === 0) {
                // 周囲に爆弾が無いときは周囲のセルを全部開く
                this.arounds.forEach(around => around.clickFunc());
            }
        }
        checkComplete();
    }

    //-----------------------------------
    // セルを右クリックしたときの関数
    //-----------------------------------
    clickRightFunc(e) {

        // 右クリックメニュー禁止
        e.preventDefault();

        if (gameStage === GAME_FINISHED) {
            // クリア後は何もしない
            return;
        }
        if (this.openedFlg) {
            // 既に開かれている場合は何もしない
            return;
        }

        if (this.textContent === '') {
            // 旗を表示
            this.textContent = '旗';
        } else if (this.textContent === '旗') {
            // ？を表示
            this.textContent = '？';
        } else if (this.textContent === '？') {
            // 元に戻す
            this.textContent = '';
        }
        checkComplete();
    }

    //-----------------------------------
    // セルをダブルクリックしたときの関数
    //-----------------------------------
    clickDblFunc() {
        if (gameStage === GAME_FINISHED) {
            // クリア後は何もしない
            return;
        }

        if (!this.openedFlg) {
            // 既に開かれている場合は何もしない
            return;
        }

        // 周囲の旗の数を取得
        let flgCount = this.arounds.filter(around => around.textContent === '旗').length;

        // 周囲の旗の数と、クリックしたセルに表示されている爆弾数が一致していれば
        // 周囲のセルをすべて開く
        if (this.aroundBombCount === flgCount) {
            this.arounds.forEach(around => around.clickFunc());
        }
    }

    //-----------------------------------
    // クリア判定用のチェック関数、
    //-----------------------------------
    isIncomplete() {
        // 終了条件は「すべての爆弾セルに旗が立っている」かつ「すべての非爆弾セルが開かれている」
        // 上記の条件を満たさないセルであるかを判定
        if (this.bombFlg) {
            if (this.textContent !== '旗') {
                return true;
            }
        } else {
            if (!this.openedFlg) {
                return true;
            }
        }
        return false;
    }
}

//===================================
// カスタム要素の定義
//===================================
customElements.define('ms-td', MSCell, { extends: 'td' });

//===================================
// 全セルを格納しておく変数
//===================================
const msCells = [];

//===================================
// ゲーム開始前/実施中/完了を示すフラグ(カウントアップタイマなどの制御に使用)
//===================================
const GAME_NOT_STARTED = 0;
const GAME_ONGOING = 1;
const GAME_FINISHED = 2;
let gameStage = GAME_NOT_STARTED;


//===================================
// カウントタイマ関連変数
//===================================
let timerCount = -1;
let timeoutID = 0;
let timerElement;

//===================================
// ゲーム初期化用関数
//===================================
const initGame = function (xSize, ySize) {

    // ボタン配置
    for (let y = 0; y < ySize; y++) {
        const tr = document.createElement('tr');
        for (let x = 0; x < xSize; x++) {
            // セルを作る
            const msCell = document.createElement('td', { is: 'ms-td' });
            // セルの初期化
            msCell.init(x, y, Math.random() * 100 < 10);
            // セルをtrにいれておく
            tr.appendChild(msCell);
            // msCellsにも入れておく
            msCells.push(msCell);
        }
        document.getElementById('target').appendChild(tr);
    }

    // aroundsの設定
    msCells.forEach(msCell => {

        // 周囲8マスを取得
        const arounds = msCells.filter(otherCell => {

            if (msCell === otherCell) {
                return false;
            }

            const xArea = [msCell.x - 1, msCell.x, msCell.x + 1];
            const yArea = [msCell.y - 1, msCell.y, msCell.y + 1];

            if (xArea.indexOf(otherCell.x) >= 0) {
                if (yArea.indexOf(otherCell.y) >= 0) {
                    return true;
                }
            }
            return false;
        });

        // 周囲8マスをaroundsとして設定
        msCell.setArounds(arounds);
    });

    // タイマなどをリセット
    gameStage = GAME_NOT_STARTED;
    clearTimeout(timeoutID);
    timerCount = -1;
    timerElement = document.getElementById('timer');
    timerElement.textContent = `00:00`;
};

//===================================
// リセットボタンクリック
//===================================
const onClickResetButton = function () {
    // 現在の盤を消去
    const targetElement = document.getElementById('target');

    while (targetElement.firstChild) {
        targetElement.removeChild(targetElement.firstChild);
    }
    // セル情報を削除
    msCells.splice(0, msCells.length);
    // 盤を再作成
    initGame(15, 15);
};

//===================================
// 終了判定
//===================================
const checkComplete = function () {
    // 終了条件は「すべての爆弾セルに旗が立っている」かつ「すべての非爆弾セルが開かれている」
    // 上記の条件を満たさないセルの数をカウント
    if (msCells.some(msCell => msCell.isIncomplete())) {
        // ゲーム続行
    } else {
        // ゲーム終了
        clearTimeout(timeoutID);
        gameStage = GAME_FINISHED;

        // クリア後モーダルを表示
        openClearTimeModal();
    }
};

const countTimer = function () {
    // 99分59秒を超えたらカウントアップしない
    if (timerCount >= 6000) {
        return;
    }
    timerCount++;
    const timerElement = document.getElementById('timer');
    let sec = String(timerCount % 60).padStart(2, '0');
    let min = String(Math.trunc(timerCount / 60)).padStart(2, '0');
    timerElement.textContent = `${min}:${sec}`;
    // 1秒ごとにタイマ更新
    timeoutID = setTimeout(countTimer, 1000);
};

const sec2String = function (second) {
    let min = String(Math.trunc(second / 60)).padStart(2, '0');
    let sec = String(second % 60).padStart(2, '0');
    return min + 'm' + sec + 's';
};

//===================================
// モーダル設定
//===================================
function openClearTimeModal(result) {
    // モーダルとそのテキストの要素を取得
    const modal = document.getElementById("modal");
    const modalText = document.getElementById("modal-text");
    const userSubmitButton = document.getElementById('user-submit-button');

    // 表示内容の初期化
    userSubmitButton.disabled = false;
    document.userinput.user.value = '';
    modalText.innerHTML = '';

    // クリアデータ(時間とユーザ名)送信ボタンの動作設定
    userSubmitButton.addEventListener('click', function() {
        // 送信ボタン無効化
        userSubmitButton.disabled = true;
        
        // ユーザ名を取得
        const user = document.userinput.user.value;

        // サーバへ送信しTOP3スコアを取得
        let result = 'TOP SCORES:<br>';
        let param = new URLSearchParams();
        const nowDate = new Date();
        param.append('ClearTime', timerCount);
        param.append('Date', nowDate.toLocaleString('ja-JP'));
        param.append('User', user);
        axios.post('/minesweeper', param)
            .then((res) => {
                // 成功時の処理
                // サーバから受け取ったTOP3のデータを表示文字列へ整形
                res.data.forEach(function (highScores) {
                    result += sec2String(highScores.ClearTime) + ' by ' + highScores.User + ' at ' + highScores.Date + '<br>';
                });

                // クリアタイムとTOP3を表示
                const clearTime = sec2String(timerCount);
                modalText.innerHTML =
                    `YOUR SCORE:${clearTime}<br>
                    ${result}`;
            }).catch((err) => {
                // エラー時の処理
                openClearTimeModal('SOME ERROR OCCURRED!!');
            }).finally(() => {
                // 成功/エラー関係なく、実行される処理
            });
    },);

    // モーダルを表示する
    modal.style.display = "block";
}

// ×ボタンまたはモーダルの外側をクリックしたらモーダルを非表示にする
window.onclick = function (event) {
    const modal = document.getElementById("modal");
    const closeBtn = modal.querySelector(".close");
    if (event.target === modal || event.target === closeBtn) {
        modal.style.display = "none";
    }
};

//===================================
// ゲーム初期化
//===================================
window.onload = function () {
    initGame(15, 15);
};
