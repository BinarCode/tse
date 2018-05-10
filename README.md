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
   - Add prefix and middleware keys to the routes group like this:
  
  ```typescript
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
        });
```
