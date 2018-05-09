import app from './app';
const PORT = 3000;
require('./lib/mongoose/connect');
app.listen(PORT, () => {
    console.log('Express server listening on port ' + PORT);
});
