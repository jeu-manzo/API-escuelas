const router =  require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
  res.json({
      review: {
        title: 'testing auth routes',
        description: 'random data you should not access'
      }
  })
})

module.exports = router;
