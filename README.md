![picture alt](public/docs/pics/logo.png)
 
# Minimalist express/typescript clean boilerplate
- This is an [express](https://expressjs.com/) boilerplate based on [TypeScript](https://www.typescriptlang.org/),
you can clone it and start coding
- Cover [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) principles
- Please read [Official Documentation](https://tsejs.github.io/tse/).a
## What this includes? 
  * TypeScript compiler
  * [Express](https://expressjs.com/)
  * [Nodemon](https://nodemon.io/) watcher (hot reload)
  * Active sourcemap for debugging
  * [TS-lint](https://palantir.github.io/tslint/)
  * [ES6](http://es6-features.org/) support
  * [Mongoose](http://mongoosejs.com/) ORM
  * [MongoDB](https://mongodb.com/) connection
  * Multiple env
   * Standard API response
   * Middleware configurations
  * Basic CRUD
  
  ## How to start?
  1. Clone the repo `git clone https://github.com/binaryk/node-ts-boilerplate.git`
  2. `cd` to the working directory
  3. Run `yarn` or `npm install`
  4. Run `npm install -g tsc` (to install globally typescript transpiler)
  5. [Install MongoDB](https://docs.mongodb.com/manual/installation/) and run it (`mongod`)
  6. Run `npm watch` - to watch your file updates
  7. Open [postman](https://www.getpostman.com/) and try `GET: http://127.0.0.1:3000/sample`, you will receive:
  ![picture alt](public/docs/pics/express-response.png)
  8. Add your MongoDB configuration in `src/config/database.ts`
  7. Add your own routes in `src/routes`
  8. Add your own controllers in `src/controllers`
  9. Add your own models in `src/models`
  10. Enjoy development
   
   ## Config
   ### Database
   - `config/database.ts` is the configuration file for the database - Default mongo arguments are stored there
   ### Core
   - You can leave the black box of the core to configure your application, based on your defined routes and middlewares from the
   `config/middlewares.ts - middleware object`, or, you can do this manually in the `app.ts`:
  ```typescript
        this.core = new Core(this.app, {
            /**
             * Activate global middlewares from the `config/middeware.ts`
             */
            globalMiddleware: false
        });
        this.core.use(bodyParser.json());
        // this.core.use(/* other middleware function */)
        /*!important, init routes*/
        this.core.initRoutes();
``` 

  ## Standard Response object
  - API has a customizable [monkey patching](https://en.wikipedia.org/wiki/Monkey_patch), which extends the default `res` express object
  with a new function `respond`. This is useful to have a `Standard API Response` with the format: 
  ```typescript
            data: data,
            message: message,
            responseCode: responseCode
```
- To use this standard it's enough to write:
```typescript
        this.router.get('sample', (req, res, next) => {
            res.respond({
                foo: 'Standard data from API',
            }, `Standard message from API`, 201 )
        });
```
- Response from the server: 
![picture alt](public/docs/pics/standard-api.png)

  ## Group routes and define middleware
   - For CRUD `contact` instance you can use the `group` wrapper
   - Add prefix with middleware keys to the routes group like this:
   
  
```javascript
        this.router.group({
            prefix: 'contact',
            middleware: ['session', 'auth:admin']
        }, (router) => {
            router.post('', this.contactController.store);
            router.get(':contactId', this.contactController.getContactWithID);
            router.get('', this.contactController.getContacts);
            router.post('', this.contactController.store);
            router.put(':contactId', this.contactController.updateContact);
            router.delete(':contactId', this.contactController.deleteContact);
        })
```
### Add custom middleware
I. You have two options to define a middleware: 
- to declare callback function directly:
```typescript
    foo: (req, res, next) => {
        console.log('First middle');
        next();
    },
```
- Add your file with middleware in `/src/http/middleware*` 
- Bellow we have an example of an empty middleware:
```javascript
export class Authenticate {
    constructor () {
    }

    public handle(req, res, next) {
        console.log('Authenticate middleware - check if is authenticated');
        next();
    }
}

```
| ⌘ | The **handle** method is required!

II. Declare it in `src/config/middleware.ts`
```typescript
export const routesMiddleware = {
    auth: Authenticate,
    session: (req, res, next) => {
        console.log('Local definition');
        next();
    }
};
```
III. In the `Route` definition, just add the key of the middleware, like this:
```typescript
     this.router.group({
            middleware: 'auth'
        }, (router) => {
```
Array of middlewares: 
```typescript
middleware: ['auth', 'session']
```
IV. Define these two middlewares in a middleware group:
``` 
export const groupsMiddleware = {
    web: [
        StartSession,
        Authenticate
    ]
};
```
And use it like: 
``` this.router.group({
       prefix: 'group',
       middleware: 'web'
 }, r => {
```
V. Send arguments to the middleware functions from the definition:
```typescript
 this.router.group({
            prefix: 'group',
            middleware: 'auth:admin,user'
        }, 
```
- Now I can get my arguments as an array like: ['admin', 'user'] in the `auth` middleware, BUT,
there you should implement `handle` function, which returns an middelware signature 
```typescript
    public handle(args) {
        return (req, res, next) => {
            console.log(args, 'Encapsuleted arguments from the route');
            next();
        };
    }
```
### Add global middlewares
 - In `config/middlewares.ts` we have an object for global middleware definitions, allowed format are:
  1. Class with an handle function
  2. Simple callback function
  3. Array of callback functions
 ```typescript
export const middleware = {
    bodyParser: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: false })
    ],
    application: Application,
    foo: [(req, res, next) => {
        console.log('First middle');
        next();
    }, (req, res, next) => {
        console.log('Second middle');
        next();
    }]
};
```
## Use [express router](https://expressjs.com/en/guide/routing.html) as default
- In your [route definition](https://github.com/binaryk/node-ts-boilerplate/blob/master/src/routes/Contact.ts) just use it through `this.router`:
```typescript
 this.router.get('/sample', (req, res, next) => {
            res.json({
                'data': 'test'
            });
        });
```
## Questions

The issue list of this repo is **exclusively** for bug reports and feature requests.
Feel free to open a PR of issue.

## Stay In Touch

- [Twitter](https://twitter.com/LupacescuEuard)

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, Binaryk (Eduard) Lupacescu
