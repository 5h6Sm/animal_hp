//py 파일 결과값 js로 받기

//사용자의 위치 좌표로 받기

const spawn = require('child_process').spawn;

//spawn을 통해 "python 파이썬파일.py" 명령어 실행
const result = spawn('python', ['location.py']);

function ex(){
    // stdout의 'data'이벤트리스너로 실행결과를 받는다.
    result.stdout.on('data', function(data) {
        let res = data.toString();
        
        let re = /[\[\]\,]/g;
        let res_re = res.replace(re, "");
    
        // console.log(res_re);
        
        let arr = []
        arr = res_re.split(" ");
        console.log(arr);
        return arr;
    });
}
ex();









// 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
// result.stderr.on('data', function(data) {
//     console.log(data.toString());
// });




