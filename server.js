// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8082;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var tables = [
      {
    routeName: "madmax",
    customerName: "Mad Max",
    phoneNumber: "555-555-5555",
    customerEmail: "mad@max.com",
    customerID: "5"
  }
];

var waitlist = [];

var bothtablesandwaitlist = {
  tables: tables, 
  waitlist: waitlist
};

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reservation", function(req, res) {
  res.sendFile(path.join(__dirname, "reservation.html"));
});

app.get("/view", function(req, res) {
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/view/all", function(req, res) {
  return res.json(bothtablesandwaitlist);
});

// Displays all reservations
app.get("/api/tables", function(req, res) {
  return res.json(bothtablesandwaitlist.tables);
});

// Displays all reservations
app.get("/api/waitlist", function(req, res) {
  return res.json(bothtablesandwaitlist.waitlist);
});

// Displays a single character, or returns false
app.get("/api/tables/:alltables", function(req, res) {
  var showalltables = req.params.alltables;

  console.log(showalltables);

  for (var i = 0; i < tables.length; i++) {
    if (showalltables === tables[i].routeName) {
      return res.json(tables[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newreservation = req.body;

  // Using a RegEx Pattern to remove spaces from newCharacter
  // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  newreservation.routeName = newreservation.customerName.replace(/\s+/g, "").toLowerCase();

  console.log(newreservation);

  if (tables.length < 5) {
  tables.push(newreservation);
  res.json("Congratulations!  You have earned yourself a table in the Incredibly Exclusive Hat Restuarant!");
  } else {
  waitlist.push(newreservation);
  res.json("Oh, no!  You have not been deemed worthy of a table in the Incredibly Exclusive Hat Restuarant!  But we've put you on the waitlist as a consolation prize :)");
  }


});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
