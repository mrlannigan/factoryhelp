/** @jsx React.DOM */

(function () {
  'use strict';

  var React = require('react/addons'),
    Loc = React.createFactory(require('./location.jsx'));

  var Body = React.createClass({
    render: function() {
      return (
        <div className="container">
          <header>
            <div className="container">
              <Loc url='/selection' />
            </div>
          </header>
        </div>
      );
    }
  });

  module.exports = Body;

}());
