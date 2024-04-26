import React from "react";
import "./App.css";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Typography, TextField, Button } from "@mui/material";

function App() {
  const [make, setMake] = React.useState("");
  const [model, setModel] = React.useState("");
  const [year, setYear] = React.useState("");
  const [kilometers, setKilometers] = React.useState("");
  const [fuelType, setFuelType] = React.useState("");
  const [transmission, setTransmission] = React.useState("");
  const [owner, setOwner] = React.useState("");
  const [mileage, setMileage] = React.useState("");
  const [engine, setEngine] = React.useState("");
  const [power, setPower] = React.useState("");
  const [seat, setSeat] = React.useState("");

  const makes = [
    "Toyota",
    "Honda",
    "Ford",
    "Maruti",
    "Hyundai",
    "Tata",
    "Mahindra",
    "Volkswagen",
    "Audi",
    "BMW",
    "Mercedes",
  ];

  const models = [
    "Corolla",
    "Civic",
    "Mustang",
    "Swift",
    "Sonata",
    "Nexon",
    "Scorpio",
    "Polo",
    "A4",
    "X1",
    "C-Class",
    "Endeavour",
    "Creta",
    "Harrier",
    "Ertiga",
    "City",
    "Tiguan",
    "Q3",
    "5 Series",
    "GLC",
    "Innova",
    "Figo",
    "Verna",
    "Altroz",
    "Thar",
    "Passat",
    "A6",
    "X3",
    "E-Class",
    "Fortuner",
    "Aspire",
    "Elantra",
    "Safari",
    "Vitara",
    "WR-V",
    "Ameo",
    "A3",
    "7 Series",
    "GLE",
    "Yaris",
    "Ranger",
    "Santro",
    "Tigor",
    "S-Cross",
    "BR-V",
    "T-Roc",
    "Q7",
    "X5",
    "GLA",
    "Camry",
    "Venue",
    "Tiago",
    "XUV300",
    "Vento",
    "A5",
    "3 Series",
    "Innova Crysta",
    "EcoSport",
  ];

  const miles = [
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
  ];

  const engines = [
    "1000",
    "1500",
    "2000",
    "2500",
    "3000",
    "3500",
    "4000",
    "4500",
    "5000",
  ];

  const powers = ["50", "100", "150", "200", "300", "350", "400"];

  const seats = ["4", "5", "6", "7"];

  const handleMakeChange = (event: SelectChangeEvent) => {
    setMake(event.target.value as string);
  };

  const handleModelChange = (event: SelectChangeEvent) => {
    setModel(event.target.value as string);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };

  const handleFuelTypeChange = (event: SelectChangeEvent) => {
    setFuelType(event.target.value as string);
  };

  const handleTransmissionChange = (event: SelectChangeEvent) => {
    setTransmission(event.target.value as string);
  };

  const handleOwnerChange = (event: SelectChangeEvent) => {
    setOwner(event.target.value as string);
  };

  const handleKilometersChange = (event: any) => {
    setKilometers(event.target.value);
  };

  const handleMileageChange = (event: any) => {
    setMileage(event.target.value);
  };

  const handleEngineChange = (event: any) => {
    setEngine(event.target.value);
  };

  const handlePowerChange = (event: any) => {
    setPower(event.target.value);
  };

  const handleSeatChange = (event: any) => {
    setSeat(event.target.value);
  };

  const resetData = () => {
    setMake("");
    setModel("");
    setYear("");
    setKilometers("");
    setFuelType("");
    setTransmission("");
    setOwner("");
    setMileage("");
    setEngine("");
    setPower("");
    setSeat("");
    setResponseData(null);
  };

  const [responseData, setResponseData] = React.useState<{
    hello: string;
    predicted_car_price: number;
  } | null>(null);

  function convertToDollars(input: number) {
    // const f = parseFloat(inputString);
    return "$" + input.toFixed(2) + " (RUPEES)";
  }

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        body: JSON.stringify({
          make,
          model,
          year,
          kilometers,
          fuelType,
          transmission,
          owner,
          mileage,
          engine,
          power,
          seat,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setResponseData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <Typography variant="h4" align="center" gutterBottom marginTop={"50px"}>
        Used Car Price Predictor
      </Typography>
      {responseData && (
        <div>
          {/* Render the JSON data in Typography components */}
          <Typography variant="h5">
            Predicted Car Price:{" "}
            {convertToDollars(responseData.predicted_car_price)}
          </Typography>
          {/* Render other JSON data similarly */}
        </div>
      )}
      <Box
        sx={{
          width: 300,
          // height: 500,
          outline: "3px solid grey",
          borderRadius: "5px",
          margin: "auto",
          marginTop: "50px",
          marginBottom: "50px",
          display: "block",
          padding: "20px",
        }}
      >
        <FormControl>
          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Make</InputLabel>
              <Select
                labelId="make-select-label"
                value={make}
                label="Make"
                onChange={handleMakeChange}
              >
                {makes.map((makeInput) => {
                  return <MenuItem value={makeInput}>{makeInput}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Model</InputLabel>
              <Select
                labelId="model-select-label"
                value={model}
                label="Model"
                onChange={handleModelChange}
              >
                {models.sort().map((modelInput) => {
                  return <MenuItem value={modelInput}>{modelInput}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Year</InputLabel>
              <Select
                labelId="year-select-label"
                value={year}
                label="Year"
                onChange={handleYearChange}
              >
                <MenuItem value={"2016"}>2016</MenuItem>
                <MenuItem value={"2017"}>2017</MenuItem>
                <MenuItem value={"2018"}>2018</MenuItem>
                <MenuItem value={"2019"}>2019</MenuItem>
                <MenuItem value={"2020"}>2020</MenuItem>
                <MenuItem value={"2021"}>2021</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <TextField
                id="outlined-basic"
                label="Kilometers Driven"
                variant="outlined"
                value={kilometers}
                onChange={handleKilometersChange}
                type="number"
              />
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Fuel Type</InputLabel>
              <Select
                labelId="year-select-label"
                value={fuelType}
                label="Fuel Type"
                onChange={handleFuelTypeChange}
              >
                <MenuItem value={"Petrol"}>Petrol</MenuItem>
                <MenuItem value={"Diesel"}>Diesel</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Transmission</InputLabel>
              <Select
                labelId="year-select-label"
                value={transmission}
                label="Transmission"
                onChange={handleTransmissionChange}
              >
                <MenuItem value={"Automatic"}>Automatic</MenuItem>
                <MenuItem value={"Manual"}>Manual</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Owner Type</InputLabel>
              <Select
                labelId="year-select-label"
                value={owner}
                label="Owner"
                onChange={handleOwnerChange}
              >
                <MenuItem value={"First"}>First</MenuItem>
                <MenuItem value={"Second"}>Second</MenuItem>
                <MenuItem value={"Third"}>Third</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Mileage km/l</InputLabel>
              <Select
                labelId="year-select-label"
                value={mileage}
                label="Mileage km/l"
                onChange={handleMileageChange}
              >
                {miles.map((mile) => {
                  return <MenuItem value={mile}>{mile}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Engine</InputLabel>
              <Select
                labelId="year-select-label"
                value={engine}
                label="Engine"
                onChange={handleEngineChange}
              >
                {engines.map((eg) => {
                  return <MenuItem value={eg}>{eg}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Power</InputLabel>
              <Select
                labelId="year-select-label"
                value={power}
                label="Power"
                onChange={handlePowerChange}
              >
                {powers.map((p) => {
                  return <MenuItem value={p}>{p}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </Box>

          <Box marginTop={"10px"} width={"200px"}>
            <FormControl sx={{ minWidth: "100%" }}>
              <InputLabel>Seats</InputLabel>
              <Select
                labelId="year-select-label"
                value={seat}
                label="Seat"
                onChange={handleSeatChange}
              >
                {seats.map((s) => {
                  return <MenuItem value={s}>{s}</MenuItem>;
                })}
              </Select>
            </FormControl>
            {responseData ? (
              <Button
                sx={{ margin: "10px" }}
                variant="contained"
                onClick={resetData}
              >
                Reset
              </Button>
            ) : (
              <Button
                sx={{ margin: "10px" }}
                variant="contained"
                onClick={fetchData}
                disabled={
                  make === "" ||
                  model === "" ||
                  year === "" ||
                  kilometers === "" ||
                  fuelType === "" ||
                  transmission === "" ||
                  owner === "" ||
                  mileage === "" ||
                  engine === "" ||
                  power === "" ||
                  seat === ""
                }
              >
                How Much Does My Car Cost?
              </Button>
            )}
          </Box>
        </FormControl>
      </Box>
    </div>
  );
}

export default App;
