$(function () {
    var api = '/customers';

    if ($('#customer-list').length) {
        $.get(api, function (customers) {
            var list = [];

            if (customers.length) {
                var cont = 0;
                for (var i in customers) {
                    cont++;
                    var customer = customers[i];
                    var content = '<td>' + cont + '</td>' +
                            '<td>' + customer.name + '</td>' +
                            '<td>' + customer.username + '</td>' +
                            '<td>' + customer.location + '</td>' +
                            '<td>' + (customer.meta.age || '') + '</td>' +
                            '<td>' + customer.meta.website + '</td>' +
                            '<td>' + (customer.premium ? 'Y' : 'N') + '</td>' +
                            '<td>' + customer.createdAt + '</td>';
                    list.push($('<tr>', {html: content}));
                }
            } else {
                var message = 'There are no customers yet.';
                var content = '<td colspan=8>' + message + '</td>';
                list.push($('<tr>', {html: content}));
            }

            $('#customer-list tbody').html(list)
        });
    }

    $('#submit').on('click', function (event) {
        event.preventDefault();

        var form = $('form');
        var formData = form.serializeArray();
        var data = {meta: {}};
        var notification = $('#notification');
        var message = '';

        for (var i in formData) {
            var customer = formData[i];
            if (customer.name === 'age' || customer.name === 'website') {
                data['meta'][customer.name] = customer.value;
            } else {
                data[customer.name] = customer.value || '';
            }
        }

        notification.removeClass('alert-succes alert-danger').hide();

        $.ajax({
            type: 'PUT',
            url: api,
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).fail(function (err) {
            message = err.responseJSON.message || 'Error';
            notification.addClass('alert-danger');
        }).done(function (data) {
            message = data;
            form.trigger('reset');
            notification.addClass('alert-success');
        }).always(function () {
            notification.html('<p>' + message + '</p>').show()
        });
    });

});
