$(document).ready(function() {

  const createOrderElement = (order) => {
    const orderFormat =
    `
    <div class="card">
    <h4><b>Order #${order.order_id}</b></h4>
    <p>Items: ${order.name}, PRICE: ${order.price}</p>
    <p>Instructions: ${order.instructions}</p>
    </div>
    `;
    return orderFormat;
  };

  const renderAllOrders = (orders) => {
    orders.forEach(order => {
      //add each order to a huge container, that will contain all orders
      console.log(order);
      $("#orders").append(createOrderElement(order));
    });
  };

  const createMenuElement = (dish) => {
    const orderFormat =
    `
    <div class="card">
    <h4><b>Name: ${dish.name}</b></h4>
    <p>Category: ${dish.category}</p>
    <p>Price: ${dish.price}</p>
    <form id="${dish.id}" action="/api/orders" method="POST">
    <button type="submit">Order Me!</button>
    </form>
    </div>
    `;
    return orderFormat;
  };

  const renderAllMenu = (dishes) => {
    dishes.forEach(dish => {
      //add each order to a huge container, that will contain all orders
      $("#menu").append(createMenuElement(dish));
    });
  };


  // Gets the unfulfilled orders (Working for everyone right now, has to only work for admin)
  $('#all-unfulfilled-orders').submit(function(event) {
    $('#orders').empty();
    $('#menu').empty();

    //prevents default action
    event.preventDefault();

    const params = {
      url: `/admin/unfulfilledorders`,
      method: "GET",
      data: $(this).serialize()
    };

    $.ajax(params)
      .then((unfulfilledorders) => {
        renderAllOrders(unfulfilledorders);
        console.log(unfulfilledorders);
      });
  });




  $('#all-orders').submit(function(event) {
    $('#orders').empty();
    $('#menu').empty();

    //prevents default action
    event.preventDefault();

    const params = {
      url: `/api/orders`,
      method: "GET",
      data: $(this).serialize()
    };

    $.ajax(params)
      .then((orders) => {
        renderAllOrders(orders);
        console.log(orders);
      });

    $('#orders').append("<h1>orders go here</h1>");

  });

  $('#all-dishes').submit(function(event) {

    //prevents default action
    event.preventDefault();

    $('#orders').empty();

    const params = {
      url: `/api/dishes`,
      method: "GET",
      data: $(this).serialize()
    };

    $.ajax(params)
      .then((dishes) => {
        renderAllMenu(dishes);
        console.log(dishes);
      });

    $('#menu').append("<h1>menu go here</h1>");

  });






  //Form to create a dish
  const $newDishForm = $(`
  <form action="/api/dishes" method="POST" id="new-dish-form" class="new-dish-form">
      <div class="new-dish-form_field-wrapper">
        <label for="new-dish-form_name">Name</label>
        <input type="text" name="name" placeholder="Name" id="new-dish-form_name">

        <label for="new-dish-form_category">Category</label>
        <input type="text" name="category" placeholder="Category" id="new-dish-form_category">

        <label for="new-dish-form_price">Price</label>
        <input type="number" name="price" placeholder="$$$" id="new-dish-form_price">

        <button type="submit"> Create </button>
      </div>
    </form>
  `)


  // Creates simple form to create a dish
  $('#create-dish').submit(function(event) {
    event.preventDefault();
    $('#orders').empty();
    $('#menu').empty();
    $("#menu").append($newDishForm)

  });

  const loadMenu = function () {
    $.ajax({
      url: "/api/dishes",
      method: "GET",
      success: function (dishes) {
        renderAllMenu(dishes);
      }
    })

  }

  // Posts form to /api/dishes (Not working right now) !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  ('.new-dish-form').submit(function (event) {
    event.preventDefault();
    const params = {
      url: "/api/dishes/",
      method: "POST",
      data: $(this).serialize()
    };

    $.ajax(params)
    .then((dishes) => {
      loadMenu(dishes);
      console.log(dishes);
    })
    .catch((error) => {
      console.error(error);

    })
  })



});
