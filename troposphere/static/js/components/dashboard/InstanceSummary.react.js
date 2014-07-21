/** @jsx React.DOM */

define(
  [
    'react',
    'backbone'
  ],
  function (React, Backbone) {

    return React.createClass({

      propTypes: {
        instances: React.PropTypes.instanceOf(Backbone.Collection).isRequired
      },

      render: function () {
        var summaries = this.props.instances.map(function (instance) {
          return (
            <div key={instance.id}>{"1 " + instance.get('status')}</div>
          );
        }.bind(this));

        var title = this.props.instances.length + " Instances";

        return (
          <div className="resource-summary">
            <h2>{title}</h2>
            {summaries}
          </div>
        );
      }

    });

  });
