## Auth Store

#### 💡 Usage

- Add `auth` module

```js
// store/auth.js

import AuthStore from '~/.nuxt-modules/auth';

const authStore = new AuthStore({ /*opts*/ });

// Your customizations

export default authStore;
```

**Options**
- **default_user** : Default fields for `state.auth.user`. (overrides using Object.assign when logged-in).
- **token_cookie** : Token cookie opts. (see [js-cookie docs](https://github.com/js-cookie/js-cookie) for more info)
