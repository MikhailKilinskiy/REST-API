

//<script src="buttons.js"></script>
// Просмотр одного элемента
function getOneElement() {
 $('#select').on('click', function(){
   var ID = $('#NotificationId1').val()
     $.ajax({
       url: '/api/'+ID,
       accepts: 'application/json',
       type: 'GET',

       succes: function(data){
         console.log('Success')
         alert(data)
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
})
