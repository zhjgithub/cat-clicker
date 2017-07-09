var appViewModel = function () {
    var self = this;
    this.elemInputName = document.getElementById('set-name');
    this.elemInputImage = document.getElementById('set-image');
    this.elemInputCount = document.getElementById('set-count');

    this.catList = ko.observableArray(
        [
            ko.observable({
                name: 'Black And White Kitten On Brown Textile',
                image: 'images/black-and-white-kitten-on-brown-textile.jpg',
                clickCount: 0
            }),
            ko.observable({
                name: 'Eyes On You Cat',
                image: 'images/eyes-on-you-cat.jpg',
                clickCount: 0
            }),
            ko.observable({
                name: 'Grey And White Short Fur Cat',
                image: 'images/grey-and-white-short-fur-cat.jpg',
                clickCount: 0
            }),
            ko.observable({
                name: 'Kittens Rush',
                image: 'images/kittens-cat-cat-puppy-rush.jpg',
                clickCount: 0
            }),
            ko.observable({
                name: 'Silver Tabby Cat',
                image: 'images/silver-tabby-cat.jpg',
                clickCount: 0
            }),
            ko.observable({
                name: 'Two Yellow Cat',
                image: 'images/two-yellow-cat.jpg',
                clickCount: 0
            })
        ]
    );

    this.currentCat = ko.observable(0);
    this.currentCat.subscribe(function () {
        self.showAdmin(false);
    });

    this.currentCatObject = ko.computed(function () {
        return self.catList()[self.currentCat()]();
    });

    this.showAdmin = ko.observable(false);
    this.showAdmin.subscribe(function (bShow) {
        if (bShow) {
            var cat = self.currentCatObject();
            self.elemInputName.value = cat.name;
            self.elemInputImage.value = cat.image;
            self.elemInputCount.value = cat.clickCount;
        }
    });

    this.catImage = ko.computed(function () {
        return this.currentCatObject().image;
    }, this);

    this.clickCount = ko.computed(function () {
        return this.currentCatObject().clickCount;
    }, this);

    this.catName = ko.computed(function () {
        return this.currentCatObject().name;
    }, this);

    this.adminClick = function () {
        if (this.showAdmin() === false) {
            this.showAdmin(true);
        }
    };

    this.saveClick = function () {
        var name = this.elemInputName.value;
        var image = this.elemInputImage.value;
        var count = parseInt(this.elemInputCount.value);

        if (name && image && count) {
            var cat = this.currentCatObject();
            cat.name = name;
            cat.image = image;
            cat.clickCount = count;
            this.catList()[this.currentCat()].valueHasMutated();
            this.showAdmin(false);
        }
    };

    this.cancelClick = function () {
        this.showAdmin(false);
    };

    this.addClickCount = function () {
        var cat = this.currentCatObject();
        cat.clickCount++;
        this.catList()[this.currentCat()].valueHasMutated();
    };
};

ko.applyBindings(new appViewModel());