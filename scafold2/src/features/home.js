import HtmlCache from '../html-cache.js'
import { RouterService } from '../services/route/index.js'

const HomeCtrl = (req, next) => {
  req.load(HtmlCache.get('home'))
  const temp = document.querySelector('template')
  document.querySelector('.home-page').insertAdjacentHTML('beforeend', temp.innerHTML)
  next()
}

RouterService
  .defaultPath(HomeCtrl)
