(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/** @jsx React.DOM */

var DynamicSearch = React.createClass({displayName: "DynamicSearch",

  // sets initial state
  getInitialState: function(){
    return { searchString: '', countries: [{"name": "populating..."}] };
  },
  componentDidMount: function() {
    var request = new XMLHttpRequest();
    request.open('GET', this.props.source, true);

    request.onload = function() {
      if (request.status >= 200 && request.status < 400) {
        // Success!
        var data = JSON.parse(request.responseText);
        this.setState({
          countries: JSON.parse(request.responseText)
        })

      } else {
        // We reached our target server, but it returned an error

      }
    }.bind(this);

    request.onerror = function() {
      // There was a connection error of some sort
    };

    request.send();
  },
  // sets state, triggers render method
  handleChange: function(event){
    // grab value form input box
    this.setState({searchString:event.target.value});
    console.log("scope updated!")
  },

  render: function() {

    var source = this.props.source;
    var countries = this.state.countries;
    var searchString = this.state.searchString.trim().toLowerCase();

    // filter countries list by value from input box
    if(searchString.length > 0){
      countries = countries.filter(function(country){
        return country.name.toLowerCase().match( searchString );
      });
    }
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "text", value: this.state.searchString, onChange: this.handleChange, placeholder: "Search!"}), 
        React.createElement("ul", null, 
           countries.map(function(country){ return React.createElement("li", null, country.name, " ") }) 
        )
      )
    )
  }

});

React.render(
  React.createElement(DynamicSearch, {source: "https://gist.githubusercontent.com/robotamer/0ff951d12cbcdd3f56ed/raw/00d4e411a9fd396c7f030318f51d8030c523354c/countries.json"}),
  document.getElementById('main')
);


},{}]},{},[1])