const renderCustomerAccount = (customer, container) => {
  const $customerInfo = $('<div>').appendTo(container);
  $customerInfo.attr('id', 'customerInfo');
  $customerInfo.attr('class', 'card');

  const $customerInfoBody = $('<div>').appendTo($customerInfo);
  $customerInfoBody.attr('class', 'card-body');
  $('<h2>').attr('class', 'card-title').text(`Customer: #${customer.id} - ${customer.name} - Phone: ${customer.phone}`).appendTo($customerInfoBody);

  showCustomerOrders(customer.id, $customerInfo);
}





const showCustomer = (id, container) => {
  $(container).empty();


  const $customerLogged = $('<div>').appendTo(container);
  $customerLogged.attr('id', 'customer');
  $customerLogged.attr('class', 'card');

  const $customerAccount = $('<div>').appendTo($customerLogged);
  $customerAccount.attr('id', 'customerAccount');
  $customerAccount.attr('class', 'card');

  $.ajax({
    url: `/api/customers/id/${id}`,
    method: 'GET'
  })
  .then((res) => renderCustomerAccount(res, $customerAccount))
  .catch((err) => console.log(err));


  showMenu($customerLogged);
}