let x = 0
$('#getname').submit(function(e){
    e.preventDefault();
    let name = $('#nam').val();
    document.getElementById('name').innerHTML = name;
    localStorage[0] = name;
    x = 1
});


$("#mon").click(function(){
    if (x == 1) {
        alert("You entered Name: " + localStorage[0]);
    } else {
        alert("You have no entered a name, go back");
        return false;
    }
});
$("#anim").click(function(){
    if (x == 1) {
        alert("You entered Name: " + localStorage[0]);
    } else {
        alert("You have no entered a name, go back");
        return false;
    }
});
$("#nba").click(function(){
    if (x == 1) {
        alert("You entered Name: " + localStorage[0]);
    } else {
        alert("You have no entered a name, go back");
        return false;
    }
});