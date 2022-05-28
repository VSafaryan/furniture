function initListaOrcamento() {
  var products = $.CestaFeira({
      debug: true,
    }).getItems(),
    totalValueTemp = 0,
    $cartItems = $("#cart-items");

  if (!products) {
    console.log("No items in cart!");
    return;
  }

  function updateTotalValue() {
    var totalValue = 0;

    $.each($("[data-item-total-value]"), function (index, item) {
      totalValue += $(item).data("item-total-value");
    });


    sessionStorage.setItem('totalValue',totalValue)
    let randomNum = Math.round(Math.random() * 100000000 )
    const num = randomNum

   

    if(window.sessionStorage.hasOwnProperty('checknum')){
      console.log('ka'); 
  } else {
      sessionStorage.setItem('checknum',num)
  }


    $("#withBank").append(
      `<input type="hidden" name="totalValue" value="${totalValue}" />`
    );
    // Ameria bank payment
    $("#withBankAmeria").append(
      `<input type="hidden" name="totalValue" value="${totalValue}" />`
    );
    // Idram bank payment
    $("#withBankIdram").append(
      `<input type="hidden" name="totalValue" value="${totalValue}" />`
    );
    $("#cash").append(
      `<input type="hidden" name="totalValue" value="${totalValue}" />`
    );
    $("#withoutbank").append(
      `<input type="hidden" name="totalValue" value="${totalValue}" />`
    );
    $("#withoutbankCredit").append(
      `<input type="hidden" name="totalValue" value="${totalValue}" />`
    );
    // $('#total-value').html(parseFloat(totalValue).toFixed(2) + "&nbsp; Դ");
    $("#total-value").append(
      `<p>total</p><p><b>${parseFloat(totalValue).toFixed(
        2
      )}&nbsp; Դ</b></p>`
    );
  }

  function mountLayout(index, data) {
    console.log(data, "sccscscscscscs");
    var totalValueTemp = parseInt(data.price) * parseInt(data.quantity);
    console.log(data.color);

    sessionStorage.setItem('title',data.title)

    let colors = [];

    // console.log(typeof data.color == 'string');
   
    // var totalValueTemp = parseInt(data.price) * parseInt(data.quantity);

    function colorArray() {
      let string = ''

      if (data.color == undefined) {
        string += `<div style="background:transparent;width:29px;height:23px;margin:5px"></div> `
        return string
      }

      if(typeof data.color == 'string') {
          string += `<div style="background:${data.color};width:29px;height:23px;margin:5px"></div> `
          return string
      }

      let colors = data.color
      colors.map((cl) => {
        string +=  `<div style="background:${cl};width:26px;height:23px;margin:5px"></div> `
      })

      return string
         
    }



    var $layout = `<div class="col-lg-12 col-md-12 col-12" id="product-${index}">
        <div class="shop-cart-box" id="1">
            <div class="row">
                <div class="col-lg-1 col-md-1 col-12">
                    <div class="button-close" onClick="window.location.reload()">
                    <a href='javascript:;' class='btn btn-danger fa fa-trash' data-cesta-feira-delete-item='${index}'><span class='sr-only'>Remove</span></a>
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <div class="shop-cart-box-img">
                        <img src="/uploads/${data.avatar}">
                    </div>
                <div class="shop-cart-box-img-color" id="shop-cart-box-img-${index}">

                    ${colorArray()}
                </div>

                
               
                </div>
                <div class="col-lg-4 col-md-4 col-12">
                    <div class="shop-cart-box-info">
                        <h4>${data.title}</h4>
                    </div>
                </div>
                <div class="col-lg-3 col-md-3 col-12">
                    <div class="shop-cart-box-quantity">
                        <h6>count: &nbsp; <b><i class="fa-solid fa-xmark"></i> &nbsp; ${
                          data.quantity
                        }</b></h6>
                        <h5><button onclick="location.href='shop-single/${
                          data.id
                        }';" type="button" class="btn btn-warning"><i class="fa-regular fa-pen-to-square"></i>
                        </h5>
                        
                    </div>
                </div>
                <div class="col-lg-2 col-md-2 col-12">
                    <div class="shop-cart-box-price">
                        <h5 data-item-total-value="${totalValueTemp}"> ${parseFloat(
      totalValueTemp
    ).toFixed(2)} &nbsp; <small>Դ</small> </h5>
                    </div>
                </div>
             </div>
        </div>
    </div>
    
    `;

    // if ($layout) {
    //   console.log("layout", $layout);
    //   let test = document.getElementById(`shop-cart-box-img-${index}`);
    //   console.log("test", test);
    //   if (data.color == Array) {
    //     data.color.forEach((c) => {
    //       test.append(
    //         `<div style="background:${c};width:25px;height:25px;margin-left:15px"></div> `
    //       );
    //     });
    //   }
    // }

    $cartItems.append($layout);

    let cash = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(
          totalValueTemp
        ).toFixed(2)}" />

        </div>`;
    let withoutBank = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(
          totalValueTemp
        ).toFixed(2)}" />

        </div>`;

    let withBank = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(
          totalValueTemp
        ).toFixed(2)}" />

        </div>`;

    let withBankAmeria = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="amount" value="10" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(
          totalValueTemp
        ).toFixed(2)}" />

        </div>`;

        let withoutbankCredit = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="amount" value="10" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(
          totalValueTemp
        ).toFixed(2)}" />
        </div>`;

    let withBankIdram = `<div>
        <input type="hidden" name="title" value="${data.title}" />
        <input type="hidden" name="quantity" value="${data.quantity}" />
        <input type="hidden" name="amount" value="10" />
        <input type="hidden" name="totalValueTemp" value="${parseFloat(
          totalValueTemp
        ).toFixed(2)}" />

        </div>`;

    $("#withBank").append(withBank);
    $("#withBankAmeria").append(withBankAmeria);
    $("#withBankIdram").append(withBankIdram);
    $("#cash").append(cash);
    $("#withoutbank").append(withoutBank);
    $("#withoutbankCredit").append(withoutbankCredit);
    
  }

  $.each(products, function (index, value) {
    mountLayout(index, value);
  });

  updateTotalValue();

  $(document).on("click", "a[data-cesta-feira-delete-item]", function (e) {
    e.preventDefault();

    var productId = $(this).data("cesta-feira-delete-item");

    if ($(document).on("cesta-feira-item-deleted")) {
      $("#product-" + productId).fadeOut(500, function () {
        $(this).remove();
        updateTotalValue();
      });
    }
  });

  $(document).on("cesta-feira-clear-basket", function (e) {
    $("#cart-items tr").each(function (index, value) {
      $(value).fadeOut(500, function () {
        $(this).remove();
        updateTotalValue();
      });
    });
  });
}

function updateCount() {
  let array = [];
  let storage = localStorage.getItem("jStorage");
  let obj = JSON.parse(storage);
  // console.log(obj);
  console.log(obj, "scscsccscscsc");
  let firstKey = Object.keys(obj)[0];
  let firstValue = Object.values(obj)[1];

  console.log(firstKey, "firstKey");
  console.log(firstValue, "firstValue");

  array.push(firstValue);
  console.log(array, "arrayeecdsccd");
}

updateCount();

// 2

// function fetch_ameria() {
//     // e.preventDefault()
//     var products = $.CestaFeira({
//             debug: true
//         }).getItems(),
//         totalValueTemp = 0,
//         $cartItems = $('#cart-items');

//     if (!products) {
//         console.log("No items in cart!");
//         return;
//     }

//         var totalValue = 0;

//         $.each($('[data-item-total-value]'), function (index, item) {
//             totalValue += $(item).data('item-total-value');
//         });

//     let arr = []
//     let price = []
//     let a = localStorage.getItem("jStorage")

//     let b = JSON.parse(a)
//     let c = b

//     let e = Object.entries(c)

//     arr.push(e[1][1])

//    for (var key of Object.keys(e[1][1])) {
//        arr.push(e[1][1][key])
//     }

//     console.log(arr)
//   arr.forEach((product) => {
//       price.push(product.price)
//   })

//     let filtered = price.filter(function(x) {
//         return x !== undefined;
//     });

//     console.log(filtered);

//     let totalPrice = filtered.reduce(function (acc,value) {
//         return acc + +(value)
//     },0)

//     console.log(totalPrice)

//     var http = new XMLHttpRequest();
//     var url = 'https://servicestest.ameriabank.am/VPOS/api/VPOS/InitPayment';
//     var params = {
//                 "ClientID": "8b8fa58a-d6f2-4eed-9bd9-e94da389a11a",
//                 "Username": "3d19541048",
//                 "Password":"lazY2k",
//                 "OrderID":"2602001",
//                 "amount":"10"
//     };
//     http.open('POST', url, true);

// //Send the proper header information along with the request
//     http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

//     http.onreadystatechange = function() {//Call a function when the state changes.
//         if(http.readyState == 4 && http.status == 200) {
//             alert(http.responseText);
//         }
//     }
//     http.send(params);

// }

// fetch_ameria()

// 3

$(".add-to-cart-button").on("click", function () {
  $(".basket_alert").show();
  $(".basket_alert").hide(5000);
});

$(".addToWish").on("click", function () {
  $(".alert_basket").show();
  $(".alert_basket").hide(5000);
});

$(document).ready(function () {
  initListaOrcamento();

  if ($("#cart-items").children().length == 0) {
    $(".basket-box").hide();
    $(".payment_box").hide();
    $(".favorite-info-box-basket").show();
  }
});
