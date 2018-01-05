/**
 * Created by inbal on 12/31/2017.
 */


function getData(){
    $.ajax({
        url: '/get_statistics/',
        type: 'POST',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify({ the_post : "fsfs" }),//JSON.stringify(myEvent)
         Accept: 'application/json',
          ContentType: 'application/json',
            dataType: 'json',
        complete: function(result) {
           alert("Result from DataBase:" + JSON.stringify(result.responseJSON));
        }


    });
}

