import React from "react";
import { Collection } from "usetheform";
import { CartItem } from "./CarItem";
import { ShopInfo } from "./ShopInfo";

export function Cart({ items, onRemoveItem }) {
  return (
    <Collection reducers={udpdateShopInfo} object name="cart">
      <Collection array name="items">
        {items.map(item => (
          <CartItem {...item} onRemoveItem={onRemoveItem} key={item.id} />
        ))}
      </Collection>
      <ShopInfo />
    </Collection>
  );
}

const udpdateShopInfo = value => {
  const { items = [] } = value;
  const info = items.reduce(
    (acc, item) => {
        acc.totalQty += item.qty;
        acc.sub_total += Number(((item.qty * item.price)/1.15).toFixed(2));
        acc.impuesto = Number((acc.sub_total * 0.15).toFixed(2));
        acc.totalPrice = Number((acc.totalPrice + item.qty * item.price).toFixed(2));
        return acc;
    },
    { totalItems: items.length, totalPrice: 0, totalQty: 0, impuesto: 0, sub_total: 0 }
  );
  return { ...value, info };
};
