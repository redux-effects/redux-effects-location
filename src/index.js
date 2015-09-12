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

  return ({dispatch}) => next => action =>
    types.indexOf(action.type) !== -1
      ? Promise.resolve(handle(wnd, dispatch, action))
      : next(action)
}

/**
 * Handler
 */

function handle (wnd, dispatch, action) {
  switch (action.type) {
    case 'GET_URL':
      return wnd.location.pathname + wnd.location.search
    case 'SET_URL':
      const url = wnd.location.origin + action.value
      action.replace
        ? location.replace(url)
        : location.assign(url)
      break
    case 'BIND_URL':
      bindUrl({wnd}, url => dispatch(action.update(url)))
      break
  }
}

/**
 * Exports
 */

export default locationMiddleware
