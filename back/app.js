const express = require("express");
const cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

const userRouter = require("./routes/user");
const postRouter = require("./routes/post");
const db = require("./models");
db.sequelize
	.sync()
	.then(() => {
		console.log("db 연결 성공");
	})
	.catch(console.error());

const app = express();
app.use(
	cors({
		// origin: "https://nodebird.com"
		origin: "*",
		credentials: false,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const passportConfig = require("./passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
passportConfig();
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({ saveUninitialized: false, resave: false, secret: process.env.COOKIE_SECRET }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
	res.send("hello, express");
});

app.use("/user", userRouter);
app.use("/post", postRouter);

// app.use((err, req, res, next) => {

// })

app.listen(3065, () => {
	console.log("server is running");
});
