
module.exports = function (express, customerService) {
    var router = express.Router();

    router.post('/register', async (req, res, next) => {
        console.log('post');
        customerService.RegisterCustomer(req.body).
            then(createdCustomer => {
                console.log(createdCustomer);
                res.send(createdCustomer);
            })
            .catch(err => {
                res.status(400).json(err);
            });
    });

    router.post('/login', async (req, res, next) => {
        if (req.session.user) {
            console.log(req.session.user);
        }
        customerService.ValidateLogin(req.body.username, req.body.password).then
            (username => {
                if (username == null) {
                    res.status(401).json({ "error": "invalid username or password" });
                }
                else {
                    req.session.username = username;
                    res.send({ "status": username });
                }
            })
            .catch(err => {
                res.status(401).json({ "error": "invalid username or password" });
            })

    })

    router.get('/logout', async (req, res) => {
        if (req.session.username)
        {
            res.clearCookie('s_id');
        }
        res.sendStatus(401);
    })

    router.get('/getSessionDetails', async (req, res, next) => {
        if (req.session.username) {
            customerService.GetUserDetails(req.session.username)
                .then(customerDetails => {
                    res.send(customerDetails);
                })
                .catch(err => {
                    res.status(401).json({ "status": "session expired, redirect to login" })
                })
        }
        else {
            res.sendStatus(401);
        }
    })

    return router;
}