let latitude;
let longitude;
function initMap() {
    navigator.geolocation.getCurrentPosition((posi)=>{
        let myLatlng = {lat:posi.coords.latitude,lng:posi.coords.longitude };
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: 8,
            center: myLatlng,
          });
          let marker;
          map.addListener("click", (mapsMouseEvent) => {
            if(marker!=null)
               marker.setMap(null);
            marker = new google.maps.Marker({
              position: mapsMouseEvent.latLng,
              map: map,
            });
            document.getElementById('lat').value=mapsMouseEvent.latLng.lat();
            document.getElementById('lng').value=mapsMouseEvent.latLng.lng();
            latitude=mapsMouseEvent.latLng.lat();
            longitude=mapsMouseEvent.latLng.lng();
            document.getElementById('lati').value=latitude;
            document.getElementById('longi').value=longitude;
          });
    });
  }

  function getSatellitesTimings(){
    let url=`https://satellites.fly.dev/passes/25544?lat=${latitude}&lon=${longitude}&limit=1`
    fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    let results=data[0];
    let rise=results.rise;
    let culmination=results.culmination;
    let set=results.set;
    setRiseTimings(rise.alt,rise.az,rise.az_octant,rise.utc_datetime,rise.visible);
    setCulminationTimings(culmination.alt,culmination.az,culmination.az_octant,culmination.utc_datetime,culmination.visible);
    setSetTimings(set.alt,set.az,set.az_octant,set.utc_datetime,set.visible);
  });
  }

  function ConvertUTCDateToLocalDate(date){
    date.setMinutes(date.getMinutes()-date.getTimezoneOffset());
      return date.toLocaleString();
  }

  function setRiseTimings(alt,az,az_octant,utc_datetime,visible){
    document.getElementById('rise_altitude').textContent=alt;
    document.getElementById('rise_azimuth').textContent=az;
    document.getElementById('rise_octant').textContent=az_octant;
    document.getElementById('rise_timestamp').textContent=ConvertUTCDateToLocalDate(new Date(utc_datetime));
    document.getElementById('rise_visible').textContent=Boolean(visible) ?'Visible' : 'Not Visible';
  }

  function setCulminationTimings(alt,az,az_octant,utc_datetime,visible){
    document.getElementById('culm_altitude').textContent=alt;
    document.getElementById('culm_azimuth').textContent=az;
    document.getElementById('culm_octant').textContent=az_octant;
    document.getElementById('culm_timestamp').textContent=ConvertUTCDateToLocalDate(new Date(utc_datetime));
    document.getElementById('culm_visible').textContent=Boolean(visible) ?'Visible' : 'Not Visible';
  }

  function setSetTimings(alt,az,az_octant,utc_datetime,visible){
    document.getElementById('set_altitude').textContent=alt;
    document.getElementById('set_azimuth').textContent=az;
    document.getElementById('set_octant').textContent=az_octant;
    document.getElementById('set_timestamp').textContent=ConvertUTCDateToLocalDate(new Date(utc_datetime));
    document.getElementById('set_visible').textContent=Boolean(visible) ?'Visible' : 'Not Visible';
  }