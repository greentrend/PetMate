import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';


const ROOT_URL = 'api goes here';
const QUERY_PARAMS = {
    // api_key: 'ae14c2e712c6c2cffa632aa9ec8a1386',
    // method: 'aj.jobs.search',
    // format: 'json',
    // perpage: '10',
};

const buildJobsUrl = () => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS });
    return `${JOB_ROOT_URL}${query}`;
};

const Items = [];

export const fetchStoreItems = () => async (dispatch) => {
    try {
        const url = buildJobsUrl();
        console.log("\n ============== URL:" + url + " ==================\n");
        let { data } = await axios.get(url);
        console.log("DATA from STORE: ")
        console.log(data)
      //  dispatch({ type: FETCH_JOBS, payload: data });
     //   console.log(data)
    //    callback();
    } catch (err) {
        console.log(err);
    }
};

class StoreScreen extends Component {

    
    constructor(props) {
        super(props);
        //used to store the payload we get from the GET request
        this.foodArray = []
        this.state = {
            isLoading: true,
            dataSource: null,
        }
    }

    componentDidMount() {
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        //**IMPORTANT**: authorizationToken is a TEMPORARY token, hence the API request would NOT work if the token
        // has expired.To request a new temporary token you have to contact me to log into my ebay dev account and request one
        //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var authorizationToken = 'v^1.1#i^1#r^0#f^0#p^1#I^3#t^H4sIAAAAAAAAAOVXa2wUVRTu9mUKFNJIxPDQZYBIKzN7Z3dnHxO6srQUVoEubOVleMzjLh2YnZnOveOyCcRaBRMfEYjFH5rYVKONkQgiQY3RSMCIUkkq1R8aQwGJotGEEgxigndml7KtBCgsQuLuJps599xzz/ed79w7F7SWV9Rsmbflz0rXXcUdraC12OViR4KK8rIHR5cUjy8rAnkOro7Wqa2lbSU/z0RCSjX4xRAZuoage0NK1RDvGGspy9R4XUAK4jUhBRGPJT4RXTCf9zKAN0wd65KuUu5YfS0leIOQ4wJBjvPJohgKEat2KWaTTsYlEYiSP+CTJBmG/ICMI2TBmIawoOFaygvYMA38NBtsAl7eb/8YHxtcQbmXQBMpukZcGEBFnHR5Z66Zl+vVUxUQgiYmQahILNqQaIzG6ucsbJrpyYsVyfGQwAK20OCnOl2G7iWCasGrL4Mcbz5hSRJEiPJEsisMDspHLyVzA+k7VIfFkMj5xTCUWK9MyCwIlQ26mRLw1fOwLYpMJx1XHmpYwZlrMUrYENdBCeeeFpIQsXq3/bfIElQlqUCzlpozO7o8Go9TkQYTytBUJFoSLAQT2KLji+vpQDIMgFf2BemwEJCCHCvkFspGy9E8ZKU6XZMVmzTkXqjj2ZBkDYdy48vjhjg1ao1mNIntjPL9/AMc+lbYRc1W0cLNml1XmCJEuJ3Ha1dgYDbGpiJaGA5EGDrgUETaxjAUmRo66GgxJ58NqJZqxtjgPZ50Os2kfYxurvV4AWA9yxbMT0jNMCVQxNfu9ay/cu0JtOJAkSCZiRQeZwySywaiVZKAtpaK+Fg/5wvneB+cVmSo9V+GPMyewR1RqA5hZY4LeyEXAoFAKMkVZLOJ5ETqsfOAopChU4K5HmJDFSRIS0RnVopIV+Z9XNLrCyUhLQfCSdofTiZpkZMDNJuEEEAoilI49H9qlOuVekLSDRjXVUXKFETwhRO7KccFE2cSUFWJ4XpVf0WQyAZ5y+HZvT4siHYMRIIIhsLY2mYkPeXRBbKp2abVTtY3hTtqGLFUysKCqMJYYTa027SZXRGeQo77OwoTqV+2kIqcPacZp5oMelxiTIh0yySvKEyjfWw16euhRjYBbOqqCs0l7E0X+g6r7zD3yhvDXbiDepi4Sa97b6m2JVUhElp9e9Dd5qoqAr6zULMcx/kDoXDAe1O46pyaNmX+g7NoWPDm6QhD+Ra8V3oG33IjRc6HbXPtBW2u3eSiDDxgGjsFTC4vebS0ZNR4pGDIKEKSQcpajVzeTMishxlDUMzicpeyveeZ3rx7dcdKcO/AzbqihB2Zd80GEy+PlLFjxlWyYeBng8DrJ98VYMrl0VL2ntKxXNfOlpYW5TB/6OLGrrGN77QuPX4WVA44uVxlRaVtrqKnu5/1jpjWcMDf82XjvpfHRw5POjSRZdDYs709E4RpO1ZNje0rX9PX3H9+1Hcfn4ifmNDp7qWXv/jQph9+OvCt+8iO+z7f2T3iZELp3vVB6NjRp46sKz7aMnLT1kVbH1ZqPuuusl6oPnW885PX91+o+Wj3xdeWVrf9GE+jSacfOBf4tX3/39vc7/ac3FtlgHGdT94/d67b99jiyOT2u3//9GDfK6s2j77QNY6fVfeGa8ap00Wz+r6g9uzp2Lbxie9T7ilLwXvplU1v989/vnnnL69+OL333Fft71dOTLfX08/tqTl/4li/78z5/RVj/vjrrdWP9L0pS/1Q7dy1Bn5Nd39zpmzO9M3V82b8dvClZVXbs+X7B1RLmF3xEAAA'
        
        //sets up the second parameter for out axios request later on
        //url can be edited to take different query parameters, 
        //for instance: limit = 5 narrows down the number of objects retrieved to 5
        //one can change that to 10 or even 50; however, for every query parameter added
        //a '&' must be added , which is url format
        const config = {
            url: 'https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=66780&limit=5',
            method: 'get',
            headers: {
            'Authorization': 'Bearer <' + authorizationToken + '>'
            }
        }
        //executes axios request
        const myData = axios.get('https://api.ebay.com/buy/browse/v1/item_summary/search?category_ids=66780&limit=5', config)

        //if the promise is succesful ,then we can access our payload and iterate through its contents
        .then((result) => {
            this.setState({
                isLoading: false,
                foodArray: result.data.itemSummaries
            })            
        }).catch(function () {
                console.log("Promise Rejected");
        });
        console.log(myData)
    }

    render() {
        //if we haven't loaded the payload then show the user a activityIndicator        
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <ActivityIndicator />
                </View>
            );
        } else {
            //using the map function to iterate through our payload and save it as 'dogFood'
            let dogFood = this.state.foodArray.map((val, key) => {
                return (<View key={key} style={styles.item}>
                            <Text>{val.title}</Text>
                            <Text>${val.price.value}</Text>
                            <Image 
                                style={styles.thumbnailStyle}
                                source={{ uri: val.image.imageUrl }}
                            />
                        </View>)
            });

            return (
            //displays to application screen    
                <View style={styles.container}>
                    {dogFood}
                </View>
            );
        }
    }   
}



//style sheet used to customize our components
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    item: {
        flex: 1,
        alignSelf: 'stretch',
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 3,
        borderBottomColor: '#eee'
    },
    thumbnailStyle: {
        alignItems: 'center',
        height: 50,
        width: 50,
    }
    });
    
export default connect(null)(StoreScreen);