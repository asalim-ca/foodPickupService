




const createDishElement = (dish) => {



  const $dishCard = $('<div>');
  $dishCard.attr('class', 'card');
  $dishCard.attr('style', 'margin: 1.5em');

  const $dishCardBody = $('<div>').appendTo($dishCard);
  $dishCardBody.attr('class', 'card-body');
  $('<h5>').attr('class', 'card-title').text(`${dish.name}`).appendTo($dishCardBody);

  const $dishDetails = $('<div>').appendTo($dishCardBody);
  $dishDetails.attr('class', 'mb-3');
  $('<output>').attr('type', 'text').text(`Price: ${dish.price / 100}$`).appendTo($dishDetails);



  const $addToOrderForm = $('<form>').appendTo($dishCardBody);

  // if (dish.category != 'Drinks' && dish.category != 'Desserts') {
  //   const $customizeDish = $('<div>').appendTo($addToOrderForm);
  //   $customizeDish.attr('class', 'mb-3');


  //   const $orderInstructions = $('<input>').appendTo($customizeDish);
  //   $orderInstructions.attr('type', 'text');
  //   $orderInstructions.attr('class', 'font-italic');
  //   $orderInstructions.attr('style', 'font-italic');
  //   $orderInstructions.attr('placeholder', 'Instructions...');
  // }


  const $addToOrder = $('<button>').appendTo($addToOrderForm);
  $addToOrder.attr('type', 'button');
  $addToOrder.attr('class', 'btn btn-success');
  $addToOrder.text('Add to Order');



  $addToOrder.on('click', function() {
    $.ajax({
      url: `/api/orders/${toOrderId}/dish_order/${dish.id}`,
      method: 'POST'
    })
    .then((dish_order) => {
      renderDishOrders(dish_order, $('#current-order-dishes'))
    })
    .catch((err) => console.log(err))
  });

  return $dishCard;


}