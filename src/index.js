/**
 * Imports
 */

import DeclarativePromise from 'declarative-promise'

/**
 * Vars
 */

const types = ['GET_URL', 'SET_URL', 'BIND_URL']

/**
 * Location effects
 */

function locationMiddleware (location) {
  location = location || window.location

  return ({dispatch}) => next => effect =>
    types.indexOf(effect.type) !== -1
      ? handle(location, dispatch, effect)
      : next(effect)
}

/**
 * Handler
 */

function handle (location, dispatch, effect) {
  switch (effect.type) {
    case 'GET_URL':
      return location.pathname + location.search
    case 'SET_URL':
      const url = location.origin + effect.value
      effect.replace
        ? location.replace(url)
        : location.assign(url)
      break
    case 'BIND_URL':
      bindUrl(function () {
        dispatch(effect.update(location.pathname + location.search))
      })
      break
  }
}

/**
 * Exports
 */

export default locationMiddleware