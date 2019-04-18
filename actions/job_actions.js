import axios from 'axios';
import { Location } from 'expo';
//import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

import JOB_DATA from './IndeedJobData.json';

import {
    FETCH_JOBS,
    LIKE_JOB,
    CLEAR_LIKED_JOBS
} from './types'

const JOB_ROOT_URL = 'https://authenticjobs.com/api/?';
const JOB_QUERY_PARAMS = {
    api_key: 'ae14c2e712c6c2cffa632aa9ec8a1386',
    method: 'aj.jobs.search',
    format: 'json',
    perpage: '10',
};

const buildJobsUrl = () => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS });
    return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        console.log("fetchJobs (region):")
        console.log(region)
        let res = await Location.reverseGeocodeAsync(region);
        console.log("res: ");
        console.log(res)
        const zip = res[0].postalCode;
        console.log("zip: ");
        console.log(zip)    

        const url = buildJobsUrl();
        console.log("\n ============== URL:" + url + " ==================\n");
        let { data } = await axios.get(url);
      // const data = JOB_DATA;

        
        dispatch({ type: FETCH_JOBS, payload: data });
     //   console.log(data)
        callback();
    } catch (err) {
        console.log(err);
    }
};

// const doggies = [
//     {
//         breed: 'Golden Retriever',
//         name: 'Goldie',
//         src: require('../assets/goldie.jpg')
//     },
//     {
//         breed: 'Golden Retriever',
//         name: 'Goldie',
//         src: require('../assets/adorable-animal-baby.jpg')
//     },
//     {
//         breed: 'Golden Retriever',
//         name: 'Goldie',
//         src: require('../assets/goldie.jpg')
//     },
//     {
//         breed: 'Golden Retriever',
//         name: 'Goldie',
//         src: require('../assets/goldie.jpg')
//     },
//     {
//         breed: 'Golden Retriever',
//         name: 'Goldie',
//         src: require('../assets/goldie.jpg')
//     }
// ]

const doggies = {
    listing: 
  [
      {
          breed: 'Golden Retriever',
          name: 'Goldie',
          src: require('../assets/goldie.jpg')
      },
      {
          breed: 'Retriever',
          name: 'Bobo',
          src: require('../assets/adorable-animal-baby.jpg')
      },
      {
          breed: 'Pug',
          name: 'PUBG',
          src: require('../assets/adorable-animal-bed.jpg')
      },
      {
          breed: 'Golden Retriever',
          name: 'Rocky',
          src: require('../assets/adorable-animal.jpg')
      },
      {
          breed: 'Beagle',
          name: 'Mr. Bagles',
          src: require('../assets/beagle-canine.jpg')
      }
   ] 
}

export const fetchPuppies = (region, callback) => async (dispatch) => {
    try {
       
        console.log("doggie object:")
        console.log(doggies)

        dispatch({ type: FETCH_JOBS, payload: doggies });
     //   console.log(data)
        callback();
    } catch (err) {
        console.log(err);
    }
};


export const likeJob = (job) => {
    return {
        payload: job,
        type: LIKE_JOB
    };
};

export const clearLikedJobs = () => {
    return  { type: CLEAR_LIKED_JOBS };
}