import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions, Image,TouchableOpacity  } from 'react-native';


const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

class Slides extends Component {


    renderLastSlide(index) {
        if (index === this.props.data.length - 1) {
            return(
              <View>

              <Image source={require('../assets/third.jpg')} style={styles.thirdPage} />

              <TouchableOpacity style= {styles.buttonStyle}>
                <Text raised
                      onPress={this.props.onComplete}
                      style ={styles.textButtonStyle}
                  > Let's Go ! </Text>
              </TouchableOpacity>


                </View>
            )
        }
        if (index === this.props.data.length -2)
        {
            return(
                <Image source={require('../assets/page2.jpg')} style={styles.secondPage} />
        )
        }
        if (index === this.props.data.length -3)
        {
            return(
                <Image source={require('../assets/logo.png')} style={styles.firstPage} />
        )
        }
    }

    renderSlides () {
        return this.props.data.map((slide, index) => {

            return (
                <View
                style={[styles.slideStyle, { backgroundColor: slide.color }]}
                key={index}
                >
                <Text style={styles.textStyle}>
                    {slide.text}
                </Text>
                <View style={ {marginTop: 15 } }>
                    {this.renderLastSlide(index)}
                </View>

                </View>
            );
        });
    }

    render () {
        return (
        <ScrollView
        horizontal
        style={{ height: "100%" }}
        pagingEnabled
        >
        {this.renderSlides()}
        </ScrollView>
        );
    };
}

const styles = {
    slideStyle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: SCREEN_WIDTH

    },
    textStyle: {
        fontSize: 30,
        color: 'white',
        justifyContent: 'center'
    },
    buttonStyle: {

        marginBottom:180,
        marginLeft: 80,
        height: 50,
        width: 140,
        borderWidth: 2,
        borderRadius: 3,
        justifyContent: 'center',
        backgroundColor: '#FFFDD0',
        borderColor:'white',
    },
    textButtonStyle:
    {
      fontSize: 30,
      fontWeight: 'bold',
      textShadowColor:'#10324A',
      textShadowOffset:{width: .5, height: .5},
      textShadowRadius: .5,
      color: '#E64303'
    },
    firstPage:
    {
      flex: 1,
      height: 350,
      width: 350,
   resizeMode: 'contain'

    },
    secondPage:
    {

      flex: 1,
      height: 350,
      width: 350,
     resizeMode: 'contain'
  },
    thirdPage:
    {

      flex: 1,
      height: 300,
      width: 300,
      marginTop: 200,
     resizeMode: 'contain'
    }
}

export default Slides;
