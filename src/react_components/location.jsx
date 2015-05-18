/** @jsx React.DOM */

(function () {
  'use strict';

  var React = require('react/addons');

  var Loc = React.createClass({
    getInitialState: function () {
      return {
        results: [],
        input: '',
        history: [],
        ids: 0
      };
    },

    handleChange: function (event) {
      var state = this.state,
        input = event.target.value;

      state = React.addons.update(state, {
        history: {
          $unshift: [{text: input, id: state.ids + 1}]
        },
        input: {
          $set: input
        },
        ids: {
          $set: state.ids + 1
        }
      });
      this.setState(state);

      this.getSelection(input);
    },

    getSelection: _.debounce(function (input) {
      $.ajax({
        url: this.props.url + '?input=' + input,
        dataType: 'json',
        cache: false,
        success: function(data) {
          var state = this.state;

          state = React.addons.update(state, {
            results: {
              $unshift: [data]
            }
          });

          this.setState(state);
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    }, 750, {maxWait: 2000}),

    render: function() {
      return (
        <div>
        <div className="row">
          <div className="col-lg-12">
            <p className="title">{this.props.title}</p>
            <form className="">
              <div className="form-group">
                <label htmlFor="locationInput">Location</label>
                <input type="text" className="form-control" id="locationInput" placeholder="Location..." message={this.state.input} onChange={this.handleChange}/>
              </div>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-6">
            <ol>
              {this.state.history.map(function (result) {
                return <ListItemWrapper key={result.id} data={result} />;
              })}
            </ol>
          </div>

          <div className="col-lg-6">
            <ol>
              {this.state.results.map(function (result) {
                return <ListItemWrapper key={result.id} data={result} />;
              })}
            </ol>
          </div>
        </div>
        </div>
      );
    }
  });

  var ListItemWrapper = React.createFactory(React.createClass({
    render: function() {
      return <li>{this.props.data.text}</li>;
    }
  }));

  module.exports = Loc;

}());