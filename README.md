# Minimalist express/typescript clean boilerplate
- This is an [express](https://expressjs.com/) boilerplate based on [TypeScript](https://www.typescriptlang.org/),
you can clone it and start coding
- Cover [SOLID](https://en.wikipedia.org/wiki/SOLID_(object-oriented_design)) principles
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
I. In `/src/http/middleware*` you can add your file with middleware here.
Bellow we have an example of an empty middleware:
```javascript
    export const auth = (req, res, next) => {
        console.log('auth middle');
    next(); ** DO NOT FORGET TO CALL next()
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
