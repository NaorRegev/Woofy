
// ----------------------------------------------------------------------
import './global.css'
import {useScrollToTop} from "./hooks/use-scroll-to-top";
import Router from "./routes/sections";
import ThemeProvider from "./theme"
import {NotificationProvider} from "./provider/NotificationContext";

export default function App() {
  useScrollToTop();

  return (
      <ThemeProvider>
          <NotificationProvider>
        <Router />
            </NotificationProvider>
      </ThemeProvider>
  );
}
