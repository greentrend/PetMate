// import React, { Component } from 'react';
// import { View, Text, ScrollView, Dimensions, Image } from 'react-native';
// import { Button } from 'react-native-elements';

// const SCREEN_WIDTH = Dimensions.get('window').width;
// const SCREEN_HEIGHT = Dimensions.get('window').height;

// class Slides3 extends Component {


//     renderLastSlide(index) {
//         if (index === this.props.data.length - 1) {
//             return(
//                 <Button 
//                     title="Sign up!"
//                     raised
//                     buttonStyle={styles.buttonStyle}
//                     onPress={this.props.onComplete}
//                 />
//             )
//         }
//     }

//     renderSlides () {
//         return this.props.data.map((slide, index) => {
//             return (
//                 <View
//                 style={[styles.slideStyle, { backgroundColor: slide.color }]}
//                 key={slide.text}
//                 >
//                 <Image 
//                     source={require('../assets/goldie.jpg')}
//                 />
//                 <Text style={styles.textStyle}>
//                     {slide.text}
//                 </Text>
//                 <View style={ {marginTop: 15 } }>
//                     {this.renderLastSlide(index)}
//                 </View>
                
//                 </View>
//             );
//         });
//     }

//     render () {
//         return (
//         <ScrollView
//         horizontal
//         style={{ height: "100%" }}
//         pagingEnabled
//         >
//         {this.renderSlides()}
//         </ScrollView>
//         );
//     };
// }

// const styles = {
//     slideStyle: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: SCREEN_WIDTH

//     },
//     textStyle: {
//         fontSize: 30,
//         color: 'white',
//         justifyContent: 'center'
//     },
//     buttonStyle: {
//         backgroundColor: '#0288d1'
//     }
// }

// export default Slides3;