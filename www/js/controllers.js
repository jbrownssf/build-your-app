angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'SSFBuildAnAppService', function($scope, SSFBuildAnAppService) {
  
  // $scope.consoleLog = function(content) {
  //   console.log(content);
  // };
  $scope.toolBox = {};
  SSFBuildAnAppService.toolBox($scope.toolBox);
  
  $scope.openPageSettings = function($event) {
    SSFBuildAnAppService.openPageSettings($event, $scope);
  };
  
  
  
  $scope.test = 'hello world';
  
  $scope.myAppBuild =
    '<div>' + 
    '</div>';
    
    
  // $scope.newScope = {};
  // $scope.addScope = function(scopeName, scopeContent) {
  //   $scope[scopeName] = scopeContent;
  //   $scope.newScope = {};
  // };
  
  
}])

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
