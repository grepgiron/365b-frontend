import React from "react";
import { Input, Collection } from "usetheform";

export function ShopInfo() {
  return (
    <div className="row justify-content-end">
      <div className="col-4">
      <Collection object name="info">
          <div className="field control">
          <label className="label is-small">Sub Total</label>
          <Input
              className="form-control"
              disabled
              type="text"
              value="0"
              name="sub_total"
              readOnly
          />
          </div>
          <div className="field control">
          <label className="label is-small">Impuestos</label>
          <Input
              className="form-control"
              disabled
              type="text"
              value="0"
              name="impuesto"
              readOnly
          />
          </div>
          <div className="field control">
          <label className="label is-small">Total</label>
          <Input
              className="form-control"
              disabled
              type="text"
              value="0"
              name="totalPrice"
              readOnly
          />
          </div>
          <div className="field control">
          <label className="label is-small">Total Items</label>
          <Input
              className="form-control"
              disabled
              type="text"
              value="0"
              name="totalItems"
              readOnly
          />
          </div>
          <div className="field control">
          <label className="label is-small">Total Cantidades</label>
          <Input
              className="form-control"
              disabled
              type="text"
              value="0"
              name="totalQty"
              readOnly
          />
          </div>
        </Collection>
      </div>
    </div>
  );
}
