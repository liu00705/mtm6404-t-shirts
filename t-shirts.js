import React, { useState } from "https://esm.sh/react@19"
import ReactDOM from "https://esm.sh/react-dom@19/client"

const tshirts = [
  {
    title: 'Blue T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Bright Purple T-Shirt',
    image: 'bright-purple-t-shirt.jpg',
    price: 5.99,
    stock: 1,
    quantity: 1
  },
  {
    title: 'Cobalt Blue T-Shirt',
    image: 'cobalt-blue-t-shirt.jpg',
    price: 9.99,
    stock: 5,
    quantity: 1
  },
  {
    title: 'Green T-Shirt',
    image: 'green-t-shirt.jpg',
    price: 6.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Grey T-Shirt',
    image: 'blue-t-shirt.jpg',
    price: 4.99,
    stock: 2,
    quantity: 1
  },
  {
    title: 'Light Green T-Shirt',
    image: 'light-green-t-shirt.jpg',
    price: 7.99,
    stock: 4,
    quantity: 1
  },
  {
    title: 'Purple T-Shirt',
    image: 'purple-t-shirt.jpg',
    price: 7.99,
    stock: 0,
    quantity: 1
  },
  {
    title: 'Red T-Shirt',
    image: 'red-t-shirt.jpg',
    price: 6.99,
    stock: 3,
    quantity: 1
  },
  {
    title: 'Teal T-Shirt',
    image: 'teal-t-shirt.jpg',
    price: 7.99,
    stock: 2,
    quantity: 1
  }
]

function App() {
  const [items, setItems] = useState(tshirts)

  function handleQtyChange(index, value) {
    setItems((prev) => {
      return prev.map((shirt, i) => {
        if (i !== index) return shirt

        let qty = Number(value)
        if (qty < 1) qty = 1
        if (qty > shirt.stock) qty = shirt.stock

        return { ...shirt, quantity: qty }
      })
    })
  }

  function handleBuy(index) {
    setItems((prev) => {
      return prev.map((shirt, i) => {
        if (i !== index) return shirt

        const qty = shirt.quantity
        const newStock = shirt.stock - qty

        return {
          ...shirt,
          stock: newStock < 0 ? 0 : newStock,
          quantity: 1
        }
      })
    })
  }

  return (
    <div>
      <h1>T-Shirts</h1>

      {items.map((shirt, index) => (
        <div key={shirt.title}>
          <h3>{shirt.title}</h3>

          <img src={`images/${shirt.image}`} alt={shirt.title} />

          <p>Price: ${shirt.price.toFixed(2)}</p>

          {shirt.stock === 0 ? (
            <p>Out of Stock</p>
          ) : (
            <div>
              <p>Stock left: {shirt.stock}</p>

              <label>
                Quantity:
                <select
                  value={shirt.quantity}
                  onChange={(e) => handleQtyChange(index, e.target.value)}
                >
                  {Array.from({ length: shirt.stock }, (_, i) => i + 1).map((num) => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
              </label>

              <button onClick={() => handleBuy(index)}>buy</button>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)