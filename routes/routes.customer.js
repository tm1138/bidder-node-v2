
module.exports = function (express, customerService)
{
    var router = express.Router();

    router.post('/register', async (req, res, next) => {
        console.log('post');
        customerService.RegisterCustomer(req.body).
        then(createdCustomer  => {
            console.log(createdCustomer);
            res.send(createdCustomer);
        })
        .catch(err => {
            res.status(400).json(err);
        });
    });

    router.post('/login', async (req, res, next) => {
        if (req.session.user) {
            
        }
        customerService.ValidateLogin(req.body.login_username, req.body.login_password).then
            (username => {
                if (username == null)
                {
                    res.status(401).json({ "error" : "invalid username or password"});
                }
                else
                {
                    req.session.username = username;
                    res.send({"status" : username});
                }
            })
            .catch (err => {
                res.status(401).json({ "error" : "invalid username or password"});
        })

    })

    router.get('/getSessionDetails', async (req, res, next) => {
        if (req.session.username) 
        {
            customerService.GetUserDetails(req.session.username)
                .then(customerDetails => {
                    res.send(customerDetails);
                })
                .catch (err => {
                    res.status(401).json({ "status" : "session expired, redirect to login" })
                })
        }
        else
        {
            res.send(403);
        }
    })

    return router;
}