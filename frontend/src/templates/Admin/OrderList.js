import React, { useContext } from 'react'
import { ResponseContext } from '../../contexts';

function OrderList() {
    const { ResponseState, ResponseDispatch } = useContext(ResponseContext);
    

  return (
      <div>OrderList{ResponseState.order ? ResponseState.order.lists.map((e) => e.author+"-------------"):null}</div>
  )
}

export default OrderList