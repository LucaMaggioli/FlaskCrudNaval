import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { Box, TextField, Button } from "@material-ui/core";

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gridGap: "20px",
};
const columnStyle = {
  display: "flex",
  flexDirection: "column",
};
export default function UserPage() {
  return (
    <Box style={columnStyle}>
      <Box style={rowStyle}>
        <h1>Welcome to the battlenavalGame</h1>
        <AccessibilityNewIcon></AccessibilityNewIcon>
      </Box>
      <Box style={{ display: "flex", flexDirection: "column", gridGap: "5px" }}>
        <TextField
          id="standard-basic"
          variant="outlined"
          label="choose a Username"
        />
        <Button variant="contained">Play vs Ia</Button>
        <Button variant="contained">Play vs Player</Button>
      </Box>
    </Box>
  );
}
