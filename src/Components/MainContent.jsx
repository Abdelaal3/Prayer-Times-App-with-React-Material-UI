import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Prayer from "./Prayer";
import alzohr from "../assets/Zohr.jpg";
import alfagr from "../assets/Fagr.jpg";
import AlAsr from "../assets/Asr.jpg";
import maghrib from "../assets/Maghrib.jpg";
import aishaa from "../assets/Aisha.jpg";
import moment from "moment";
import "moment/dist/locale/ar-ly";

moment.locale("ar-ly");

// MUI //
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
// MUI //

export default function MainContent() {
  // State //

  const [times, setTimes] = useState({
    Fajr: "04:25",
    Dhuhr: "13:01",
    Asr: "16:38",
    Sunset: "19:55",
    Maghrib: "19:55",
    Isha: "21:25",
  });

  const [city, setCity] = useState({
    displayName: "القاهرة",
    ApiName: "cairo",
  });

  const [date, setDate] = useState("");

  const [nextPrayTimeIndex, setNextPrayTimeIndex] = useState("2");

  const [timer, setTimer] = useState("");
  const [today, setToday] = useState("");

  // === State === //

  // ARR //
  const AvailableCity = [
    {
      displayName: "القاهرة",
      ApiName: "cairo",
    },
    { displayName: "الاسكندرية", ApiName: "alexandria" },
    { displayName: "المنصورة", ApiName: "mansora" },
  ];

  const PraysARR = [
    { Key: "Fajr", displayName: "الفجر" },
    { Key: "Dhuhr", displayName: "الظهر" },
    { Key: "Asr", displayName: "العصر" },
    { Key: "Maghrib", displayName: "المغرب" },
    { Key: "Isha", displayName: "العشاء" },
  ];
  // === ARR === //

  // API Req //
  useEffect(() => {
    const SelectedCity = city.ApiName;
    axios
      .get(
        `https://api.aladhan.com/v1/timingsByCity?country=EGY&city=${SelectedCity}`
      )
      .then((response) => {
        const times = response.data.data.timings;

        setTimes(times);
      })
      .catch((error) => {});

    const Date = moment().format(" Do MMMM YYYY | h:mm a");
    setDate(Date);
  }, [city]);

  // ===  API Req === //

  // HandleChange //

  const handleChange = (e) => {
    const CityObject = AvailableCity.find((c) => {
      return c.ApiName == e.target.value;
    });
    setCity(CityObject);
  };

  // ===  HandleChange === //

  const counterTime = () => {
    const momentNow = moment();

    let nextPray = 2;

    let fajrMoment = moment(times["Fajr"], "HH:mm").set({
      year: momentNow.year(),
      month: momentNow.month(),
      date: momentNow.date(),
    });

    const duhurMoment = moment(times["Dhuhr"], "HH:mm").set({
      year: momentNow.year(),
      month: momentNow.month(),
      date: momentNow.date(),
    });

    const asrMoment = moment(times["Asr"], "HH:mm").set({
      year: momentNow.year(),
      month: momentNow.month(),
      date: momentNow.date(),
    });

    const maghribMoment = moment(times["Maghrib"], "HH:mm").set({
      year: momentNow.year(),
      month: momentNow.month(),
      date: momentNow.date(),
    });

    const ishaMoment = moment(times["Isha"], "HH:mm").set({
      year: momentNow.year(),
      month: momentNow.month(),
      date: momentNow.date(),
    });

    if (momentNow.isAfter(fajrMoment) && momentNow.isBefore(duhurMoment)) {
      nextPray = 1;
    } else if (
      momentNow.isAfter(duhurMoment) &&
      momentNow.isBefore(asrMoment)
    ) {
      nextPray = 2;
    } else if (
      momentNow.isAfter(asrMoment) &&
      momentNow.isBefore(maghribMoment)
    ) {
      nextPray = 3;
    } else if (
      momentNow.isAfter(maghribMoment) &&
      momentNow.isBefore(ishaMoment)
    ) {
      nextPray = 4;
    } else {
      // بعد العشاء → الفجر بتاع بُكرة
      fajrMoment.add(1, "day");
      nextPray = 0;
    }
    setNextPrayTimeIndex(nextPray);

    const nextPrayObject = PraysARR[nextPray];

    const NextPrayTimer = times[nextPrayObject.Key];

    let RemaingTime = moment(NextPrayTimer, "hh:mm").diff(momentNow);

    if (RemaingTime < 0) {
      const midnightDiff = moment("23:59:59", "hh:mm:ss").diff(momentNow);
      const fajrToMidnightDiff = nextPrayerTimeMoment.diff(
        moment("00:00:00", "hh:mm:ss")
      );

      const totalDiffernce = midnightDiff + fajrToMidnightDiff;

      RemaingTime = totalDiffernce;
    }

    const durationRemaingTime = moment.duration(RemaingTime);

    setTimer(
      `${durationRemaingTime.hours()} : ${durationRemaingTime.minutes()} : ${durationRemaingTime.seconds()} `
    );
  };

  useEffect(() => {
    let interval = setInterval(() => {
      counterTime();
    }, 1000);

    const t = moment();
    setToday(t.format("MMM Do YYYY | h:mm"));

    return () => {
      clearInterval(interval);
    };
  }, [times]);

  return (
    <div style={{ width: "100%" }}>
      {/* Top Row */}
      <Grid
        container
        sx={{
          justifyContent: "space-between",
          direction: { xs: "row", sm: "rtl" },
        }}
      >
        <Grid xs={6}>
          <div>
            <h2>{date}</h2>
            <h1> {city.displayName} </h1>
          </div>
        </Grid>
        <Grid xs={6}>
          <div>
            <h2>متبقي حتى صلاة {PraysARR[nextPrayTimeIndex].displayName}</h2>
            <h1 style={{ direction: "ltr" }}>{timer}</h1>
          </div>
        </Grid>
      </Grid>
      {/* === Top Row ===  */}
      <Divider sx={{ borderColor: "white", opacity: "0.1" }} />
      {/* Praying Times */}

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ paddingTop: 5, justifyContent: "space-around" }}
      >
        <Prayer
          title="الفجر"
          img={alfagr}
          time={moment(times.Fajr, "HH:mm").format("hh:mm A")}
        />
        <Prayer
          title="الظهر"
          img={alzohr}
          time={moment(times.Dhuhr, "HH:mm").format("hh:mm A")}
        />
        <Prayer
          title="العصر"
          img={AlAsr}
          time={moment(times.Asr, "HH:mm").format("hh:mm A")}
        />
        <Prayer
          title="المغرب"
          img={maghrib}
          time={moment(times.Maghrib, "HH:mm").format("hh:mm A")}
        />
        <Prayer
          title="العشاء"
          img={aishaa}
          time={moment(times.Isha, "HH:mm").format("hh:mm A")}
        />
      </Stack>
      {/* === Praying Times === */}
      <Stack direction="row" justifyContent={"center"} sx={{ marginTop: 5 }}>
        <FormControl
          sx={{
            width: { xs: "80%", sm: "20%" },
            marginBottom: { xs: "20px", sm: "5px" },
            boxSizing: "border-box",
          }}
        >
          <InputLabel id="demo-simple-select-label">المدينة</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={city.ApiName}
            label="المدينة"
            onChange={handleChange}
          >
            {AvailableCity.map((city) => {
              return (
                <MenuItem key={city.ApiName} value={city.ApiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
    </div>
  );
}
