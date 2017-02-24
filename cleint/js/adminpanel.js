$(document).ready(function() {
    $.ajax({
        url: "http://localhost:3000/food/getAll",
        type: "GET",
        success: function(result) {
            if (result) {
                var tampung = ""
                for (var i = result.length - 1; i >= 0; i--) {
                  tampung += `     <tr id="trID${result[i]._id}">
                                        <td id="idTitle${result[i]._id}">${result[i].name}</td>
                                        <td id="idDescription${result[i]._id}">${result[i].category}</input>
                                        <td id="idDatepicker${result[i]._id}">${result[i].price}</input>
                                        <td class="collapsing">
                                            <div class="ui fitted checkbox">
                                                <input id="${result[i]._id}" type="checkbox"><label name="actioncheck"></label>
                                            </div>
                                        </td>
                                    </tr>`

                }
                $("#listtodo").append(tampung)
            }
        }
    })
})

function addTodos() {
    $.ajax({
        url: "http://localhost:3000/food/add",
        type: "POST",
        data: {
            name: $("#name").val(),
            address: $("#address").val(),
            category: $("#category").val(),
            price: $("#price").val(),
            imageUrl: $("#iamgeUrl").val(),
            youtubeUrl: $("#youtubeUrl").val(),
            rating: $("#rating").val()
        },
        success: function(result) {
          tampung = `     <tr id="trID${result._id}">
                                <td id="idTitle${result._id}">${result.name}</td>
                                <td id="idDescription${result._id}">${result.category}</input>
                                <td id="idDatepicker${result._id}">${result.price}</input>
                                <td class="collapsing">
                                    <div class="ui fitted checkbox">
                                        <input id="${result._id}" type="checkbox"><label name="actioncheck"></label>
                                    </div>
                                </td>
                            </tr>`

          $("#listtodo").prepend(tampung)
          $("#name").val(''),
          $("#address").val(''),
          $("#category").val(''),
          $("#price").val(''),
          $("#iamgeUrl").val(''),
          $("#youtubeUrl").val(''),
          $("#rating").val('')
        }
    })

}

function checkList() {
    var listId = $("#listtodo tr td.collapsing div input")
    for (var i = 0; i < listId.length; i++) {
        var id = $(listId[i]).attr("id")
        if ($(`#${id}`).is(':checked')) {
            return true
        }
    }
    return false
}

function warningAction(input) {
    if (checkList() && input == "remove") {
        swal({
                title: "Are you sure?",
                text: "Food will be remove",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            },
            function() {
                checkAction(input)
                swal("Deleted!", "Your Food has been deleted.", "success");
            })
    } else if (checkList() && input == "update") {
        $('.ui.modal.update').modal('show');
        checkAction(input)
    } else if (checkList() && input == "complete") {
        $('.ui.modal.read').modal('show');
        checkAction(input)
    } else {
        swal("Warning !", "Silahkan Tandai List Memo")
    }
}

function checkAction(input) {
    var arrId = []
    var listId = $("#listtodo tr td.collapsing div input")
    for (var i = 0; i < listId.length; i++) {
        var id = $(listId[i]).attr("id")
        if ($(`#${id}`).is(':checked')) {
            if (input == "remove") {
                document.getElementById(`trID${id}`).innerHTML = ""
                arrId.push(id)
            }else if(input == "update"){
                $('#idUpdate').val(`${id}`)
                $('#titleUpdate').val($(`#idTitle${id}`).text())
                $('#descriptionUpdate').val($(`#idDescription${id}`).val())
                $('#datepickerUpdate').val($(`#idDatepicker${id}`).val())
                break;
            }else {
              document.querySelector("h1#titleRead").innerHTML = $(`#idTitle${id}`).text()
              document.querySelector("p#descriptionRead").innerHTML = $(`#idDescription${id}`).val()
              document.querySelector("p#datepickerRead").innerHTML = date.localDate(new Date($(`#idDatepicker${id}`).val()))
              break;


            }
        }
    }
    deleteTodos(arrId)

}

function runningUpdate() {
    var id = $('#idUpdate').val()
    var title = $('#titleUpdate').val()
    var description = $('#descriptionUpdate').val()
    var status = $('#datepickerUpdate').val()
    if (title == "" || description == "" || status == "") {
        alert("Warning !", "Jangan Kosongkan Form Upadate")
    } else {
        $.ajax({
            url: "http://localhost:3000/update",
            type: "PUT",
            data: {
                id: id,
                title: title,
                description: description,
                status: status
            },
            success: function(result) {
              tampung = `     <tr id="trID${result._id}">
                                    <td id="idTitle${result._id}">${result.title}</td>
                                    <input id="idDescription${result._id}" type="hidden" value="${result.description}"></input>
                                    <input id="idDatepicker${result._id}" type="hidden" value="${result.status}"></input>
                                    <td class="collapsing">
                                        <div class="ui fitted checkbox">
                                            <input id="${result._id}" type="checkbox"><label name="actioncheck"></label>
                                        </div>
                                    </td>
                                </tr>`
                document.getElementById(`trID${result._id}`).innerHTML = tampung
            }
        });
    }
}


function deleteTodos(arrId) {
    $.ajax({
        url: "http://localhost:3000/food/delete",
        type: "DELETE",
        data: {
            arrId: JSON.stringify(arrId)
        },
        success: function(result) {
            return result
        }
    });

}
