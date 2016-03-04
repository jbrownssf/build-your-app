angular.module('SSFBuildAnApp', [])
.service('SSFBuildAnAppService', ['$window', '$ionicModal',
        function($window, $ionicModal) {
    
    var service = this;
    
    function consoleLog(content) {
        console.log(content);
    }
    
    var templateChoices = [
        {'function': "toolBox.selectTemplate({'type': 'basicDiv'})", 'name': 'div'},
        {'function': "toolBox.selectTemplate({'type': 'header'})", 'name': 'header'},
        {'function': "toolBox.selectTemplate({'type': 'footer'})", 'name': 'footer'},
        {'function': "toolBox.selectTemplate({'type': 'button'})", 'name': 'button'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'icons'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'list'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'list divider'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'cards'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'forms'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'inset forms'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'toggle'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'checkbox'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'radio buttons'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'range'},
        {'function': "consoleLog('Not implemented yet.')", 'name': 'select'}
    ];
    var ionicColors = [
        'light',
        'stable',
        'positive',
        'calm',
        'balanced',
        'energized',
        'assertive',
        'royal',
        'dark'
    ];
    var createColorsArray = function(type) {
        var returnArray = [];
        for(var i in ionicColors) {
            returnArray.push(type + '-' + ionicColors[i]);
        }
        return returnArray;
    };
    
    
    service.toolBox = function(box) {
        box.myAppBuild = '';
        box.templateArray = 
        [];
        // Nested arrays to test how rows might work
        /*
        [
            [
                [
                	{
                		'class': "button button-block",
                		'color': "button-balanced",
                		'newContent': "hello",
                		'outlineButton': false,
                		'showOutline': "",
                		'template': "button"
                	},
                	{
                		'class': "button button-block",
                		'color': "button-balanced",
                		'newContent': "good bye",
                		'outlineButton': false,
                		'showOutline': "true",
                		'template': "button"
                	},
                	{
                		'class': "button button-block",
                		'color': "button-balanced",
                		'newContent': "not today",
                		'outlineButton': false,
                		'showOutline': "",
                		'template': "button"
                	},
                	{
                		'class': "button button-block",
                		'color': "button-balanced",
                		'newContent': "hasta luego",
                		'outlineButton': true,
                		'showOutline': "true",
                		'template': "button"
                	}
                ],
            	{
            		'class': "button button-block",
            		'color': "button-calm",
            		'newContent': "hasta",
            		'outlineButton': true,
            		'showOutline': "",
            		'template': "button"
            	}
                
            ]
        ];
        */
        box.undoArray = [];
        box.colorChoices = [];
        box.sliderChoices = [];//[{'displayName': '', 'cssNames': [], 'howMany': 2, 'currentSelected': '', 'modelName': ''}];
        box.sliderModel = {};
        box.newDiv = {
            // 'class': '',
            // 'newContent': ''
            // 'template': ''
            // 'buttonSize': ''
            // 'header': boolean
            // 'outlineButton': boolean
        };
        box.inputTemplate = {
            // everything in here is a boolean value
            // 'toggle'
            // 'class'
            // 'color'
            // 'newContent'
            // 'slider'
            
        };
        box.toggleArray = [{'displayName': '', 'newDivObjName': ''}];
        box.changeSliders = function(slider) {
			box.newDiv[slider.modelName] = slider.cssNames[box.sliderModel[slider.modelName]];
        };
        box.updateDisplay = function() {
            box.myAppBuild = '<div>';
            console.log(box.templateArray);
            for(var i in box.templateArray) {
                if(Array.isArray(box.templateArray[i])) {
                    console.log('is an array.');
                    box.myAppBuild += box.subUpdateDisplay(box.templateArray[i]);
                } else {
                    console.log('is not an array.');
                    //call an external function to handle all nested rows and have it call itself as necessary
                    box.myAppBuild += box.templates(box.templateArray[i]);
                }
            }
            box.myAppBuild += '</div>';
            console.log(box.myAppBuild);
        };
        box.subUpdateDisplay = function(subArray) {
            var returnString = '';
            if(!Array.isArray(subArray[0]))
                returnString += '<div class="button-bar">'; //call some switch that handles rows/lists
            for(var j in subArray) {
                if(Array.isArray(subArray[j])) {
                    console.log('is an array.');
                    returnString += box.subUpdateDisplay(subArray[j]);
                } else {
                    console.log('is not an array.');
                    //call an external function to handle all nested rows and have it call itself as necessary
                    returnString += box.templates(subArray[j]);
                }
            }
            if(!Array.isArray(subArray[0]))
                returnString += '</div>'; //call some switch that handles rows/lists
            return returnString;
        };
        box.submitDiv = function() {
            //different depending on the format being used
            box.undoArray = [];
            box.templateArray.push(JSON.parse(JSON.stringify(box.newDiv)));
            box.updateDisplay();
            box.selectTemplate({'type': box.newDiv.template});
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
                    box.selectTemplate({'undoRedo': box.undoArray[box.undoArray.length-1]});
                }
                else {
                    box.selectTemplate({'type': box.templateArray[box.templateArray.length-1].template});
                }
                box.selectTemplate({'undoRedo': box.newDiv});
                box.updateDisplay();
            }
        };
        box.templates = function(shapeTemplate) {
            //stores the formatting of each template
            switch (shapeTemplate.template) {
                case 'basicDiv':
                    return '<div class="' + shapeTemplate.class + '">' + shapeTemplate.newContent + '</div>';
                case 'header':
                    shapeTemplate.headerName = 'bar-header';
                    if(shapeTemplate.header)
                        shapeTemplate.headerName = 'bar-subheader';
                    return '<div class="bar ' + shapeTemplate.headerName + ' ' + shapeTemplate.color + '"><h1 class="' + shapeTemplate.class + '">' + shapeTemplate.newContent + '</h1></div>';
                case 'footer':
                    // pull-right css?
                    return '<div class="bar bar-footer ' + shapeTemplate.color + '"><div class="' + shapeTemplate.class + '">' + shapeTemplate.newContent + '</div></div>';
                case 'button':
                    shapeTemplate.showOutline = '';
                    if(shapeTemplate.outlineButton)
                        shapeTemplate.showOutline = 'button-outline';
                    return '<div class="button ' + shapeTemplate.class + ' ' + shapeTemplate.color + ' ' + shapeTemplate.buttonSize + ' ' + shapeTemplate.buttonType + ' ' + shapeTemplate.showOutline + '">' + shapeTemplate.newContent + '</div>';
                // case 'footer':
                //     return '<div class="bar bar-footer ' + shapeTemplate.color + '"><div class="' + shapeTemplate.class + '">' + shapeTemplate.newContent + '</div></div>';
                // case 'footer':
                //     return '<div class="bar bar-footer ' + shapeTemplate.color + '"><div class="' + shapeTemplate.class + '">' + shapeTemplate.newContent + '</div></div>';
                // case 'footer':
                //     return '<div class="bar bar-footer ' + shapeTemplate.color + '"><div class="' + shapeTemplate.class + '">' + shapeTemplate.newContent + '</div></div>';
                // case 'icon':
                //     //Statements executed when the result of expression matches valueN
                //     break;
                default:
                    //Statements executed when none of the values match the value of the expression
                    break;
                }
        };
        box.selectTemplate = function(data) {
            //declares which fields are visible for editing
            box.toggleArray = {};
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
                case 'header':
                    box.toggleArray = [{'displayName': 'Sub Header?', 'newDivObjName': 'header'}];
                    box.colorChoices = createColorsArray('bar');
                    box.newDiv = {
                        'template': 'header',
                        'class': 'title'
                    };
                    if(data.undoRedo !== undefined)
                        box.newDiv = data.undoRedo;
                    box.inputTemplate = {
                        'class': true,
                        'color': true,
                        'newContent': true,
                        'toggle': true
                    };
                    break;
                case 'footer':
                    box.colorChoices = createColorsArray('bar');
                    box.newDiv = {
                        'template': 'footer',
                        'class': 'title'
                    };
                    if(data.undoRedo !== undefined)
                        box.newDiv = data.undoRedo;
                    box.inputTemplate = {
                        'class': true,
                        'color': true,
                        'newContent': true
                    };
                    break;
                case 'button':
                    box.toggleArray = [{'displayName': 'Outline Button?', 'newDivObjName': 'outlineButton'}];
                    box.sliderChoices = [
                        {'displayName': 'Button Size', 'cssNames': ['button-small', '', 'button-large'], 'howMany': 2, 'modelName': 'buttonSize'},
                        {'displayName': 'Button Type', 'cssNames': ['button-block', '', 'button-full'], 'howMany': 2, 'modelName': 'buttonType'}
                    ];
                    box.colorChoices = createColorsArray('button');
                    box.newDiv = {
                        'template': 'button'
                    };
                    box.sliderModel = {
                        'buttonSize': 1,
                        'buttonType': 1
                    };
                    if(data.undoRedo !== undefined)
                        box.newDiv = data.undoRedo;
                    box.inputTemplate = {
                        'slider': true,
                        'class': true,
                        'color': true,
                        'newContent': true,
                        'toggle': true
                    };
                    break;
                // case 'footer':
                //     box.colorChoices = createColorsArray('bar');
                //     box.newDiv = {
                //         'template': 'footer',
                //         'class': 'title'
                //     };
                //     if(data.undoRedo !== undefined)
                //         box.newDiv = data.undoRedo;
                //     box.inputTemplate = {
                //         'class': true,
                //         'color': true,
                //         'newContent': true
                //     };
                //     break;
                // case 'footer':
                //     box.colorChoices = createColorsArray('bar');
                //     box.newDiv = {
                //         'template': 'footer',
                //         'class': 'title'
                //     };
                //     if(data.undoRedo !== undefined)
                //         box.newDiv = data.undoRedo;
                //     box.inputTemplate = {
                //         'class': true,
                //         'color': true,
                //         'newContent': true
                //     };
                //     break;
                default:
                    break;
            }
        };
        box.showPreview = function(testString) {
            if(testString === box.newDiv.template)
                return true;
            return false;
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
                        '<div class="row" style="width:1400px">' +
                            '<button ng-click="toolBox.undo()" class="button button-outline button-dark">undo</button>' +
                            '<button ng-click="toolBox.redo()" class="button button-outline button-dark">redo</button>';
        for(var i in templateChoices) {
            template +=     '<button ng-click="' + templateChoices[i].function + '" class="test button button-outline button-dark">' + templateChoices[i].name + '</button>';
        }
        template +=     '</div>' +
                    '</ion-scroll>' +
                    '<div class="list">' +
                        //add any new input fields here
                        '<label ng-show="toolBox.inputTemplate.color" class="item item-input item-select"><div class="input-label">Color</div><select ng-model="toolBox.newDiv.color"><option ng-repeat="item in toolBox.colorChoices">{{item}}</select></label>' +
                        '<div ng-show="toolBox.inputTemplate.slider"><div ng-repeat="sliderChoice in toolBox.sliderChoices"><div class="item item-divider">{{sliderChoice.displayName}}</div><div class="item range range-positive"><input type="range" min="0" max="{{sliderChoice.howMany}}" ng-model="toolBox.sliderModel[sliderChoice.modelName]" ng-change="toolBox.changeSliders(sliderChoice)"></div></div></div>' +
                        '<li ng-show="toolBox.inputTemplate.toggle" class="item item-toggle" ng-repeat="whichToggle in toolBox.toggleArray">{{whichToggle.displayName}}<label class="toggle toggle-assertive"><input ng-model="toolBox.newDiv[whichToggle.newDivObjName]" type="checkbox"><div class="track"><div class="handle"></div></div></label></li>' +
                        '<label ng-show="toolBox.inputTemplate.newContent" class="item item-input"><textarea ng-model="toolBox.newDiv.newContent" placeholder="content"></textarea></label>' +
                        '<label ng-show="toolBox.inputTemplate.class" class="item item-input"><textarea ng-model="toolBox.newDiv.class" placeholder="list of classes"></textarea></label>' +
                    '</div>' +
                    '<button ng-click="toolBox.submitDiv()" class="col button button-block button-calm">apply changes</button>' +
                    '<div class="text-center">Current Preview</div>' +
                    //preview types
                    '<div ng-show="toolBox.showPreview(' + "'basicDiv'" + ')" ng-class="toolBox.newDiv.class">{{toolBox.newDiv.newContent}}</div>' +
                    '<ion-scroll style="height: 100px" ng-show="toolBox.showPreview(' + "'header'" + ')"><div class="bar bar-header" ng-class="[toolBox.newDiv.color, toolBox.newDiv.header ? ' + "'bar-header'" + ' : ' + "'bar-subheader'" + ']"><h1 ng-class="toolBox.newDiv.class">{{toolBox.newDiv.newContent}}</h1></div></ion-scroll>' +
                    '<button ng-show="toolBox.showPreview(' + "'button'" + ')" class="button" ng-class="[toolBox.newDiv.class, toolBox.newDiv.color, toolBox.newDiv.buttonSize, toolBox.newDiv.buttonType, toolBox.newDiv.outlineButton ? ' + "'button-outline'" + ' : ' + "''" + ']">{{toolBox.newDiv.newContent}}</button>' +
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
        $scope.consoleLog = function(logData) {
            console.log(logData);
        };
    };
}]);