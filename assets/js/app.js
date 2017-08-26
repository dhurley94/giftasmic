$(document).ready(function() {

    var giphyGetter = {

        userInput: ["kittens", "puppies", "anime", "propane", "accessories"], // starter topics
        apikey: "2773155dc8d74104b585bac0e616ff5a", // apikey
        gifOffset: 0,
        selection: "",

        /**
         * builds query based on user input
         * and other variables pending their
         * status
         */
        gifQuery: function(input) {
            $("#card-holder").empty();
            var params = {
                userAdd: input,
                url: "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=" + giphyGetter.apikey + "&limit=10&offset=" + giphyGetter.gifOffset + "&rating=PG&lang=en"
            };

            $.ajax({
                    url: params.url,
                    method: 'GET',
                    dataType: 'json'
                })
                .done(function(data) {
                    giphyGetter.displayCards(data);
                });
        },

        /**
         * function that
         * "constructs" the card class
         *  which each img will be displayed
         */
        buildCard: function(url, posted, rating, id, lightbox) {
            return $("<div class='card' style='width: 20rem;'><img id='imgMatch' class='card-img-top img-fluid' data-id='" + id + "' src='" + url + "' alt='giphy-image'><div class='card-body'><p class='card-text'>" + "Posted on <i>" + posted + "</i><hr> Rating: <b>" + rating.toUpperCase() + "</b><hr></p><a href='" + lightbox + "' data-lightbox='giphy'>ORIGINAL</a></div></div>");
        },

        /**
         * iterates over api data
         * passes data to buildCard()
         * prepends it to the DOM
         */
        displayCards: function(gifArray) {
            $("#card-holder").empty();
            for (var i = 0; i < gifArray.data.length; i++) {
                var urL = gifArray.data[i].images.downsized_still.url;
                var opUpload = gifArray.data[i].import_datetime;
                var rating = gifArray.data[i].rating;
                var lightbox = gifArray.data[i].images.original.url;
                var card = giphyGetter.buildCard(urL, opUpload, rating, i, lightbox);
                $("#card-holder").prepend(card);
            }
        },

        /**
         * adds nav elem based on
         * contents of array userInput
         */
        buildNav: function() {
            $("#addMore").empty();
            for (var i = 0; i < giphyGetter.userInput.length; i++) {
                $("#addMore").append("<li class='nav-item'><a class='nav-link' value='" + giphyGetter.userInput[i] + "' name='" + giphyGetter.userInput[i] + "' href='#'>" + giphyGetter.userInput[i].charAt(0).toUpperCase() + giphyGetter.userInput[i].substr(1).replace(/\+/g, ' ') + "</a></li>");
            }
        }
    };

    giphyGetter.buildNav();

    /**
     * adds gif topic
     * checks if value is empty and ignores case
     * spaces replaced with +
     * ignores pre-existing input
     */
    $("#add_gif").on('click', function(e) {
        newGiphyReq();
    });

    /**
     * adds ability to
     * submit giphy requests
     * with the enter key
     */
    $("form").submit(function(e) {
        e.preventDefault();
        newGiphyReq();
    });

    function newGiphyReq() {
        var userInputData = $("input[type=text][name=input_gif]").val().trim().toLowerCase();
        if (userInputData == "") {
            $("input[type=text][name=input_gif]").effect("pulsate", "fast");
        } else if ($.inArray(userInputData.replace(/ /g, '+'), giphyGetter.userInput) == -1) {
            userInputData = userInputData.replace(/ /g, '+');
            giphyGetter.userInput.push(userInputData);
            giphyGetter.buildNav();
            giphyGetter.gifQuery(userInputData);
        } else {
            $("input[type=text][name=input_gif]").effect("pulsate", "fast");
        }
    }
    /**
     * changes api call
     * verifies current image
     * are not being recalled
     * reduces network traffic
     */
    var selection;
    $(document).on('click', ".nav-link", function(e) {
        if (this.text != selection) {
            selection = $(this).text();
            $("#card-holder").empty();
            giphyGetter.gifQuery(selection);
        }
        // increment offset
        // this "randomizes"
        // which gifs are loaded
        giphyGetter.gifOffset++;
    });

    /**
     * changes from stationary img
     * to gifs using
     * split, splice, join
     * rather than api
     */
    $(document).on('click', '#imgMatch', function() {
        if (this.src.split('_').length === 2) {
            $(this).attr('src', this.src.split('_').splice(0, 1) + '.gif');
        } else {
            var tmp = this.src.split('.');
            tmp[2] += '_s';
            $(this).attr('src', tmp.join('.'));
        }
    });
});