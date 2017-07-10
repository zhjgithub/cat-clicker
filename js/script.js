$(function () {
    var initialCats = [{
            firstName: 'Black And White',
            lastName: 'Kitten On Brown Textile',
            nicknames: ['Tabtab', 'T-Bone', 'Mr. T', 'Tabitha Tab Tabby Catty Cat'],
            imageSrc: 'images/black-and-white-kitten-on-brown-textile.jpg',
            imageAttribution: 'Pexels',
            clickCount: 0
        },
        {
            firstName: 'Eyes On You',
            lastName: 'Cat',
            nicknames: ['Tigger'],
            imageSrc: 'images/eyes-on-you-cat.jpg',
            imageAttribution: 'Pexels',
            clickCount: 0
        },
        {
            firstName: 'Grey And White',
            lastName: 'Short Fur Cat',
            nicknames: ['Casper'],
            imageSrc: 'images/grey-and-white-short-fur-cat.jpg',
            imageAttribution: 'Pexels',
            clickCount: 0
        },
        {
            firstName: 'Kittens',
            lastName: 'Rush',
            nicknames: ['Shooby'],
            imageSrc: 'images/kittens-cat-cat-puppy-rush.jpg',
            imageAttribution: 'Pexels',
            clickCount: 0
        },
        {
            firstName: 'Silver',
            lastName: 'Tabby Cat',
            nicknames: ['Zzzzz'],
            imageSrc: 'images/silver-tabby-cat.jpg',
            imageAttribution: 'Pexels',
            clickCount: 0
        },
        {
            firstName: 'Two',
            lastName: 'Yellow Cat',
            nicknames: [],
            imageSrc: 'images/two-yellow-cat.jpg',
            imageAttribution: 'Pexels',
            clickCount: 0
        }
    ];

    var Cat = function (catItem) {
        var self = this;

        self.firstName = ko.observable(catItem.firstName);
        self.lastName = ko.observable(catItem.lastName);
        self.nicknames = ko.observable(catItem.nicknames);
        self.imageSrc = ko.observable(catItem.imageSrc);
        self.clickCount = ko.observable(catItem.clickCount);

        self.fullName = ko.computed(function () {
            return self.firstName() + ' ' + self.lastName();
        });

        self.level = ko.computed(function () {
            var clickCount = self.clickCount();
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
    };

    var AppViewModel = function () {
        var self = this;

        self.elemInputFirstName = document.getElementById('set-first-name');
        self.elemInputLastName = document.getElementById('set-last-name');
        self.elemInputImage = document.getElementById('set-image');
        self.elemInputCount = document.getElementById('set-count');

        self.catList = ko.observableArray();

        initialCats.forEach(function (catItem) {
            self.catList.push(new Cat(catItem));
        });

        self.currentCat = ko.observable(self.catList()[0]);
        self.currentCat.subscribe(function () {
            self.showAdmin(false);
        });

        self.showAdmin = ko.observable(false);
        self.showAdmin.subscribe(function (bShow) {
            if (bShow) {
                var cat = self.currentCat();
                self.elemInputFirstName.value = cat.firstName();
                self.elemInputLastName.value = cat.lastName();
                self.elemInputImage.value = cat.imageSrc();
                self.elemInputCount.value = cat.clickCount();
            }
        });

        self.trackClickCount = ko.computed(function () {
            return self.currentCat().clickCount();
        });

        self.adminClick = function () {
            if (self.showAdmin() === false) {
                self.showAdmin(true);
            }
        };

        self.saveClick = function () {
            var firstName = self.elemInputFirstName.value;
            var lastName = self.elemInputLastName.value;
            var image = self.elemInputImage.value;
            var count = parseInt(self.elemInputCount.value);

            if (firstName && lastName && image && !isNaN(count)) {
                var cat = self.currentCat();
                cat.firstName(firstName);
                cat.lastName(lastName);
                cat.imageSrc(image);
                cat.clickCount(count);
                self.showAdmin(false);
            }
        };

        self.cancelClick = function () {
            self.showAdmin(false);
        };

        self.addClickCount = function () {
            var cat = self.currentCat();
            cat.clickCount(cat.clickCount() + 1);
        };
    };

    ko.applyBindings(new AppViewModel());
}());