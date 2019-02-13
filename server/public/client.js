console.log( 'js has been loaded' );

$( document ).ready( onReady );

function onReady (){
    console.log('jq has been loaded');
    $('#submitButton').on ( 'click', addRestaurant );
    getRestaurant();
    $('#restList').on('click', '.deleteButton', deleteButton);

}

function deleteButton (){
    $(this).closest('tr').fadeOut();
}

function addRestaurant (){
    console.log('submit button clicked');
    
    const objectsToSend ={
        name: $('#nameIn').val(),
        type: $('#typeIn').val()
    }
    $.ajax ({
        type: 'POST',
        url: '/restaurant',
        data: objectsToSend
    }).then(function (response) {
        getRestaurant()
        console.log('back from POST', response);

    }).catch(function (err) {
        console.log('error with POST', err);

    })// end ajax POST
}

function getRestaurant (){
    $.ajax({
        type: 'GET',
        url: '/restaurant'
    }).then(function (response) {
        console.log('back from GET call with:', response);
        let restaurant = $('#restList');
        restaurant.empty();
        console.log(response);
        
        for (let i = 0; i < response.length; i++) {
            restaurant.append(`
              <tr>  <td> ${ response[i].name}</td><td> ${response[i].type}  </td><td> <button class= "deleteButton">Delete</button></td> </tr>`)
        }// end for loop    
    }).catch(function (err) {
        console.log('error with GET:', err);

    })// end ajax
}