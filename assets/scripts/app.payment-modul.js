closedFunction=function() {
  app.render('$paymentCanceledActivity');
}
successFunction=function(transaction_id) {
  app.render('$paymentSuccessfulActivity');
}
failedFunction=function(transaction_id) {
  app.render('$paymentFailedActivity');
}
function pay(payableAmount){
//Initiate voguepay inline payment
    Voguepay.init({
         v_merchant_id: '9170-0073536',
         total: payableAmount,
         notify_url:'http://domain.com/notification.php',
         cur: 'NGN',
         merchant_ref:user.id,
         memo:'Add Payment',
         recurrent: true,
         frequency: 10,
         developer_code: '5a61be72ab323',
         store_id:1,
         customer: {
             name: '',
             address: 'Customer address',
             city: 'Customer city',
             state: 'Customer state',
             zipcode: 'Customer zip/post code',
             email: 'Customer email',
             phone: 'Customer phone'
         },
        closed:closedFunction,
        success:successFunction,
        failed:failedFunction
      });
    }
function addPayment(e){
    var payable= Prepare('$total_PayableAmount').getText();
    payable=app.toNumber(payable);
    pay(payable);
}
