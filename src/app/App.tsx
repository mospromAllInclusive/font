import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Box } from "@mui/material";
import { LeftSidebar, TableWorkArea } from "@widgets";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@shared/theme";
import { SnackbarProvider } from "notistack";

export const App = () => {
  return (
    <Router>
      <SnackbarProvider>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Box width="100%" height="100%" display="flex">
            <LeftSidebar minWidth="250px" maxWidth="300px" />

            <Box
              flex={1}
              overflow="hidden"
              width="100%"
              height="100%"
              sx={{ backgroundColor: "rgb(250 250 250 / 1)" }}
            >
              <Switch>
                <Route path="/table-item">
                  <TableWorkArea />
                </Route>
              </Switch>
            </Box>
          </Box>
        </ThemeProvider>
      </SnackbarProvider>
    </Router>
  );
};
