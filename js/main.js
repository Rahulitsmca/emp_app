var app = {


    renderHomeView: function () {
        var html =
            "<div class='header'><h1>Home</h1></div>" +
            "<div class='search-view'>" +
            "<input class='search-key'/>" +
            "<ul class='employee-list'></ul>" +
            "</div>  " 
        $('body').html(html);
        $('.search-key').on('keyup', $.proxy(this.findByName, this));
        $(".search-key").focusout(function () {

            if ($('.search-key').val().trim().length == 0) {
                $('.employee-list').html('');
            }

        });


    },
    showAlert: function (message, title) {
        if (navigator.notification) {
            navigator.notification.alert(message, null, title, 'OK');
        } else {
            alert(title ? (title + ": " + message) : message);
        }
    },

    findByName: function () {
        console.log('findByName');
        this.store.findByName($('.search-key').val(), function (employees) {
            var l = employees.length;
            var e;
            $('.employee-list').empty();
            for (var i = 0; i < l; i++) {
                e = employees[i];
                $('.employee-list').append('<li><a href="#employees/' + e.id + '">' + e.firstName + ' ' + e.lastName + '</a></li>');
            }
        });
    },

    initialize: function () {
        var self = this;
        this.store = new LocalStorageStore(function () {
            //self.renderHomeView();

        });
    }

};




app.initialize();