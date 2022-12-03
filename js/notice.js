let gridItems = document.querySelectorAll('.grid-item')

let goodsItem = document.querySelector('.goo')
let eventItem = document.querySelector('.eve')
let etcItem = document.querySelector('.et')
let allItem = document.querySelector('.all')


let goodsItems = document.querySelectorAll('.goods')
let eventItems = document.querySelectorAll('.event')
let etcItems = document.querySelectorAll('.etc')

let allItems = document.querySelectorAll('.all')

let changeColor = function(){
    i.style.backgroundColor = "#fff"
    i.style.color = "#2D4B70";
}


let clickGoods = function(){
    allItem.onclick = null;
    eventItem.onclick = null;
    etcItem.onclick = null;

    let li = [allItem, eventItem, etcItem];
    li.forEach(function(i){
        i.style.backgroundColor = "#fff"
        i.style.color = "#2D4B70";
    })

    goodsItem.style.backgroundColor = "#2D4B70";
    goodsItem.style.color = "#fff";

    for (let i =0; i<6; i++){
        gridItems[i].style.display = "none";
    }
    for(let i = 0; i<goodsItems.length; i++){
        goodsItems[i].style.display = "flex";
    }    
}
let clickAll = function(){
    goodsItem.onclick = null;
    eventItem.onclick = null;
    etcItem.onclick = null;

    let li = [goodsItem, eventItem, etcItem];
    li.forEach(function(i){
        i.style.backgroundColor = "#fff"
        i.style.color = "#2D4B70";
    })


    allItem.style.backgroundColor = "#2D4B70";
    allItem.style.color = "#fff";

    for (let i =0; i<6; i++){
        gridItems[i].style.display = "flex";
    }

}
let clickEvent = function(){
    allItem.onclick = null;
    goodsItem.onclick = null;
    etcItem.onclick = null;

    let li = [goodsItem, allItem, etcItem];
    li.forEach(function(i){
        i.style.backgroundColor = "#fff"
        i.style.color = "#2D4B70";
    })

    eventItem.style.backgroundColor = "#2D4B70"
    eventItem.style.color = "#fff";

    for (let i =0; i<6; i++){
        gridItems[i].style.display = "none";
    }
    for(let i = 0; i<eventItems.length; i++){
        eventItems[i].style.display = "flex";
    }        

}
let clickEtc = function(){
    allItem.onclick = null;
    goodsItem.onclick = null;
    eventItem.onclick = null;

    let li = [goodsItem, eventItem, allItem];
    li.forEach(function(i){
        i.style.backgroundColor = "#fff"
        i.style.color = "#2D4B70";
    })

    etcItem.style.backgroundColor = "#2D4B70"
    etcItem.style.color = "#fff";

    for (let i =0; i<6; i++){
        gridItems[i].style.display = "none";
    }
    for(let i = 0; i<etcItems.length; i++){
        etcItems[i].style.display = "flex";
    }   
}

eventItem.addEventListener("click", clickEvent)
etcItem.addEventListener("click", clickEtc)
allItem.addEventListener("click", clickAll);
goodsItem.addEventListener("click", clickGoods);

