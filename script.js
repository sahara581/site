function convertNumber() {
    const inputValue = document.getElementById("inputValue").value;
    const inputBase = parseInt(document.getElementById("inputBase").value);
    const outputBase = parseInt(document.getElementById("outputBase").value);
    const outputValue = document.getElementById("outputValue");

    let decimalValue;

    // 入力値が正しい進数形式かをチェック
    if (isValidInput(inputValue, inputBase)) {
        decimalValue = parseInt(inputValue, inputBase); // 入力値を10進数に変換
        let convertedValue = decimalValue.toString(outputBase);  // 指定された出力進数に変換
        outputValue.value = convertedValue.toUpperCase();  // 結果を大文字で表示
    } else {
        outputValue.value = "";  // 無効な場合は空白
    }
}

// 入力値のバリデーション
function isValidInput(value, base) {
    const regexes = {
        2: /^[01]+$/,          // 2進数
        8: /^[0-7]+$/,         // 8進数
        10: /^[0-9]+$/,        // 10進数
        16: /^[0-9A-Fa-f]+$/    // 16進数
    };

    return regexes[base].test(value);
}

// クリップボードにコピーする機能
document.getElementById("copyButton").addEventListener("click", function() {
    const outputValue = document.getElementById("outputValue");
    const successPopup = document.getElementById("copySuccessPopup");
    const emptyPopup = document.getElementById("copyEmptyPopup");
    const failPopup = document.getElementById("copyFailPopup");

    // 出力フォームが空かどうかを確認
    if (outputValue.value.trim() === '') {
        // 出力が空の場合は「出力がありません」を表示
        emptyPopup.style.display = 'block';
        emptyPopup.style.opacity = 1;

        // 3秒後に通知を非表示にする
        setTimeout(() => {
            emptyPopup.style.opacity = 0;
            setTimeout(() => {
                emptyPopup.style.display = 'none';
            }, 500); // フェードアウト後に非表示
        }, 3000); // 3秒間表示

        return;  // 出力フォームが空ならコピー処理を中止
    }

    // テキストボックスの内容を選択
    outputValue.select();
    outputValue.setSelectionRange(0, 99999); // モバイルの対応

    // コピー実行
    try {
        document.execCommand("copy");

        // コピー成功時に成功通知を表示
        successPopup.style.display = 'block';
        successPopup.style.opacity = 1;

        // 3秒後に通知を非表示にする
        setTimeout(() => {
            successPopup.style.opacity = 0;
            setTimeout(() => {
                successPopup.style.display = 'none';
            }, 500); // フェードアウト後に非表示
        }, 3000); // 3秒間表示
    } catch (err) {
        // 他の失敗時の通知を表示
        failPopup.style.display = 'block';
        failPopup.style.opacity = 1;

        // 3秒後に通知を非表示にする
        setTimeout(() => {
            failPopup.style.opacity = 0;
            setTimeout(() => {
                failPopup.style.display = 'none';
            }, 500); // フェードアウト後に非表示
        }, 3000); // 3秒間表示
    }
});

// ボタンをクリックした時の処理
document.getElementById('saveButton').addEventListener('click', function() {
    // フォームの入力値を取得
    const inputValue = document.getElementById('inputValue').value;  // 変換前値
    const outputValue = document.getElementById('outputValue').value;  // 変換後値
    const inputBase = document.getElementById('inputBase').value;  // 変換前進数
    const outputBase = document.getElementById('outputBase').value;  // 変換後進数

    // 入力項目が空か確認
    if (inputValue.trim() === '' || outputValue.trim() === '') {
        // 空の項目があればポップアップを表示
        const emptyFieldPopup = document.getElementById("emptyFieldPopup");
        emptyFieldPopup.style.display = 'block';
        emptyFieldPopup.style.opacity = 1;

        // 3秒後にポップアップを非表示にする
        setTimeout(() => {
            emptyFieldPopup.style.opacity = 0;
            setTimeout(() => {
                emptyFieldPopup.style.display = 'none';
            }, 500); // フェードアウト後に非表示
        }, 3000); // 3秒間表示

        return;  // 保存処理を中止
    }

    // 保存するデータをオブジェクトにまとめる
    const dataToSave = {
        inputValue: inputValue,
        outputValue: outputValue,
        inputBase: inputBase,
        outputBase: outputBase,
        timestamp: new Date().toISOString() // 保存日時を追加
    };

    // localStorageから既存のデータを取得（なければ空の配列）
    let savedData = JSON.parse(localStorage.getItem('savedInputs')) || [];

    // 新しいデータを配列に追加
    savedData.push(dataToSave);

    // 配列を再びlocalStorageに保存
    try {
        localStorage.setItem('savedInputs', JSON.stringify(savedData));

        // 保存成功ポップアップの表示
        const saveSuccessPopup = document.getElementById("saveSuccessPopup");
        saveSuccessPopup.style.display = 'block';
        saveSuccessPopup.style.opacity = 1;

        // 3秒後にポップアップを非表示にする
        setTimeout(() => {
            saveSuccessPopup.style.opacity = 0;
            setTimeout(() => {
                saveSuccessPopup.style.display = 'none';
            }, 500); // フェードアウト後に非表示
        }, 3000); // 3秒間表示

    } catch (error) {
        // 保存に失敗した場合の処理
        const saveErrorPopup = document.getElementById("saveErrorPopup");
        saveErrorPopup.style.display = 'block';
        saveErrorPopup.style.opacity = 1;

        // 3秒後にポップアップを非表示にする
        setTimeout(() => {
            saveErrorPopup.style.opacity = 0;
            setTimeout(() => {
                saveErrorPopup.style.display = 'none';
            }, 500); // フェードアウト後に非表示
        }, 3000); // 3秒間表示
    }
});


// 鉛筆のアイコンボタンにクリックイベントを追加
document.querySelector('.pencil-icon').addEventListener('click', function() {
    document.getElementById('inputValue').focus();
});

// ポップアップを開く処理
document.getElementById('SavedDatasButton').addEventListener('click', function() {
    const popupContainer = document.getElementById('popupContainer');
    const savedDataList = document.getElementById('savedDataList');

    // localStorageからデータを取得
    let savedData = JSON.parse(localStorage.getItem('savedInputs')) || [];

    // 日時で降順にソート
    savedData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    // ポップアップの内容をクリア
    savedDataList.innerHTML = '';

    // データが存在する場合、リストに表示
    if (savedData.length > 0) {
        savedData.forEach((item, index) => {
            const dataItem = document.createElement('div');
            const timestamp = new Date(item.timestamp);  // 日時をDateオブジェクトに変換
            const formattedDate = formatDateTime(timestamp);  // 日時をフォーマット

            // データアイテムに削除ボタンを追加
            dataItem.innerHTML = `
                <span><strong>変換前:</strong> ${item.inputValue} (${item.inputBase}進数)</span>
                <span><strong>変換後:</strong> ${item.outputValue} (${item.outputBase}進数)</span>
                <span><small>保存日時: ${formattedDate}</small></span>
                <button class="delete-button" data-index="${index}">削除</button>
            `;

            // 削除ボタンにクリックイベントを追加
            dataItem.querySelector('.delete-button').addEventListener('click', function() {
                // 削除処理を呼び出す
                deleteSavedData(index);
            });

            savedDataList.appendChild(dataItem);
        });
    } else {
        savedDataList.innerHTML = '<p>保存されたデータはありません。</p>';
    }

    // ポップアップを表示
    popupContainer.style.display = 'flex';
});

// データ削除の処理
function deleteSavedData(index) {
    let savedData = JSON.parse(localStorage.getItem('savedInputs')) || [];

    // 削除するアイテムを取り除く
    savedData.splice(index, 1);

    // 更新されたデータをlocalStorageに保存
    localStorage.setItem('savedInputs', JSON.stringify(savedData));

    // データリストを再描画
    const savedDataList = document.getElementById('savedDataList');
    savedDataList.innerHTML = '';

    // 削除後のデータを再表示
    savedData.forEach((item, idx) => {
        const dataItem = document.createElement('div');
        const timestamp = new Date(item.timestamp);
        const formattedDate = formatDateTime(timestamp);

        dataItem.innerHTML = `
            <span><strong>変換前:</strong> ${item.inputValue} (${item.inputBase}進数)</span>
            <span><strong>変換後:</strong> ${item.outputValue} (${item.outputBase}進数)</span>
            <span><small>保存日時: ${formattedDate}</small></span>
            <button class="delete-button" data-index="${idx}">削除</button>
        `;

        dataItem.querySelector('.delete-button').addEventListener('click', function() {
            deleteSavedData(idx);
        });

        savedDataList.appendChild(dataItem);
    });

    // ポップアップを表示
    const popupContainer = document.getElementById('popupContainer');
    popupContainer.style.display = 'flex';
}

// ポップアップ外をクリックしたら閉じる処理
document.getElementById('popupContainer').addEventListener('click', function(event) {
    const popupContainer = document.getElementById('popupContainer');

    // ポップアップコンテンツ以外をクリックした場合のみポップアップを閉じる
    if (event.target === popupContainer) {
        popupContainer.style.display = 'none';
    }
});


// 日時を「yyyy/MM/dd(DDD) HH:mm.ss」形式にフォーマットする関数
function formatDateTime(date) {
    const daysOfWeek = ['日', '月', '火', '水', '木', '金', '土'];
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${year}/${month}/${day}(${dayOfWeek}) ${hours}:${minutes}:${seconds}`;
}
