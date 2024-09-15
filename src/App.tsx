import { FC } from "react";
import Home from "./components/home/Home";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import FontAwesome CSS globally
config.autoAddCss = true; // Explicitly enable auto-adding of CSS


const App: FC = () => {
    return (<Home />);
}

export default App;