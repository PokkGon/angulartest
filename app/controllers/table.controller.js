angular.module('miapp')
.controller('TableController', function TableController($scope, $state, $uibModal, Users, $timeout, lodash) {
    $scope.Users = Users;

    //Función para buscar usuario y esperar que el usuario termine de escribir
    $scope.searchText = lodash.debounce(function(event) {
        Users.listar();
    },500);

    //Función para ir a la página anterior en la lista de usuarios
    $scope.prevPage = function() {
        Users.page = Users.page-1;
        Users.listar();
    };

    //Función para ir a la página siguiente en la lista de usuarios
    $scope.nextPage = function() {
        Users.page = Users.page+1;
        Users.listar();
    };

    //Función para abrir modal
    $scope.showModal = function () {
        $scope.opts = {
            backdrop: true, 
            backdropClick: true,
            dialogFade: true,
            keyboard: false,
            templateUrl : 'app/views/modal.html',
            size: 'md',
            controller: 'ModalInstance',
            resolve: {  } // empty storage
        };
        var modalInstance = $uibModal.open($scope.opts);

        modalInstance.result.then(function(){
        },function(){
            console.log("Modal Closed");
        });
    };

    //Función para mostrar botón de eliminar y ocultar párrafo auxiliar.
    $scope.show = function(obj){
        jQuery('.table-hover').find('a').addClass('hidden');
        jQuery('.table-hover').find('.aux').removeClass('hidden');
        $timeout(function(){
            jQuery(obj.target).find('a').removeClass('hidden');
            jQuery(obj.target).find('.aux').addClass('hidden');
        },100);
    }

    //Función para ocultar el botón de eliminar
    $scope.hide = function(obj){
        jQuery('.table-hover').find('a').addClass('hidden');
        jQuery('.table-hover').find('.aux').removeClass('hidden');
    }
})