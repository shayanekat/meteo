window.addEventListener('load', ()=> {
    let long;
    let lat;
    let tempdescr = document.querySelector('.temperature-desciption');
    let tempdeg = document.querySelector('.degree');
    let loctzone = document.querySelector('.location-timezone');

    if (navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat = position.coords.latitude;

            var api = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/ea0fef12a3fb2abe25c7d4a45d9f18c8/"+lat+","+long;

            fetch(api)
                .then(resp => {
                    return resp.json();
                })
                .then(data =>{
                    console.log(data);
                    const {temperature,summary,icon} = data.currently;
                    tempdeg.textContent = Math.round(((temperature-32)*(5/9))*100)/100;
                    tempdescr.textContent = summary;
                    loctzone.textContent = data.timezone;

                    seticon(icon,document.querySelector(".icon"))
                });
        });
    }
    
    function seticon(icon, iconID){
        const skycons =  new Skycons({color:"white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID,Skycons[currentIcon]);

        }
});
