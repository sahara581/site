let blankCount = 0;
const answers = [];

// ページ読み込み時にデータを復元
document.addEventListener("DOMContentLoaded", loadData);

// 空欄を追加する関数
function addBlank() {
    const questionInput = document.getElementById("questionInput");
    const selectedText = window.getSelection().toString();

    if (selectedText.trim() !== "") {
        blankCount += 1;
        const blankPlaceholder = ` (${blankCount}____) `; // 指定されたフォーマット

        // 選択されたテキストの開始位置と終了位置を取得
        const startIndex = questionInput.selectionStart;
        const endIndex = questionInput.selectionEnd;

        // 選択された部分を空欄に置き換える
        const newText = questionInput.value.substring(0, startIndex) + 
                        blankPlaceholder + 
                        questionInput.value.substring(endIndex);

        questionInput.value = newText;

        // 正解リストに追加
        answers.push({ number: blankCount, text: selectedText });
        updateAnswerList();

        // プレビューを更新
        updatePreview(newText);

        // データを保存
        saveData();
    }
}

// 正解リストを更新する関数
function updateAnswerList() {
    const answersList = document.getElementById("answers");
    answersList.innerHTML = answers.map((answer, index) => 
        `<li>${answer.number}: ${answer.text} <button onclick="removeAnswer(${index})"><i class="fas fa-trash"></i></button></li>`
    ).join("");
}

// プレビューを更新する関数
function updatePreview(text) {
    const previewContent = document.getElementById("previewContent");
    previewContent.innerText = text;
}

// ショートカットキーの設定
document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.shiftKey && event.key === 'X') { // Ctrl + Shift + B
        event.preventDefault(); // デフォルトの動作を防ぐ
        addBlank(); // 空欄を追加する
    }
});

// データを localStorage に保存する関数
function saveData() {
    const questionInput = document.getElementById("questionInput").value;
    localStorage.setItem("questionText", questionInput);
    localStorage.setItem("answers", JSON.stringify(answers));
}

// データを localStorage から読み込む関数
function loadData() {
    const savedQuestion = localStorage.getItem("questionText");
    const savedAnswers = localStorage.getItem("answers");

    if (savedQuestion) {
        document.getElementById("questionInput").value = savedQuestion;
        updatePreview(savedQuestion); // プレビューも更新
    }

    if (savedAnswers) {
        const parsedAnswers = JSON.parse(savedAnswers);
        parsedAnswers.forEach(answer => {
            answers.push(answer);
        });
        updateAnswerList();
    }
}

// 削除ボタンが押された時の処理
function removeAnswer(index) {
    const answer = answers[index];
    const questionInput = document.getElementById("questionInput");

    // 空欄を埋める
    const blankPlaceholder = ` (${answer.number}____) `;
    
    // 空欄を元のテキストに戻す
    questionInput.value = questionInput.value.replace(blankPlaceholder, answer.text);

    // 正解リストから削除
    answers.splice(index, 1);
    updateAnswerList();

    updatePreview(questionInput.value);

    // データを保存
    saveData();
}

// JSONファイルを書き出す関数
function exportToJson() {
    const questionInput = document.getElementById("questionInput").value;
    const data = {
        question: questionInput,
        answers: answers
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement("a");
    a.href = url;
    a.download = "data.json";
    a.click();
    
    URL.revokeObjectURL(url);
}

// JSONファイルを読み込む関数
function importFromJson(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = JSON.parse(e.target.result);
            document.getElementById("questionInput").value = data.question;
            answers.length = 0; // 既存の回答リストをクリア
            answers.push(...data.answers); // 新しいデータを追加
            updateAnswerList();
            updatePreview(data.question); // プレビューを更新
        };
        reader.readAsText(file);
    }
}

// - Credits -----------------------------------------------------------------------------------------------------
const creditsBtn = document.getElementById('credits-btn');
const creditsPopup = document.getElementById('credits-popup');
const closePopup = document.getElementById('close-popup');

creditsBtn.addEventListener('click', () => {
    creditsPopup.style.display = 'flex';
});

closePopup.addEventListener('click', () => {
    creditsPopup.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === creditsPopup) {
        creditsPopup.style.display = 'none';
    }
});
// ------------------------------------------------------------------------------------------------------------
