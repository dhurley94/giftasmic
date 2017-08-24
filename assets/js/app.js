$(document).ready(function() {

  var giphyGetter = {
    userInput: ["kittens", "puppies", "giphy", "anime", "propane"],
    apikey: "2773155dc8d74104b585bac0e616ff5a",

    gifQuery: function(input) {

      var params = {
        userAdd: input,
        url: "https://api.giphy.com/v1/gifs/search?q=" + giphyGetter.input + "&api_key=" + giphyGetter.apikey + "&limit=10&offset=0&rating=PG&lang=en"
      }

      $.ajax({
        url: params.url,
        method: 'GET',
        dataType: 'json'
      })
      .done(function(data) {
        giphyGetter.displayCards(data);
      });
      console.log("waiting on data.")
    },

    buildCard: function(url, posted, rating) {
      return $("<div class='card' style='width: 20rem;'><img class='card-img-top' src='" + url + "' alt='giphy-image'><div class='card-body'><p class='card-text'>" + posted +  " Rating: " + rating + "</p></div></div>");
    },

    displayCards: function(gifArray) {
      $("#card-holder").empty();
      for (var i = 0; i < gifArray.data.length; i++) {
        var urL = gifArray.data[i].images.downsized_medium.url;
        var opUpload = gifArray.data[i].import_datetime;
        var rating = gifArray.data[i].rating;
        $("card-holder").append(giphyGetter.buildCard(urL, opUpload, rating));
        console.log("Apended giphy #" + i);
      }
    },

    buildNav: function() {
      $("#addMore").empty();
      for (var i = 0; i < giphyGetter.userInput.length; i++){
        $("#addMore").fadeIn(1500).prepend("<li class='nav-item'><a class='nav-link' value='" + giphyGetter.userInput[i] + "' name='" + giphyGetter.userInput[i] + "' href='#'>" + giphyGetter.userInput[i] + "</a></li>");
      }
    }
  }

  giphyGetter.buildNav();

  $("#add_gif").on('click', function() {
    if ($.inArray($("input[type=text][name=input_gif]").val(), giphyGetter.userInput) == -1) {
      var tmp = $("input[type=text][name=input_gif]").val();
      giphyGetter.userInput.push(tmp);
      giphyGetter.buildNav();
      console.log(giphyGetter.userInput)
    } else if ($("input[type=text][name=input_gif]").val() == '') {
      $("input[type=text][name=input_gif]").effect("pulsate", "fast");
    } else {
      $("input[type=text][name=input_gif]").effect("pulsate", "fast");
    }
  });

  $(".nav-link").on('click', function(e) {
    console.log($(this).text());
    var selection = $(this).text();
    giphyGetter.gifQuery(selection);
  });

});
