// =========================================
// Final Point Calculator β
// Version 0.2.1
// =========================================


//==============================
// 前回データ
//==============================

let previousRemainSeconds = null;

let previousBluePoint = null;

let previousRedPoint = null;


//==============================
// 初期化
//==============================

window.onload = function () {

    document
        .getElementById("updateButton")
        .addEventListener("click", updateBattle);

};


//==============================
// mm:ss → 秒
//==============================

function convertTimeToSeconds(timeText) {

    const parts = timeText.split(":");

    const minutes = Number(parts[0]);
    const seconds = Number(parts[1]);

    return minutes * 60 + seconds;

}



//==============================
// 更新
//==============================

function updateBattle() {


    const bluePoint =
        Number(document.getElementById("bluePoint").value);


    const redPoint =
        Number(document.getElementById("redPoint").value);


    const timeText =
        document.getElementById("currentTime").value;


    const remainSeconds =
        convertTimeToSeconds(timeText);



    //----------------------------------
    // 初回
    //----------------------------------

    if (previousRemainSeconds === null) {


        previousRemainSeconds = remainSeconds;

        previousBluePoint = bluePoint;

        previousRedPoint = redPoint;


        document.getElementById("statusIcon").textContent =
            "🟡";


        document.getElementById("statusText").textContent =
            "初回データ保存完了";


        document.getElementById("beforeTime").textContent =
            timeText;


        return;

    }



    //----------------------------------
    // 経過時間
    //----------------------------------

    const elapsedSeconds =
        previousRemainSeconds - remainSeconds;



    if (elapsedSeconds <= 0) {

        alert("残り時間が正しくありません");

        return;

    }



    //----------------------------------
    // 毎秒ポイント
    //----------------------------------

    const blueRate =
        (bluePoint - previousBluePoint)
        / elapsedSeconds;


    const redRate =
        (redPoint - previousRedPoint)
        / elapsedSeconds;



    //----------------------------------
    // 表示
    //----------------------------------

    document.getElementById("blueRate").textContent =
        blueRate.toFixed(1) + "点/秒";


    document.getElementById("redRate").textContent =
        redRate.toFixed(1) + "点/秒";



    //----------------------------------
    // 最終予測
    //----------------------------------

    const blueFinal =
        bluePoint + blueRate * remainSeconds;


    const redFinal =
        redPoint + redRate * remainSeconds;



    document.getElementById("blueFinal").textContent =
        Math.round(blueFinal)
        .toLocaleString();


    document.getElementById("redFinal").textContent =
        Math.round(redFinal)
        .toLocaleString();



    document.getElementById("pointDiff").textContent =
        Math.round(blueFinal - redFinal)
        .toLocaleString();

//----------------------------------
// 勝敗判定
//----------------------------------

const diff =
    blueFinal - redFinal;


if (diff > 0) {

    document.getElementById("winnerText").textContent =
        "🔵 青 勝利予測";


    const needRedRate =
        (blueFinal - redPoint)
        / remainSeconds;


    const extra =
        needRedRate - redRate;


    if(extra > 0){

        document.getElementById("needRate").textContent =
            "🔴 赤が勝つには +" +
            Math.ceil(extra) +
            "点/秒 必要";

    }


}
else if(diff < 0){

    document.getElementById("winnerText").textContent =
        "🔴 赤 勝利予測";


    const needBlueRate =
        (redFinal - bluePoint)
        / remainSeconds;


    const extra =
        needBlueRate - blueRate;


    if(extra > 0){

        document.getElementById("needRate").textContent =
            "🔵 青が勝つには +" +
            Math.ceil(extra) +
            "点/秒 必要";

    }


}
else{

    document.getElementById("winnerText").textContent =
        "⚪ 引き分け予測";

}

    //----------------------------------
    // 保存
    //----------------------------------

    previousRemainSeconds = remainSeconds;

    previousBluePoint = bluePoint;

    previousRedPoint = redPoint;



    //----------------------------------
    // 状態
    //----------------------------------

    document.getElementById("statusIcon").textContent =
        "🤖";


    document.getElementById("statusText").textContent =
        "解析完了";


    addHistory(
    "03:42",
    95504,
    87704,
    8,
    56
);

}
function addHistory(time, blue, red, blueRate, redRate) {

    const tbody =
        document.getElementById("historyBody");

    const row =
        tbody.insertRow(0);

    row.insertCell(0).textContent = time;

    row.insertCell(1).textContent =
        blue.toLocaleString();

    row.insertCell(2).textContent =
        red.toLocaleString();

    row.insertCell(3).textContent =
        blueRate;

    row.insertCell(4).textContent =
        redRate;

}
