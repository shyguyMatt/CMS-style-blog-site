const router = require('express').Router();

router.get('/test', (req, res) => {
    res.json('api routes test success!')
});

module.exports = router;
