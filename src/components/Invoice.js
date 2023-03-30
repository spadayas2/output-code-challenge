import {useLocation} from 'react-router-dom';
import Logo from './Logo';
import './Invoice.css';

const Invoice = (props) => {
    const location = useLocation();
  return (
    <div className="card">
      <div>
        <Logo />
      </div>
      <div className="invoice-confirmation">
        <label><h1>Invoice Confirmation: {Math.random().toString()}</h1></label>
      </div>
      <div>
        <table className="cards">
          <thead>
            <tr>
              <th>Card</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {location.state.data.map((card) => {
              return (
                <tr key={card.id}>
                  <td>{card.selectedPlayer}</td>
                  <td>{card.quantity}</td>
                  <td>$ {card.subTotal.toFixed(2)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="invoice-total">
        <label><h2>Total: $ {location.state.total.toFixed(2)}</h2></label>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
