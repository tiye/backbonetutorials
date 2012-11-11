define([
  'jquery',
  'underscore',
  'backbone',
  'collections/contributors/ContributorsCollection',
  'views/contributors/ContributorsListView',
  'text!templates/contributors/contributorsTemplate.html'
], function($, _, Backbone, ContributorsCollection, ContributorsListView, contributorsTemplate){

  var ContributorsView = Backbone.View.extend({
    
    el: $("#page"),

    initialize:function() {

      var that = this;

      var onDataHandler = function(collection) {
          that.render();
      }

      this.collection = new ContributorsCollection([]); 
      this.collection.fetch({ success : onDataHandler, dataType: "jsonp" });

    },

    render: function(){

      var total_contributions = this.getTotalContributions(this.collection.models);
      var total_contributors = this.collection.models.length;  
    
      var data = { total_contributions : total_contributions, 
                  total_contributors : total_contributors}; 

      // main view  
      var compiledTemplate = _.template( contributorsTemplate, data );
      this.$el.html( compiledTemplate ); 

      // sub view 
      var contributorsListView = new ContributorsListView({ collection: this.collection}); 
      contributorsListView.render();

    },

    getTotalContributions:function( aModels ){

      var total = 0;
      
      _.each(aModels, function(contributorModel) { 
         var contributorContributions = Number ( contributorModel.get("contributions") );
         total += contributorContributions; 
      });

      return total; 
    }


  });
  return ContributorsView;
});