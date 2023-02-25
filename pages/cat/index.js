/**
 * Internal Dependencies.
 */
 import Categories from '../../src/components/categories';
 import { HEADER_FOOTER_ENDPOINT } from '../../src/utils/constants/endpoints';
 import isEmpty from '@/src/validator/is-empty';
 /**
  * External Dependencies.
  */
 import axios from 'axios';
 import { getCategoriesData } from '../../src/utils/categories';
 import Layout from '../../src/components/layout';
 
 export default function Home({ headerFooter, categories }) {
    
    if(isEmpty(categories))
    {
        return(
            <Layout headerFooter={headerFooter || {}}>
                Data Not found
            </Layout>
        )
    }else{
        return (
            <Layout headerFooter={headerFooter || {}}>
               <Categories categories={categories || {}}></Categories>
            </Layout>
        )
    }
    
 }
 
 export async function getStaticProps() {
     
     const { data: headerFooterData } = await axios.get( HEADER_FOOTER_ENDPOINT );
     const { data: categories } = await getCategoriesData();
     
     return {
         props: {
             headerFooter: headerFooterData?.data ?? {},
             categories: categories ?? {}
         },
         
         /**
          * Revalidate means that if a new request comes to server, then every 1 sec it will check
          * if the data is changed, if it is changed then it will update the
          * static file inside .next folder with the new data, so that any 'SUBSEQUENT' requests should have updated data.
          */
         revalidate: 1,
     };
 }
 