import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { Ionicons, FontAwesome, Entypo } from '@expo/vector-icons'; // 6.2.2

import Header from './components/Header';
import Score from './components/Score';
import Card from './components/Card';

import helpers from './helpers';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.renderCards = this.renderCards.bind(this);
    this.resetCards = this.resetCards.bind(this);
   
    let sources = {
      'fontawesome': FontAwesome,
      'entypo': Entypo,
      'ionicons': Ionicons
    };

    //Memory cards icons
    let cards = [
      {
        src: 'fontawesome',
        name: 'ship',
        color: '#71beeb'
      },
      {
        src: 'entypo',
        name: 'instagram',
        color: '#6e1e85'
      },
      {
        src: 'ionicons',
        name: 'body',
        color: '#cf7613'
      },
      {
        src: 'fontawesome',
        name: 'money',
        color: '#337a40'
      },
      {
        src: 'ionicons',
        name: 'earth',
        color: '#141759'
      },
      {
        src: 'entypo',
        name: 'youtube',
        color: '#FF0000'
      },
      {
        src: 'fontawesome',
        name: 'thumbs-up',
        color: '#d4d00d'
      },
      {
        src: 'fontawesome',
        name: 'eye',
        color: '#2b2929'
      },
      {
        src: 'fontawesome',
        name: 'whatsapp',
        color: '#1ba822'
      },
      {
        src: 'ionicons',
        name: 'car-sport-outline',
        color: '#8c1515'
      },
      {
        src: 'ionicons',
        name: 'airplane-outline',
        color: '#19939c'
      },
      {
        src: 'fontawesome',
        name: 'facebook-square',
        color: '#3C5B9B'
      }
    ];

    let clone = JSON.parse(JSON.stringify(cards));

    this.cards = cards.concat(clone);
    this.cards.map((obj) => {
      let id = Math.random().toString(36).substring(7);
      obj.id = id;
      obj.src = sources[obj.src];
      obj.is_open = false;
    });

    this.cards = this.cards.shuffle(); 
    this.state = {
      current_selection: [],
      selected_pairs: [],
      score: 0,
      cards: this.cards
    }
  
  }

  render() {
    return (
      <View style={styles.container}>
        
        <Header />
        <View style={styles.body}>
          { 
            this.renderRows.call(this) 
          }
        </View>

        <Score score={this.state.score} />

        <Button
          onPress={this.resetCards}
          title="RESET GAME!"
          color="#c79d12" 
        />
      </View>
    );
  }
  
  //Reset cards in the game
  resetCards() {
    let cards = this.cards.map((obj) => {
      obj.is_open = false;
      return obj;
    });

    cards = cards.shuffle();

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0
    });
  }

  //Rows
  renderRows() {
   
    let contents = this.getRowContents(this.state.cards);
    return contents.map((cards, index) => {
      return (
        <View key={index} style={styles.row}>
          { this.renderCards(cards) }
        </View>
      );
    });
   
  }

  //Cards
  renderCards(cards) {
    return cards.map((card, index) => {
      return (
        <Card 
          key={index} 
          src={card.src} 
          name={card.name} 
          color={card.color} 
          is_open={card.is_open}
          clickCard={this.clickCard.bind(this, card.id)} 
        />
      );
    });
  }

  // Clicking on a card  
  clickCard(id) {
    let selected_pairs = this.state.selected_pairs;
    let current_selection = this.state.current_selection;
    let score = this.state.score;

    let index = this.state.cards.findIndex((card) => {
      return card.id == id;
    });

    let cards = this.state.cards;
    
    if(cards[index].is_open == false && selected_pairs.indexOf(cards[index].name) === -1){

      cards[index].is_open = true;
      
      current_selection.push({ 
        index: index,
        name: cards[index].name
      });

      if(current_selection.length == 2){
        if(current_selection[0].name == current_selection[1].name){
          score += 1;
          selected_pairs.push(cards[index].name);
        }else{
         
          cards[current_selection[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards
            });
          }, 500);
        }

        current_selection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection
      });

    }
  
  }

  getRowContents(cards) {
    let contents_r = [];
    let contents = [];
    let count = 0;
    cards.forEach((item) => {
      count += 1;
      contents.push(item);
      if(count == 4){
        contents_r.push(contents)
        count = 0;
        contents = [];
      }
    });

    return contents_r;
  }
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fafafa'
  },

  row: {
    flex: 1,
    flexDirection: 'row'
  },

  body: {
    flex: 18,
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20
  }
});