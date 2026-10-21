document.addEventListener("DOMContentLoaded", () => {
    // 找出網頁中所有帶有 data-include 屬性的元素
    document.querySelectorAll('[data-include]').forEach(el => {
        const file = el.getAttribute('data-include'); // 取得要載入的檔案名稱
        
        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data; // 自動把內容塞進去
            })
            .catch(err => console.error('載入失敗:', err));
    });
});