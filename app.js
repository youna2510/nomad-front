// 회원가입 함수
async function signup(username, password, passwordConfirm) {
  console.log('회원가입 함수 호출');

  // 비밀번호 확인이 일치하지 않으면 오류 처리
  if (password !== passwordConfirm) {
      alert('비밀번호가 일치하지 않습니다!');
      return;
  }

  // 회원가입 요청
// app.js에서의 수정
  const response = await fetch('http://127.0.0.1:8000/signup/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: username,
        password: password,
        password_confirm: passwordConfirm,
    }),
  });


  if (response.ok) {
      const data = await response.json();
      console.log('회원가입 성공:', data);
      alert('회원가입이 성공적으로 완료되었습니다!');
      window.location.href = 'loginscreen.html';  // 로그인 페이지로 리디렉션
  } else {
      const errorData = await response.json();
      console.log('회원가입 실패:', errorData);
      alert('회원가입에 실패했습니다. 다시 시도해주세요.');
  }
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
  event.preventDefault();  // 폼 기본 제출 방지

  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;
  const passwordConfirm = document.getElementById('password-confirm').value;

  // 클릭되었다는 로그 출력
  console.log("완료 버튼이 클릭되었습니다!");

  // 값 확인용 로그
  console.log('아이디:', username);
  console.log('비밀번호:', password);
  console.log('비밀번호 확인:', passwordConfirm);

  // 회원가입 함수 호출
  signup(username, password, passwordConfirm);
});







//로그인 함수
async function login(username, password) {
  try {
    console.log('로그인 함수 호출');

    // 로그인 요청
    const response = await fetch('http://127.0.0.1:8000/login/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (response.ok) {
        const data = await response.json();
        console.log('로그인 성공:', data);

        const accessToken = data.access;  // 'access' 필드로 응답받았다고 가정
        const refreshToken = data.refresh;  // 'refresh' 필드로 응답받았다고 가정
        console.log(localStorage.getItem('accessToken'));  // accessToken이 잘 저장되었는지 확인
        console.log(localStorage.getItem('refreshToken'));  // refreshToken이 잘 저장되었는지 확인

        // 로컬 스토리지에 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);

        alert('로그인에 성공했습니다!');
        window.location.href = 'main.html';  // 로그인 성공 후 main.html로 리디렉션
    } else {
        const errorData = await response.json();
        console.log('로그인 실패:', errorData);
        alert('로그인에 실패했습니다. 아이디와 비밀번호를 다시 확인해주세요.');
    }
  } catch (error) {
    console.error('로그인 중 에러 발생:', error);
    alert('로그인 중 오류가 발생했습니다.');
  }
}


// 로그인 버튼 클릭 이벤트 처리
document.querySelector('.submit-btn-login').addEventListener('click', function(event) {
  event.preventDefault();  // 폼 기본 제출 방지

  const username = document.getElementById('name').value;
  const password = document.getElementById('password').value;

  // 클릭되었다는 로그 출력
  console.log("로그인 완료 버튼이 클릭되었습니다!");

  // 값 확인용 로그
  console.log('아이디:', username);
  console.log('비밀번호:', password);

  // 로그인 함수 호출
  login(username, password);
});



async function refreshAccessToken() {
  const refreshToken = localStorage.getItem('refreshToken');

  const response = await fetch('http://127.0.0.1:8000/refresh-token/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refreshToken })
  });

  if (response.ok) {
    const data = await response.json();
    const newAccessToken = data.access;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } else {
    console.log('토큰 갱신 실패');
    alert('로그인 세션이 만료되었습니다. 다시 로그인 해주세요.');
  }
};




