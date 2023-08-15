import { useState } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useTheme from "../hooks/useTheme";

export default function Switcher() {
    const [colorTheme, setTheme] = useTheme();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };

    return (
        <>
            <DarkModeSwitch
                // style={{ marginBottom: "2rem" }}
                checked={darkSide}
                onChange={toggleDarkMode}
                className="ml-2"
                size={40}
            />
        </>
    );
}
