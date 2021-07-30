import { Box, Button, Tooltip } from "@material-ui/core";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";

export default function AvatarPicker({ image, onShuffle }) {
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <Box
        border={2}
        display="flex"
        borderColor="primary.main"
        borderRadius="50%"
        width="10em"
        height="10em"
        bgcolor="background.default"
      >
        <img height="100%" src={image} alt="Avatar" />
      </Box>
      <Tooltip title="Swap Avatar" placement="right-end">
        <Button
          onClick={onShuffle}
          variant="contained"
          color="primary"
          style={{
            borderRadius: "50%",
            height: "50px",
            width: "50px",
            position: "relative",
            right: "3em",
          }}
        >
          <ShuffleRoundedIcon
            data-testid="shuffle-icon"
            style={{ color: "#FFFFFF", fontSize: "32px" }}
          />
        </Button>
      </Tooltip>
    </Box>
  );
}
