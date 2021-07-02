// Customers orders container : #customerOrders

const renderOrders = (orders, container) => {

  if (!$('#currentOrder')[0]) {
    const $currentOrder = $('<div>').appendTo(container);
    $currentOrder.attr('id', 'currentOrder');
    $currentOrder.attr('class', 'card');
    $currentOrder.attr('style', 'margin: 1em');
    
    const $currentOrderBody = $('<div>').appendTo($currentOrder);
    $currentOrderBody.attr('class', 'card-body');
    $('<h2>').attr('class', 'card-title').text('To Order').appendTo($currentOrderBody);
  }
  
  if (!$('#previousOrders')[0]) {
    const $ordersCard = $('<div>').appendTo(container);
    $ordersCard.attr('id', 'previousOrders');
    $ordersCard.attr('class', 'card');
    $ordersCard.attr('style', 'margin: 1em');

    const $ordersCardBody = $('<div>').appendTo($ordersCard);
    $ordersCardBody.attr('class', 'card-body');
    $('<h2>').attr('class', 'card-title').text('Previous Orders').appendTo($ordersCardBody);
  }
  orders.forEach(order => {
    
    
    if(!order.ordered_at) {
      renderOrder(order).appendTo($('#currentOrder'));
    } else {
      renderOrder(order).appendTo($('#previousOrders'));
    }


  });
}



const showCustomerOrders = (id, container) => {
  $.ajax({
    url: `/api/orders/customer/${id}`,
    method: 'GET'
  })
  .then((res) => {if(res) renderOrders(res, container)})
  .catch((err) => console.log(err));
}