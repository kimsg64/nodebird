const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const userRouter = require('./routes/user');
const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const hashtagRouter = require('./routes/hashtag');
const db = require('./models');
db.sequelize
    .sync()
    .then(() => {
        console.log('db 연결 성공');
    })
    .catch(console.error());

const app = express();
app.use(morgan('dev'));
app.use(
    cors({
        // origin: "*",

        // origin: "https://nodebird.com",
        origin: 'http://localhost:3000',
        // origin: true,
        credentials: true,
    })
);
app.use('/', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
passportConfig();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({ saveUninitialized: false, resave: false, secret: process.env.COOKIE_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('hello, express');
});

app.use('/user', userRouter);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/hashtag', hashtagRouter);

// app.use((err, req, res, next) => {

// })

app.listen(3065, () => {
    console.log('server is running');
});
