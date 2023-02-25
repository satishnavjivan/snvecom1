import Link from 'next/link';
import Image from '../image';
import { sanitize } from '../../utils/miscellaneous';
import AddToCart from '../cart/add-to-cart';
import { isEmpty } from 'lodash';
import ExternalLink from './external-link';

const Product = ( { product } ) => {
	
	if ( isEmpty( product ) ) {
		return null;
	}
	
	const productType = product?.type ?? '';
	
	return (
		<div className="mt-4 mb-8 px-3 w-full overflow-hidden sm:w-1/2 md:w-1/3 xl:w-1/4">
			<Link href={ `/product/${ product?.post_name }`} >
				<a>
					<Image
						sourceUrl={ product?.image ?? '' }
						altText={ product?.post_title ?? '' }
						title={ product?.post_title ?? '' }
						width="380"
						height="380"
					/>
					
					<h6 className="font-bold uppercase my-2 tracking-0.5px">{ product?.post_title ?? '' }</h6>
					<div className="mb-4" dangerouslySetInnerHTML={{ __html: sanitize( product?.price_html ?? '' ) }}/>
				</a>
			</Link>
			{ 'simple' === productType ? <AddToCart product={product}/> : null }
			{
				'external' === productType ?
					<ExternalLink
						url={ product?.external_url ?? '' }
						text={ product?.button_text ?? '' }
					/> : null
			}
		</div>
	)
}

export default Product;
