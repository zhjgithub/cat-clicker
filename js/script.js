(function () {
    var data = {
        cats: [{
                name: 'Black And White Kitten On Brown Textile',
                image: 'images/black-and-white-kitten-on-brown-textile.jpg',
                clickCount: 0
            },
            {
                name: 'Eyes On You Cat',
                image: 'images/eyes-on-you-cat.jpg',
                clickCount: 0
            },
            {
                name: 'Grey And White Short Fur Cat',
                image: 'images/grey-and-white-short-fur-cat.jpg',
                clickCount: 0
            },
            {
                name: 'Kittens Rush',
                image: 'images/kittens-cat-cat-puppy-rush.jpg',
                clickCount: 0
            },
            {
                name: 'Silver Tabby Cat',
                image: 'images/silver-tabby-cat.jpg',
                clickCount: 0
            },
            {
                name: 'Two Yellow Cat',
                image: 'images/two-yellow-cat.jpg',
                clickCount: 0
            }
        ],
        selectedCat: 0
    };

    var octopus = {
        init: function () {
            viewCatList.init();
            viewCatDetail.init();
        },

        getAllCats: function () {
            return data.cats;
        },

        chooseCat: function (index) {
            data.selectedCat = index;
            viewCatDetail.render();
        },

        getSelectedCat: function () {
            return data.cats[data.selectedCat];
        },

        addClickCount: function () {
            data.cats[data.selectedCat].clickCount++;
            viewCatDetail.updateClickCount();
        }
    };

    var viewCatList = {
        init: function () {
            $('#cat-list').on('change', 'input[type="radio"]', function (event) {
                var index = this.getAttribute('value');
                octopus.chooseCat(index);
            });

            this.render();

            var $radios = $('input:radio[name=cat]');
            if ($radios.is(':checked') === false) {
                $radios.filter('[value=0]').prop('checked', true);
            }
        },

        render: function () {
            var listTemplate = $('script[data-template="cat-list"').html();
            var list = [];

            octopus.getAllCats().forEach(function (cat, index) {
                var cat = listTemplate.replace(/{{name}}/g, cat.name)
                    .replace(/{{value}}/g, index);
                list.push(cat);
            });

            $('#cat-list').html(list.join(''));
        }
    };

    var viewCatDetail = {
        init: function () {
            this.clickCount = document.getElementById('click-count');
            this.image = document.getElementById('cat-image');
            this.catName = document.getElementById('cat-name');

            document.getElementById('cat-clicker').addEventListener('click', function (event) {
                octopus.addClickCount();
            }, false);

            this.render();
        },

        render: function () {
            var cat = octopus.getSelectedCat();

            this.catName.innerText = cat.name;
            this.clickCount.innerText = cat.clickCount;
            this.image.setAttribute('src', cat.image);
        },

        updateClickCount: function () {
            var cat = octopus.getSelectedCat();
            this.clickCount.innerText = cat.clickCount;
        }
    };

    octopus.init();
})();