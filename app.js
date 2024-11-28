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







