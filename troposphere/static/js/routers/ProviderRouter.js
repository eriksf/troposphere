/*global define */

define(
  [
    'marionette',
    'components/Root.react',
    'react',
    'components/providers/Providers.react',
    'context',
    'backbone'
  ],
  function (Marionette, Root, React, Providers, context, Backbone) {
    'use strict';

    var Router = Marionette.AppRouter.extend({
      appRoutes: {
        'providers': 'showProviders'
      }
    });

    var Controller = Marionette.Controller.extend({

      render: function(content){
        var app = Root({
          session: context.session,
          profile: context.profile,
          content: content,
          route: Backbone.history.getFragment()
        });
        React.renderComponent(app, document.getElementById('application'));
      },

      showProviders: function (param) {
        var content = Providers();
        this.render(content);
      }

    });

    return {
      start: function () {
        var controller = new Controller();
        var router = new Router({
          controller: controller
        });
      }
    }

  });
