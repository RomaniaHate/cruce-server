var mongoose = require('mongoose');
var models = require('./models.js');
var ObjectId = require('mongodb').ObjectID;

exports.getCards = function (callback) {
    models.Cards.aggregate(
        {
            '$group': {
                '_id': '$_id',
                'card': {
                    '$push': {
                        'name': '$name',
                        'value': '$value',
                        'img': '$img',
                        'type': '$tpye'
                    }
                }
            }
        },
        function (err, cards) {
            if (cards) {
                console.log('cards', cards);
                callback(cards);
                return cards;
            } else {
                callback('err');
            }
        }
    )
}

exports.newGame = function (callback) {
    var game = new models.Games();
    models.Cards.aggregate(
        {
            '$group': {
                '_id': '$_id',
                'card': {
                    '$push': {
                        'name': '$name',
                        'value': '$value',
                        'type': '$type',
                        'img': '$img'
                    }
                }
            }
        },
        function (err, cards) {
            if (cards) {
                game.round = new Object({});
                game.round = new Object({
                    'teams': new Object(),
                    'deck': new Object(),
                    'bet': new Object(),
                    'score': new Object()
                });
                game.round.teams = new Object({
                    'team1': {'player1': 'player1', 'player2': 'player2'},
                    'team2': {'player3': 'player3', 'player4': 'player4'}
                });
                game.round.deck = new Object({'cards': cards});
                game.round.bet = new Object({'value': 0, 'tromf': 'n', 'team': {'player1': 'a', 'player2': 'b'}});
                game.round.score = new Object({
                    'team1': {'player1': 'player1', 'player2': 'player2', 'score': 0},
                    'team2': {'player3': 'player3', 'player4': 'player4', 'score': 0}
                });
                game.save(function (err) {
                    console.log(game);
                });
            } else {
                callback('err');
            }
        }
    )
    return callback({'response': 'Sucessfully created.'});
}



