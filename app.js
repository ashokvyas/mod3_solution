(function(){
   'use strict';

   angular.module("NarrowItDownApp", [])
    .controller("NarrowDownController", NarrowDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItem", FoundItem);

    var found = [];

    
    
 
     function FoundItem(){
        var ddo = {

          templateUrl: 'menuItem.html',

          scope: {
            
              found: '<',
              badRemove: '='
          }

        };

        return ddo;
     }

NarrowDownController.$inject = ['MenuSearchService'];

function NarrowDownController(MenuSearchService){
        var ctrl = this;
        
      
    ctrl.newItem = function(name1){

        found.length = 0;

      if(name1!=""){
       
        var promise = MenuSearchService.getMatchedMenuItems(name1);

        promise.then(function(response){
          debugger
          ctrl.menu_items = response.data;
           
          
            for(var i=0; i<ctrl.menu_items.menu_items.length; i++){
      
                if(ctrl.menu_items.menu_items[i].description.includes(name1)){
                   found.push(ctrl.menu_items.menu_items[i]);
                   
                }

            }

          if(found.length===0){
          
              ctrl.message= "Nothing found!"
            }
            else{
              ctrl.message=""
            } 
            
        })
         .catch(function(error){
            console.log(error);
         });

      }

     else { 
        

              ctrl.message= "Nothing found!"
           
      }
      
    };

    ctrl.removeItem = function(foundIndex){
        found.splice(foundIndex, 1);
    }
     

   ctrl.found = found;

};

      
        
      

MenuSearchService.$inject = ['$http'];
    function MenuSearchService($http){
      var service = this;

      service.getMatchedMenuItems = function(){
         
              var response = $http({
                method: "GET",
                url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
              });

          return response;
      };

  
    }


})();