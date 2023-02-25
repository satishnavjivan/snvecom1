const Stripe = require('stripe');
import { isEmpty } from 'lodash';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2020-08-27'
});


  
const handler = async (req, res) => {
    // Get key : pi_3Mau1KGg3SZaGCod1ogeEJ3H  Run
    const checkoutSession =   await  stripe.checkout.sessions.retrieve(
        'cs_test_b1Gx4dPwcqUPnaleMSVHU9baJJWRiHcyCzFAXjf0HGxeLQJX5k03zwmkS9'
      );

      // All transaction details Run
      const paymentIntents = await stripe.paymentIntents.list({
        limit: 5,
      });
      
      // Get Ch Key : ch_3Mau1KGg3SZaGCod1xhF881e  Run
      // intent.latest_charge
      const intent = await stripe.paymentIntents.retrieve(checkoutSession.payment_intent, {
        apiVersion: '2022-11-15',
      });

       
      let text = "";
       //  get ch_ id (text.charges.data.id)
      paymentIntents.data.forEach (function(value, key) {
        if(value.id == checkoutSession.payment_intent)
        {
            text = value;
        }
        
        })
    let payment_method_details = '';
    if ( !isEmpty( intent.latest_charge ) ) {
        text.charges.data.forEach (function(value1, key) {
            if(value1.id == intent.latest_charge)
            {
                payment_method_details = value1.payment_method_details;
            }
            
            })
	}
       

    res.status(200).json({ name: `brand - ${payment_method_details.card.brand}  | last4 - ${payment_method_details.card.last4}  | ch -  ${intent.latest_charge}` })
  };
export default handler;