// 1. 사용자의 위치 좌표로 받기

const spawn = require('child_process').spawn;

// 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행
const result = spawn('python', ['location.py']);

// 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
result.stdout.on('data', function(data) {
    let res = data.toString();
    
    let re = /[\[\]\,]/g;
    let res_re = res.replace(re, "");
    
    let arr = []
    arr = res_re.split(" ");
    console.log(arr);

    return arr;
    // console.log(da);

});

// 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
result.stderr.on('data', function(data) {
    console.log(data.toString());
});

//https://openapi.gg.go.kr/Animalhosptl?Key=ed2b31b4c874414a9526862b6847be69&key&Type=json&pIndex=1&pSize=50&SIGUN_CD=41310 //동물병원 현황 API
//행정구역 API 인증키 : 99D1AB39-81A0-3C5B-B1A8-8AB589343AC3

let input = prompt("행정구역을 입력하세요");


const KEY = ed2b31b4c874414a9526862b6847be69;
SIGUN_CD = 


