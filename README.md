# @kegovc/schema2joi

**A layer between Joi and your implementation in order to have a dynamic validation schema**
## Installation

```sh
npm install schema2joi
```
#####or

```sh
yarn add schema2joi
```

### Example

**schema2joi** allows you to describe your data using a simple language based on json schemas, to pass it to a schema-joi. **schema2joi** uses all the benefits of the **joi** object using the waterfall paradigm.

#### Example

```js
const schema2joi = require('@kegovc/schema2joi')

const schema = schema2joi({
    username:{
        type: 'alphanum',
        min: 3,
        max: 30,
        required: true,
    },
    password:{
        type: 'string',
        pattern: /^[a-zA-Z0-9]{3,30}$/
    }
    repeat_password: {
        ref: 'password'
    }
    access_token: [
        {
            type: 'string'
        },
        {
            type: 'number'
        },
    ],
    birth_year:{
        type: 'number',
        format: 'integer',
        min: 1900,
        max: 2013,
    },
    email: {
        type: 'string',
        format: {
            fun:'email',
            param:{ 
                minDomainSegments: 2, 
                tlds: { 
                    allow: ['com', 'net'] 
                } 
            }
        },
    },
    extras: {
        type: 'object',
        properties: {
            val: {
                type: 'string'
            },
            val2: {
                type: 'number',
                required: true,
            }
        }
    }
    
}) 
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');


const val1 = schema.validate({ username: 'abc', birth_year: 1994 });
console.log(val1.error)
// -> { value: { username: 'abc', birth_year: 1994 } }

const val2 = schema.validate({});
console.log(val2.error)
// -> { value: {}, error: '"username" is required' }

// Also -

try {
    const valueAsync = await schema.validateAsync({ 
        username: 'abc', 
        birth_year: 1994 
    });
}
catch (err) {
    console.log('errorAsync', err)
 }
```


#### The most powerful schema description language and data validator for JavaScript

## [JOI](https://github.com/sideway/joi)

#### The most powerful schema description language and data validator for JavaScript.

### Visit the [hapi.dev](https://hapi.dev) Developer Portal for tutorials, documentation, and support

## Useful resources

- [Documentation and API](https://github.com/sideway/joi/blob/master/API.md)
- [Versions status](https://hapi.dev/resources/status/#joi)
- [Changelog](https://hapi.dev/family/joi/changelog/)
- [Project policies](https://hapi.dev/policies/)
- [Free and commercial support options](https://hapi.dev/support/)