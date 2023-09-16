import React, { useEffect, useRef, useState } from "react";
import styles from "./mappage.module.css";
import logo from "../../assets/wwlogo.png";

import mapboxgl from "mapbox-gl"; // Import mapbox-gl library
import geojsonsample from "./sample2.json";
import './mapbottom.css'
// export default Home;
// import sampledata from "./sample.json";

mapboxgl.accessToken =
    "pk.eyJ1IjoidmlzaGlzdGIiLCJhIjoiY2wydXFxNXA4MDRrazNrbXBjZGdndDZzdiJ9.iPLdTCf_wJLZ6TdNGo5Idw";

function Mappage() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [linecolor, setLineColor] = useState("red");

    useEffect(() => {
        if (!map.current) {
            map.current = new mapboxgl.Map({
                container: mapContainer.current,
                style: "mapbox://styles/mapbox/streets-v12",
                center: [76.3665546026431, 30.353857389886674],
                zoom: 16.5,
            });

            map.current.on("load", () => {
                geojsonsample.forEach((geojsonEntry, index) => {
                    map.current.addSource(`line-${index}`, {
                        type: "geojson",
                        data: geojsonEntry,
                    });

                    map.current.addLayer({
                        type: "line",
                        source: `line-${index}`,
                        id: `line-background-${index}`,
                        paint: {
                            "line-color": "",
                            "line-width": 6,
                            "line-opacity": 0.4,
                        },
                    });

                    map.current.addLayer({
                        type: "line",
                        source: `line-${index}`,
                        id: `line-dashed-${index}`,
                        paint: {
                            "line-color": `${geojsonEntry.linecolor}`,
                            "line-width": 6,
                            "line-dasharray": [0, 4, 3],
                        },
                    });

                    animateDashArray(index);
                });
            });
        }
    }, [linecolor]);

    const animateDashArray = (index) => {
        const dashArraySequence = [
            [0, 4, 3],
            [0.5, 4, 2.5],
            [1, 4, 2],
            [1.5, 4, 1.5],
            [2, 4, 1],
            [2.5, 4, 0.5],
            [3, 4, 0],
            [0, 0.5, 3, 3.5],
            [0, 1, 3, 3],
            [0, 1.5, 3, 2.5],
            [0, 2, 3, 2],
            [0, 2.5, 3, 1.5],
            [0, 3, 3, 1],
            [0, 3.5, 3, 0.5],
        ];

        let step = 0;

        function animateDashArrayStep(timestamp) {
            const newStep = parseInt(
                (timestamp / 50) % dashArraySequence.length
            );

            if (newStep !== step) {
                map.current.setPaintProperty(
                    `line-dashed-${index}`,
                    "line-dasharray",
                    dashArraySequence[step]
                );
                step = newStep;
            }

            requestAnimationFrame(animateDashArrayStep);
        }

        animateDashArrayStep(0);
    };

    const changeLineColor = (newColor) => {
        setLineColor(newColor);
    };

    return (
        <div className={styles.pagewrapper}>
            <div style={{ width: "100%" }}>
                <div ref={mapContainer} className={styles.mapContainer} />
            </div>
        </div>

    );
}

export default Mappage;
