import React from 'react';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Box from '@material-ui/core/Box';
import { Button, Typography } from '@material-ui/core';
import weatherIcon from "./assets/images/weather.png"
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import cityList from "./assets/cityData/cityList.json";
import { Link } from 'react-router-dom';
const ContentCard = styled(Card)`
    min-width: 360px;
    max-width: 400px;
    padding: 5vh;
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 28px rgba(0,0,0,0.22)
`

const CardImage = styled(CardMedia)`
    width: 100%;
    padding-top: 70%;
`

const OuterContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
`

function countryToFlag(isoCode) {
    return typeof (String.fromCodePoint) !== 'undefined'
        ? isoCode
            .toUpperCase()
            .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
        : isoCode;
}

const useStyles = makeStyles({
    option: {
        fontSize: 15,
        '& > span': {
            marginRight: 10,
            fontSize: 18,
        },
    },
});

const cities = cityList
const filterOptions = createFilterOptions({
    matchFrom: 'start',
    limit: 150,
    stringify: option => option.name
});



function CityContainer(props) {

    const classes = useStyles();

    return (
        <OuterContainer >
            <ContentCard>
                <CardHeader
                    titleTypographyProps={{ variant: 'h4' }}
                    title="React Weather App"
                />

                <CardContent>
                    <CardImage
                        image={weatherIcon}
                        title="Weather"
                    />
                    <Box mt={3}>
                        <Typography variant='h4' align="center">Select The City</Typography>
                        <Box mt={2}>
                            <Autocomplete
                                id="city"
                                value={cities.name}
                                getOptionSelected={(option, value) => option.country === value.country}
                                onChange={(e) => {
                                    // console.log(e.target)
                                    if (e.target.innerText) {
                                        props.updateCity(e.target.innerText.slice(5, e.target.innerText.indexOf("(") - 1))
                                    }
                                }}
                                style={{ width: 300 }}
                                options={cities}
                                filterOptions={filterOptions}
                                classes={{
                                    option: classes.option,
                                }}
                                autoHighlight
                                disableClearable
                                getOptionLabel={(option) => option.name}
                                renderOption={(option) => (
                                    <React.Fragment>
                                        <span>{countryToFlag(option.country)}</span>
                                        {option.name} ({option.country})
                                    </React.Fragment>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Choose a City"
                                        variant="outlined"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password',
                                        }}
                                    />
                                )}
                            />
                        </Box>
                    </Box>
                    <Box textAlign="center" mt={2}>
                        <Button color="primary" variant="contained" component={Link} to="/weather-app/seeWeather" >Check Weather</Button>
                    </Box>
                </CardContent>
            </ContentCard>
        </OuterContainer>
    );
}

export default CityContainer;
