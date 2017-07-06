var catClickCount = {};

(function initCatClicker() {

    var cats = [{
            name: 'left',
            image: 'images/cat.jpg'
        },
        {
            name: 'right',
            image: 'images/cat.jpg'
        }
    ];

    var formatCatClicker = '<div class="container">' +
        '<div id="%cat%" class="cat-box">' +
        '<div class="text-box">%count%</div>' +
        '<img class="cat" src="%image%" alt="cute cat">' +
        '</div>' +
        '<p>%catName%</p>' +
        '</div>';

    var catElements = [];
    cats.forEach(function (cat) {
        var element = formatCatClicker.replace('%cat%', cat.name)
            .replace('%count%', 0)
            .replace('%image%', cat.image)
            .replace('%catName%', cat.name);

        catElements.push(element);
        catClickCount[cat.name] = 0;
    });

    var container = $('.cat-clicker');
    container.html(catElements.join(''));
    container.on('click', '.cat-box', function (event) {
        var id = this.getAttribute('id');
        var count = ++catClickCount[id];
        this.getElementsByClassName('text-box')[0].innerText = count.toString();
    });
})();