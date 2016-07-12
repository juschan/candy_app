//include the following to allow cross-domain ajax
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    next()
})

router.route('/candies')
.get(candiesController.getAll)
.post(candiesController.createCandy)

router.route('/candies/:id')
.get(candiesController.getAll)
.post(pcandiesController.createCandy)
