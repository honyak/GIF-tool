$(function () {
    populateButtons(searchArray, 'searchButton', '#buttonsArea');
    console.log("Page loaded");
});
var apiKey = 'zVJV0YB5HoFP6e9zDFPUjH71Wf7SOhPi';
var searchArray = ['Dog', 'Cat', 'Bird'];

function populateButtons(searchArray, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (i = 0; i < searchArray.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd + " btn btn-success m-2");
        a.attr('data-type', searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }
}

$(document).on("click", ".searchButton", function () {
    var type = $(this).data('type');
    console.log(type);

    var queryURL = 'http://api.giphy.com/v1/gifs/search?q=' + type + '&' + 'api_key=' + apiKey + '&limit=10';

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
        .done(function (response) {
            console.log(queryURL);
            for (i = 0; i < response.data.length; i++) {
                var imgData = response.data[i];
                var searchDiv = $("<div class='search-item'>");
                var rating = imgData.rating;
                var p = $('<p>').text('Rating: ' + rating);
                var animated = imgData.images.fixed_height.url;
                var still = imgData.images.fixed_height_still.url;

                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').prepend(searchDiv);
            }
        });
});
$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state === 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    }
    else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
$('#addSearch').on('click', function () {
    var newSearch = $('#search-input').val();
    if (newSearch) {
        console.log(newSearch);
        searchArray.push(newSearch);
        populateButtons(searchArray, 'searchButton', '#buttonsArea');
    }
    $('#search-input').val('').focus();
    return false;
});