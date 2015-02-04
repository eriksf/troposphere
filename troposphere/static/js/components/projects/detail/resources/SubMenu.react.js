/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    'actions'
  ],
  function (React, Backbone, actions) {

    return React.createClass({

      propTypes: {
        project: React.PropTypes.instanceOf(Backbone.Model).isRequired
      },

      onCreateVolume: function(e){
        e.preventDefault();
        actions.VolumeActions.createAndAddToProject({project: this.props.project});
      },

      onCreateInstance: function(e){
        e.preventDefault();
        actions.InstanceActions.createAndAddToProject({project: this.props.project});
      },

      render: function () {
        var scrollSpy = (
          <ul>
            <li className="active"><a href="#">Instances</a></li>
            <li><a href="#">Volumes</a></li>
          </ul>
        );

        return (
          <div className="sub-menu">
            <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" data-toggle="dropdown">New</button>
              <ul className="dropdown-menu">
                <li>
                  <a href="#" onClick={this.onCreateInstance}>
                    <i className={'glyphicon glyphicon-tasks'}/>
                    Instance
                  </a>
                </li>
                <li>
                  <a href="#" onClick={this.onCreateVolume}>
                    <i className={'glyphicon glyphicon-hdd'}/>
                    Volume
                  </a>
                </li>
              </ul>
            </div>
            {false ? scrollSpy : null}
          </div>
        );
      }

    });

  });