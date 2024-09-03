exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
        // next에 error를 넣으면 error를 처리하고 아무것도 넣지 않으면 다음 middleware를 실행한다.
    } else {
        res.status(401).send('로그인이 필요합니다.');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        res.status(401).send('로그인하지 않은 사용자만 접근할 수 있습니다.');
    }
};
