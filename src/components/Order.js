import React from 'react';
import { Container } from 'react-bootstrap';
import ProductsAPI from './ProductsAPI';
import deliveryOption from './Assets/delivery-options.json';


class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      detailList: {},
      items: [{}],
      grossTotal: 0,
      deliveryTotal: -1,
      itemsTotal: 0,
      deliveryOptionCode: '',
      deliveryOptionId: '',
      userId: 0
    };
  }
  
  componentDidMount() {
    document.getElementById("borderDiv").style.border = "0px";
    document.getElementById("baseDiv").style.display = "none";
    document.getElementById("signinButton").style.display = "none";


    var list = window.detailList;
    var userId = window.userId;
    this.setState({ [this.state.detailList]: list, userId });
    // console.log(this.state.detailList);
  }


  handelDeliveroption = (element) => {
    var deliveryTotal = Number(element.price);
    var deliveryOptionCode = element.deliveryOptionCode;
    var deliveryOptionId = element.deliveryOptionId;
    this.setState(deliveryTotal, deliveryOptionCode, deliveryOptionId);
    // this.setState({deliveryTotal});
  }
  handelSubmitOrder = () => {
    if (this.state.deliveryTotal < 0) {
      alert("please select one of the delivery options");
    }
    else {
      var productCost = 0;
      var itemsArray = [{}];
      var itemsTotal = 0;
      if (this.state.detailList.length > 0) {
        this.state.detailLis.forEach(element => {
          productCost = productCost + (element.productPurchased * element.price);
          itemsArray.append({
            "quantity": element.productPurchased,
            "price": element.price,
            "productId": element.id
          });
        });

        itemsTotal = productCost;
        var grossTotal = itemsTotal + this.state.deliveryTotal;
        this.setState({ grossTotal, itemsTotal });
      }
      else {
        alert("cannot place empty order");
      }
    }
  }


  
  postDetails = () => {
    fetch('http://localhost:51350/Order/create', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        items: this.state.items,
        grossTotal: this.state.grossTotal,
        deliveryTotal: this.state.deliveryTotal,
        itemsTotal: this.state.itemsTotal,
        deliveryOptionCode: this.state.deliveryOptionCode,
        userId: this.state.userId
      })
    })
      .then(result => {
        if (result.ok) {
          result.json()
        }
        else {
          return null;
        }
      }
      )
      .then(result => {
        if (result != null) {
          // console.log(result)
          window.OrderNumber = result.OrderNo;
          window.location = '/checkout';
        }
      });
  }
  handelRevert = () => {
    window.location = "/Products";
  }
  render() {
    var productList = this.state.detailList;
    return (
      <div>
        <div className="card text-center">
          <div className="card-body">
            <div style={{ border: "2rem" }}>
              <div
                style={{ display: "-webkit-flex" }}><h1>Checkout</h1> <div className=" container m5" style={{ display: "-webkit-flex", textAlign: "left", marginLeft: 200 }}><h2>Order Total ${this.state.totalCost}</h2> <button style={{ backgroundColor: 'lightgreen', marginLeft: 65 }} onClick={this.handelSubmitOrder} disabled={this.state.detailList.length === undefined}>PurchaseOrder</button></div></div>
            </div>
            <form>
              <table className='table table-borderless'>
                <thead >
                  <tr>
                    <td>
                      Delivery
                    </td>
                    <td>
                      Delivery Options
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <ul style={{ listStyleType: "none" }}>
                        {(productList.length) && productList.map((element) => {
                          return (
                            <li key={element.id}>
                              <div>
                                <span>
                                  <image src='./assets/a1.jpg'></image>
                                </span>
                                <span>
                                  <p>{element.name}</p>
                                  <p>{element.description}</p>
                                </span>
                                <span>
                                  <p >{element.productPurchased} * {element.price} = {element.productPurchased * element.price}</p>
                                </span>
                              </div>
                            </li>)
                        })
                        }
                      </ul>
                    </td>
                    <td>
                      <ul style={{ listStyleType: "none" }}>
                        {(deliveryOption.length) && deliveryOption.map((element) => {
                          return (<li key={element.id}>
                            <div style={{ textAlign: "" }}>
                              <label >
                                <input style={{ margin: "5px" }} type='radio' name='myGroup' value={element.price} onChange={() => this.handelDeliveroption(element)} ></input>
                                {element.name}<span style={{ padding: "10px" }}>{element.price}</span></label>
                              <p>{element.description}</p>
                            </div>
                          </li>)
                        })
                        }
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div >
          <button style={{ backgroundColor: "orange", marginLeft: "50px", marginRight: "50px" }} onClick={this.handelRevert}>Continue Shopping</button>
        </div>
      </div>
    );
  }
} export default Order;