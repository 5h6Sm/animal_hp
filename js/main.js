// document.write(<script src="js/main.js"></script>)

//https://openapi.gg.go.kxr/Animalhosptl?Key=ed2b31b4c874414a9526862b6847be69&key&Type=json&pIndex=1&pSize=50&SIGUN_CD=41310 //동물병원 현황 API
//행정구역 API 인증키 : 99D1AB39-81A0-3C5B-B1A8-8AB589343AC3

let inp = (SIGUN_NM) =>{

    const KEY = "ed2b31b4c874414a9526862b6847be69";

    let url = `https://openapi.gg.go.kr/Animalhosptl?`
                +`Key=${KEY}`
                +`&Type=json&pIndex=1&pSize=200&`
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
    let add_li;
    try {
        if (json['Animalhosptl'][0]['head'][1]['RESULT']['CODE'] == 'INFO-000'){
            for(let i = 0; i<count; i++){
                if(json['Animalhosptl'][1]['row'][`${i}`]['BSN_STATE_NM'] != '폐업'){
                    try{
                        let insert_li = document.createElement("li");
                        add_li = check.appendChild(insert_li);
                        add_li.innerText = json['Animalhosptl'][1]['row'][`${i}`]['BIZPLC_NM'];
                        address += json['Animalhosptl'][1]['row'][`${i}`]['REFINE_LOTNO_ADDR'] + ', ';
                        // let str = json['Animalhosptl'][1]['row'][`${i}`]['BIZPLC_NM'];
                        // check.innerHTML += str + ' ';
                        
                    }catch{
                        check.innerHTML += "폐업";
                    }
                }
            }   
        }
    }catch{
        check.innerHTML = "없음";
    }

    // for (let i of address){
    //     geocoder.addressSearch(`${i}`, function(result, status) {
    
    //         // 정상적으로 검색이 완료됐으면 
    //          if (status === kakao.maps.services.Status.OK) {
        
    //             var coords = new kakao.maps.LatLng(lat, lon);
        
    //             // 결과값으로 받은 위치를 마커로 표시합니다
    //             var marker = new kakao.maps.Marker({
    //                 map: map,
    //                 position: coords
    //             });
        
    //             // 인포윈도우로 장소에 대한 설명을 표시합니다
    //             var infowindow = new kakao.maps.InfoWindow({
    //                 content: '<div style="width:150px;text-align:center;padding:6px 0;">현재위치</div>'
    //             });
    //             infowindow.open(map, marker);
        
    //             // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
    //             map.setCenter(coords);
    //         } 
    //     });    
        
    // }
    
    var positions = new Array(count);

    for (let i=0; i< count; i++){
        console.log(check.children[i].innerText);
        // let m = {
        //     title : `${add_li[i]}`
        // };
        // positions.push(m);
    }
    console.log(positions);
    
    
    // 마커 이미지의 이미지 주소입니다
    // var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png"; 
        
    // for (var i = 0; i < positions.length; i ++) {
        
    //     // 마커 이미지의 이미지 크기 입니다
    //     var imageSize = new kakao.maps.Size(24, 35); 
        
    //     // 마커 이미지를 생성합니다    
    //     var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize); 
        
    //     // 마커를 생성합니다
    //     var marker = new kakao.maps.Marker({
    //         map: map, // 마커를 표시할 지도
    //         position: positions[i].latlng, // 마커를 표시할 위치
    //         title : positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
    //         image : markerImage // 마커 이미지 
    //     });
    // }
    
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
            // lat.innerText = pos.coords.latitude;
            // lon.innerText = pos.coords.longitude;
            $('#latitude').html(pos.coords.latitude);     // 위도
            $('#longitude').html(pos.coords.longitude); // 경도
        });
    } else {
        alert("이 브라우저에서는 Geolocation이 지원되지 않습니다.")
    }
};

pog();
