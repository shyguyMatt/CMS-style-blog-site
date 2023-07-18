const router = require('express').Router();
const { User } = require('../../models')

router.get('/test', (req, res) => {
    res.json('api routes test success!')
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json({ user: userData, message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json({ message: 'I have no idea either'});
    }
});

router.post('/signup', (req, res) => {
    // const { name, email, password } = req.body;
    try {
        User.create(req.body);
    } catch (err) {
        res.json(err);
    }
})

router.post('/logout', (req, res) => {
    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

router.get('/users', async (req, res) => {
    const userData = await User.findAll({
        // attributes: { exclude: ['password'] }
    });
    try {
        res.json(userData)
    } catch (err) {
        res.json(err);
    }
})

router.delete('deleteALL', (req, res) => {
    User.destroy();
    res.json('done');
})

module.exports = router;
