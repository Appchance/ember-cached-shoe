# ember-cached-shoe

This addon tries to improve `ember-cli-fastboot` rehydration process. App served by `fastboot` server resolves model hooks twice - in node.js environment and in the browser. This behaviour leads to making redundant requests and causes additonal slowdown after initial load.

This addon solves this problem.

## Installation

`ember install ember-cached-shoe`

## Usage

Add to your `app/adapters/application.js`:

```javascript
import Ember        from 'ember'
import DS           from 'ember-data'
import CachedShoe   from 'ember-cached-shoe

export default  DS.JSONAPIAdapter.extend(CachedShoe, {
  // code ommited
})
```

It works with any type of adapter that implements `ajax` function (e.g. `JSONAPIAdapter`, `RESTAdapter`). Since now, second resolvation of model hooks, will serve cached response.

`app/routes/my-route.js`:

```javascript
import Ember from 'ember'

export default  Ember.Route.extend({
  model() {
    this.store.findAll('posts') // called twice, second call serves cached response
  }
})
```

## How it works

It leverages capabilities of `fastboot.shoebox` to store results of ajax calls performed on the server. Special token is generated for each request (based on url and data). Response is stored in `shoebox` under that token.
