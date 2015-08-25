/**
 * Imports
 */

import bindUrl from 'bind-url'

/**
 * Vars
 */

const types = ['GET_URL', 'SET_URL', 'BIND_URL']

/**
 * Location effects
 */

function locationMiddleware (wnd) {
  wnd = wnd || window

  return ({dispatch}) => next => effect =>
    types.indexOf(effect.type) !== -1
      ? handle(wnd, dispatch, effect)
      : next(effect)
}

/**
 * Handler
 */

function handle (wnd, dispatch, effect) {
  switch (effect.type) {
    case 'GET_URL':
      return wnd.location.pathname + wnd.location.search
    case 'SET_URL':
      const url = wnd.location.origin + effect.value
      effect.replace
        ? location.replace(url)
        : location.assign(url)
      break
    case 'BIND_URL':
      bindUrl({wnd}, url => dispatch(effect.update(url)))
      break
  }
}

/**
 * Exports
 */

export default locationMiddleware
