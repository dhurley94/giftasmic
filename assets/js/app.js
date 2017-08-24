$(document).ready(function() {

  var giphyGetter = {
    userInput: ["kittens", "puppies", "giphy", "anime", "propane"], // starter topics
    apikey: "2773155dc8d74104b585bac0e616ff5a", // apikey

    gifQuery: function(input) {

      $("#card-holder").empty(); // empty card div

      // setting parameters for giphy api
      var params = {
        userAdd: input,
        url: "https://api.giphy.com/v1/gifs/search?q=" + input + "&api_key=" + giphyGetter.apikey + "&limit=10&offset=0&rating=PG&lang=en"
      }

      $.ajax({
        url: params.url,
        method: 'GET',
        dataType: 'json'
      })
      .done(function(data) {
        giphyGetter.displayCards(data);
      });
      // TODO add a loading animation?
    },

    /* function that
    * "constructs" the card
    * which each img will be displayed
    */
    buildCard: function(url, posted, rating) {
      return $("<div class='card' style='width: 20rem;'><img class='card-img-top img-fluid' src='" + url + "' alt='giphy-image'><div class='card-body'><p class='card-text'>" + "Posted on <i>" + posted +  "</i><hr> Rating: <b>" + rating + "</b></p></div></div>");
    },

    displayCards: function(gifArray) {
      $("#card-holder").empty();
      for (var i = 0; i < gifArray.data.length; i++) {
        var urL = gifArray.data[i].images.downsized_medium.url;
        var opUpload = gifArray.data[i].import_datetime;
        var rating = gifArray.data[i].rating;
        $("#card-holder").fadeIn('slow', function() {
          $("#card-holder").append(giphyGetter.buildCard(urL, opUpload, rating));
        });
      }
    },

    buildNav: function() {
      $("#addMore").empty();
      for (var i = 0; i < giphyGetter.userInput.length; i++){
        $("#addMore").append("<li class='nav-item'><a class='nav-link' value='" + giphyGetter.userInput[i] + "' name='" + giphyGetter.userInput[i] + "' href='#'>" + giphyGetter.userInput[i] + "</a></li>");
      }
    }
  }

  giphyGetter.buildNav();

  $("#add_gif").on('click', function() {
    if ($.inArray($("input[type=text][name=input_gif]").val(), giphyGetter.userInput) == -1) {
      var tmp = $("input[type=text][name=input_gif]").val();
      giphyGetter.userInput.push(tmp.toLowerCase());
      giphyGetter.buildNav();
    } else {
      $("input[type=text][name=input_gif]").effect("pulsate", "fast");
    }
  });

  $(".nav-link").on('click', function() {
    var selection = $(this).text();
    console.log(selection);
    $("#card-holder").empty();
    giphyGetter.gifQuery(selection);
  });

});
