import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const DUMMY_PRODUCTS =  [
    {id:'p1',price: 6, title:'Book 1',description:'The first book i made'},
    {id:'p2',price: 7, title:'Book 2',description:'The 2nd book i made'},
    {id:'p3',price: 8, title:'Book 3',description:'The 3rd book i made'},
    {id:'p4',price: 9, title:'Book 4',description:'The 4th book i made'},
    {id:'p5',price: 10, title:'Book 5',description:'The 5th book i made'},
  ]
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map(product => <ProductItem
          key={product.id}
          id={product.id}
          title= {product.title}
          price={product.price}
          description={product.description}
        />)}
        
      </ul>
    </section>
  );
};

export default Products;
