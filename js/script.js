var catClickCount = 0;
var clickNum = document.getElementById('click-number');
clickNum.innerText = '0';

document.getElementById('cat-clicker').addEventListener('click', function () {
    catClickCount++;
    clickNum.innerText = catClickCount;
}, true);