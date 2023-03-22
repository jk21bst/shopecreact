import React from 'react';
class ProductsAPI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isloaded: false,
      products: [],
      totalItems: 0,
      totalPrice: 0
    };
  }



  changeQuantity(times, productName) {
    var updatedList = (this.state.products).forEach(element => {

      if (productName.startsWith(element.name)) {

        if (times > 0) {

          if (Number(element.quantity) === element.productPurchased + times) {
            alert("cannot buy more");
          }
          else {
            element.productPurchased = element.productPurchased + times;
            var totalItems = super.state.totalItems + times;
            var totalPrice = super.state.totalPrice + element.price * times;
            super.setState({ totalItems, totalPrice });
          }
        }
        else if (times < 0) {
          if (element.productPurchased + times < 0) {
            alert("cannot remove more");
          }
          else {
            element.productPurchased = element.productPurchased + times;
            totalItems = super.state.totalItems + times;
            totalPrice = super.state.totalPrice + element.price * times;
            super.setState({ totalItems, totalPrice });
          }
        }
      }
    });

    this.setState({ products: updatedList });
  }
  submitResultQuantity() {
    var itemArray = this.state.products

    window.detailList = itemArray;
    itemArray = itemArray.map(function (itemArray) {
      this.updateElementQuantity(itemArray.id, itemArray.quantity);
      itemArray.productPurchased = 0;
      return itemArray;
    });

    this.setState({ products: itemArray });
    window.location = '/order';

  }

  updateElementQuantity(identity, quantity) {

    fetch('http://localhost:51350/Products/update', {
      method: "PUT",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: identity,
        quantity: quantity
      })
    })
      .then(result => result.json())
      .then(result => console.log(result));

  }
  componentDidMount() {

    fetch('http://localhost:51350/Products/list')
      .then(result =>
        result.json(),
      ).then((data) => {
        console.log("data===>" + JSON.stringify(data));
        var apiData = JSON.stringify(data);
        this.setState({
          isloaded: true,
          products: apiData
        });


        var productPurchased = 0;
        var interData = [...this.state.products, productPurchased];
        this.setState({ products: interData });
      },
        (error) => {
          this.setState({
            isloaded: true,
            error
          });
        }



      )
  }



  render() {
    const { error, products } = this.state;
    if (error) {
      return <div >Error: {error.message}</div>;
    }
    else {
      return(
        <div>
          <div>
            <h3>Pick your Items...</h3>
          </div>
          <div className='info' style={{ width: '1200px' }}>
            <div className='product_info' style={{ float: 'left' }}>
              {
              products.map((item, index) => (


                <div key={item.id} className="Container" style={{ height: "250px", border: '2px solid LightGrey', borderRadius: '25px', marginTop: '10px' }} >
                  <div className="image" style={{ height: "250px", width: "160px", float: 'left' }}>
                    <img src={require(`./Assets/${item.code}.jpg`)} style={{ paddingTop: "25%", paddingLeft: "25px" }} alt='' />
                  </div>
                  <div className="details" style={{ height: '250px', width: '500px', float: 'right' }}>
                    <div className="product_details" style={{ height: '250px', width: '250px', float: 'left', paddingLeft: '50px' }}>
                      <div className="product"><div className="productName" style={{ height: '100px', float: 'top', paddingTop: '25%' }}>
                        <span style={{ paddingTop: "10%", fontSize: '25px', }}><strong>{item.name}</strong></span>
                      </div>
                       <div className='product_desc' style={{ height: '150px', float: 'bottom', color: 'DarkGrey' }}>
                          <span ><strong>{item.description}</strong></span>
                        </div>
                      </div>
                      </div>
                    <div className='productValue' style={{ height: '250px', width: '250px', float: 'right', paddingTop: '10%', textAlign: 'center' }}>
                      <span>
                        <strong style={{ fontSize: '20px' }}>$ {item.price}</strong>
                      </span>
                      <div className='buttons' style={{ float: 'bottom', paddingTop: '50px' }}>
                        <button id={`addcart${item.name}`} className='button' style={{ borderRadius: '5px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', backgroundColor: '#008CBA', border: '2px solid #008CBA' }} ><strong onClick={this.changeQuantity(1, item.name)}>+</strong></button>
                        <span id={`product${item.id}`}>
                          {/* //write code here */
                            this.state.products.productPurchased

                          }
                        </span>
                        <button className='button' id={`removecart${item.name}`} style={{ borderRadius: '5px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', backgroundColor: '#f44336', border: '2px solid #f44336' }} ><strong onClick={this.changeQuantity(-1, item.name)}>-</strong></button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='checkBox' style={{ backgroundColor: 'LightGrey', float: 'right', height: '350px', width: '400px', borderRadius: '25px' }}>
              <div>
                <h2 style={{ textAlign: 'center' }}>
                  Your Shopping Basket
                </h2>
              </div>
              <div id='grosstotal' style={{ fontSize: '25px', textAlign: 'center', paddingTop: '30px' }}>
                <span id='grosstotal'><strong>Sub Total </strong></span>
                <span style={{ color: 'red' }}><strong>${this.state.totalPrice}</strong></span>
              </div>
              <div style={{ fontSize: '20px', textAlign: 'center', paddingTop: '50px' }} >
                <button id='checkout' disabled={this.state.totalItems === 0} style={{ borderRadius: '5px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', backgroundColor: '#008CBA', borderColor: '#008CBA' }} className='success button large expanded' onClick={this.submitResultQuantity}>Proceed to Checkout</button>
              </div>
              <div style={{ fontSize: '15px', textAlign: 'center', paddingTop: '10px' }}><span><strong>OR</strong></span></div>
              <div style={{ fontSize: '17px', textAlign: 'center', paddingTop: '20px' }} >
                <button id='emptycart' disabled={this.state.totalItems === 0} style={{ borderRadius: '5px', boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)', backgroundColor: '#f44336', borderColor: '#f44336' }} className='success button large expanded' onClick={this.componentDidMount}>
                  <strong>Empty Shopping Basket</strong>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}
export default ProductsAPI;