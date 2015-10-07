
# redux-effects-location

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

redux-effects middleware for dealing with location/url

## Installation

    $ npm install redux-effects-location

## Installing the middleware

```javascript
import location from 'redux-effects-location'

applyMiddleware(location(window))(createStore)

## Usage

  * `location.getUrl()` - Returns an action that gets the current url, and passes it to any bound handlers listed in `meta.steps`.
  * `location.setUrl(url)` - Returns an action that sets the current url to `url`.
  * `location.bindUrl(fn)` - Binds all future url changes to a function `fn` which accepts a single parameter (the new url), and returns an action to dispatch.


## Example - Binding a redux action to location changes

```javascript
import {bindUrl} from 'redux-effects-location'
import {createAction} from 'redux-actions'

const newRoute = createAction('NEW_ROUTE')

function initializeApp () {
  return bindUrl(newRoute)
}

function stateReducer (state, action) {
  if (action.type === 'NEW_ROUTE') {
    state = {
      ...state,
      route: router(action.payload)
    }
  }

  return state
}
```



## License

The MIT License

Copyright &copy; 2015, Weo.io &lt;info@weo.io&gt;

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
