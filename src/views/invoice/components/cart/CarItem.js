import React from "react";
import { Input, Collection } from "usetheform";

import { Col, Row } from 'rsuite'

const preventNegativeQty = (val) => (val < 1 ? 1 : val);
export function CartItem({ qty, price, onRemoveItem, id, _id, desc }) {
  return (
		<Row>
    <div className="box control">
      <Collection object>
				<Col sm={12}>
        <Input type="hidden" name="id" value={id} />
        <div className="field">
          <Input
            className="form-control form-control-sm"
            type="text"
            name="item"
            readOnly
            value={desc}
          />
        </div>
				</Col>
        <div className="field">
          <Input
            className="input is-small"
            type="hidden"
            name="_id"
            readOnly
            value={_id}
          />
        </div>
				<Col sm={3}>
        <div className="field">
          <Input
						style={{ width: '60px'}}
            reducers={preventNegativeQty}
            className="form-control form-control-sm"
            type="number"
            name="qty"
            value={qty}
          />
        </div>
				</Col>
				<Col sm={4}>
        <div className="field">
          <Input
						style={{ width: '80px'}}
            className="form-control form-control-sm"
            type="text"
            disabled
            name="price"
            readOnly
            value={price}
          />
        </div>
				</Col>
				<Col sm={3}>
        <div className="field">
          <button
            type="button"
            className="button is-small is-danger"
            onClick={() => onRemoveItem(id)}
          >
            R
          </button>
        </div>
				</Col>
      </Collection>
    </div>
		</Row>
  );
}
