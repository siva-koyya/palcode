import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ProductItem({ product }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="product-item"
    >
      <img
        className="product-img"
        src={"./img/pushp-2.jpg"}
        alt={product.title}
      />
      <div className="product-info">
        <span className="product-title">{product.title}</span>
        <span className="product-duration">{product.duration}</span>
      </div>
      <div className="product-checkInputC">
        <input className="product-checkInput" type="checkbox" alt="" />
      </div>
    </li>
  );
}

function ProductList({ products }) {
  return (
    <div className="product-list">
      <h4 className="product-list-title">Video Products</h4>
      <ul className="product-items">
        <SortableContext
          items={products.map((product) => product.id)}
          strategy={verticalListSortingStrategy}
        >
          {products.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </SortableContext>
      </ul>
    </div>
  );
}

export default ProductList;
