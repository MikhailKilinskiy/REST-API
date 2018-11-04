


//<script src="buttons.js"></script>
// Просмотр одного элемента
function getOneElement() {
 $('#select').on('click', function(){
   var ID = $('#NotificationId1').val()
     $.ajax({
       url: '/api/'+ID,
       accepts: 'application/json',
       type: 'GET',

       complete: function(data){
         console.log(data.responseText)
         var data = JSON.parse(data.responseText)
         console.log(data.NotificationId)
         var html = `<tr>
                   <td>${data.NotificationId}</td>
                   <td>${data.PurchaseNumber}</td>
                   <td>${data.DocPublishDate}</td>
                   <td>${data.PurchaseObjectInfo}</td>
                   <td>${data.PlacingWayCode}</td>
                   <td>${data.ETPCode}</td>
                   <td>${data.MaxPriceSum}</td>
                 </tr>`
               tbody.innerHTML = html
           },
       error: function (jqXHR, textStatus, err) {
             console.log(textStatus);
         }
         })
       })
     }

// Удаление элемента
function deleteOneElement() {
  $('#delete').on('click', function(){
    var ID = $('#NotificationId1').val()
    $.ajax({
      url: '/api/'+ID,
      accepts: 'application/json',
      type: 'DELETE',

      success: function(data){
        console.log(data)
        console.log(`Item ${ID} has been deleted`)
        window.location.href = '/'
          },
      error: function (jqXHR, textStatus, err) {
            console.log(textStatus);
        }
        })

  })
}

// Создание элемента
function createOneElement() {
  $('#create').on('click', function(){

    var requestData = {
      NotificationId: $('#NotificationId2').val(),
      PurchaseNumber: $('#PurchaseNumber').val(),
      DocPublishDate: $('#DocPublishDate').val(),
      PurchaseObjectInfo: $('#PurchaseObjectInfo').val(),
      PlacingWayCode: $('#PlacingWayCode').val(),
      ETPCode: $('#ETPCode').val(),
      MaxPriceSum: $('#MaxPriceSum').val()
    }
    // console.log(JSON.stringify(requestData))
    // console.log(requestData)

    $.ajax({
      url: '/api',
      accepts: 'application/json',
      type: 'POST',
      data: requestData,

      success: function(data){
        console.log(data)
        console.log(`Item has been created`)
        window.location.href = '/'
          },
      error: function (jqXHR, textStatus, err) {
            console.log(textStatus);
        }
        })

  })
}

// Обновление элемента
function updateOneElement() {
  $('#update').on('click', function(){
    var ID = $('#NotificationId2').val()

    var requestData = {
      NotificationId: $('#NotificationId2').val(),
      PurchaseNumber: $('#PurchaseNumber').val(),
      DocPublishDate: $('#DocPublishDate').val(),
      PurchaseObjectInfo: $('#PurchaseObjectInfo').val(),
      PlacingWayCode: $('#PlacingWayCode').val(),
      ETPCode: $('#ETPCode').val(),
      MaxPriceSum: $('#MaxPriceSum').val()
    }
    // console.log(JSON.stringify(requestData))
    // console.log(requestData)

    $.ajax({
      url: '/api/'+ID,
      accepts: 'application/json',
      type: 'PUT',
      data: requestData,

      success: function(data){
        console.log(data)
        console.log(`Item has been updated`)
        window.location.href = '/'
          },
      error: function (jqXHR, textStatus, err) {
            console.log(textStatus);
        }
        })

  })
}

$(document).ready(function() {
  var tbody = document.getElementById('tbody')
  // Собираем все данные в таблмицу
  function getNotifications() {
    $.ajax({
      url: '/api',
      accepts: 'application/json',
      type: 'GET',

      success: function(data){
        console.log(data)
        var html = ''
        // Отрисовываем элементы
        for(var i = 0; i<data.length; i++){
          html += `<tr>
                    <td>${data[i].NotificationId}</td>
                    <td>${data[i].PurchaseNumber}</td>
                    <td>${data[i].DocPublishDate}</td>
                    <td>${data[i].PurchaseObjectInfo}</td>
                    <td>${data[i].PlacingWayCode}</td>
                    <td>${data[i].ETPCode}</td>
                    <td>${data[i].MaxPriceSum}</td>
                  </tr>`
        }
        tbody.innerHTML = html
      }
    })
  }
  getNotifications();
  getOneElement();
  deleteOneElement();
  createOneElement();
  updateOneElement();
})
