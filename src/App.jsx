import { useState } from "react";

const productList = [
  {
    id: "001",
    name: "keyboard",
    stock: 10,
    price: 1500,
  },
  {
    id: "002",
    name: "mouse",
    stock: 20,
    price: 1000,
  },
  {
    id: "003",
    name: "laptop",
    stock: "15",
    price: "50000",
  },
];

const TableRow = ({
  id,
  name,
  stock,
  price,
  quantity,
  total,
  increment,
  decrement,
}) => {
  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{stock}</td>
      <td>{price}</td>
      <td>{quantity}</td>
      <td>{total}</td>
      <td>
        <button disabled={quantity == stock} onClick={() => increment(id)}>
          +
        </button>
        <button disabled={quantity == 0} onClick={() => decrement(id)}>
          -
        </button>
      </td>
    </tr>
  );
};

const App = () => {
  const [products, setPorducts] = useState(
    productList.map((item) => ({
      ...item,
      quantity: 0,
      total: 0,
    }))
  );
  const inrementQuantity = (id) => {
    setPorducts(
      products.map((product) => {
        if (id === product.id && product.stock > product.quantity) {
          product.quantity++;
          product.total = product.quantity * product.price;
        }
        return product;
      })
    );
  };

  const decrementQuantity = (id) => {
    setPorducts(
      products.map((product) => {
        if (id === product.id && product.quantity > 0) {
          product.quantity--;
          product.total = product.quantity * product.price;
        }
        return product;
      })
    );
  };

  const total = products.reduce((acc, cur) => acc + cur.total, 0);

  return (
    <div>
      <h1>Product List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Stock</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <TableRow
              key={product.id}
              {...product}
              increment={inrementQuantity}
              decrement={decrementQuantity}
            ></TableRow>
          ))}
        </tbody>
      </table>
      {total > 0 && <p>Total : {total}</p>}
    </div>
  );
};
export default App;
