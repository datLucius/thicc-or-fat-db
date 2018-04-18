//////////////////////////////
/// VOTE CRUD
//////////////////////////////
// PURPOSE:
//
// This script handles the routes that control vote crud
// Routes start with /api/vote
// This file is being required in the routes.js
//
////////////////////////////

const Promise = require('bluebird');
const vote = require('express').Router();
const Vote = require('../schema/vote');


// HELPER FUNCTIONS
//------------------------

// promise waits on poll to be created and returns the id

function saveNewPoll (newPoll, res) {
  return new Promise(function(resolve) {
    newPoll.save(function(err, poll) {
      if (err) {
        res.send(err);
      } else {
        resolve(poll.id);
      }
    })
  })
}

// CRUD ROUTES
//------------------------

vote.post('/poll', function(req, res) {
  var newPoll = {
    'thicc': 0,
    'fat': 0
  }
  //  format as a poll
  var formattedPoll = Vote(newPoll);
  //  send to db
  saveNewPoll(formattedPoll, res).then(function(pollId) {
    res.send('new poll created with id:', pollId);
  });
});

// GET POLL
vote.get('/', function(req, res) {
  Vote.find({}, function(err, poll) {
    if (err) {
      throw err;
    } else {
      res.json(poll[0]);
    }
  });
});

// UPDATE POLL
vote.post('/update', function(req, res) {
  var id = "5ad78a40f36d28165c05ec29";
  var updateVote = req.body.vote;
  if(updateVote === "thicc") {
    Vote.findByIdAndUpdate(id, {$inc: { 'thicc': 1 }}, function(err, poll) {
      if (err) {
        res.send(err);
      } else {
        res.send(poll);
      }
    })
  }
  else if(updateVote === "fat") {
    Vote.findByIdAndUpdate(id, {$inc: { 'fat': 1 }}, function(err, poll) {
      if (err) {
        res.send(err);
      } else {
        res.send(poll);
      }
    })
  }
});

module.exports = vote;
