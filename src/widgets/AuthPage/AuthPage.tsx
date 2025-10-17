import { Box } from "@mui/material";
import { LogInForm } from "@features";
import { Background } from "@entity";

export const AuthPage = () => {
  return (
    <Box
      width="100%"
      height="100%"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgcolor="rgb(211, 160, 203, 0.4)"
    >
      <Background />
      <LogInForm />
    </Box>
  );
};
