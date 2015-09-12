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
  // Setup listener
  bindUrl({wnd}, url => run(url))

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
      const url = wnd.location.origin + action.payload.value

      action.payload.replace
        ? wnd.history.replaceState(null, null, url)
        : wnd.history.pushState(null, null, url)

      run(url)
      break
    case 'BIND_URL':
      handlers.push(url => dispatch(action.payload.update(url)))
      break
  }
}

function run (url) {
  handlers.forEach(fn => fn(url))
}

/**
 * Exports
 */

export default locationMiddleware
