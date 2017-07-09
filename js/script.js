(function () {
    var CatsModel = function () {
        var self = this;

        this.catList = ko.observableArray(
            [
                ko.observable({
                    firstName: 'Black And White',
                    lastName: 'Kitten On Brown Textile',
                    name: function () {
                        return this.firstName + ' ' + this.lastName;
                    },
                    image: 'images/black-and-white-kitten-on-brown-textile.jpg',
                    clickCount: 0
                }),
                ko.observable({
                    firstName: 'Eyes On You',
                    lastName: 'Cat',
                    name: function () {
                        return this.firstName + ' ' + this.lastName;
                    },
                    image: 'images/eyes-on-you-cat.jpg',
                    clickCount: 0
                }),
                ko.observable({
                    firstName: 'Grey And White',
                    lastName: 'Short Fur Cat',
                    name: function () {
                        return this.firstName + ' ' + this.lastName;
                    },
                    image: 'images/grey-and-white-short-fur-cat.jpg',
                    clickCount: 0
                }),
                ko.observable({
                    firstName: 'Kittens',
                    lastName: 'Rush',
                    name: function () {
                        return this.firstName + ' ' + this.lastName;
                    },
                    image: 'images/kittens-cat-cat-puppy-rush.jpg',
                    clickCount: 0
                }),
                ko.observable({
                    firstName: 'Silver',
                    lastName: 'Tabby Cat',
                    name: function () {
                        return this.firstName + ' ' + this.lastName;
                    },
                    image: 'images/silver-tabby-cat.jpg',
                    clickCount: 0
                }),
                ko.observable({
                    firstName: 'Two',
                    lastName: 'Yellow Cat',
                    name: function () {
                        return this.firstName + ' ' + this.lastName;
                    },
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

        this.level = ko.computed(function () {
            var clickCount = self.currentCatObject().clickCount;
            var level = 'Newborn';

            if (3 <= clickCount && clickCount <= 5) {
                level = 'Infant';
            } else if (6 <= clickCount && clickCount <= 10) {
                level = 'Teen';
            } else if (clickCount > 10) {
                level = 'Grow up';
            }

            return level;
        });

        this.catImage = ko.computed(function () {
            return this.currentCatObject().image;
        }, this);

        this.clickCount = ko.computed(function () {
            return this.currentCatObject().clickCount;
        }, this);

        this.catName = ko.computed(function () {
            return this.currentCatObject().name();
        }, this);

    };


    var AppViewModel = function () {
        var self = this;

        this.elemInputFirstName = document.getElementById('set-first-name');
        this.elemInputLastName = document.getElementById('set-last-name');
        this.elemInputImage = document.getElementById('set-image');
        this.elemInputCount = document.getElementById('set-count');

        this.cats = ko.observable(new CatsModel());

        this.cats().showAdmin.subscribe(function (bShow) {
            if (bShow) {
                var cat = self.cats().currentCatObject();
                self.elemInputFirstName.value = cat.firstName;
                self.elemInputLastName.value = cat.lastName;
                self.elemInputImage.value = cat.image;
                self.elemInputCount.value = cat.clickCount;
            }
        });

        this.adminClick = function () {
            if (this.showAdmin() === false) {
                this.showAdmin(true);
            }
        };

        this.saveClick = function () {
            var firstName = self.elemInputFirstName.value;
            var lastName = self.elemInputLastName.value;
            var image = self.elemInputImage.value;
            var count = parseInt(self.elemInputCount.value);

            if (firstName && lastName && image && !isNaN(count)) {
                var cat = this.currentCatObject();
                cat.firstName = firstName;
                cat.lastName = lastName;
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

    ko.applyBindings(new AppViewModel());
}());