angular.module('miapp')
.controller('ModalInstance', function ($uibModalInstance, $scope, $uibModal, Users) {
    $scope.Users = Users;

    $scope.advise = ''; 

    //Función para crear un nuevo usuario en el servicio
    $scope.submitUser = function() {
        //Se valida que no estén vacíos
        if(Users.nombre !== '' && Users.description != '' && Users.photo !==  ''){
            Users.crear();
            $uibModalInstance.dismiss('cancel');
        }else{
            $scope.advise = 'Todos los campos son requeridos';
        };
    };

    //Función para cerrar el modal
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };
});
