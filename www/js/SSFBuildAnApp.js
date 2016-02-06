angular.module('SSFBuildAnApp', [])
.service('SSFBuildAnAppService', ['$window', '$ionicModal',
        function($window, $ionicModal) {
    
    var service = this;
    
    function consoleLog(content) {
        console.log(content);
    }
    
    var templateChoices = [
        {'function': "toolBox.selectTemplate({'type': 'basicDiv'})", 'name': 'div'},
        {'function': "consoleLog('it works!')", 'name': 'bar'},
        {'function': "consoleLog('it works!')", 'name': 'footer'},
        {'function': "consoleLog('it works!')", 'name': 'button'},
        {'function': "consoleLog('it works!')", 'name': 'icons'},
        {'function': "consoleLog('it works!')", 'name': 'list'},
        {'function': "consoleLog('it works!')", 'name': 'list divider'},
        {'function': "consoleLog('it works!')", 'name': 'cards'},
        {'function': "consoleLog('it works!')", 'name': 'forms'},
        {'function': "consoleLog('it works!')", 'name': 'inset forms'},
        {'function': "consoleLog('it works!')", 'name': 'toggle'},
        {'function': "consoleLog('it works!')", 'name': 'checkbox'},
        {'function': "consoleLog('it works!')", 'name': 'radio buttons'},
        {'function': "consoleLog('it works!')", 'name': 'range'},
        {'function': "consoleLog('it works!')", 'name': 'select'}
    ];
    
    
    service.toolBox = function(box) {
        box.myAppBuild = '';
        box.templateArray = [];
        box.undoArray = [];
        box.newDiv = {
            // name each object the class that it will become? ie: class, style, ng-class, ng-style, etc.
            // 'class': '',
            // 'newContent': ''
            // 'template': 'basicDiv'
        };
        box.inputTemplate = {};
        box.updateDisplay = function() {
            box.myAppBuild = '<div>';
            for(var i in box.templateArray) {
                //call an external function to handle all nested rows and have it call itself as necessary
                box.myAppBuild += box.templates(box.templateArray[i]);
            }
            box.myAppBuild += '</div>';
        };
        box.submitDiv = function() {
            //different depending on the format being used
            box.templateArray.push(box.newDiv);
            box.updateDisplay();
            box.newDiv = {'template': 'basicDiv'};
        };
        box.stepInRow = function() {
            
        };
        box.stepOutRow = function() {
            
        };
        box.undo = function() {
            if(box.templateArray[box.templateArray.length - 1] !== undefined) {
                box.undoArray.push(box.templateArray.pop());
                box.newDiv = box.undoArray[box.undoArray.length-1];
                box.selectTemplate({'undoRedo': box.undoArray[box.undoArray.length-1]});
                box.updateDisplay();
            }
        };
        box.redo = function() {
            if(box.undoArray[box.undoArray.length - 1] !== undefined) {
                box.templateArray.push(box.undoArray.pop());
                if(box.undoArray[box.undoArray.length - 1] !== undefined) {
                    box.newDiv = box.undoArray[box.undoArray.length-1];
                }
                else {
                    box.newDiv = {'template': box.templateArray[box.templateArray.length-1].template};
                }
                box.selectTemplate({'undoRedo': box.newDiv});
                box.updateDisplay();
            }
        };
        box.templates = function(shapeTemplate) {
            //stores the formatting of each template
            var returnString = '';
            switch (shapeTemplate.template) {
                case 'basicDiv':
                    returnString = '<div';
                    if(shapeTemplate.class !== undefined)
                        returnString += ' class="' + shapeTemplate.class + '"';
                    returnString += '>';
                    if(shapeTemplate.newContent !== undefined)
                        returnString += shapeTemplate.newContent;
                    returnString += '</div>';
                    return returnString;
                case 'button':
                    //Statements executed when the result of expression matches value2
                    break;
                case 'icon':
                    //Statements executed when the result of expression matches valueN
                    break;
                default:
                    //Statements executed when none of the values match the value of the expression
                    break;
                }
        };
        box.selectTemplate = function(data) {
            //declares which fields are visible for editing
            if(data.undoRedo !== undefined)
                data.type = data.undoRedo.template;
            switch (data.type) {
                case 'basicDiv':
                    box.newDiv = {'template': 'basicDiv'};
                    if(data.undoRedo !== undefined)
                        box.newDiv = data.undoRedo;
                    box.inputTemplate = {
                        'class': true,
                        'newContent': true
                    };
                    break;
                default:
                    break;
            }
        };
    };
    
    service.openPageSettings = function($event, $scope) {
        var template = 
            '<ion-modal-view backdropClickToClose="false" id="buildanapp">' + 
                '<ion-header-bar>' +
                    '<h1 class="title">My Settings Toolbox</h1>' + 
                    '<div class="button button-icon" ng-click="closePopover()"><button class="button-icon icon ion-close-round"></button></div>' +
                '</ion-header-bar>'+ 
                '<ion-content>' +
                    '<ion-scroll direction="x" style="height:75px;" scrollbar-x>' +
                        '<div class="row" style="width:1250px">' +
                            '<button ng-click="toolBox.undo()" class="button button-outline button-dark">undo</button>' +
                            '<button ng-click="toolBox.redo()" class="button button-outline button-dark">redo</button>';
        for(var i in templateChoices) {
            template +=     '<button ng-click="' + templateChoices[i].function + '" class="test button button-outline button-dark">' + templateChoices[i].name + '</button>';
        }
        template +=
                        '</div>' +
                    '</ion-scroll>' +
                    '<div class="text-center">Add a Div</div>' +
                    '<div class="list">' +
                        //add any new input fields here
                        '<label class="item item-input" ng-show="toolBox.inputTemplate.newContent"><textarea ng-model="toolBox.newDiv.newContent" placeholder="div content"></textarea></label>' +
                        '<label class="item item-input" ng-show="toolBox.inputTemplate.class"><textarea ng-model="toolBox.newDiv.class" placeholder="list of classes"></textarea></label>' +
                    '</div>' +
                    '<button ng-click="toolBox.submitDiv()" class="col button button-block button-calm">submit div</button>' +
                    '<div class="text-center">Current Div Preview</div>' +
                    '<div ng-class="toolBox.newDiv.class">{{toolBox.newDiv.newContent}}</div>' +
                '</ion-content>' +
            '</ion-modal-view>';
        
        $scope.popover = $ionicModal.fromTemplate(template, {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
        });
        $scope.closePopover = function() {
            $scope.popover.remove();
        };
        $scope.popover.show($event);
    };
}]);