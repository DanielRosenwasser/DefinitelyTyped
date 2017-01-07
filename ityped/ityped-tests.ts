import { init, Configuration } from "ityped";

const config: Configuration = {
    strings: [
        "Strings!",
    ],
    typeSpeed: 120,
    loop: true
};

init("#selector", config);

init("#anotherSelector", {
    loop: false
});

init("#anotherOne", {});

init("#withCallback", {
    backSpeed: 100,
    cursorChar: "_",
    showCursor: true,
    onFinished() {
        console.log("Done typing.");
    }
});