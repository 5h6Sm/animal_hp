// document.write(<script src="js/main.js"></script>)

//https://openapi.gg.go.kr/Animalhosptl?Key=ed2b31b4c874414a9526862b6847be69&key&Type=json&pIndex=1&pSize=50&SIGUN_CD=41310 //동물병원 현황 API
//행정구역 API 인증키 : 99D1AB39-81A0-3C5B-B1A8-8AB589343AC3

const inp = () =>{
    let SIGUN_NM = prompt("행정구역을 입력하세요(시까지 포함하여 작성)", "");

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
    let check = document.querySelector("#jsonCheck");
    let list_total_count = parseInt(json['Animalhosptl'][0]['head'][0]['list_total_count']);
    console.log(check);

    try {
        if (json['Animalhosptl'][0]['head'][1]['RESULT']['CODE'] == 'INFO-000'){
            for(let i = 0; i<list_total_count; i++){
                if(json['Animalhosptl'][1]['row'][`${i}`]['BSN_STATE_NM'] != '폐업'){
                    try{
                        let str = json['Animalhosptl'][1]['row'][`${i}`]['BIZPLC_NM'];
                        check.innerHTML += str + ' ';
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

inp();

