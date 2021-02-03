import React, { Component } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { render } from "@testing-library/react";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

const colors = [
    '#1abc9c',
    '#2ecc71',
    '#3498db',
    '#9b59b6',
    '#34495e',
    '#16a085',
    '#27ae60',
    '#2980b9',
    '#8e44ad',
    '#2c3e50',
    '#f1c40f',
    '#e67e22',
    '#e74c3c',
    '#f39c12',
    '#d35400',
    '#c0392b'
];

class QuoteBox extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            author: '',
            color : colors[Math.floor(Math.random() * colors.length)]
        };
        this.handleShare = this.handleShare.bind(this);
        this.nextQuote = this.nextQuote.bind(this);
        this.changeColor = this.changeBackgroundColor.bind(this);
    }
    componentDidMount(){
        this.nextQuote()
    }
    handleShare(){

    }
    nextQuote(){
        var temp2 = this.state.randomColorIndex;
        while(this.state.randomColorIndex === temp2){
            temp2 = Math.floor(Math.random() * colors.length)
        }
        let url = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
        axios.get(url)
           .then(res => {
              let data = res.data.quotes
              let quoteNum = Math.floor(Math.random() * data.length) //quote number
              let randomQuote = data[quoteNum] //actual quote
  
              this.setState({
                 text: randomQuote['quote'],
                 author: randomQuote['author'],
                 color: colors[temp2]
              })
           })
    }

    changeBackgroundColor() {
        document.body.style.backgroundColor = this.state.color
    }

    render() {
        this.changeBackgroundColor()
        const { text, author} = this.state
        return (
            <div id="quote-box-wrapper">
                <div id="quote-box" style={{color: this.state.color}}>
                    <h2 id="text">{text}</h2>
                    <p id="author">- {author}</p>
                    <br />
                    <a id="tweet-quote" class="buttons" href={`https://twitter.com/intent/tweet?text=${text} ${author}`} target="_blank" onClick={this.handleShare} style={{backgroundColor: this.state.color}}>
                        <span>
                            <FontAwesomeIcon icon={faTwitter} size='lg' />
                        </span>
                    </a>
                    <button id="new-quote" class="buttons" onClick={this.nextQuote} style={{backgroundColor: this.state.color}}>Next Quote</button>
                </div>
            </div>
        );
    }
}

export default QuoteBox;