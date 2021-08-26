import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Grid from '@material-ui/core/Grid';
import MoreDetails from './MoreDetailsContainer';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';

import sunriseIcon from "./assets/images/sunrise.png"
import sunsetIcon from "./assets/images/sunset.png"
import humidityIcon from "./assets/images/humidity.png"
import pressureIcon from "./assets/images/pressure.png"
import visibilityIcon from "./assets/images/visibility.png"
import windIcon from "./assets/images/wind.png"
import minTempIcon from "./assets/images/min-temp.png"
import maxTempIcon from "./assets/images/max-temp.png"
import { Button } from '@material-ui/core';
import moment from 'moment';

import { Link, Redirect } from 'react-router-dom';
const ContentCard = styled(Card)`
    min-width: 360px;
    max-width: 400px;
    padding: 5vh;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 28px rgba(0,0,0,0.22)
`

const CardImage = styled(CardMedia)`
    width: 60%;
    padding-top: 40%;
`

const OuterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

const Temperature = styled.div`
    display: flex;
    justify-content: center;
`

const Weather = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function WeatherContainer(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [date, setDate] = useState(moment().format("LL"))
  const [currentWeather, setCurrentWeather] = useState("")
  const [iconURL, setIconURL] = useState("")
  const [temperature, setTemperature] = useState("")
  const [minTemperature, setMinTemperature] = useState("")
  const [maxTemperature, setMaxTemperature] = useState("")
  const [country, setCountry] = useState("")
  const [pressure, setPressure] = useState("")
  const [humidity, setHumidity] = useState("")
  const [windSpeed, setWindSpeed] = useState("")
  const [visibility, setVisibility] = useState("")
  const [sunriseTime, setSunriseTime] = useState(moment().format("LT"))
  const [sunsetTime, setSunsetTime] = useState(moment().format("LT"))

  const [redirect, setRedirect] = useState(null)

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  useEffect(() => {
    const fetchData = async () => {
      if(props.city === ""){
        // alert("inside if")
        setRedirect("/weather-app/")
      }
      else{
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&units=metric&appid=67827f88c0f518a291f829bf3eb95f19`)
      const jsonResponse = await response.json()
      setDate(moment((jsonResponse.dt * 1000 + (jsonResponse.timezone * 1000))).format("LL"))
      setCurrentWeather(jsonResponse.weather[0].main)
      setIconURL(`http://openweathermap.org/img/wn/${jsonResponse.weather[0].icon}@2x.png`)
      setTemperature(jsonResponse.main.temp)
      setMinTemperature(jsonResponse.main.temp_min)
      setMaxTemperature(jsonResponse.main.temp_max)
      setCountry(jsonResponse.sys.country)
      setPressure(jsonResponse.main.pressure)
      setHumidity(jsonResponse.main.humidity)
      setWindSpeed(jsonResponse.wind.speed)
      setVisibility(jsonResponse.visibility)
      setSunriseTime(moment(jsonResponse.sys.sunrise * 1000).format("LT"))
      setSunsetTime(moment(jsonResponse.sys.sunset * 1000).format("LT"))
      }
    }
    fetchData()
  },[])

  if(redirect){
      return <Redirect to={redirect}/>
  }

  return (
    
    <OuterContainer >
      <ContentCard>
        <Box textAlign="right">
          <Button variant="contained" component={Link} to="/weather-app/" onClick={()=>props.updateCity("")} >Go Back</Button>
        </Box>
        <CardHeader
          avatar={
            <Box mb={3}>
              <LocationOnIcon fontSize="large" />
            </Box>
          }
          titleTypographyProps={{ variant: 'h3' }}
          title={props.city + ","+country}
          subheaderTypographyProps={{ variant: 'h6' }}
          subheader={date}
        />

        {/* <Typography>Rain</Typography> */}
        <CardContent>


          <Weather>
            <Typography variant="h5" component="p">
              {currentWeather}
            </Typography>
            <CardImage
              image={iconURL}
              title={currentWeather}
            />
          </Weather>

          <Temperature>
            <Typography variant="h2" component="p" fontWeight="fontWeightBold">
              {temperature} °C
            </Typography>
          </Temperature>

        </CardContent>
        <CardActions disableSpacing>
          <Typography>More Details</Typography>
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Box ml={5}>
                  <MoreDetails url={minTempIcon} title="Minimum Temperature" value={minTemperature +" °C"}   />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box ml={5}>
                  <MoreDetails url={maxTempIcon} title="Maximum Temperature" value={maxTemperature + " °C"}  />
                </Box>
              </Grid>
              <Grid item xs={6}>
                <MoreDetails url={sunriseIcon} title="Sunrise" value={sunriseTime + " IST"} />
              </Grid>
              <Grid item xs={6}>
                <MoreDetails url={sunsetIcon} title="Sunset" value={sunsetTime +" IST"} />
              </Grid>
              <Grid item xs={6}>
                <MoreDetails url={pressureIcon} title="Pressure" value={pressure + " hPa"} />
              </Grid>
              <Grid item xs={6}>
                <MoreDetails url={humidityIcon} title="Humidity" value={humidity + " %"} />
              </Grid>
              <Grid item xs={6}>
                <MoreDetails url={windIcon} title="Wind" value={windSpeed + " m/sec"} />
              </Grid>
              <Grid item xs={6}>
                <MoreDetails url={visibilityIcon} title="Visibility" value={visibility} />
              </Grid>
            </Grid>
          </CardContent>
        </Collapse>
      </ContentCard>
    </OuterContainer>
  );
}

