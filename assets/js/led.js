$(document).ready(function(){
  alert("HI2222");
    $(".led-red1").click(function(){
      var col="";
      col= $(".led-red").css("background-color");
      alert(col);
      /*  if (col="#F00"){
          $(".led-red").css("background-color", "#A00");
        }
        else {
          $(".led-red").css("background-color", "#F00");
        }*/
    });
});
