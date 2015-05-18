/** @jsx React.DOM */

(function () {
  'use strict';

  var React = require('react'),
    Body = React.createFactory(require('./body.jsx'));

  React.render(
    <Body />,
    document.getElementById('location')
  );

}());