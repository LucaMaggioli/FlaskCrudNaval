import { Box, Button } from "@material-ui/core";
import ShuffleRoundedIcon from "@material-ui/icons/ShuffleRounded";

export default function AvatarPicker({ image, onShuffle }) {
  return (
    <Box alignItems="center">
      <Button onClick={onShuffle}>
        <ShuffleRoundedIcon
          data-testid="shuffle-icon"
          style={{ color: "#FFFFFF", fontSize: 32 }}
        />
      </Button>
      <Box
        border={2}
        display="flex"
        borderColor="primary.main"
        borderRadius="50%"
        width="10em"
        height="10em"
        bgcolor="background.default"
      >
        <img src={image} alt="Avatar" />
      </Box>
    </Box>
  );
}
