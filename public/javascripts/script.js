var aplicacion = angular.module('aplicacion', []);
aplicacion.controller('Clientes', function($scope, $http) {
    $scope._id = null;
    $scope.nombre = '';
    $scope.apellido = ''
    $scope.domicilio = '';
    $scope.telefono = '';
    $scope.email = '';
    $scope.clientes = [];
    $scope.cargarClientes = function(){
        $http({
            method: 'GET', url: '/listar'
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.clientes = data;
            }else{
                alert('Error al intentar recuperar los clientes.');
            }
        }).
        error(function() {
            alert('Error al intentar recuperar los clientes.');
        });
    };
    $scope.guardarCliente = function() {
        $http({
            method: 'POST',
            url: '/guardar',
            params: {
                nombre: $scope.nombre,
                apellido: $scope.apellido,
                domicilio: $scope.domicilio,
                telefono: $scope.telefono,
                email: $scope.email,
                _id: $scope._id
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope.limpiarDatos();
                $scope.cargarClientes();    
            }else{
                alert('Error al intentar guardar el cliente.');
            }
        }).
        error(function() {
            alert('Error al intentar guardar el cliente.');
        });
    }
    $scope.recuperarCliente = function(indice) {
        $http({
            method: 'GET',
            url: '/recuperar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(typeof(data) == 'object'){
                $scope._id = data._id;
                $scope.nombre = data.nombre;
                $scope.apellido = data.apellido;
                $scope.domicilio = data.domicilio;
                $scope.telefono = data.telefono;
                $scope.email = data.email;
            }else{
                alert('Error al intentar recuperar el cliente.');
            }            
        }).
        error(function() {
            alert('Error al intentar recuperar el cliente.');
        });
    };
    $scope.eliminarCliente = function(indice) {
        $http({
            method: 'POST',
            url: '/eliminar',
            params: {
                _id: indice
            }
        }).
        success(function(data) {
            if(data == 'OK'){
                $scope.limpiarDatos();
                $scope.cargarClientes();
            }else{
                alert('Error al intentar eliminar el cliente.');
            }            
        }).
        error(function() {
            alert('Error al intentar eliminar el cliente.');
        });
    };
    $scope.limpiarDatos = function() {
        $scope._id = null;
        $scope.nombre = '';
        $scope.apellido = '';
        $scope.domicilio = '';
        $scope.telefono = '';
        $scope.email = '';
    };
});