import { useState, useEffect } from "react";
import TreeDiagram from "./TreeDiagram";
import { Nodata } from "../noData/Nodata";

import combined from "./fetchedCombinedData.json";

const UserAvtivityTreeChart = () => {
  const [topsUsersApps, setTopsUsersApps] = useState([]);
  const [sourceData, setSourceData] = useState([]);

  let topApps = combined;

  useEffect(() => {
    setTopsUsersApps(topApps);
  }, []);

  useEffect(() => {
    setSourceData(convertTreeData());
  }, [topsUsersApps]);

  function convertTreeData() {
    var multiArr = [];

    var i = 0;
    topsUsersApps?.forEach(function (entry) {
      if (multiArr[entry.user] === undefined) {
        multiArr[entry.user] = [];
        if (multiArr[entry.user][entry.connector] === undefined) {
          multiArr[entry.user][entry.connector] = [];
          multiArr[entry.user][entry.connector].push(entry.application);
        } else {
          multiArr[entry.user][entry.connector].push(entry.application);
        }
      } else {
        if (multiArr[entry.user][entry.connector] === undefined) {
          multiArr[entry.user][entry.connector] = [];
          multiArr[entry.user][entry.connector].push(entry.application);
        } else {
          multiArr[entry.user][entry.connector].push(entry.application);
        }
      }
    });
    console.log("multiArr", multiArr);
    const companyId = `demonstration.portal.transientxuat.deloitte.com`;
    const company = companyId.split(".");

    var tmpJsonTree = "";
    tmpJsonTree =
      '{"name":"' + company[0] + '", "color":"#86bc25", "children":[';

    var firstElement = true;
    var firstFlag = true;
    var firstFlagConnector = true;
    for (var key in multiArr) {
      if (key != "unpack" && key != "unique") {
        if (firstElement) {
          firstElement = false;
        } else {
          tmpJsonTree += ",";
        }

        console.log(multiArr[key]);
        tmpJsonTree += '{"name":"' + key + '", "color":"blue", "children":[';

        firstFlagConnector = true;
        for (var key2 in multiArr[key]) {
          if (multiArr[key][key2].length != 0) {
            console.log(multiArr[key][key2]);
            if (firstFlagConnector) {
              firstFlagConnector = false;
            } else {
              tmpJsonTree += ",";
            }
            tmpJsonTree +=
              '{"name":"' +
              fixText(key2, "connector") +
              '", "color":"orange", "children":[';

            firstFlag = true;
            multiArr[key][key2].forEach(function (app) {
              if (firstFlag) {
                firstFlag = false;
              } else {
                tmpJsonTree += ",";
              }
              tmpJsonTree +=
                '{"name":"' +
                fixText(app, "application") +
                '", "color":"green" }';
            });
            tmpJsonTree += "]}";
          }
        }
        tmpJsonTree += "]}";
      }
    }
    tmpJsonTree += "]}";

    let data = JSON.parse(tmpJsonTree);
    let treeDiagramData = data;
    let treeDiagramNoData = false;

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

    return treeDiagramData;
  }
  console.log("sourceData", sourceData);

  return (
    <>
      {topsUsersApps?.length > 0 ? (
        <TreeDiagram sourceData={sourceData} />
      ) : (
        <Nodata />
      )}
    </>
  );
};

export default UserAvtivityTreeChart;
