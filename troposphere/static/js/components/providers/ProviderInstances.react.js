/** @jsx React.DOM */

define(
  [
    'react',
    'backbone',
    'collections/InstanceCollection',
    'collections/VolumeCollection',
    './ProviderInstanceTable.react',
    'stores'
  ],
  function (React, Backbone, InstanceCollection, VolumeCollection, ProviderInstanceTable, stores) {

    return React.createClass({

      propTypes: {
        provider: React.PropTypes.instanceOf(Backbone.Model).isRequired,
        identities: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        instances: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        volumes: React.PropTypes.instanceOf(Backbone.Collection).isRequired,
        projects: React.PropTypes.instanceOf(Backbone.Collection)
      },

      // ------
      // Render
      // ------

      renderBody: function(provider, identities, instances, volumes, projects){

        // Get the identities belonging to this provider and cast as the original collection
        // type (which should be IdentityCollection)
        var providerIdentityArray = identities.filter(function(identity){
          return identity.get('provider').id === provider.id;
        });
        var providerIdentities = new identities.constructor(providerIdentityArray);

        // Filter Instances and Volumes for only those in this provider
        var providerInstanceArray = instances.filter(function(instance){
          return instance.get('identity').provider === provider.id;
        });
        var providerInstances = new InstanceCollection(providerInstanceArray);

        var providerVolumeArray = volumes.filter(function(volume){
          return volume.get('identity').provider === provider.id;
        });
        var providerVolumes = new VolumeCollection(providerVolumeArray);

        var identity = providerIdentities.first(),
            instancesConsumingAllocation = identity.getInstancesConsumingAllocation(providerInstances);

        if(instancesConsumingAllocation.length > 0) {
          return (
            <div>
              <p>The following instances are currently consuming allocation on this provider:</p>
              <ProviderInstanceTable provider={provider}
                                     identities={providerIdentities}
                                     instances={providerInstances}
                                     volumes={providerVolumes}
                                     projects={projects}
              />
            </div>
          )
        }else{
          return (
            <div>
              <p>You currently have no instances using allocation.</p>
            </div>
          )
        }
      },

      render: function () {
        var provider = this.props.provider,
            identities = this.props.identities,
            instances = this.props.instances,
            volumes = this.props.volumes,
            projects = this.props.projects;

        return (
          <div className="row provider-info-section">
            <h4>Instances Consuming Allocation</h4>
            {this.renderBody(provider, identities, instances, volumes, projects)}
          </div>
        );

      }

    });

  });
