var catClickCount = {};

(function initCatClicker() {
    var catBoxed = document.getElementsByClassName('cat-box');

    for (var i = 0; i < catBoxed.length; i++) {
        var element = catBoxed[i];
        catClickCount[element.getAttribute('id')] = 0;
        element.getElementsByClassName('text-box')[0].innerText = '0';

        element.addEventListener('click', function (e) {
            var id = this.getAttribute('id');
            var count = catClickCount[id] + 1;
            catClickCount[id] = count;
            this.getElementsByClassName('text-box')[0].innerText = count.toString();
        }, false);
    }
})();