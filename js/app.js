// Referencias HTML
const d = document;

const nombreProducto = d.querySelector('#producto'),
      precioProducto = d.querySelector('#precio'),
      stockProducto = d.querySelector('#stock'),
      categoriaProducto = d.querySelector('#categoria');

const tablaProductos = d.querySelector('#tablaResultados'),
      cuerpoTabla = d.querySelector('#cuerpoTabla'),
      elementoTr = d.querySelectorAll('tr'),
      elementoTd = d.querySelectorAll('td');

const alertaDatos = d.querySelector('#alerta__faltan__datos'),
      alertaProductoAdd = d.querySelector('#alerta__producto__add');

const btnAddProducto = d.querySelector('#add'),
      btnEliminaProducto = d.querySelector('#elemento'),
      btnEditar = d.querySelector('#editar');

// Funciones
/*****************
 * COMPONENTE IMG
 *****************/
const crearImg = (producto) => {
    const $img = d.createElement('img');
    
    $img.alt = `Imagen para el producto de ${producto}`;
    $img.classList.add('imagenProducto');
    $img.src = `assets/${producto}.jpg`;

    return $img;
}


/*****************
 * AÑADIR PRODUCTO
 *****************/
const addProducto = () => {
    if((nombreProducto.value && precioProducto.value && stockProducto.value) === ''){
        // Alertas para validar datos
        alertaDatos.classList.add('alerta_borrado');
        alertaDatos.innerHTML = 'Por favor, introduce todos los datos en el formato correcto';
        alertaDatos.style.display = 'block';

        setTimeout(() => {
            alertaDatos.style.display = 'none';
        }, 2000);

    } else {

        // Creación de elementos HTML
        const $fila = tablaProductos.insertRow(),
              $celda1 = $fila.appendChild(d.createElement('td')),
              $celda2 = $fila.appendChild(d.createElement('td')),
              $celda3 = $fila.appendChild(d.createElement('td')),
              $celda4 = $fila.appendChild(d.createElement('td'));

        $celda1.textContent = nombreProducto.value;
        $celda2.textContent = parseFloat(precioProducto.value).toFixed(2);
        if(stockProducto.value <= 10){
            $celda3.style.color = 'red';
            $celda3.textContent = parseInt(stockProducto.value);
        } else {
            $celda3.style.color = 'green';
            $celda3.textContent = parseInt(stockProducto.value);
        }
        $celda4.appendChild(crearImg((categoriaProducto.value).toLowerCase()));

        // Evita colapsar la tabla con elementos
        if((d.querySelectorAll('tr').length) >= 7){
            // Alertas para validar datos
            alertaDatos.classList.add('alerta_borrado');
            alertaDatos.innerHTML = 'No se pueden añadir más productos a la tabla (máximo 6)';
            alertaDatos.style.display = 'block';

            setTimeout(() => {
                alertaDatos.style.display = 'none';
            }, 2000);
            return;
        }

        // Borra el valor de los inputs y los deja en blanco
        d.querySelectorAll('input#producto, input#precio, input#stock').forEach((valor) => {
            valor.value = '';
        });

        // Alertas al añadir un nuevo producto
        alertaProductoAdd.classList.add('alerta_add');
        alertaProductoAdd.innerHTML = 'Producto añadido correctamente';
        alertaProductoAdd.style.display = 'block';
    
        setTimeout(() => {
            alertaProductoAdd.style.display = 'none'; 
        }, 2000);
    }
}

/*******************
 * ELIMINAR PRODUCTO
 *******************/
const eliminarProducto = () => {
    const producto = prompt('Elige producto a eliminar');
    
          elementoTd.forEach((valor, indice) => {
              if(elementoTd[indice].textContent === producto){
                  elementoTd[indice].parentNode.remove();
              }
          });
}

/*****************
 * EDITAR PRODUCTO
 ****************/
const editarProducto = () => {
    const aEditar = prompt('Elige el producto a editar'),
          nomProducto = prompt('Selecciona nuevo nombre del producto'),
          precioProducto = parseFloat(prompt('Indica nuevo precio del producto').toFixed(2)),
          stockProducto = parseInt(prompt('Indica nuevo stock del producto'));

    console.log(d.querySelectorAll('tr'));
    
    elementoTd.forEach((valor, indice) => {
        if(elementoTd[indice].textContent === aEditar){
            elementoTd[indice].parentNode.innerHTML = `
            <td>${nomProducto}</td>
            <td>${precioProducto}</td>
            <td>${stockProducto}</td>
            `;
        }
    });
}

// Eventos
btnAddProducto.addEventListener('click', addProducto);
btnEliminaProducto.addEventListener('click', eliminarProducto);
btnEditar.addEventListener('click', editarProducto);
