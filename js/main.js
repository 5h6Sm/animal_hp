// document.write(<script src="js/main.js"></script>)

//https://openapi.gg.go.kxr/Animalhosptl?Key=ed2b31b4c874414a9526862b6847be69&key&Type=json&pIndex=1&pSize=50&SIGUN_CD=41310 //동물병원 현황 API
//행정구역 API 인증키 : 99D1AB39-81A0-3C5B-B1A8-8AB589343AC3

let inp = (SIGUN_NM) =>{

    const KEY = "ed2b31b4c874414a9526862b6847be69";

    let url = `https://openapi.gg.go.kr/Animalhosptl?`
                +`Key=${KEY}`
                +`&Type=json&`
                +`SIGUN_NM=${SIGUN_NM}`;

    console.log(url);

    fetch(url) //요청하기
    .then(reponse => reponse.json()) //응답 온 데이터 -> json
    .then(json => printJson(json))

};

let address = [];

let printJson = (json) => {
    let check = document.querySelector("#show_hp_list");
    let count = parseInt(json['Animalhosptl'][0]['head'][0]['list_total_count']);
    let positions = new Array(); //객체 담는 배열

    let myHang = document.querySelector(".hpHang");
    let myLatLon = document.querySelector(".hpLatLon");
    let myaddress = document.querySelector(".hpAddress");
    let myTitle = document.querySelector(".hpTitle");

    if(myaddress.innerText == 'undefined'){
        myaddress.innerText = "";
    }

    if(count>200){
        count = 100;
    }
    
    try {
        if (json['Animalhosptl'][0]['head'][1]['RESULT']['CODE'] == 'INFO-000'){
                check.textContent = "";
            for(let i = 0; i<count; i++){
                if(json['Animalhosptl'][1]['row'][`${i}`]['BSN_STATE_NM'] != '폐업'){
                    try{
                        let insert_li = document.createElement("li");
                        let add_li = check.appendChild(insert_li);
                        add_li.innerText = json['Animalhosptl'][1]['row'][`${i}`]['BIZPLC_NM'];
                        let addin = {
                            title : json['Animalhosptl'][1]['row'][`${i}`]['BIZPLC_NM'],
                            address : json['Animalhosptl'][1]['row'][`${i}`]['REFINE_LOTNO_ADDR'],
                            latlng: new kakao.maps.LatLng(json['Animalhosptl'][1]['row'][`${i}`]['REFINE_WGS84_LAT'], json['Animalhosptl'][1]['row'][`${i}`]['REFINE_WGS84_LOGT'])
                        }
                        positions.push(addin);  
                        }catch{
                        
                    }
                }
            }   
        }
    }catch{
        check.innerText = "없음";
    }
  
    let sa = new Array();
    var marker_s;
    // 마커 이미지의 이미지 주소입니다
    var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    for (var i = 0; i < positions.length; i ++) {
        
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35); 
        
        // 마커 이미지를 생성합니다    
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        

        // 마커를 생성합니다
        marker_s = {
            map: map, // 마커를 표시할 지도
            position: positions[i].latlng, // 마커를 표시할 위치
            title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
            image : markerImage, // 마커 이미지 
            clickable: true,
            address : positions[i].address,
            index : i
        };

        var marker = new kakao.maps.Marker(marker_s);
        sa.push(marker_s);

         // 마커에 표시할 인포윈도우를 생성합니다 
        var infowindow = new kakao.maps.InfoWindow({
            content: positions[i].title // 인포윈도우에 표시할 내용
         });

        kakao.maps.event.addListener(marker, 'click', makeOverListener(map, marker, infowindow)
        );
        kakao.maps.event.addListener(marker, 'mouseout', 
            makeOutListener(infowindow)
        );
     }   

    function makeOverListener(map, marker, infowindow) {
        return function() {
            infowindow.open(map, marker);
            
            myHang.innerText = document.querySelector("#inputArea").value;
            
            for(let i = 0; i<positions.length; i++){
                if(marker.Gb == positions[i].title){
                    // console.log(sa[i].index);    
                    myLatLon.innerText = sa[i].position;
                    myaddress.innerText = sa[i].address;
                }
            }
        };
    }
    function makeOutListener(infowindow) {
        return function() {
            infowindow.close();
        };
    }
}

let searchBtn = document.querySelector("#addArea");
searchBtn.addEventListener("click", function(){
    let SIGUN_NM = document.querySelector("#inputArea").value;
    inp(SIGUN_NM);
});

//사용자의 위도, 경도 표시
function pog() {        
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition (function(pos) {
            $('#latitude').html(pos.coords.latitude);     // 위도
            $('#longitude').html(pos.coords.longitude); // 경도
        });
    } else {
        alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    }
};

pog();

const toggleMenu = (toggleId, navListId) => {
    const toggle = document.getElementById(toggleId);
    const navList = document.getElementById(navListId);
    const toggleIcon = toggle.getElementsByTagName("i")[0];

    if(toggle && navList){
        //add : 추가, remove : 제거, toggle : 추가/제거
        toggle.addEventListener('click', () =>{
            //toggle menu
            // navList.classList.toggle('show-menu');
            //change toggle icon : bx-menu <-> bx-x-circle
            toggleIcon.classList.toggle("bx-menu");
            toggleIcon.classList.toggle("bx-x");
        });
    }
}
