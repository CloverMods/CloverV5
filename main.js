var express = require('express');
var router = express.Router();
var fs = require('fs')

router.get('/', (req, res) => {
    res.json({
      "clover": "youtube.com/@clovermods"
    })
})

module.exports = router
