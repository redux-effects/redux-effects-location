/**
 * Imports
 */

import bindRealUrl from 'bind-url'

/**
 * Action types
 */

const GET_URL = 'EFFECT_GET_URL'
const SET_URL = 'EFFECT_SET_URL'
const BIND_URL = 'EFFECT_BIND_URL'
const BACK = 'EFFECT_BACK'

/**
 * Vars
 */

const types = [GET_URL, SET_URL, BIND_URL]
const handlers = []

/**
 * Location effects
 */

function locationMiddleware (wnd = window) {
  const handle = typeof wnd === 'string' ? serverHandle : browserHandle

  return ({dispatch}) => {
    return next => action =>
      types.indexOf(action.type) !== -1
        ? Promise.resolve(handle(wnd, dispatch, action))
        : next(action)
  }
}

/**
 * Server handler
 */

function serverHandle (url, dispatch, action) {
  switch (action.type) {
    case GET_URL:
      return url
    case BIND_URL:
      const cb = action.payload.update
      setTimeout(() => dispatch(cb(url)))
      break
  }
}

/**
 * Browser handler
 */

function browserHandle (wnd, dispatch, action) {
  switch (action.type) {
    case GET_URL:
      return wnd.location.pathname + wnd.location.search
    case SET_URL:
      const url = action.payload.value

      action.payload.replace
        ? wnd.history.replaceState(null, null, url)
        : wnd.history.pushState(null, null, url)

      handlers.forEach(fn => dispatch(fn(url)))
      break
    case BIND_URL:
      const cb = action.payload.update
      bindRealUrl({wnd}, url => dispatch(cb(url)))
      handlers.push(cb)
      break
    case BACK:
      wnd.history.back()
      break
  }
}

/**
 * Action creators
 */

function getUrl () {
  return {
    type: GET_URL
  }
}

function setUrl (url, replace) {
  return {
    type: SET_URL,
    payload: {
      value: url,
      replace
    }
  }
}

function bindUrl (fn) {
  return {
    type: BIND_URL,
    payload: {
      update: fn
    }
  }
}

function back () {
  return {
    type: BACK
  }
}

/**
 * Exports
 */

export default locationMiddleware
export {
  getUrl,
  setUrl,
  bindUrl,
  back
}
