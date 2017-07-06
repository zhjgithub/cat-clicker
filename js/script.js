var catClickCount = {};

(function initCatClicker() {

    var cats = [{
            name: 'Black And White Kitten On Brown Textile',
            image: 'images/black-and-white-kitten-on-brown-textile.jpg'
        },
        {
            name: 'Eyes On You Cat',
            image: 'images/eyes-on-you-cat.jpg'
        },
        {
            name: 'Grey And White Short Fur Cat',
            image: 'images/grey-and-white-short-fur-cat.jpg'
        },
        {
            name: 'Kittens Rush',
            image: 'images/kittens-cat-cat-puppy-rush.jpg'
        },
        {
            name: 'Silver Tabby Cat',
            image: 'images/silver-tabby-cat.jpg'
        },
        {
            name: 'Two Yellow Cat',
            image: 'images/two-yellow-cat.jpg'
        }
    ];

    var formatCatList = '<li><label><input id="%id%" type="checkbox" name="%name%" value="%value%">%text%</label></li>';

    var formatCatClicker = '<div id="%id%" class="cat-container">' +
        '<div class="cat-box">' +
        '<div class="text-box">%count%</div>' +
        '<img class="cat" src="%image%" alt="cute cat">' +
        '</div>' +
        '<p>%catName%</p>' +
        '</div>';

    var increment = 0;

    var allCats = [];

    cats.forEach(function (cat) {
        var id = 'cat-' + new Date().getTime().toString() + '-' + increment++;
        var element = formatCatList.replace('%id%', id)
            .replace('%name%', cat.name.replace(/ /g, '-'))
            .replace('%value%', cat.image)
            .replace('%text%', cat.name);

        allCats.push(element);
    });

    var catList = $('#cat-list');
    catList.html(allCats.join(''));

    catList.on('change', 'input', function (event) {
        var checked = this.checked;
        var id = 'clicker-' + this.getAttribute('id');
        var catClicker = document.getElementById(id);
        if (catClicker != null) {
            checked ? catClicker.removeAttribute('hidden') : catClicker.setAttribute('hidden', '');
        } else if (checked) {
            var element = formatCatClicker.replace('%id%', id)
                .replace('%count%', 0)
                .replace('%image%', this.getAttribute('value'))
                .replace('%catName%', this.getAttribute('name').replace(/-/g, ' '));

            $('.cat-clicker').append(element);
            catClickCount[id] = 0;
        }
    });

    var container = $('.cat-clicker');
    container.on('click', '.cat-container', function (event) {
        var id = this.getAttribute('id');
        var count = ++catClickCount[id];
        this.getElementsByClassName('text-box')[0].innerText = count.toString();
    });
})();