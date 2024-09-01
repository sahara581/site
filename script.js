document.addEventListener('DOMContentLoaded', () => {
    const addPresenterButton = document.getElementById('add-presenter-btn');
    const presenterInput = document.getElementById('presenter-name');
    const presenterList = document.getElementById('presenter-list');
    const sectionsList = document.getElementById('sections-list');

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
            addSection(title, content, presenter);
            saveSections();
            document.getElementById('section-title').value = '';
            document.getElementById('section-content').value = '';
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
            <button class="edit-btn" onclick="editSection(this)">編集</button>
            <button class="delete-btn" onclick="deleteSection(this)">削除</button>
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

        // プルダウンメニューで発表者が変更された時に保存
        const presenterSelect = sectionItem.querySelector('.presenter-select');
        presenterSelect.value = presenter; // 初期選択
        presenterSelect.addEventListener('change', () => {
            sectionItem.querySelector('.section-item-presenter').textContent = presenterSelect.value;
            saveSections();
        });
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
        const title = sectionItem.querySelector('strong').textContent;
        const content = sectionItem.querySelector('p').innerHTML;
        document.getElementById('section-title').value = title;
        document.getElementById('section-content').value = content.replace(/<br>/g, '\n'); // <br>を改行文字に戻す
        sectionItem.remove();
        saveSections();
    }
});