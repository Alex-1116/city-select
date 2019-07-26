import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3000';
// 设置拦截器   即在then和catch之前对response进行处理
axios.interceptors.response.use((res)=>{
    return res.data
})

export let allCities = ()=>{
    return axios.get('/allcity');
} 

export let nowCity = ()=>{
    return axios.get('/nowcity');
} 
export let hotCity = ()=>{
    return axios.get('hotcity');
}