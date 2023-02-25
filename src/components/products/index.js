import { isArray, isEmpty } from 'lodash';
import Product from './product';
import styles from '@/styles/Home.module.css'

const Products = ({ products }) => {
	
	if ( isEmpty( products ) || !isArray( products ) ) {
		return null;
	}
	
	return (
		<>
		<div className={styles.row}>
			<div className={styles.left_side_bar}>
				
			<form id="shop_filter" shop-form="1" response_data_sidebar="">
					<div className="reset_form"> Clear All </div>
					
					{ /* <!-- default field -->*/}
				<input type="hidden" setURL="no" name="range_min_price" value="1" id="range_min_price"></input>
				<input type="hidden" setURL="no" name="range_max_price" value="2501" id="range_max_price"></input>
				<input type="hidden" setURL="no" name="page_no" value="1" id="page_no"></input>
				<input type="hidden" setURL="no" name="cat_id" value="-1" default_cat_id="-1" id="cat_id"></input>

				{ /*<!-- current page --> */ }
				<input type="hidden" setURL="no" name="current_page_product_tag_slug" value="-1" id="current_page_product_tag_slug"></input>
				<input type="hidden" setURL="no" name="current_page_term_name" value="-1" id="current_page_term_name"></input>
				<input type="hidden" setURL="no" name="current_page_term_id" value="-1" id="current_page_term_id"></input>
				<input type="hidden" setURL="no" name="current_page_main_cat_id" value="0" id="current_page_main_cat_id"></input>
				<input type="hidden" setURL="no" name="current_page_s" value="" id="current_page_s"></input>
				<input type="hidden" setURL="no" name="page_name" value="" id="page_name"></input>

				{ /*<!-- order and per page field -->*/}
				<input type="hidden" setURL="no" name="product_ids" value="-1" id="product_ids"></input>
				<input type="hidden" setURL="no" name="orderby" value="menu_order" default_orderby="menu_order" id="orderby"></input>
				<input type="hidden" setURL="no" name="posts_per_page" value="24" default_posts_per_page="24" id="posts_per_page"></input>

			</form>
			
			</div>
			<div className={styles.product_filter_right + " flex flex-wrap -mx-3 overflow-hidden product-filter-right "}>
				
				{ products.length ? products.map( product => {
					return (
						<Product key={ product?.id } product={product} />
					)
				} ) : null }
			
			</div>
		</div>
		</>
	)
}

export default Products;
