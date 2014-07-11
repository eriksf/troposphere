/** @jsx React.DOM */

define(
  [
    'react',
    'backbone'
  ],
  function (React, Backbone) {

    return React.createClass({

      propTypes: {
        project: React.PropTypes.instanceOf(Backbone.Model).isRequired
      },

      getInstances: function(){
        return (
          <div>
            <div className="header">
              <i className="glyphicon glyphicon-tasks"></i>
              <h2>Instances</h2>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th><div className="resource-checkbox"></div></th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>IP Address</th>
                  <th>Size</th>
                  <th>Provider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="resource-checkbox"></div></td>
                  <td><a href="#">Instance 1</a></td>
                  <td>Active</td>
                  <td>128.196.25</td>
                  <td>tiny1</td>
                  <td><a href="#">iPlant Cloud - Tucson</a></td>
                </tr>
                <tr>
                  <td><div className="resource-checkbox"></div></td>
                  <td><a href="#">Instance 2</a></td>
                  <td>Suspended</td>
                  <td>128.196.17</td>
                  <td>tiny1</td>
                  <td><a href="#">iPlant Cloud - Tucson</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      },

      getVolumes: function(){
        return (
          <div>
            <div className="header">
              <i className="glyphicon glyphicon-hdd"></i>
              <h2>Volumes</h2>
            </div>
            <table className="table">
              <thead>
                <tr>
                  <th><div className="resource-checkbox"></div></th>
                  <th>Name</th>
                  <th>Status</th>
                  <th>Size</th>
                  <th>Provider</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><div className="resource-checkbox"></div></td>
                  <td><a href="#">Volume 1</a></td>
                  <td>Attached to <a href="#">iPlant Base Instance</a></td>
                  <td>200 GB</td>
                  <td><a href="#">iPlant Cloud - Tucson</a></td>
                </tr>
                <tr>
                  <td><div className="resource-checkbox"></div></td>
                  <td><a href="#">Volume 2</a></td>
                  <td>Unattached</td>
                  <td>300 GB</td>
                  <td><a href="#">iPlant Cloud - Tucson</a></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      },

      render: function () {
        return (
          <div className="project-details">

            <div className="secondary-nav">
              <div className="container">
                <div className="project-name">
                  <h1>{this.props.project.get('name')}</h1>
                </div>
                <ul className="secondary-nav-links">
                  <li><a href="#">Overview</a></li>
                  <li className="active"><a href="#">Resources</a></li>
                  <li><a href="#">Activity</a></li>
                </ul>
              </div>
            </div>

            <div className="container">
              <table>
                <tbody>
                  <tr>
                    <td className="td-sub-menu">
                      <div className="sub-menu">
                        <button className="btn btn-primary">Create</button>
                        <ul>
                          <li className="active"><a href="#">Instances</a></li>
                          <li><a href="#">Volumes</a></li>
                        </ul>
                      </div>
                    </td>

                    <td className="td-project-content">
                      <div className="project-content">

                        <div className="button-bar">
                          <button className="btn btn-default">
                            <i className="glyphicon glyphicon-folder-open"/>
                          </button>
                        </div>

                        <div className="resource-list">

                          <div className="scrollable-content">
                          {this.getInstances()}
                          {this.getVolumes()}
                          </div>

                          <div className="side-panel">
                            <div className="header">
                              <span className="title">Details</span>
                            </div>
                            <ul>
                              <li>
                                <span class="instance-detail-label">Launched</span>
                                <span class="instance-detail-value">
                                  <time title="2014-07-01T12:12:19-07:00" datetime="2014-07-01T19:12:19+00:00">Jul 1, 2014 (9 days ago)</time>
                                </span>
                              </li>
                              <li>
                                <span class="instance-detail-label">ID</span>
                                <span class="instance-detail-value">9a1f18c7-fe6d-4d2f-85ee-c3bfc572c6a2</span>
                              </li>
                            </ul>
                          </div>

                        </div>

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

            </div>
          </div>
        );
      }

    });

  });
