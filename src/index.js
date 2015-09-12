/**
 * Imports
 */

import bindUrl from 'bind-url'

/**
 * Vars
 */

const types = ['GET_URL', 'SET_URL', 'BIND_URL']
const handlers = []

/**
 * Location effects
 */

function locationMiddleware (wnd = window) {
  return ({dispatch}) => {
    return next => action =>
      types.indexOf(action.type) !== -1
        ? Promise.resolve(handle(wnd, dispatch, action))
        : next(action)
  }
}

/**
 * Handler
 */

function handle (wnd, dispatch, action) {
  switch (action.type) {
    case 'GET_URL':
      return wnd.location.pathname + wnd.location.search
    case 'SET_URL':
      const url = action.payload.value

      action.payload.replace
        ? wnd.history.replaceState(null, null, url)
        : wnd.history.pushState(null, null, url)

      handlers.forEach(fn => dispatch(fn(url)))
      break
    case 'BIND_URL':
      const cb = action.payload.update
      bindUrl({wnd}, url => dispatch(cb(url)))
      handlers.push(cb)
      break
  }
}

/**
 * Exports
 */

export default locationMiddleware
