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
 import Layout from '../../src/components/layout';
 import { useRouter } from "next/router";
 import $ from "jquery"

 
 export default function cat_slug({ headerFooter, products, params,payload }) {
    console.log(params);
    console.log(payload);
    const router = useRouter();
    const cat_slug = router.query.cat_slug;
    const cat_url = '/cat/';
    const InputClicl = () =>
    {
        console.log($("#range_max_price").val());
      //router.push(cat_url);
    }
    
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
 
 export async function getStaticProps({ params = {} } = {}) {
     
     const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
     //const { data: products } = await getProductsData();
     let payload = {cat_slug:params?.cat_slug };
     const { data: products } = await axios.post( SHOP_FILTER_ENDPOINT,payload );
     
     return {
         props: {
             headerFooter: headerFooterData?.data ?? {},
             products: products.products ?? {},
             params: params?.cat_slug ?? {},
             payload: payload ?? {}
         },
         
         /**
          * Revalidate means that if a new request comes to server, then every 1 sec it will check
          * if the data is changed, if it is changed then it will update the
          * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
          */
         revalidate: 1,
     };
 }
 
 export async function getStaticPaths() {
    
    // By default, we don't render any Pagination pages as
    // we're considering them non-critical pages
  
    // To enable pre-rendering of Category pages:
  
    // 1. Add import to the top of the file
    //
    // import { getAllPosts, getPagesCount } from 'lib/posts';
  
    // 2. Uncomment the below
    //
    // const { posts } = await getAllPosts({
    //   queryIncludes: 'index',
    // });
    // const pagesCount = await getPagesCount(posts);
  
    // const paths = [...new Array(pagesCount)].map((_, i) => {
    //   return { params: { page: String(i + 1) } };
    // });
  
    // 3. Update `paths` in the return statement below to reference the `paths` constant above
  
    return {
      paths: [],
      fallback: 'blocking',
    };
  }