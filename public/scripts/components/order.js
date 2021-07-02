const getOrderDishes = (order_id) => {
  return $.ajax({
    url: `/api/orders/${order_id}/dish_orders`,
    method: 'GET'
  })
}

const getDish = (dish_id) => {
  return $.ajax({
    url: `/api/dishes/${dish_id}`,
    method: 'GET'
  })
}


const renderDish = (dish, container) => {
  if (customerId) $('<div>').text(`-> ${dish.name}: ${dish.price/100}$`).appendTo(container);
  else {
    $('<div>').text(`-> ${dish.name}`).appendTo(container);
  }
}

const renderDishOrders = (dish_orders, container) => {
  dish_orders.forEach(dish_order => {
    getDish(dish_order.dish_id)
    .then(dish => {
      renderDish(dish[0], container);
    })
  });
}

const setToCompletedOrder = (order_id) => {
  return $.ajax({
    url: `api/orders/complete/${order_id}`,
    method: 'POST'
  })
}

const renderOrder = (order) => {
  const $orderCard = $('<div>');
  $orderCard.attr('class', 'card');
  $orderCard.attr('style', 'margin: 0.5em');
  

  const $orderCardBody = $('<div>').appendTo($orderCard);
  $orderCardBody.attr('id', 'current-order-dishes');
  $orderCardBody.attr('class', 'card-body');
  $orderCardBody.attr('style', 'margin: 0.5em');

  if (!customer && !order.completed_at && order.ordered_at) {
    const $completOrder = $('<button>').appendTo($orderCard);
    $completOrder.attr('type', 'button');
    $completOrder.attr('class', 'btn btn-danger');
    $completOrder.text('Complete Order');

    $completOrder.on('click', function() {
      setToCompletedOrder(order.id)
        .then(() => {
          $orderCard.empty();
        })
    })
  }



  
  if(!customerId || !order.ordered_at) {

    getOrderDishes(order.id)
    .then((dish_orders) => {
      renderDishOrders(dish_orders, $orderCardBody);
    })
    .catch((err) => console.log(err));

    if (!order.ordered_at) {
      const $confirmOrder = $('<button>').appendTo($orderCard);
      $confirmOrder.attr('type', 'button');
      $confirmOrder.attr('class', 'btn btn-primary');
      $confirmOrder.text('Confirm Order');

      $confirmOrder.on('click', function() {
        $.ajax({
          url: `/api/orders/confirm_order/${order.id}`,
          method: 'POST'
        })
        .then((dish_order) => {
          $('#current-order-dishes').empty();
          // setToOrderId()
          //     .then((newToOrder) => {
          //       toOrderId = newToOrder[0].id;
          //     })
          //     .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err))
      });
    } else if (!customerId){
      $('<h4>').attr('class', 'card-title').text(`Order #${order.id}`).appendTo($orderCardBody);
    }
  } else {
    $('<h4>').attr('class', 'card-title').text(`Order #${order.id}${order.completed_at ? '✅' : '⌛'}`).appendTo($orderCardBody);
  }

  return $orderCard;
}