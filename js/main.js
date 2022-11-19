// document.write(<script src="js/main.js"></script>)

//https://openapi.gg.go.kr/Animalhosptl?Key=ed2b31b4c874414a9526862b6847be69&key&Type=json&pIndex=1&pSize=50&SIGUN_CD=41310 //동물병원 현황 API
//행정구역 API 인증키 : 99D1AB39-81A0-3C5B-B1A8-8AB589343AC3

const inp = (SIGUN_NM) =>{

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

const printJson = (json) => {
    let check = document.querySelector("#show_hp_list");
    let count = parseInt(json['Animalhosptl'][0]['head'][0]['list_total_count']);

    try {
        if (json['Animalhosptl'][0]['head'][1]['RESULT']['CODE'] == 'INFO-000'){
            for(let i = 0; i<count; i++){
                if(json['Animalhosptl'][1]['row'][`${i}`]['BSN_STATE_NM'] != '폐업'){
                    try{
                        let insert_li = document.createElement("li");
                        let add_li = check.appendChild(insert_li);
                        add_li.innerText = json['Animalhosptl'][1]['row'][`${i}`]['BIZPLC_NM'];
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
}

let searchBtn = document.querySelector("#addArea");
searchBtn.addEventListener("click", function(){
    let SIGUN_NM = document.querySelector("#inputArea").value;
    inp(SIGUN_NM);
});

inp();


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



var mapContainer = document.getElementById('map'), // 지도를 표시할 div 
    mapOption = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567), // 지도의 중심좌표
        level: 1 // 지도의 확대 레벨
    };  

// 지도를 생성합니다    
var map = new kakao.maps.Map(mapContainer, mapOption); 

// 주소-좌표 변환 객체를 생성합니다
var geocoder = new kakao.maps.services.Geocoder();

var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
    infowindow = new kakao.maps.InfoWindow({zindex:1}); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

// 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
searchAddrFromCoords(map.getCenter(), displayCenterInfo);

// 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    searchDetailAddrFromCoords(mouseEvent.latLng, function(result, status) {
        if (status === kakao.maps.services.Status.OK) {
            var detailAddr = !!result[0].road_address ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>' : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';
            
            var content = '<div class="bAddr">' +
                            '<span class="title">법정동 주소정보</span>' + 
                            detailAddr + 
                        '</div>';

            // 마커를 클릭한 위치에 표시합니다 
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }   
    });
});

// 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
kakao.maps.event.addListener(map, 'idle', function() {
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);
});

function searchAddrFromCoords(coords, callback) {
    // 좌표로 행정동 주소 정보를 요청합니다
    geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);         
}

function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
}

// 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
function displayCenterInfo(result, status) {
    if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById('centerAddr');

        for(var i = 0; i < result.length; i++) {
            // 행정동의 region_type 값은 'H' 이므로
            if (result[i].region_type === 'H') {
                infoDiv.innerHTML = result[i].address_name;
                break;
            }
        }
    }    
}