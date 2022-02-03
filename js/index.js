function callfuns() {
  getdate();
  getLocation();
  // setSunPosition();
}
const months = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};
const days = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday",
};
function getdate() {
  const d = new Date();
  let h = d.getHours();
  let m = d.getMinutes();
  let s = d.getSeconds();
  let am_pm = "AM";

  if (h > 12) {
    h -= 12;
    am_pm = "PM";
  }
  if (h == 0) {
    h = 12;
    am_pm = "AM";
  }
  document.getElementById("hrs").innerHTML = h < 10 ? `${"0" + h}` : h;
  document.getElementById("mins").innerHTML = m < 10 ? `${"0" + m}` : m;
  document.getElementById("secs").innerHTML = s < 10 ? `${"0" + s}` : s;
  document.getElementById("am_pm").innerHTML = am_pm;

  let date = d.getDate();
  let month = d.getMonth();
  let day = d.getDay();

  document.getElementById("daytext").innerHTML = days[day];
  document.getElementById("datetext").innerHTML =
    (date < 10 ? `${"0" + date}` : date) + " " + months[month];
  setTimeout(getdate, 1000);
}

//Geolocation for weather Part
var json = {};
function getLocation() {
  var x = document.getElementById("temperature");
  var y = document.getElementById("weather");
  x.innerHTML = "fetching weather...";
  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    x.innerHTML = "just a sec...";
    getweather = async () => {
      response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=d2bbc1c33f20a76b7b91d25f42acc8e4&units=metric`
      );
      json = await response.json();
      x.innerHTML = json.main.temp + "&#176" + "C";
      y.innerHTML = json.weather[0].description;
      var sunrise = json.sys.sunrise;
      var sunset = json.sys.sunset;
      console.log(sunrise);
      setTimeout(setSunPosition(sunrise, sunset), 1000);
    };
    getweather();
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    x.style.color = "yellow";
    x.style.fontSize = "1em";
    x.innerHTML =
      "<i class='fas fa-exclamation-triangle'></i> &nbsp;&nbsp;Please allow location";
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
}
//TRICKY PART
function setSunPosition(sunrise, sunset) {
  let sun = document.getElementById("sun");
  let cts = Math.round(new Date().getTime() / 1000); //current UNIX time stamp
  let val = (cts - sunrise) / ((sunset - sunrise) / window.innerWidth);
  console.log(val);
  sun.style.left = val + "px";
}
//Yet to resolve- auto position sun according to the current, sunrise and sunset time.
