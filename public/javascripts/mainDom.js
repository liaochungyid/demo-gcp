let body
let sidebarChildren
let sidebarClassList = []

window.onload = function() {
  body = document.querySelector('body')
  sidebarChildren = document.querySelector('.sidebar').children

  for (let i=0; i<sidebarChildren.length; i++) {
    sidebarClassList.push(sidebarChildren[i].classList[1])
  }

  body.addEventListener('click', onBodyClick)
}

onBodyClick = function(event) {
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