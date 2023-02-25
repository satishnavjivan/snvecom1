// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { isEmpty } from 'lodash';

export default function handler(req, res) {
  let latest_charge = 'hi';
  let txt = '';
  if ( !isEmpty( latest_charge ) ) {
   
          txt = latest_charge;
   
  }
  res.status(200).json({ name: 'John Doe ' + txt})
}
