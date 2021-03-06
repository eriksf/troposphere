import React from "react";
import Backbone from "backbone";
import ButtonBar from "./ButtonBar";
import ExternalLinkList from "./link/ExternalLinkList";
import ImageList from "./image/ImageList";
import InstanceList from "./instance/InstanceList";
import VolumeList from "./volume/VolumeList";
import modals from "modals";
import stores from "stores";
import actions from "actions";

import {trackAction} from "utilities/userActivity";

export default React.createClass({
    displayName: "ProjectDetails",

    propTypes: {
        project: React.PropTypes.instanceOf(Backbone.Model).isRequired
    },

    getInitialState: function() {
        return {
            previewedResource: null,
            selectedResources: new Backbone.Collection()
        };
    },

    updateState: function() {
        let project = this.props.project;
        let externalLinks = stores.ProjectExternalLinkStore.getExternalLinksFor(
            project
        );
        let instances = stores.ProjectInstanceStore.getInstancesFor(project);
        let volumes = stores.ProjectVolumeStore.getVolumesFor(project);
        let images = stores.ProjectImageStore.getImagesFor(project);
        let selectedResources = this.state.selectedResources;

        if (instances && volumes && images && externalLinks) {
            // Take into account that selected resources may be out of date, that
            // it may contain resources that no longer exist in the endpoints
            let selectedThatStillExist = selectedResources.cfilter(r => {
                return (
                    instances.contains(r) ||
                    volumes.contains(r) ||
                    images.contains(r) ||
                    externalLinks.contains(r)
                );
            });

            this.setState({
                selectedResources: selectedThatStillExist
            });
        }

        this.forceUpdate();
    },

    componentDidMount: function() {
        stores.ProjectImageStore.addChangeListener(this.updateState);
        stores.ProjectVolumeStore.addChangeListener(this.updateState);
        stores.ProjectInstanceStore.addChangeListener(this.updateState);
        stores.ProjectExternalLinkStore.addChangeListener(this.updateState);
        stores.InstanceStore.addChangeListener(this.updateState);
        stores.VolumeStore.addChangeListener(this.updateState);
    },

    componentWillUnmount: function() {
        stores.ProjectImageStore.removeChangeListener(this.updateState);
        stores.ProjectVolumeStore.removeChangeListener(this.updateState);
        stores.ProjectInstanceStore.removeChangeListener(this.updateState);
        stores.ProjectExternalLinkStore.removeChangeListener(this.updateState);
        stores.InstanceStore.removeChangeListener(this.updateState);
        stores.VolumeStore.removeChangeListener(this.updateState);
    },

    onResourceSelected: function(resource) {
        var selectedResources = this.state.selectedResources;

        // Add the resource to the list of selected resources
        selectedResources.push(resource);

        this.setState({
            previewedResource: resource,
            selectedResources
        });
    },

    deselectAllResources: function() {
        var selectedResources = this.state.selectedResources;
        selectedResources.reset();
        this.setState({
            selectedResources
        });
    },

    onResourceDeselected: function(resource) {
        var selectedResources = this.state.selectedResources,
            previewedResource = this.state.previewedResource;

        // Remove the resources from the list of selected resources
        selectedResources.remove(resource);

        // Replace preview, with another
        if (previewedResource == resource) {
            previewedResource = selectedResources.last();
        }

        this.setState({
            previewedResource,
            selectedResources
        });
    },

    onPreviewResource: function() {
        this.deselectAllResources();
    },

    onMoveSelectedResources: function() {
        var attachedResources = stores.VolumeStore.getAttachedResources(),
            anyAttached;

        anyAttached = this.state.selectedResources.some(function(selected) {
            return attachedResources.includes(selected.get("uuid"));
        });

        // clicking & moving are treated as distinct actions to see how many
        // actions are _completed_: clicked + moved
        trackAction("clicked-move-selected-resources");

        if (anyAttached) {
            modals.ProjectModals.cantMoveAttached();
        } else {
            // On submit of move resources, reset (remove all) from selected collection
            modals.ProjectModals.moveResources(
                this.state.selectedResources,
                this.props.project,
                this.deselectAllResources
            );
        }
    },
    onDeleteSelectedResources: function() {
        actions.ProjectActions.deleteResources(
            this.state.selectedResources,
            this.props.project
        );
    },

    onReportSelectedResources: function() {
        actions.ProjectActions.reportResources(
            this.props.project,
            this.state.selectedResources
        );
    },

    onRemoveSelectedResources: function() {
        modals.ProjectModals.removeResources(
            this.state.selectedResources,
            this.props.project
        );
    },

    render: function() {
        var project = this.props.project,
            projectExternalLinks = stores.ProjectExternalLinkStore.getExternalLinksFor(
                project
            ),
            projectInstances = stores.ProjectInstanceStore.getInstancesFor(
                project
            ),
            projectVolumes = stores.ProjectVolumeStore.getVolumesFor(project),
            projectImages = stores.ProjectImageStore.getImagesFor(project),
            previewedResource = this.state.previewedResource,
            selectedResources = this.state.selectedResources,
            isButtonBarVisible;

        if (
            !projectInstances ||
            !projectImages ||
            !projectExternalLinks ||
            !projectVolumes
        )
            return <div className="loading" />;

        // Only show the action button bar if the user has selected resources
        isButtonBarVisible = this.state.selectedResources.length > 0;

        return (
            <div className="project-content clearfix">
                <ButtonBar
                    isVisible={isButtonBarVisible}
                    onMoveSelectedResources={this.onMoveSelectedResources}
                    onDeleteSelectedResources={this.onDeleteSelectedResources}
                    onReportSelectedResources={this.onReportSelectedResources}
                    onRemoveSelectedResources={this.onRemoveSelectedResources}
                    previewedResource={previewedResource}
                    multipleSelected={
                        selectedResources && selectedResources.length > 1
                    }
                    onUnselect={this.onResourceDeselected}
                    project={project}
                />
                <div className="resource-list clearfix">
                    <div
                        className="scrollable-content"
                        style={{borderTop: "solid 1px #E1E1E1"}}>
                        <InstanceList
                            instances={projectInstances}
                            onResourceSelected={this.onResourceSelected}
                            onResourceDeselected={this.onResourceDeselected}
                            onPreviewResource={this.onPreviewResource}
                            previewedResource={previewedResource}
                            selectedResources={selectedResources}
                        />
                        <VolumeList
                            volumes={projectVolumes}
                            onResourceSelected={this.onResourceSelected}
                            onResourceDeselected={this.onResourceDeselected}
                            onPreviewResource={this.onPreviewResource}
                            previewedResource={previewedResource}
                            selectedResources={selectedResources}
                        />
                        <ImageList
                            images={projectImages}
                            onResourceSelected={this.onResourceSelected}
                            onResourceDeselected={this.onResourceDeselected}
                            onPreviewResource={this.onPreviewResource}
                            previewedResource={previewedResource}
                            selectedResources={selectedResources}
                        />
                        <ExternalLinkList
                            external_links={projectExternalLinks}
                            onResourceSelected={this.onResourceSelected}
                            onResourceDeselected={this.onResourceDeselected}
                            onPreviewResource={this.onPreviewResource}
                            previewedResource={previewedResource}
                            selectedResources={selectedResources}
                        />
                    </div>
                </div>
            </div>
        );
    }
});
