import React  from 'react';
import AppBar from '@mui/material/AppBar';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useStore from './store';
import {Box, Button, Container, Stack, Toolbar} from "@mui/material";
import { purple, yellow, cyan, amber, lightGreen } from '@mui/material/colors';
import MainLabComponent, {jsonData, resetStore} from "./MainLabComponent";

function App() {

    const handleExportToJson = () => {

        const data = jsonData();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const href = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = href;
        link.download = 'export.json';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleFileSelect = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const data = JSON.parse(e.target.result);
                resetStore(); // Reset current state before importing new data
                // Directly set the state to the imported data
                useStore.setState({
                    tact: data.tact,
                    sensors: data.sensors,
                    mechanisms: data.mechanisms,
                    sensorStates: data.sensorStates,
                    mechanismStates: data.mechanismStates,
                });
            };
            reader.readAsText(file);
        }
    };

    const defaultTheme = createTheme({
        palette: {
          primary:  {main: amber[500]},
          secondary:  {main: lightGreen[500]},
        },
      });

    return (
        <ThemeProvider theme={defaultTheme}>
            <AppBar position="relative">
                <Toolbar>Редагування циклограми</Toolbar>
            </AppBar>
            <main>
                <Box sx={{
                        bgcolor: 'background.paper',
                        pt: 8,
                        pb: 6,
                    }}>
                    <Container>
                        <Stack
                            sx={{ pt: 4 }}
                            direction="row"
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button variant="text" component="label">
                                Завантажити файл
                                <input
                                    type="file"
                                    hidden
                                onChange={handleFileSelect}/>
                            </Button>
                            <Button variant="text" onClick={handleExportToJson}>Експорт</Button>
                            <Button variant="text" onClick={resetStore}>Очистити</Button>
                        </Stack>
                        <MainLabComponent />
                    </Container>
                </Box>
            </main>
        </ThemeProvider>
    );
}

export default App;
