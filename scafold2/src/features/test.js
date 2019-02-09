import { TestService, Util } from '../services/index.js'
import HtmlCache from '../html-cache.js'
import { RouterService } from '../services/route/index.js'

const testCtrl = (req, next) => {

  req.load(HtmlCache.get('test'))
  document.body.classList.add('test')

  function handlePayloadError(payload) {
    Util.isContentLoading(false)
    Util.displayError(payload)
  }

  function handlePayload(payload) {
    if (!Array.isArray(payload)) {
      return
    }

    const sortTable = document.querySelector('auto-sort')
    if (sortTable) {
      sortTable.render(payload)
    }

    Util.isContentLoading(false)
    Util.displayNotification(`New data loaded ${new Date().toLocaleTimeString('en-US')}`)
  }

  const subscription = TestService.subscribe({
    error: handlePayloadError.bind(this),
    next: handlePayload.bind(this),
  })

  document.querySelector('auto-sort').dataset.headers = JSON.stringify(TestService.HEADERS_LIST)
  TestService.resetPayload().getList()
  req.exit(() => {
    document.body.classList.remove('test')
    subscription.unsubscribe()
  })
  next()
}

RouterService
  .setPath('/test', testCtrl)
