angular.module('SSFBuildAnApp', [])
.service('SSFBuildAnAppService', ['$window', '$ionicModal',
        function($window, $ionicModal) {
    
    var service = this;
    
    
    function consoleLog(content) {
        console.log(content);
    }
    
    function includeDivToolBox($scope, divTools) {
        if(divTools.templateArray === undefined)
            divTools.templateArray = [];
        if(divTools.undoArray === undefined)
            divTools.undoArray = [];
        if($scope.divTools === undefined)
            $scope.divTools = {};
        $scope.divTools.newDiv = {'divContent': ''};
        
        divTools.updateDisplay = function() {
            $scope.myAppBuild = '<div>';
            for(var i in divTools.templateArray) {
                //call an external function to handle all nested loops and have it call itself as necessary
                $scope.myAppBuild += divTools.templateArray[i];
            }
            $scope.myAppBuild += '</div>';
            console.log($scope.myAppBuild);
        };
        
        $scope.divTools.submitDiv = function() {
            divTools.undoArray = [];
            divTools.templateArray.push('<div class="' + $scope.divTools.newDiv.divClass + '">' + $scope.divTools.newDiv.divContent + '</div>');
            divTools.updateDisplay();
            $scope.divTools.newDiv = {};
        };
        $scope.divTools.undo = function() {
            if(divTools.templateArray[divTools.templateArray.length - 1] !== undefined) {
                divTools.undoArray.push(divTools.templateArray.pop());
                divTools.updateDisplay();
            }
        };
        $scope.divTools.redo = function() {
            if(divTools.undoArray[divTools.undoArray.length - 1] !== undefined) {
                divTools.templateArray.push(divTools.undoArray.pop());
                divTools.updateDisplay();
            }
        };
    }
    
    service.openPageSettings = function($event, $scope, divTools) {
        includeDivToolBox($scope, divTools);
        var template = 
            '<ion-modal-view backdropClickToClose="false" id="buildanapp">' + 
                '<ion-header-bar>' +
                    '<h1 class="title">My Settings Toolbox</h1>' + 
                    '<div class="button button-icon" ng-click="closePopover()"><button class="button-icon icon ion-close-round"></button></div>' +
                '</ion-header-bar>'+ 
                '<ion-content>' +
                    '<ion-scroll direction="x" style="height:75px;" scrollbar-x>' +
                        '<div class="row" style="width:1200px">' +
                            '<button ng-click="divTools.undo()" class="test button button-outline button-dark ">undo</button>' +
                            '<button ng-click="divTools.redo()" class="button button-outline button-dark ">redo</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">bar</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">footer</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">button</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">icons</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">list</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">list divider</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">cards</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">forms</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">inset forms</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">toggle</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">checkbox</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">radio buttons</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">range</button>' +
                            '<button ng-click="" class="test button button-outline button-dark ">select</button>' +
                        '</div>' +
                    '</ion-scroll>' +
                    '<div class="text-center">Add a Div</div>' +
                    '<form name="divForm" ng-submit="divTools.submitDiv(divForm)">' +
                        '<div class="row">' +
                            '<input ng-model="divTools.newDiv.divClass" class="col" placeholder="list of classes">' +
                            '<input ng-model="divTools.newDiv.divContent" class="col" placeholder="div content">' +
                        '</div>' +
                        '<button class="col button button-block button-calm">submit div</button>' +
                    '</form>' +
                    '<div class="text-center">Current Div Preview</div>' +
                    '<div ng-class="divTools.newDiv.divClass">{{divTools.newDiv.divContent}}</div>' +
                '</ion-content>' +
            '</ion-modal-view>';
        
        
        $scope.popover = $ionicModal.fromTemplate(template, {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        });
        $scope.$on('modal.hidden', function() {
            // Execute action
            // $scope.popover.();
        });
        $scope.closePopover = function() {
            $scope.popover.remove();
        };
        
        $scope.popover.show($event);
    };
}]);