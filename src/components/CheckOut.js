import React from 'react';

class CheckOut extends React.Component {
  constructor(props) { super(props); 
    this.state = {
       orderNumber: 0 };
       }
       
       
       componentDidMount() {
         var orderNumber = window.orderNumber;
          this.setState(orderNumber); }
           render()
            {
               return (
            <div>
              <br/>
              <div class="card text-center">
                 <div class="card-body">
                 Thank you for your order, order no: {this.state.orderNumber} , it will be dispatched shortly! </div> 
                 </div>
                  </div>
                  );
                
                }
} 
export default CheckOut;