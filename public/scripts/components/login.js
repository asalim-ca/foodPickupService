let customerId;


const getCustomerId = (email) => {
  return $.ajax({
    url: `/api/customers/${email}`,
    method: 'GET'
  })
}

const getCustomerOrders = (id) => {
  return $.ajax({
    url: `/api/orders/customer/${id}`,
    method: 'GET'
  })
}

let toOrderId;

const setToOrderId = () => {
  return $.ajax({
    url: `/api/orders/${customerId}`,
    method: 'POST'
  })
}


const getOrders = () => {
  return $.ajax({
    url: `/api/orders/`,
    method: 'GET'
  }) 
}

const renderIncompleteOrders = (orders, container) => {
  orders.forEach(order => {
    if(!order.completed_at && order.ordered_at) {
      const $incompleteOrder = $('<div>').appendTo(container)
      renderOrder(order).appendTo($incompleteOrder);
      // getOrderDishes(order.id)
      // // .then((dish_orders) => {
      // //   renderDishOrders(dish_orders, $incompleteOrder);
      // //   renderOrder(order)
      // // })
      // // .catch((err) => console.log(err));
    }
  }); 
}

const login = function(container) {

  const $customerCard = $('<div>').appendTo(container);
  $customerCard.attr('class', 'card');
  $customerCard.attr('style', 'margin: 1em');
  
  const $customerCardBody = $('<div>').appendTo($customerCard);
  $customerCardBody.attr('class', 'card-body');
  $('<h5>').attr('class', 'card-title').text('Customer').appendTo($customerCardBody);
  
  
  
  const $customerLoginForm = $('<form>').appendTo($customerCardBody);
  
  const $customerLoginEmail = $('<div>').appendTo($customerLoginForm);
  $customerLoginEmail.attr('class', 'mb-3');
  
  const $customerLoginEmailInput = $('<input>').appendTo($customerLoginEmail);
  $customerLoginEmailInput.attr('type', 'email');
  $customerLoginEmailInput.attr('class', 'form-control');
  $customerLoginEmailInput.attr('id', 'inputEmail');
  $customerLoginEmailInput.attr('placeholder', 'Email Address...');
  
  const $customerLoginButton = $('<button>').appendTo($customerLoginForm);
  $customerLoginButton.attr('type', 'button');
  $customerLoginButton.attr('class', 'btn btn-primary');
  $customerLoginButton.text('Login');
  
  //Restaurant
  const $RestaurantCard = $('<div>').appendTo(container);
  $RestaurantCard.attr('class', 'card');
  $RestaurantCard.attr('style', 'margin: 1em');
  
  const $RestaurantCardBody = $('<div>').appendTo($RestaurantCard);
  $RestaurantCardBody.attr('class', 'card-body');
  $('<h5>').attr('class', 'card-title').text('Restaurant').appendTo($RestaurantCardBody);
  
  const $restaurantLoginForm = $('<form>').appendTo($($RestaurantCardBody));
  
  const $restaurantLoginButton = $('<input>').appendTo($restaurantLoginForm);
  $restaurantLoginButton.attr('type', 'button');
  $restaurantLoginButton.attr('class', 'btn btn-danger');
  $restaurantLoginButton.attr('value', 'Login');


  $restaurantLoginButton.on('click', function(){
    getOrders()
      .then((orders) => {
        $(container).empty();
        renderIncompleteOrders(orders, container);
      })

  });

  
  $customerLoginButton.on('click', function(){
    getCustomerId($customerLoginEmailInput.val())
      .then((id) => {
        customerId = id;
        getCustomerOrders(id)
          .then((orders) => {
            let unfulfilled = orders.find(order => !order.ordered_at)
            if (!unfulfilled) {
              setToOrderId()
              .then((newToOrder) => {
                toOrderId = newToOrder[0].id;
              })
              .catch((err) => console.log(err));
            } else {
              toOrderId = unfulfilled.id;
            }
          })
          .catch((err) => console.log(err));
      showCustomer(id, container);
    })
    .catch((err) => console.log(err));


    
  });
}