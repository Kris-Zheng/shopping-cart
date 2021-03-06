import React from 'react';
import { connect } from 'dva';
import { Button, List, message } from "antd";
import {
  CloseOutlined,
} from '@ant-design/icons';
import cart from '../models/cart';

class Cart extends React.Component {

  state = {
    initCart: [],
    count: ''
  }

  componentDidMount() {
    const { saveCart } = this.props
    saveCart();
    this.setState({ initCart: cart.added })
  }


  render() {
    const { cart, deleteProduct, modifiyProduct, checkOut } = this.props;
    const number = cart.added.length;
    

    const nodes = cart.added.map((item, index) => (
      <li key={item.id + item.size}>
        <img src={`./images/${item.sku}_2.jpg`} alt='loading' />
        <span>{item.title} | </span>
        <span>  {item.size}  </span>
        <span>{item.style}</span>
        <Button onClick={() => deleteProduct(item.id, item.size)} style={{ width: '20px', height: '20px', padding: '0', float: 'right' }}><CloseOutlined /></Button>
        <Button.Group size="small" style={{ marginLeft: 10 }}>
          <Button onClick={() => modifiyProduct(index, -1)} > - </Button>
          <span style={{ marginLeft: 10 }}>{item.count}</span>
          <Button onClick={() => modifiyProduct(index, 1)} style={{ marginLeft: 10 }}> + </Button>
        </Button.Group>
        <span style={{ marginLeft: 30 }}>${item.price * item.count}</span>
      </li>
    ));


    return (
      <div>
        <List style={{ display: 'flex', flexWrap: 'wrap' }}> {nodes} </List>
        <div style={{ height: '25%', textAlign: 'center', width: '100%' }}>
          <h3 style={{ textAlign: 'center' }}>
            Total amount: $
                    {cart.added.reduce((total, currentValue) => {
            total += currentValue.count * currentValue.price
            return total
          }, 0)}
          </h3>
          <Button disabled={number === 0 ? true : false} size="large" style={{ width: '100%'}} onClick={() => checkOut()}>Checkout</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ cart }) => ({ cart })

const mapDispatchToProps = (dispatch) => ({
  deleteProduct: (id, size) => {
    dispatch({
      type: 'cart/Deleted',
      payload: { id, size }
    })
  },
  modifiyProduct: (index, value) => {
    dispatch({
      type: 'cart/add',
      payload: { index, value }
    })
  },

  saveCart: () => {
    dispatch({
      type: 'cart/initCart',
    })
  },

  checkOut: () => {
    message.info('Checkout Completed');
    dispatch({
      type: 'cart/checkOut'
    })
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart);