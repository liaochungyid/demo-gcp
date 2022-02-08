let body
let sidebarChildren
let sidebarClassList = []
let sectionBody

window.onload = function() {
  body = document.querySelector('body')
  sectionBody = document.querySelector('section.body')
  sidebarChildren = document.querySelector('.sidebar').children

  for (let i=0; i<sidebarChildren.length; i++) {
    sidebarClassList.push(sidebarChildren[i].classList[1])
  }

  body.addEventListener('click', onBodyClick)
}

function onBodyClick(event) {
  event.preventDefault()
  event.stopPropagation()

  // sidebar click action
  let clickTarget = sidebarClassList.filter((className) => {
    return isClickPathContain(event.path, className)
  })[0]

  if (clickTarget) {
    iconColorSwapAndLoad(clickTarget, sidebarChildren)
    return
  }

  // header menu click action (add wide class)
  if (isClickPathContain(event.path, 'menu')) {
    document.querySelector('section.sidebar').classList.toggle('wide')
    return
  }

  // always remove sidebar wide class, if click any other place
  document.querySelector('section.sidebar').classList.remove('wide')

  // login click action
  if (isClickPathContain(event.path, 'login')) {
    axiosLogin()
    return
  }

  // logout click action
  if (isClickPathContain(event.path, 'logout')) {
    axios.get('/logout', {
      withCredentials: true,
      validateStatus: function (status) {  return status < 500  }
    })
      .then((response) => {
        console.log(response)
        if (response.status < 400) return
        return console.log('Invalid authenticated user to logout')
      })
      .catch(e => console.log(e))
      .finally(() => window.location = '/')
    return
  }
}

function isClickPathContain(eventPath, className) {
  return eventPath.some((target, ind, arr) => {
    if (ind > arr.length - 5) return false
    if (!target.classList.contains(className)) return false
    return true
  })
}

// to swap icon color by display:block and display:none under the same node
// to swap side color bar by add/remove .active class
function iconColorSwapAndLoad(clickTarget, otherNodes) {
  const node = document.querySelector(`a.icon.${clickTarget} .icon-svg`)
  for (let i=0; i<otherNodes.length; i++) {
    otherNodes[i].classList.remove('active')
    const target = otherNodes[i].firstElementChild.firstElementChild
    target.style.display = 'block'
    target.nextElementSibling.style.display = 'none'
  }
  node.parentElement.classList.add('active')
  node.firstElementChild.style.display = 'none'
  node.firstElementChild.nextElementSibling.style.display = 'block'

  if (clickTarget === 'home') return window.location = '/'
  axios.get(`/api/${clickTarget}`, { withCredentials: true })
    .then((response) => {
      if (response.status !== 200) throw 'invalid user'
      sectionBody.innerHTML = response.data
    })
    .catch(e => {
      axiosLogin()
    })
}

// axios for login
function axiosLogin() {
  axios.get('/login')
    .then((response) => {
      if (response.status !== 200) return
      sectionBody.innerHTML = response.data

      const newScript = document.createElement('script')
      newScript.src = '/javascripts/loginAndOut.js'
      body.appendChild(newScript)
    })
    .catch(e => console.log(e))
}