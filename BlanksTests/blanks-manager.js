// 保存済みのテスト一覧を表示する
document.addEventListener("DOMContentLoaded", loadTestList);

function createNewTest() {
    const testId = document.getElementById("testId").value || generateRandomId(16);
    const testName = document.getElementById("testName").value || "新しいテスト";

    // テストデータを保存
    const testData = { id: testId, name: testName };
    localStorage.setItem(`test_${testId}`, JSON.stringify(testData));

    // テスト一覧を更新
    loadTestList();

    // 編集ページに移行
    window.location.href = `saharaforge.comindex.html?id=${testId}`;
}

function loadTestList() {
    const testList = document.getElementById("testList");
    testList.innerHTML = "";

    // localStorageからテストデータを取得
    Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("test_")) {
            const testData = JSON.parse(localStorage.getItem(key));
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                ${testData.name} 
                <button onclick="renameTest('${testData.id}')">名前変更</button>
                <button onclick="editTest('${testData.id}')">編集</button>
                <button onclick="deleteTest('${testData.id}')">削除</button>
            `;
            testList.appendChild(listItem);
        }
    });
}

function renameTest(testId) {
    const newName = prompt("新しいテスト名を入力してください");
    if (newName) {
        const testData = JSON.parse(localStorage.getItem(`test_${testId}`));
        testData.name = newName;
        localStorage.setItem(`test_${testId}`, JSON.stringify(testData));
        loadTestList();
    }
}

function editTest(testId) {
    window.location.href = `../Blanks/index.html?id=${testId}`;
}

function deleteTest(testId) {
    if (confirm("このテストを削除しますか？")) {
        localStorage.removeItem(`test_${testId}`);
        loadTestList();
    }
}

function generateRandomId(length) {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

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
