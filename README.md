# Pmanagerng - frontend

El proyecto fue desarrollado con Angular CLI version 14.1.0. Para instalar las dependencias necesarias, usar el comando npm install en el directorio donde se clonó el repositorio.

## Estructura de directorios del proyecto

- Se tiene un módulo para la autenticación llamado auth, el cual contiene el comoponente correspondiente a la página de login.

- Se tiene el directorio guards, el cual contiene 2 guards:
  -validar-ruta: guard destinado a validar que un usuario solo pueda cargar las páginas a la que debe tener acceso, por ejemplo, un recurso no puede acceder a las páginas de un administrador.
  -validar-toker: guard destinado a validar si el usuario se encuentra autenticado mediante su JWT (Json Web Token), em donde no esta autenticado, se redireccionará a la págian de login.
  
- Se tiene el directorio pmanager, el cual tiene los dos principales módulos de la aplicación:
  1. actividades: módulo destinado a la gestión de proyectos y productos de la empresa, los componentes de este son los siguientes:
    - calidad-productos: página a la que accede el rol CAL (CALIDAD) para establecer las observaciones e indicadores de los productos de cada recuros.
    - gestion-empresa: página a la que accede el rol ALP (ANALISTA DE PROYECTO) para la gestión de empresas.
    - gestion-productos: página a la que accede el rol REC (RECUROS) para la gestión de sus productos.
    - gestion-proyectos: página a la que accede el rol ALP para la gestión de proyectos.
    - modificacion-productos: página a la que acceden los roles ALP y JEF (JEFATURA DE OPERACIONES) para aprobar o no, la modifificación y elimincación de productos.
    - modificacion-proyectos:  página a la que accede el rol JEF para aprobar o no, la modifificación y elimincación de proyectos.
  2. components: contiene el componenete home, el cual es la página que se muestra por defecto cuando cualquier usuario inicia sesión.
  3. interfaces: interfaces que ayudan a mapear los objetos recibidos por el backend y así, tener un mejor control sobre los datos que se muestran en la pantallas de usuario.
  4. seguridad: módulo destinado a la gestión de usuarios, perfiles y jefaturas, los componentes de este son los siguientes:
    - gestion-jefaturas: página a la que accede el rol ADM (ADMINISTRADOR) para la gestión de jefaturas.
    - gestion-perfiles: página a la que accede el rol ADM para la gestión de perfiles.
    - gestion-usuarios: página a la que accede el rol ADM para la gestión de usuarios.
  5. services: directorio que contiene los servicios para comunicarse con el backend y traer los datos en formato adecuado, contiene lo seiguiente:
    - autenticacion: servicio para realizar el login, validación de JWT, guardar usuario en local storage y cerrar sesión.
    - pmanager: servicios para realizar todas las peticiones al API REST del backend para interactuar con los recursos como usuarios, productos, empresas, etc.
    
- Se tiene el directorio prime-ng, el contiene un módulo en donde se realiza la importación de todos los módulos relacionados a PrimeNG con el fin de tener todos estos en un mismo lugar y no tener que importarlos uno por uno en los componenetes en donde se vayan a usar,
- Se tiene el directorio shared, el cual contiene los siguientes componenetes:
  1. cambio-clave: página a la que acceden todos los roles para realizar un cambio de contraseña.
  2. main: página principal la cual muestra el encabezado, las opciones a la que puede acceder cada rol y el espacio respecivo a cada página.
  3. menu: componente destinado a mostrar unicamente las opciones a la que puede acceder cada rol.
  4. top-bar: encabezado de la aplicación.
- Se tiene el directorio types el cual contiene algunos archivos para mapear de forma correcta los datos recibidos por el backend, similar a intefaces.
- En el módulo app-routing se tienen las rutas de la aplicación, si se agregan nuevas páginas, aquí se deben colocar para ser mostradas.
