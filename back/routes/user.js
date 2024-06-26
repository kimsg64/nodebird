const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post } = require("../models");
const { where } = require("sequelize");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const router = express.Router();

router.get("/", async (req, res, next) => {
	try {
		const user = await User.findOne({ where: { id: req.user.id } });
		if (req.user) {
			// 사용자가 있는 경우
			const fullUserWithoutPassword = await User.findOne({
				where: { id: user.id },
				attributes: { exclude: ["password"] },
				include: [
					{ model: Post, attributes: ["id"] },
					{ model: User, as: "Followings", attributes: ["id"] },
					{ model: User, as: "Followers", attributes: ["id"] },
				],
			});
			return res.status(200).json(fullUserWithoutPassword);
		} else {
			// 사용자가 없는 경우
			return res.status(200).json(null);
		}
	} catch (error) {
		console.log(error);
		next(error);
	}
});

router.post("/login", isNotLoggedIn, (req, res, next) => {
	passport.authenticate("local", (serverError, user, clientError) => {
		if (serverError) {
			console.error(serverError);
			next(serverError);
		}
		if (clientError) {
			return res.status(401).send(clientError.reason);
		}
		return req.login(user, async (loginError) => {
			if (loginError) {
				// passport의 login error
				console.error(loginError);
				return next(loginError);
			}
			const fullUserWithoutPassword = await User.findOne({
				where: { id: user.id },
				attributes: { exclude: ["password"] },
				include: [{ model: Post }, { model: User, as: "Followings" }, { model: User, as: "Followers" }],
			});
			return res.status(200).json(fullUserWithoutPassword);
		});
	})(req, res, next);
});

router.post("/", isNotLoggedIn, async (req, res, next) => {
	// POST /user/
	const { email, nickname, password } = req.body;

	try {
		const exUser = await User.findOne({
			where: { email },
		});
		if (exUser) {
			return res.status(403).send("이미 사용 중인 아이디입니다.");
		}

		const hashedPassword = await bcrypt.hash(password, 10);
		await User.create({
			email,
			nickname,
			password: hashedPassword,
		});
		res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
		res.status(201).send("ok");
	} catch (error) {
		console.error(error);
		next(error);
	}
});

router.post("/logout", isLoggedIn, (req, res, next) => {
	console.log("logoutme", req.user);
	req.logout((err) => {
		if (err) {
			return next(err);
		} else {
			res.redirect("/");
		}
	});
	req.session.destroy();
	res.send("ok");
});

module.exports = router;
