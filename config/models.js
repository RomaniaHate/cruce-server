var mongoose = require('mongoose');
var Schema = mongoose.Schema;

mongoose.connect('mongodb://root:toor@ds161175.mlab.com:61175/heroku_1tq03tlx');

var cardSchema = mongoose.Schema({
    name : String,
    value: Number,
    type: String,
    img: String
});

var gameSchema = mongoose.Schema({
    xvalue: Number,
    round: [{
        teams: [
            {
                team1: [{player1: String, player2: String, _id: false}],
                team2: [{player3: String, player4: String, _id: false}],
                _id: false
            }
        ],
        _id: false,
        deck: [
            {
                cards: Object,
                _id: false
            }
        ],
        bet: [
            {
                team: [
                    {
                        player1: String,
                        player2: String,
                        _id: false
                    }
                ],
                value: Number,
                tromf: String,
                _id: false
            }
        ],
        score: [
            {
                team1: [
                    {
                        player1: String,
                        player2: String,
                        score: Number,
                        _id: false
                    }
                ],
                team2: [
                    {
                        player3: String,
                        player4: String,
                        score: Number,
                        _id: false
                    }
                ],
                _id: false
            }
        ]
    }]
});

var Cards = mongoose.model('Cards', cardSchema, 'Cards');
var Games = mongoose.model('Games', gameSchema, 'Games');

module.exports = {
    Cards: Cards,
    Games: Games
};