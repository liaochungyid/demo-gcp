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
  let clickTarget

  // sidebar click action
  clickTarget = sidebarClassList.filter((className) => {
    return isClickPathContain(event.path, className)
  })[0]

  if (clickTarget) {
    iconColorSwap(document.querySelector(`a.icon.${clickTarget} .icon-svg`), sidebarChildren)
    return
  }

  // header menu click action
  clickTarget = isClickPathContain(event.path, 'menu')

  if (clickTarget) {
    document.querySelector('section.sidebar').classList.toggle('wide')
    return
  }

  // always remove sidebar wide class, if click any other place
  document.querySelector('section.sidebar').classList.remove('wide')

  // login click action
  clickTarget = isClickPathContain(event.path, 'login')

  if (clickTarget) {
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

  // logout click action
  clickTarget = isClickPathContain(event.path, 'logout')

  if (clickTarget) {
    axios.get('/logout')
      .then((response) => {
        if (response.status === 200) return window.location = '\\'
      })
      .catch(e => console.log(e))
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
function iconColorSwap(node, otherNodes) {
  for (let i=0; i<otherNodes.length; i++) {
    otherNodes[i].classList.remove('active')
    const target = otherNodes[i].firstElementChild.firstElementChild
    target.style.display = 'block'
    target.nextElementSibling.style.display = 'none'
  }
  node.parentElement.classList.add('active')
  node.firstElementChild.style.display = 'none'
  node.firstElementChild.nextElementSibling.style.display = 'block'
}