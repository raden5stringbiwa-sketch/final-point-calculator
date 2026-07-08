// =========================================
// Final Point Calculator β
// Version 0.1.0
// =========================================


//==============================
// 前回データ
//==============================

let previousTime = null;

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
// 更新
//==============================

function updateBattle() {

    const now = new Date();

    const bluePoint =
        Number(document.getElementById("bluePoint").value);

    const redPoint =
        Number(document.getElementById("redPoint").value);


    //----------------------------------
    // 初回
    //----------------------------------

    if (previousTime === null) {

        previousTime = now;

        previousBluePoint = bluePoint;

        previousRedPoint = redPoint;

        document.getElementById("statusIcon").textContent = "🟡";
        document.getElementById("statusText").textContent =
            "初回データ保存完了";

        return;

    }


    //----------------------------------
    // 経過時間
    //----------------------------------

    const elapsedSeconds =
        (now - previousTime) / 1000;


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
        blueRate.toFixed(1) + "/s";

    document.getElementById("redRate").textContent =
        redRate.toFixed(1) + "/s";


    //----------------------------------
    // 次回用保存
    //----------------------------------

    previousTime = now;

    previousBluePoint = bluePoint;

    previousRedPoint = redPoint;


    //----------------------------------
    // AI
    //----------------------------------

    document.getElementById("statusIcon").textContent = "🤖";

    document.getElementById("statusText").textContent =
        "解析完了";

}
