document.addEventListener('DOMContentLoaded', () => {
    const markdownInput = document.getElementById('markdown-input');
    const contentDiv = document.getElementById('content');
    const body = document.body;

    function handleFile(file) {
        if (file && file.name.endsWith('.md')) {
            const reader = new FileReader();

            reader.onload = (e) => {
                const markdownText = e.target.result;
                contentDiv.innerHTML = marked.parse(markdownText);
            };

            reader.onerror = (e) => {
                contentDiv.innerHTML = '<p style="color: red;">讀取檔案時發生錯誤。</p>';
            };

            reader.readAsText(file);
        } else {
            alert('請拖放一個 .md 檔案。');
        }
    }

    markdownInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        handleFile(file);
    });

    body.addEventListener('dragover', (event) => {
        event.preventDefault();
        body.classList.add('drag-over');
    });

    body.addEventListener('dragleave', () => {
        body.classList.remove('drag-over');
    });

    body.addEventListener('drop', (event) => {
        event.preventDefault();
        body.classList.remove('drag-over');

        const file = event.dataTransfer.files[0];
        handleFile(file);
    });
});
