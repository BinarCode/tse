# Minimalist express/typescript clean boilerplate
- This is an [express](https://expressjs.com/) boilerplate based on [TypeScript](https://www.typescriptlang.org/),
you can clone it and start coding
- Cover [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) principles
- Out of the box it includes: 
  * TypeScript compiler
  * [express](https://expressjs.com/)
  * [Nodemon](https://nodemon.io/) watcher (hot reload)
  * Active sourcemap for debugging
  * [TS-lint](https://palantir.github.io/tslint/)
  * [ES6](http://es6-features.org/) support
  * Multiple env
  * Basic CRUD
  
  ## Group routes and define middleware
   - For CRUD `contact` instance you can use the `group` wrapper
   - Add prefix with middleware keys to the routes group like this:
  
```javascript
        this.Route.group({
            prefix: 'contact',
            middleware: 'auth'
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
I. In `/src/http/middleware*` you can add your your file with middleware here.
Bellow we have an example of a empty middleware:
```javascript
    export const auth = (req, res, next) => {
        console.log('auth middle');
    next();
  };
```
II. Declare it in `middleware.ts`
```typescript
export const list = {
    auth: auth
};
```
III. In the `Route` definition, just add the key of the middleware, like this:
```typescript
     this.Route.group({
            middleware: 'auth'
        }, (router) => {
```
## Use [express router](https://expressjs.com/en/guide/routing.html) as default
- In your [route definition](https://github.com/binaryk/node-ts-boilerplate/blob/master/src/routes/Contact.ts) just use it through `this.Route`:
```typescript
 this.Route.get('/sample', (req, res, next) => {
            res.json({
                'data': 'test'
            });
        });
```
