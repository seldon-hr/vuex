const request = window.indexedDB.open('myDB', 1);


// Obtener la base de datos IndexedDB
const database = indexedDB.open("myDB", 1);

// Crear la colección de usuarios
database.transaction(["users"], "readwrite").objectStore("users").createIndex("name", "name", "unique");

// Insertar el nuevo usuario
const object = {
  name: "Juan Pérez",
  email: "juan.perez@example.com",
};

database.transaction(["users"], "readwrite").objectStore("users").add(object);


