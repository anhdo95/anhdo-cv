import '@/sass/main.scss'

if (navigator.serviceWorker) {
  navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('[Service Worker] Registered')
    })
}

let deferredPrompt
const sidebarButton = document.querySelector('.sidebar__button')

function handleBeforeInstallPrompt(event) {
  // Prevent the mini-infobar from appearing on mobile
  event.preventDefault()
  // Stash the event so it can be triggered later.
  deferredPrompt = event
}

function handleSidebarButtonClick(event) {
  if (deferredPrompt) {
    deferredPrompt.prompt()
  
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
    })
  
    deferredPrompt = null

    window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    sidebarButton.removeEventListener('click', handleSidebarButtonClick)
  }
}

window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
sidebarButton.addEventListener('click', handleSidebarButtonClick)
