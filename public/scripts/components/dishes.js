//Menu container : #menu


const renderMenu = (data, container) => {
  const $menuCard = $('<div>').appendTo(container);
  $menuCard.attr('class', 'card');
  $menuCard.attr('id', 'menu');

  
  data.forEach(dish => {

    if (!$(`#${dish.category}`)[0]) {
      const $categoryCard = $('<div>').appendTo($menuCard);
      $categoryCard.attr('class', 'card');
      $categoryCard.attr('id', dish.category);
      $categoryCard.attr('style', 'margin: 0.5em');

      const $categoryCardImg = $('<img>').appendTo($categoryCard);
      $categoryCardImg.attr('class', 'card-img-top');
      // switch (dish.category) {
      //   case 'Pizza':
      //     $categoryCardImg.attr('src', 'https://images.unsplash.com/photo-1513104890138-7c749659a591');
      //     break;
      //   case 'Pasta':
      //     $categoryCardImg.attr('src', 'https://images.unsplash.com/photo-1619895092538-128341789043');
      //     break;
      //   case 'Desserts':
      //     $categoryCardImg.attr('src', 'https://images.unsplash.com/photo-1613505411792-208b15f862b0');
      //     break;
      //   case 'Drinks':
      //     $categoryCardImg.attr('src', 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d');
      //     break;
      //   case 'Starters':
      //     $categoryCardImg.attr('src', 'https://images.unsplash.com/photo-1603208614636-aa308b918a32');
      //     break;
      
      //   default:
      //     break;
      // }

      const $categoryCardBody = $('<div>').appendTo($categoryCard);
      $categoryCardBody.attr('class', 'card-body');
      $('<h2>').attr('class', 'card-title').text(`${dish.category}`).appendTo($categoryCardBody);

    }
    createDishElement(dish).appendTo(`#${dish.category}`)

  });


  $menuCard.appendTo(container);
}

const showMenu = (container) => {
  $.ajax({
    url: '/api/dishes',
    method: 'GET'
  })
  .then((res) =>renderMenu(res, container))
  .catch((err) => console.log(err))
}