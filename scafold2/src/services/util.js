function displayError(message) {
  displayNotification(message, 'error', '10')
}

function displayNotification(message, status = 'success', duration = '5') {
  const notification = document.querySelector('notification-bar')
  if (notification) {
    notification.dataset.status = status
    notification.dataset.duration = duration
    notification.dataset.message = ''
    notification.dataset.message = message
  }
}

function isContentLoading(loading) {
  document.querySelector('content-loader').dataset.loading = loading.toString()
}

function getRandomNumberBetween(min = 0, max = 10) {
  return Math.floor(Math.random() * max) + min
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: '2-digit',
    year: '2-digit',
  })
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
  })
}

function stringToHTML(html = '') {
  const doc = new DOMParser().parseFromString(html, 'text/html')
  return doc.body.innerHTML.toString()
}

function safeInnerHTML(html = '') {
  return html.toString().replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\//g, '&#x2F;')
}

function filterArrObjByKeys(keys, arr) {
  return arr.map(obj =>
    keys.reduce((acc, cv) => {
      if(obj, obj.hasOwnProperty(cv)) {
        acc[cv] = obj[cv]
      }
      return acc
    }, {})
  )
}

function interpolate(template, params) {
  const keys = Object.keys(params)
  const keyVals = Object.values(params).map(safeInnerHTML)
  return new Function(...keys, `return \`${template}\``)(...keyVals)
}

function truncate(str, max = 30) {
  return str.length > max ? str.slice(0, max).padEnd(max+3, '.') : str
}

export {
  displayError,
  displayNotification,
  filterArrObjByKeys,
  formatDate,
  formatTime,
  interpolate,
  isContentLoading,
  getRandomNumberBetween,
  safeInnerHTML,
  stringToHTML,
  truncate,
}
