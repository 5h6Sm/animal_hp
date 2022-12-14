let text = document.querySelector(".text")
let index = 0;

var recordbtn = document.querySelector(".recordbtn");
var recordData = document.querySelector(".recordData");
var todolist = document.querySelector(".todolist");


function localCheck() {
  if (localStorage.getItem("todolist") == null) {
    localStorage.setItem("todolist", "[]");
  }
}
localCheck();

function dataUpdate() {
  var dataLocal = localStorage.getItem("todolist");
  var dataLocalAry = JSON.parse(dataLocal);

  var dataLen = dataLocalAry.length;
  var str = "";
  for (let i = 0; i < dataLen; i++) {
    str +=
      '<li class="list-group-item d-flex"><span>' +
      dataLocalAry[i] +
      '</span><button data-num="' +
      i +
      '" type="button" class="btn btn-outline-secondary ml-auto border-0 btnCancel">X</button></li>';
  }
  todolist.innerHTML = str;
}


dataUpdate();


function dataSave(e) {
  var dataLocal = localStorage.getItem("todolist");
  var dataLocalAry = JSON.parse(dataLocal);
  dataLocalAry.push(recordData.value);
  var dataLocalStr = JSON.stringify(dataLocalAry);
  localStorage.setItem("todolist", dataLocalStr);
  dataUpdate();
  recordData.value = "";
}
recordbtn.addEventListener("click", dataSave, false);


// var btnCancel = document.querySelector(".btnCancel");
function dataCancel(e) {
  if (e.target.nodeName !== "BUTTON") {
    return;
  }
  var num = e.target.dataset.num;
  var dataLocal = localStorage.getItem("todolist");
  var dataLocalAry = JSON.parse(dataLocal);
  dataLocalAry.splice(num, 1);
  localStorage.setItem("todolist", JSON.stringify(dataLocalAry));
  dataUpdate();
}

todolist.addEventListener("click", dataCancel, false);

let showMenu = document.querySelector('.nav-list2');
let btn = document.querySelector('.menu');

btn.addEventListener("click", function(){
    showMenu.classList.toggle('showMenu') 
})


const toggleMenu = (toggleId, navListId) => {
    const toggle = document.getElementById(toggleId);
    const navList = document.getElementById(navListId);
    const toggleIcon = toggle.getElementsByTagName("i")[0];


    if(toggle && navList){
        //add : ??????, remove : ??????, toggle : ??????/??????
        toggle.addEventListener('click', () =>{
            console.log("asfd")
            //toggle menu   
            // navList.classList.toggle('show-menu');
            //change toggle icon : bx-menu <-> bx-x-circle
            toggleIcon.classList.toggle("bx-menu");
            toggleIcon.classList.toggle("bx-x");


        });
    }

}
toggleMenu('menu', 'nav-list2');