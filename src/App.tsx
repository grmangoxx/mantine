import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Router } from './Router'; // Import Router component
import './firebaseConfig';

function App() {
  return (
    <MantineProvider defaultColorScheme="dark">
      <Router /> {/* Use Router component */}
    </MantineProvider>
  );
}

export default App;
