import React from 'react';
import axios from 'axios';
const sgMail = require('@sendgrid/mail');


export default class LoanTable extends React.Component {
  
  constructor(props) {
    super(props);
    this.msg = {
      email: {
        recipient: 'ankitkushawaha1000@gmail.com',
        sender: 'ankitkushawaha1000@gmail.com',
        subject: 'Bill Payment reminder',
        text: 'tell me if you got this msg'
      }
    }
    this.state = {
      message1: "",
      message2: "",
      message3: "",
      items: [],
      loanDetails: [],
      props: props
    }
    axios.get(`/api/users/get/${props.ID}`)
    .then((res) => {
      var items = res.data.loan;
      this.setState({
        items: items
      })
    })
    .catch( (error) => {
      console.log(error);
    })


  }
  
  updateLoanData(loanData){
      console.log(loanData);
      axios.put(`/api/users/update/${this.state.props.ID}`, {loan: loanData})
      .then(res => {
          // alert("Profile Updated Successfully");
          console.log("Profile Updated Successfully");
      })
      .catch(error =>{
          console.log(error);
      })

  }

  updateMessage1(event) {
    this.setState({
      message1: event.target.value
    });
  }
  updateMessage2(event) {
    this.setState({
      message2: event.target.value
    });
  }
  updateMessage3(event) {
    this.setState({
      message3: event.target.value
    });
  }


  // don not delete this code...........

  // async sendEmail(e){
  //   e.preventDefault();


  //     const msg={
  //       recipient: 'ankitkushawaha1000@gmail.com',
  //       sender: 'ankitkushawaha1000@gmail.com',
  //       subject: 'Bill Payment reminder',
  //       text: 'tell me if you got this msg'
  //     }
  //     try {
  //       await axios.post("http://localhost:4000/send_mail", msg)
  //       console.log("success")
  //     } catch (error) {
  //       console.log("not done")
  //       console.error(error)
  //     }
  
  // };

  handleClick() {
    if(this.state.message1 && this.state.message2 && this.state.message3){
      
      var items = this.state.items;
      var loanDetails = this.state.loanDetails;
  
      loanDetails.push(this.state.message1)
      loanDetails.push(parseInt(this.state.message2, 10))
      loanDetails.push(this.state.message3)
      // var date = new Date(this.state.message3);
      // loanDetails.push(date);
      items.push(loanDetails)
      // console.log(items);
      this.updateLoanData(items);
      this.setState({
        items: items,
        loanDetails: [],
        message1: "",
        message2: "",
        message3: "",
      });
    }else{
      alert("Please fill all the Data!");
    }
  }

  handleItemChanged1(i, event) {
    var items = this.state.items;
    items[i][0]  = event.target.value;

    this.setState({
      items: items
    });
  }
  handleItemChanged2(i, event) {
    var items = this.state.items;
    items[i][1]  = event.target.value;

    this.setState({
      items: items
    });
  }
  handleItemChanged3(i, event) {
    var items = this.state.items;
    items[i][2]  = event.target.value;

    this.setState({
      items: items
    });
  }

  handleItemDeleted(i) {
    var items = this.state.items;

    items.splice(i, 1);
    this.updateLoanData(items);
    this.setState({
      items: items
    });
  }

  renderRows() {
    var context = this;

    return  this.state.items.map(function(o, i) {
              return (
                <tr key={"item-" + i}>
                  <td>
                    <input
                      type="text"
                      value={o[0]}
                      onChange={context.handleItemChanged1.bind(context, i)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={o[1]}
                      onChange={context.handleItemChanged2.bind(context, i)}
                      min="0" 
                      onKeyPress={(event) => {
                          if (!/[0-9]/.test(event.key)) {
                          event.preventDefault();
                          }
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={o[2]}
                      onChange={context.handleItemChanged3.bind(context, i)}
                    />
                  </td>
                  <td>
                    <button 
                        type="submit" 
                        name="signin" 
                        id="signin" 
                        onClick={context.handleItemDeleted.bind(context, i)} 
                        class="btn btn-dark btn-sm"
                        >
                            DELETE
                    </button>
                  </td>
                </tr>
              );
            });
  }



  render() {
    return (
        <div>

            <h3 className="WelcomeText-profile">
                Enter Repayment
                <div className="blackLine-profile"></div>
            </h3>
            <table className="">
                <thead>
                    <tr>
                        <th>
                            Repayment Name
                        </th>
                        <th>
                            Amount
                        </th>
                        <th>
                            Due Date
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
            <input
                type="text"
                placeholder = "Repayment Name"
                value={this.state.message1}
                onChange={this.updateMessage1.bind(this)}
            />
            <input
                type="number"
                placeholder = "Amount"
                value={this.state.message2}
                onChange={this.updateMessage2.bind(this)}
                min="0" 
                onKeyPress={(event) => {
                    if (!/[0-9]/.test(event.key)) {
                    event.preventDefault();
                    }
                }}
            />
            <input
                type="date" 
                placeholder = "dd/mm/yyyy"
                value={this.state.message3}
                onChange={this.updateMessage3.bind(this)}
            />
            <button 
                type="submit" 
                name="signin" 
                id="signin" 
                onClick={this.handleClick.bind(this)}
                class="btn btn-dark btn-sm"
                >
                    ADD  
              </button>
        </div>
    );
  }
}