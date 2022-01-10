import { FC, useContext } from 'react';

import AddToCartButton from 'components/AddToCartButton';
import { CartContext } from 'contexts/CartContext';
import { useParams } from 'react-router-dom';

const ProductPage: FC = () => {
  const { productId } = useParams();
  const { data } = useContext(CartContext);
  const product = data?.find((item) => item.id.toString() === productId);

  return product ? (
    <div className="h-screen pt-[100px] flex">
      <div className="aspect-[3/4] flex items-center justify-center p-12">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="px-4">
        <h1 className="mb-4 text-xl">{product.title}</h1>
        <p className="mb-4">{product.price}$</p>
        <AddToCartButton item={product} styles="mb-4 p-2" />
        <p>{product.description}</p>
      </div>
    </div>
  ) : null;
};

export default ProductPage;
