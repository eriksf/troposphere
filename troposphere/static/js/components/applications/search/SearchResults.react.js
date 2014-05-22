/** @jsx React.DOM */

define(
  [
    'react',
    '../list/SearchContainer.react',
    'components/common/PageHeader.react',
    './Results.react'
  ],
  function (React, SearchBox, PageHeader, Results) {

    return React.createClass({

      render: function () {
        return (
          <div>
            <PageHeader title="Image Search"/>
            <SearchBox query={this.props.query}/>
            <Results query={this.props.query}/>
          </div>
        );
      }

    });

  });
