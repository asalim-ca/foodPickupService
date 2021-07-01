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

////////////////////

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

    //$('#orders').append("<h1>orders go here</h1>");

  });
////////////////////


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

});
