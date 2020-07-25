import React, {Component} from 'react';
import './App.css';
import axios from 'axios';
import {saveAs} from 'file-saver';

class App extends Component {
  state = {
    name: '',
    receiptId: 0,
    price1: 0,
    price2:0
  }

  handleChange = ({target: {value, name}}) => this.setState({[name]: value}) 
  createAndDownloadPDF = () => {
    axios.post('/create-pdf', this.state)
// blob are immutable objects for raw data rep, reping data that isn't necessary a jaavscript object
      .then(() => axios.get('fetch-pdf', {responseType: 'blob'}))
      .then((res) =>{
        const pdfBlob = new Blob([res.data], {type: 'application/pdf'})

        saveAs(pdfBlob, 'newPdf.pdf')
      })
  }
  render(){
  return (
    <div className="App">
      <h1>BlackLivesMatter</h1>
      <input type="text" placeholder="name" onChange={this.handleChange} name="name"/>
      <input type="number" placeholder="receipt Id" onChange={this.handleChange} name="receiptId"/>
      <input type="number" placeholder="price 1" onChange={this.handleChange} name="price1"/>
      <input type="number" placeholder="price 2" onChange={this.handleChange} name="price2"/>
      <button onClick={this.createAndDownloadPDF}>Download PDF</button>
    </div>
  );
  }
}

export default App;
