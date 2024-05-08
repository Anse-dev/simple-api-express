const express = require('express');
const UserRoutes = require('./routes/UserRoutes');
const errorHandler = require('./errorHandler');

const app = express();

app.use(express.json());

app.use('/api/users', UserRoutes);
/* app.use('/api/others', otherRoute;); */

app.use(errorHandler);
module.exports = app;
