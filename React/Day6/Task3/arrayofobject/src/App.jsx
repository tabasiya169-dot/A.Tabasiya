const App = () => {
    const  product=[
      {id:1,
      name:"Mobile",
      price:25000,
      category:"Electronics"
      },
      {
        id:2,
        name:"Bag",
        price:1200,
        category:"Accesories"
      },
      {
        id:3,
        name:"Laptop",
        price:28000,
        category:"Electronics"
      },
      {
        id:4,
        name:"shoes",
        price:2000,
        category:"Accesories"
      }
    ];

  return (<>
      <h1>Products</h1>
      {product.map((product)=>(
        <div key={product.id}>
          <p>Name:{product.name}</p>
          <p>Price:{product.price}</p>
          <p>Category:{product.category}</p>
        </div>
     ) )}
  
  </> 
  );
};

export default App;