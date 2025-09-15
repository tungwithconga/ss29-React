import { useEffect, useState } from "react";

interface Product {
  id: number;
  product_name: string;
  image: string;
  price: number;
  quantity: number;
  created_at: string;
}

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  const getAllProduct = async () => {
    try {
      const response = await fetch("http://localhost:3000/product");
      if (!response.ok) {
        throw new Error("Lỗi khi fetch dữ liệu sản phẩm");
      }
      const data: Product[] = await response.json();
      console.log("Danh sách sản phẩm:", data);
      setProducts(data);
    } catch (error) {
      console.error("Lỗi:", error);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  return (
    <div>
      <h2>Danh sách sản phẩm</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            <strong>{p.product_name}</strong> - {p.price}₫ (SL: {p.quantity})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
