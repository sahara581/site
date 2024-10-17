document.addEventListener('DOMContentLoaded', () => {
    const addPresenterButton = document.getElementById('add-presenter-btn');
    const presenterInput = document.getElementById('presenter-name');
    const presenterList = document.getElementById('presenter-list');
    const sectionsList = document.getElementById('sections-list');
    let editingIndex = null;  // 編集中のセクションのインデックスを保持

    loadPresenters();
    loadSections();

    addPresenterButton.addEventListener('click', () => {
        const presenterName = presenterInput.value.trim();
        if (presenterName) {
            addPresenter(presenterName);
            savePresenters();
            presenterInput.value = '';
        }
    });

    const saveDraftButton = document.getElementById('save-draft-btn');
    saveDraftButton.addEventListener('click', () => {
        const title = document.getElementById('section-title').value.trim();
        const content = document.getElementById('section-content').value.trim();
        const presenterSelect = document.querySelector('.presenter-select');
        const presenter = presenterSelect ? presenterSelect.value : '';

        if (title && content) {
            if (editingIndex !== null) {
                // 編集モードの場合
                updateSection(editingIndex, title, content, presenter);
            } else {
                // 新規作成モードの場合
                addSection(title, content, presenter);
            }
            saveSections();
            document.getElementById('section-title').value = '';
            document.getElementById('section-content').value = '';
            editingIndex = null; // 編集モード解除
        }
    });

    // JSONエクスポート機能の追加
    const exportButton = document.getElementById('export-json-btn');
    exportButton.addEventListener('click', () => {
        const data = {
            presenters: JSON.parse(localStorage.getItem('presenters')) || [],
            sections: JSON.parse(localStorage.getItem('sections')) || []
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    // JSONインポート機能の追加
    const importButton = document.getElementById('import-json-btn');
    importButton.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                localStorage.setItem('presenters', JSON.stringify(data.presenters));
                localStorage.setItem('sections', JSON.stringify(data.sections));
                presenterList.innerHTML = '';
                sectionsList.innerHTML = '';
                loadPresenters();
                loadSections();
            };
            reader.readAsText(file);
        }
    });

    function addPresenter(name) {
        const presenterItem = document.createElement('div');
        presenterItem.className = 'presenter-item';
        presenterItem.textContent = name;

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-btn';
        deleteButton.textContent = '×';
        deleteButton.onclick = () => {
            removePresenter(presenterItem);
        };

        presenterItem.appendChild(deleteButton);
        presenterList.appendChild(presenterItem);
    }

    function savePresenters() {
        const presenters = Array.from(presenterList.querySelectorAll('.presenter-item')).map(item => item.textContent.replace('×', '').trim());
        localStorage.setItem('presenters', JSON.stringify(presenters));
    }

    function loadPresenters() {
        const savedPresenters = JSON.parse(localStorage.getItem('presenters')) || [];
        savedPresenters.forEach(name => addPresenter(name));
    }

    function addSection(title, content, presenter) {
        const sectionItem = document.createElement('div');
        sectionItem.className = 'section-item';
        sectionItem.draggable = true;
        sectionItem.innerHTML = `
            <strong class="section-item-title">${title}</strong>
            <span class="section-item-presenter">${presenter}</span>
            <p class="section-item-contents">${convertNewlinesToBr(content)}</p>
            <button class="edit-btn" onclick="editSection(this)"><i class="fas fa-edit"></i></button>
            <button class="delete-btn" onclick="deleteSection(this)"><i class="fas fa-trash"></i></button>
            <select class="presenter-select">
                ${Array.from(presenterList.querySelectorAll('.presenter-item'))
                    .map(p => `<option value="${p.textContent.trim()}">${p.textContent.trim()}</option>`)
                    .join('')}
            </select>
        `;
        sectionsList.appendChild(sectionItem);

        // ドラッグアンドドロップのイベントリスナーを追加
        sectionItem.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', sectionItem.innerHTML);
            sectionItem.classList.add('dragging');
        });

        sectionItem.addEventListener('dragend', () => {
            sectionItem.classList.remove('dragging');
        });
    }

    function updateSection(index, title, content, presenter) {
        const sectionItems = sectionsList.querySelectorAll('.section-item');
        const sectionItem = sectionItems[index];
        sectionItem.querySelector('.section-item-title').textContent = title;
        sectionItem.querySelector('.section-item-contents').innerHTML = convertNewlinesToBr(content);
        sectionItem.querySelector('.section-item-presenter').textContent = presenter;
        sectionItem.querySelector('.presenter-select').value = presenter;
    }

    function convertNewlinesToBr(text) {
        return text.replace(/\n/g, '<br>');
    }

    function saveSections() {
        const sections = Array.from(sectionsList.querySelectorAll('.section-item')).map(section => {
            const title = section.querySelector('strong').textContent.trim();
            const content = section.querySelector('p').innerHTML.trim(); // innerHTMLで改行を含めて取得
            const presenter = section.querySelector('.presenter-select').value;
            return { title, content, presenter };
        });
        localStorage.setItem('sections', JSON.stringify(sections));
    }

    function loadSections() {
        const savedSections = JSON.parse(localStorage.getItem('sections')) || [];
        savedSections.forEach(section => addSection(section.title, section.content, section.presenter));
    }

    // セクションリストのドラッグアンドドロップのイベントリスナー
    sectionsList.addEventListener('dragover', (e) => {
        e.preventDefault();
        const draggingItem = document.querySelector('.dragging');
        const afterElement = getDragAfterElement(sectionsList, e.clientY);
        if (afterElement == null) {
            sectionsList.appendChild(draggingItem);
        } else {
            sectionsList.insertBefore(draggingItem, afterElement);
        }
    });

    sectionsList.addEventListener('drop', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const draggingItem = document.querySelector('.dragging');
        sectionsList.appendChild(draggingItem);
        saveSections();  // ドロップ後に保存
    });

    function getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.section-item:not(.dragging)')];

        return draggableElements.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            { offset: Number.NEGATIVE_INFINITY }
        ).element;
    }

    window.removePresenter = function (presenterItem) {
        presenterItem.remove();
        savePresenters();
    }

    window.deleteSection = function (button) {
        button.parentElement.remove();
        saveSections();
    }

    window.editSection = function (button) {
        const sectionItem = button.parentElement;
        const sectionItems = Array.from(sectionsList.querySelectorAll('.section-item'));
        editingIndex = sectionItems.indexOf(sectionItem);  // 編集するセクションのインデックスを取得
        const title = sectionItem.querySelector('strong').textContent;
        const content = sectionItem.querySelector('p').innerHTML;
        document.getElementById('section-title').value = title;
        document.getElementById('section-content').value = content.replace(/<br>/g, '\n'); // <br>を改行文字に戻す
    }
});
