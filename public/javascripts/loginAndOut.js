const loginButton = document.querySelector('section.body form button')

loginButton.addEventListener('click', function onLoginButtonClick(event) {
  if (loginButton.classList.contains('warning')) return
  axios.post('/login',
      { 
        account: document.querySelector('#account').value,
        password: document.querySelector('#password').value
      },
      {
        headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'}
      }
    )
    .then(response => {
      if (response.status === 200) return window.location = '\\'
    })
    .catch(e => {
      loginButton.innerText = '帳號或密碼錯誤！'
      loginButton.classList.add('warning')
      setTimeout(() => {
        loginButton.innerText = '登入'
        loginButton.classList.remove('warning')
      }, 2800)
    })
})