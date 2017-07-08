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
        selectedCat: 0,
        bShowAdmin: false
    };

    var octopus = {
        init: function () {
            viewCatList.init();
            viewCatDetail.init();
            viewAdmin.init();
        },

        getAllCats: function () {
            return data.cats;
        },

        chooseCat: function (index) {
            data.selectedCat = index;
            viewCatDetail.render();
            if (this.isShowAdmin() === true) {
                this.showAdmin(false);
            }
        },

        getSelectedCat: function () {
            return data.cats[data.selectedCat];
        },

        getCurrentIndex: function () {
            return data.selectedCat;
        },

        addClickCount: function () {
            var currentCat = data.cats[data.selectedCat];
            currentCat.clickCount++;
            viewCatDetail.updateClickCount();

            if (this.isShowAdmin() === true) {
                viewAdmin.renderCount(currentCat.clickCount);
            }
        },

        isShowAdmin: function () {
            return data.bShowAdmin;
        },

        showAdmin: function (bShow) {
            if (data.bShowAdmin === bShow) {
                return;
            }

            data.bShowAdmin = bShow;
            viewAdmin.render();
        },

        setInfo: function (name, image, count) {
            if (name && image && count) {
                var currentCat = this.getSelectedCat();
                currentCat.name = name;
                currentCat.image = image;
                currentCat.clickCount = count;

                data.bShowAdmin = false;
                viewCatDetail.render();
                viewAdmin.render();
                viewCatList.render();
            }
        }
    };

    var viewCatList = {
        init: function () {
            this.listTemplate = $('script[data-template="cat-list"').html();

            $('#cat-list').on('change', 'input[type="radio"]', function (event) {
                var index = this.getAttribute('value');
                octopus.chooseCat(index);
            });

            this.render();
        },

        render: function () {
            var list = [];
            var that = this;

            octopus.getAllCats().forEach(function (cat, index) {
                var cat = that.listTemplate.replace(/{{name}}/g, cat.name)
                    .replace(/{{value}}/g, index);
                list.push(cat);
            });

            $('#cat-list').html(list.join(''));

            $('input:radio[name=cat]').filter('[value=' + octopus.getCurrentIndex() + ']').prop('checked', true);
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

    var viewAdmin = {
        init: function () {
            this.adminSettingBox = document.getElementById('admin-setting-box');
            this.inputName = document.getElementById('set-name');
            this.inputImage = document.getElementById('set-image');
            this.inputCount = document.getElementById('set-count');

            document.getElementById('btn-admin').addEventListener('click', function () {
                if (octopus.isShowAdmin() === false) {
                    octopus.showAdmin(true);
                }
            }, false);

            document.getElementById('btn-save').addEventListener('click', function () {
                var name = viewAdmin.inputName.value;
                var image = viewAdmin.inputImage.value;
                var count = viewAdmin.inputCount.value;

                if (name && image && count) {
                    octopus.setInfo(name, image, count);
                }
            }, false);

            document.getElementById('btn-cancel').addEventListener('click', function () {
                octopus.showAdmin(false);
            }, false);

            this.render();
        },

        render: function () {
            if (octopus.isShowAdmin() === true) {
                this.adminSettingBox.removeAttribute('hidden');

                var currentCat = octopus.getSelectedCat();
                this.inputName.value = currentCat.name;
                this.inputImage.value = currentCat.image;
                this.inputCount.value = currentCat.clickCount;
            } else {
                this.adminSettingBox.setAttribute('hidden', '');
            }

        },

        renderCount: function (count) {
            this.inputCount.value = count;
        }
    };

    octopus.init();
})();