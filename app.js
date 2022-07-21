var express = require('express');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var getVideoIds = require('./routes/getVideoIds')
const cors = require('cors');
var getVideoLengths = require('./routes/getVideoLengths')
const app = express();
const PORT = process.env.PORT || 3001;
// view engine setup

app.use(cors());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/getId', getVideoIds);
app.use('/getLength', getVideoLengths);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`)) 