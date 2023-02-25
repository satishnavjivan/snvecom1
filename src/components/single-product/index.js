/**
 * Internal Dependencies.
 */

import AddToCart from '../cart/add-to-cart';
import ExternalLink from '../products/external-link';
import ProductGallery from './product-gallery';
import $ from 'jquery';
import {SHOP_SHIPPING_SINGLE} from '../../utils/constants/endpoints';
import axios from 'axios'

const SingleProduct = ( { product } ) => {
	//console.log('product',product);
	const handleClickShipping = async () => {
		var p_sku = $('#sp_shipping_get').attr('p_sku');
		var p_product_code = $('#sp_shipping_get').attr('p_product_code');
		var postcode = $('#sp_shipping_get').val();
		//console.log('p_sku',p_sku);
		//console.log('p_product_code',p_product_code);
	
		//const sku_obj_data = { VX: {0:p_sku}};
		const payload = {postcode: postcode, sku: p_sku,p_product_code:p_product_code };
		
		const {  data:ShippingData } = await axios.post( SHOP_SHIPPING_SINGLE,payload );
		console.log('ShippingData',ShippingData);
		$('#shipping_value').html(`$${ShippingData.ShippingData} Shipping charge to ${postcode}`);
		
		
	}
	
	const product_code_value = product.meta_data.filter(function (meta_data) { return meta_data.key == "product_code" });
	
	return Object.keys( product ).length ? (
		<div className="single-product container mx-auto my-32 px-4 xl:px-0">
			<div className="grid md:grid-cols-2 gap-4">
				<div className="product-images">
					
					{ product.images.length ? (
						<ProductGallery items={ product?.images }/>
					) : null }
				</div>
				<div className="product-info">
					<h4 className="products-main-title text-2xl uppercase">{ product.name }</h4>
					<div
						
						dangerouslySetInnerHTML={ {
							__html: product.description,
						} }
						className="product-description mb-5"
					/>
					<div
						
						dangerouslySetInnerHTML={ {
							__html: product?.price_html ?? '',
						} }
						className="product-price mb-5"
					/>
					{ 'simple' === product?.type ? <AddToCart product={ product }/> : null }
					{
						'external' === product?.type ?
							<ExternalLink
								url={ product?.external_url ?? '' }
								text={ product?.button_text ?? '' }
							/> : null
					}
					
					<input p_sku={ product?.sku ?? '' } p_product_code={product_code_value[0]?.value ?? ''} type="number"  id="sp_shipping_get"   size="4"  name="pcode" placeholder="POSTCODE" /> 
					<button onClick={handleClickShipping}>Get shipping</button>
					<div>
            			<h3 id="shipping_value"></h3>
        			</div>
				</div>
			</div>
		
		</div>
	) : null;
	
};

export default SingleProduct;
