import { useState, useEffect } from "react";
import { BubbleChart } from "./BubbleChartD3";
import { Nodata } from "../noData/Nodata";

// ============= local var ==============
import combined from "./fetchedTopAppsData.json";

const TopAppsChart = () => {
  const [topApps, setTopApps] = useState([]);
  const [sourceData, setSourceData] = useState([]);


  let topApps2 = combined;

    useEffect(() => {
      setTopApps(topApps2)
    }, [])

  useEffect(() => {
    setSourceData(convertBubbleData());
  }, [topApps]);

  function convertBubbleData() {
    let bubbleJson = '{"name":"bubble","children":[';

    var firstElement = true;
    topApps?.forEach(function (entry) {
      if (firstElement) {
        firstElement = false;
      } else {
        bubbleJson += ",";
      }
      bubbleJson +=
        '{"name":"' +
        fixText(entry.label, "application") +
        '","children":[{"name":"' +
        fixText(entry.label, "application") +
        '","size":' +
        entry.data +
        "}]}";
    });
    bubbleJson += "]}";

    let data = JSON.parse(bubbleJson);
    let bubbleChartData = data;

    function fixText(text, type) {
      var returnText = text;
      if (type == "application") {
        // var t = 'TCP incoming.telemetry.mozilla.org';
        var t = text.split(":");
        var t2 = t[0].split(" ");
        if (t2[1] !== undefined) {
          returnText = t2[1];
        } else {
          returnText = t[0];
        }

        returnText = text;
      } else if (type == "connector") {
        // var t = 'Connector: Connector10';
        var t = text.split(":");
        var t2;
        if (t[1] !== undefined) {
          t2 = t[1].trim(); //split(' ');
        } else {
          t2 = t[0].trim(); //split(' ');
        }
        returnText = t2;
      }
      return returnText;
    }

    console.log(bubbleChartData)
    return bubbleChartData;
  }

  return (
    <div>
      {/* {sourceData */}
      {topApps?.length > 0 ? (
        <BubbleChart sourceData={sourceData} />
      ) : (
        <Nodata />
      )}
    </div>
  );
};

export default TopAppsChart;
