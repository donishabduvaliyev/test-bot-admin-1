import { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Grid,
  Paper
} from "@mui/material";
import { useCart } from "../contex";

const daysOfWeek = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];

const StoredItems = () => {
  const [schedule, setSchedule] = useState({});
  const [isEmergencyOff, setIsEmergencyOff] = useState(false);
  const { backEndUrl } = useCart();

  // Fetch schedule from backend and set previous values
  useEffect(() => {
    axios.get(`${backEndUrl}/food/bot-schedule`)
      .then((response) => {
        if (response.data) {
          setSchedule(response.data.schedule || {});
          setIsEmergencyOff(response.data.isEmergencyOff || false);
        }
      })
      .catch((error) => console.error("Error fetching schedule:", error));
  }, []);

  // Handle time change
  const handleTimeChange = (day, field, value) => {
    setSchedule((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        [field]: value ? parseInt(value, 10) : 0
      }
    }));
  };

  // Save updates to backend
  const handleSave = () => {
    axios.post(`${backEndUrl}/food/bot-schedule/update`, { schedule, isEmergencyOff })
      .then(() => alert("Schedule updated successfully!"))
      .catch((error) => alert("Failed to update schedule."));
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Bot Schedule Management
        </Typography>

        {/* Emergency Toggle */}
        <FormControlLabel
          control={<Switch checked={isEmergencyOff} onChange={() => setIsEmergencyOff(!isEmergencyOff)} />}
          label="Emergency Shutdown"
        />

        {/* Schedule Form */}
        {daysOfWeek.map((day) => (
          <Grid container spacing={2} alignItems="center" key={day} sx={{ mb: 2 }}>
            <Grid item xs={4}>
              <Typography>{day}</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Ochilish"
                type="number"
                fullWidth
                size="small"
                value={schedule[day]?.startHour || ""}
                onChange={(e) => handleTimeChange(day, "startHour", e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Yopilish"
                type="number"
                fullWidth
                size="small"
                value={schedule[day]?.endHour || ""}
                onChange={(e) => handleTimeChange(day, "endHour", e.target.value)}
              />
            </Grid>
          </Grid>
        ))}

        {/* Save Button */}
        <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
          Save Changes
        </Button>
      </Paper>
    </Container>
  );
};

export default StoredItems;
