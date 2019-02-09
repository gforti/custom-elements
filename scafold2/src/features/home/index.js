import HtmlCache from '../../html-cache.js'
import { RouterService } from '../../services/route/index.js'

const HomeCtrl = (req, next) => {
  req.load(HtmlCache.get('default'))
  next()
}

RouterService
  .defaultPath(HomeCtrl)
