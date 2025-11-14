document.getElementById("talkBtn").addEventListener("click", () => {
    const messages = [
        "ぽよ！",
        "おなかすいた〜！",
        "いっしょにあそぼ！",
        "ほわ〜…おさんぽしたい！"
    ];

    const talkArea = document.getElementById("talkArea");
    const random = Math.floor(Math.random() * messages.length);
    talkArea.textContent = messages[random];
});

// ===== 画像つきコメント機能 =====

// 保存されたコメントを読み込み
let comments = JSON.parse(localStorage.getItem("comments") || "[]");
const commentList = document.getElementById("commentList");

// コメント表示
function showComments() {
    commentList.innerHTML = "";

    comments.forEach(c => {
        const div = document.createElement("div");
        div.className = "comment";

        let imgTag = "";
        if (c.image) {
            imgTag = `<img src="${c.image}" alt="投稿画像">`;
        }

        div.innerHTML = `
            <div class="name">${c.name}</div>
            <div class="text">${c.text}</div>
            ${imgTag}
        `;

        commentList.appendChild(div);
    });
}

// コメント投稿
document.getElementById("sendComment").addEventListener("click", () => {
    const name = document.getElementById("nameInput").value.trim();
    const text = document.getElementById("commentInput").value.trim();
    const file = document.getElementById("imgInput").files[0];

    if (!name || !text) {
        alert("名前とコメントを入力してね！");
        return;
    }

    // 画像あり・なしで処理分岐
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            saveComment(name, text, e.target.result);
        };
        reader.readAsDataURL(file); // base64に変換
    } else {
        saveComment(name, text, null);
    }
});

// コメントを保存
function saveComment(name, text, image) {
    comments.push({ name, text, image });
    localStorage.setItem("comments", JSON.stringify(comments));

    // 入力欄リセット
    document.getElementById("nameInput").value = "";
    document.getElementById("commentInput").value = "";
    document.getElementById("imgInput").value = "";

    showComments();
}

// 最初の読み込み
showComments();
