/**
 * Internal Dependencies.
 */
 import Products from '../../src/components/products';
 import { HEADER_FOOTER_ENDPOINT,SHOP_FILTER_ENDPOINT } from '../../src/utils/constants/endpoints';
 import isEmpty from '@/src/validator/is-empty';
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 //import { getProductsData } from '../../src/utils/products';
 import Layout from '../../src/components/layout';
 
 export default function Home({ headerFooter, products }) {
    if(isEmpty(products))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
                Data Not found
            </Layout>
        )
    }else{
        return (
            <Layout headerFooter={headerFooter || {}}>
                <Products products={products}/>
            </Layout>
        )
    }
    
 }
 
 export async function getStaticProps() {
     
     const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
     //const { data: products } = await getProductsData();
     let payload = { page_no: '1', posts_per_page: '24' };
     const { data: products } = await axios.post( SHOP_FILTER_ENDPOINT,payload );
     
     return {
         props: {
             headerFooter: headerFooterData?.data ?? {},
             products: products.products ?? {}
         },
         
         /**
          * Revalidate means that if a new request comes to server, then every 1 sec it will check
          * if the data is changed, if it is changed then it will update the
          * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
          */
         revalidate: 1,
     };
 }
 