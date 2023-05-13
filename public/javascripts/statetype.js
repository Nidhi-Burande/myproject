$(document).ready(function(){
    $.get('/services/fetchstatetype',{ajax:true},function(data){
        $.each(data,function(index,item){
            $('#sstate').append($('<option>').text(item.stype).val(item.sid))
        })
    })

$('#sstate').change(function(){
    $.get('/services/fetchcitytype',{ajax:true,stateid:$('#sstate').val()},function(data){  
      $('#scity').empty()
      $('#scity').append($('<option>').text('-Cities-'))
      $.each(data,function(index,item){
        $('#scity').append($('<option>').text(item.stypename).val(item.stypeid))
    
      })
    })
    })
  })
  