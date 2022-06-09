$( document ).ready(function() {
    $.ajax({
        url: '/listID',
        type: 'POST',
        dataType: 'json',
        data: {
        }
    }).done(function(result) {
        sessionStorage.setItem('IDs', result.data);
    });

    if($("#repeate").is(':checked')){
        sessionStorage.setItem('repeate', 'true')
    }else{
         sessionStorage.setItem('repeate', 'false')
    }

    $("#repeate").click(function(){
        if($("#repeate").is(':checked')){
           sessionStorage.setItem('repeate', 'true')
        }else{
            sessionStorage.setItem('repeate', 'false')
        }
    })

    $('#start').click(function(){
        window.location.href = '/playgame';
    })
});