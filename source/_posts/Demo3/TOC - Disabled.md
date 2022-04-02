---
title: TOC - Disabled
date: 2019/11/15 23:02:42
tags: [Dev, JavaScript, Typescript]
toc: false
---

> 这篇文章在 yaml 顶部添加了
> 
> ```
> toc:false
> ```
> 
> 将不会显示右侧的浮动 TOC



------

# Typescript with Eslint


Firstly you may need to install `eslint`

```
npm install eslint
```

Then init and create a config fiel:

```
eslint --init
```

And choose the style you want, and then it will automatically install all necessary dependencies. For example for `Airbnb` Standard we may need to install:

```
eslint-plugin-react@^7.14.3
@typescript-eslint/eslint-plugin@latest
eslint-config-airbnb@latest
eslint@^5.16.0||^6.1.0
eslint-plugin-import@^2.18.2
eslint-plugin-jsx-a11y@^6.2.3
eslint-plugin-react-hooks@^1.7.0
@typescript-eslint/parser@latest
```

Make sure all packages installed, then you can install eslint plugin/extension from your IDE, the configured eslint should work now.


## Troubleshooting 

### Unable to resolve path for `.tsx`

```
Unable to resolve path to module './serviceWorker'.eslint(import/no-unresolved)
```

You just need to add 1 more properties into `.eslintrc.json` configuration file:


```json
{
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
  ...
}
```

### JSX not allowed in files with extension '.tsx'


```json
    "rules": {
        "react/jsx-filename-extension": [
            1,
            {
                "extensions": [
                    ".js",
                    ".tsx",
                    ".jsx"
                ]
            }
        ],
    },
```


### Typescript interface shows unused


```ts
import {
  iStates
} from './Interfaces';
// iState shows error that no-unused-vars

class CommentTree extends React.Component<iStates> {
...
}
```


```json
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended"

```

## Reference

- [https://stackoverflow.com/questions/55198502/using-eslint-with-typescript-unable-to-resolve-path-to-module](https://stackoverflow.com/questions/55198502/using-eslint-with-typescript-unable-to-resolve-path-to-module)
- [https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript](https://stackoverflow.com/questions/57802057/eslint-configuring-no-unused-vars-for-typescript)


