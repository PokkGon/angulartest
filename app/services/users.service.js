angular.module('miapp')
.service('Users', function Users ($http,$state,$timeout) {
  
  //Variables globales
  this.data = []
  this.loading = true;
  this.resource = '/api/users/';

  //Variables para listar contactos
  this.page = 1;
  this.limit = 10;
  this.search = '';
  
  //Función para listar contactos
  this.listar = function listar() {
    this.loading = true;
    var self = this;
    var resource = this.resource;
    //Validar si es búsqueda o no
    if(this.search == ''){
      resource = resource+'?_page='+this.page+'&_limit='+this.limit;
    }else{
      resource = resource+'?q='+this.search;
    };
    //Consulta a la API
    $http.get(resource)
    .success(function success(data){
        self.data = data;
        self.loading = false;
    })
  };

  //Variables para crear contacto
  this.name = '';
  this.description = '';
  this.photo = '';
  
  //Función para crear contacto
  this.crear = function crear () {
      this.loading = true;
      //Crear JSON de usuario
      var user = {
          name: this.name,
          description: this.description,
          photo: this.photo
      }
      //Integrarlo en la variable de los contactos si es que es menos del límite
      if(this.data.length < this.limit){
        this.data.push(user);        
      }
      var self = this;
      //Enviar a la API
      $http.post(this.resource, user)
        .success(function success(x){
        self.data = self.data.map(function map (el) {
          if (el === user) {
            return x
          }
          return el
        })
      })
      .finally(function final() {
          self.loading = false;
      })
      //Resetear variables
      this.name = '';
      this.description = '';
      this.photo = '';
  }
  
  //Función para eliminar usuario. Recoge la id
  this.eliminar = function eliminar(id) {
        this.loading = true;
        //Eliminar del listado de contactos
        this.data = this.data.filter(function filter(el) {
                return el.id != id;
        });
        var self = this;
        //Envia a la API
        $http.delete(this.resource + '/' + id)
            .success(function success() {
                    self.loading = false;
            });
  };
  
  //Ejecuta el listado
  this.listar();

})