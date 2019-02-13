console.log('js has been loaded');

$(document).ready(onReady);

function onReady() {
    console.log('jq has been loaded');
    $('#submitButton').on('click', addRestaurant);
    getRestaurant();
    $('#restList').on('click', '.deleteButton', deleteButton);
    $('#submitButton').on('click', clearInputs);

}

function clearInputs() {
    $('#nameIn').val('');
    $('#typeIn').val('');
}

function deleteButton() {
    $(this).closest('tr').fadeOut();
}

function addRestaurant() {
    console.log('submit button clicked');

    const objectsToSend = {
        name: $('#nameIn').val(),
        type: $('#typeIn').val()
    }
    $.ajax({
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

function getRestaurant() {
    $.ajax({
        type: 'GET',
        url: '/restaurant'
    }).then(function (response) {
        console.log('back from GET call with:', response);
        let restaurant = $('#restList');
        restaurant.empty();
        console.log(response);
        response.forEach(function (restaurants) {
            restaurant.append(`
              <tr>  <td> ${ restaurants.name}</td><td> ${restaurants.type}  </td><td> <button class= "deleteButton">Delete</button></td> </tr>`)
        })// end for loop    
    }).catch(function (err) {
        console.log('error with GET:', err);

    })// end ajax
}