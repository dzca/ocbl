[1] list

```js
let tokens = [
  {
    code: 'xyz',
    token:'AABBCC'
  },
  {
    code: '2we',
    token:'MMKKRR'
  }
]

tokens.push({code: '2wt', token:'MMKKYY'},{})
let last_item = tokens.pop()

let token = _.find(tokens, function(item){ return item.code == 'xyz'; });
// token = { code: 'xyz', token:'AABBCC' }
let v = _.property('token')(token)
// v = AABBCC
```

[2] hash
```js
let tokens = {}
tokens['xyz']='AABBCC'
tokens['2we']='MMKKRR'

let token = _.property('xyz')(tokens);
```
