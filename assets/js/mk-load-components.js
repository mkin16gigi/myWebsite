document.addEventListener("DOMContentLoaded", () => {
    // 找出網頁中所有帶有 data-include 屬性的元素
    document.querySelectorAll('[data-include]').forEach(el => {
        const file = el.getAttribute('data-include'); // 取得要載入的檔案名稱
        
        fetch(file)
            .then(response => response.text())
            .then(data => {
                el.innerHTML = data; // 自動把內容塞進去

                // 確保導覽列載入並插入 DOM 後，才初始化選單事件
                if (typeof initMenu === 'function') {
                    initMenu();
                }
            })
            .catch(err => console.error('載入失敗:', err));
    });
});


//用來避免原template 的 opener 處理失效 (nav 裡的sub list 打不開)。
function initMenu() {
    var $menu = $('#menu'),
        $menu_openers = $menu.children('ul').find('.opener');

    $menu_openers.each(function() {
        var $this = $(this);
        $this.off('click').on('click', function(event) { // 加上 .off() 避免重複綁定
            event.preventDefault();
            $menu_openers.not($this).removeClass('active');
            $this.toggleClass('active');
            $window.triggerHandler('resize.sidebar-lock');
        });
    });
}