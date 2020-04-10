var express = require('express');
var router = express.Router();
var mongo = require('mongodb').MongoClient;
var assert = require('assert');

var maze = require('../src/app');

var url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('main', {title: "Algoa"});
});

router.post('/user/:user/maze/:level/store', function (req, res, next) {

    var user_maze = {
        user_id: req.params.user,
        level: req.params.level,
        time: req.body.time,
        attemps: req.body.attemps,
        clicked: req.body.clicked
    };

    mongo.connect(url, function (err, db) {

        assert.equal(null, err);
        db.collection('userMaze').insertOne(user_maze, function (err, result) {
            assert.equal(null, err);
            res.end();
            //res.redirect('/user/'+req.params.user+'/maze/'+req.params.level);
        });
    });
});

/*router.get('/init', function (req, res, next) {
    var array = [];
    var n = 5;

    for (var i = 0; i < 100; i++) {

        if (i === 20) {
            n = 10;
        }
        if (i === 40) {
            n = 15;
        }
        if (i === 60) {
            n = 20
        }
        if (i === 80) {
            n = 25;
        }

        array.push(maze.initMaze(n, n));

        //array = maze.initMaze(n, n);

    }
    mongo.connect(url, function (err, db) {

            assert.equal(null, err);

            db.collection('maze').insertMany(array, function (err, result) {
                assert.equal(null, err);

                db.close();

            });
        });
    res.redirect('/');

});*/

router.get('/user/:user/maze/:level', function (req, res, next) {

    var resultArray = [];

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);

        var cursor;

        switch (req.params.level) {
            case '0':
                cursor = db.collection('maze').find({pathCross: {$lt: 2}, width: {$lt: 6}}).limit(1);
                break;
            case '1':
                cursor = db.collection('maze').find({pathCross: {$lt: 5, $gt: 2}, width: {$lt: 6}}).limit(1);
                break;
            case '2':
                cursor = db.collection('maze').find({pathCross: {$lt: 6, $gt: 2}, width: {$lt: 11, $gt: 6}}).limit(1);
                break;
            case '3':
                cursor = db.collection('maze').find({pathCross: {$lt: 10, $gt: 4}, width: {$lt: 11, $gt: 6}}).limit(1);
                break;
            case '4':
                cursor = db.collection('maze').find({pathCross: {$lt: 10, $gt: 4}, width: {$lt: 16, $gt: 11}}).limit(1);
                break;
            case '5':
                cursor = db.collection('maze').find({pathCross: {$lt: 15, $gt: 10}, width: {$lt: 16, $gt: 11}}).limit(1);
                break;
            case '6':
                cursor = db.collection('maze').find({pathCross: {$lt: 20, $gt: 14}, width: {$lt: 16, $gt: 11}}).limit(1);
                break;
            case '7':
                cursor = db.collection('maze').find({pathCross: {$lt: 10}, width: {$lt: 21, $gt: 15}}).limit(1);
                break;
            case '8':
                cursor = db.collection('maze').find({pathCross: {$lt: 20, $gt: 14}, width: {$lt: 21, $gt: 15}}).limit(1);
                break;
            case '9':
                cursor = db.collection('maze').find({width: {$gt: 20}}).limit(1);
                break;
            default:
                res.redirect('/');
                return;

        }

        cursor.count(function(err, count) {
            if(count == 0) {
                console.log("Maze not found");
                res.render('error', {message: "Maze not fount.", solution: "Need to add maze in database"})
            }else {
                cursor.forEach(function (doc, err) {
                    assert.equal(null, err);
                    resultArray.push(doc);
                }, function () {
                    //console.log(resultArray);
                    var temp = resultArray[Math.floor(Math.random() * resultArray.length)];
                    temp.level = parseInt(req.params.level) + 1;
                    //console.log(temp);
                    db.close();
                    res.render('index', {item: temp, user: req.params.user});
                });
            }
        });
    });
});


router.post('/user/store', function (req, res, next) {

    var user = {
        email: req.body.email,
        subjects: req.body.subjects,
        prediction: req.body.prediction,
    };

    mongo.connect(url, function (err, db) {

        assert.equal(null, err);
        db.collection('user').insertOne(user, function (err, result) {
            assert.equal(null, err);

            res.redirect('/user/'+result.ops[0]._id+'/maze/0');
        });
    });
});

/*router.get('/try', function (req, res, next) {

    var resultArray = [];

    mongo.connect(url, function (err, db) {
        assert.equal(null, err);

        var cursor= db.collection('maze').find({"_id" : "5e76755539d7b22f80685102"});

        cursor.count(function(err, count) {
            if(count == 0) {
                console.log("Maze not found");
                res.render('error', {message: "Maze not fount.", solution: "Need to add maze in database"})
            }else {
                cursor.forEach(function (doc, err) {
                    assert.equal(null, err);
                    resultArray.push(doc);
                }, function () {
                    //console.log(resultArray);
                    var temp = resultArray[Math.floor(Math.random() * resultArray.length)];
                    temp.level = parseInt(req.params.level) + 1;
                    //console.log(temp);
                    db.close();
                    res.render('index', {item: temp, user: req.params.user});
                });
            }
        });
    });
});*/

module.exports = router;
