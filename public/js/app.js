console.log('yes connected');


// fetch('http://localhost:3000/weather?address=Delhi', {
//     mode: 'no-cors',
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//         "Content-Type": "application/json",
//         "Access-Control-Allow-Credentials" : true 
//     }
// })
// .then(function(res){
//     console.log(res);
//     if(!res.ok){
//         return console.log("error");
//     }
//     return res.json();
// }).then(data => {
//     if(data.err) return console.log("location not found");
//     console.log(data)});

const getForecast = document.querySelector('form')
const loc = document.getElementsByClassName('location')
let postForecast=''
let para1=document.querySelector('.message-one')
let para2=document.querySelector('.message-two')
let img=document.querySelector('.img')

console.log(img.src);

getForecast.addEventListener('submit', (e) => {
    
    e.preventDefault();
    console.log('form submitted');
    
    const addr = loc[0].value;

    para2.innerHTML='Loading..'
    img.innerHTML='Loading..'

    // fetching forecast
    const url = 'http://localhost:3000/weather?address=' + addr
    fetch(url, {
        mode: 'no-cors',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
            "Access-Control-Allow-Credentials": true
        }
    }).then((res) => {
        if (!res.ok) console.log('error');
        else {
            return res.json()
        }
    }).then((data) => {
        if (data.err) return console.log('location is not correct');
        console.log(data)
        postForecast='The current temperature  is '+data.temperature+' degrees (in C). It feels like '+data.feelslike+' degrees.'
        para1.innerHTML=data.location
        para2.innerHTML=postForecast+'<br>'+data.forecast
        switch(data.forecast){
            case 'Mist':{
                // console.log("hellooo");
                img.innerHTML='<img src="/img/mist.png" alt="mist_img">'
                break;
            }
            case 'Sunny':{
                img.innerHTML='<img src="/img/sunny.png" alt="sunny_img">'
                break;
            }
            case 'Partly cloudy':{
                img.innerHTML='<img src="/img/partly-cloudy.jpg" alt="pc_img">'
                break;
            }
            case 'Cloudy':{
                img.innerHTML='<img src="/img/cloudy.jpg" alt="cloudy_img">'
            } break;
            case 'Overcast':{
                img.innerHTML='<img src="/img/overcast.png" alt="overcast_img">'
            }break;
            case 'Patchy rain possible':{
                img.innerHTML='<img src="/img/patchy-rain.jpg" alt="pr_img">'
            }break;
            case 'Patchy snow possible':{
                img.innerHTML='<img src="/img/patchy-snow.png" alt="ps_img">'
            }break;
            case 'Patchy sleet possible':{
                img.innerHTML='<img src="/img/patchy-sleet.png" alt="ps_img">'
            }break;
            case 'sleet':{
                img.innerHTML='<img src="/img/patchy-sleet.png" alt="ps_img">'
            }break;
            case 'Patchy freezing drizzle possible':{
                img.innerHTML='<img src="/img/heavy-drizzle.png" alt="drizzle_img">'

            }break;
            case 'Thundery outbreaks possible':{
                img.innerHTML='<img src="/img/thundery-outbreak.png" alt="thunder_img">'
            }break;
            case 'Blowing snow':{
                img.innerHTML='<img src="/img/blowing-snow.png" alt="thunder_img">'
            }break;
            case 'Clear':{
                img.innerHTML='<img src="/img/clear.png" alt="thunder_img">'
                break;
            }
            case 'Blizzard':{
                img.innerHTML='<img src="/img/blizzard.png" alt="blizzard_img">'
                break;
            }
            case 'Fog':{
                img.innerHTML='<img src="/img/fog.png" alt="thunder_img">'
                break;
            }
            case 'Light drizzle':{
                img.innerHTML='<img src="/img/heavy-drizzle.png" alt="thunder_img">'
                break;
            }
        }
    });


})



