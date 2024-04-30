import { useState, useEffect } from "react";
import LineChart from './LineChart';
import { Nodata } from '../noData/Nodata'
import combined from './fetchedUsageData.json';


const UsageDataChart = () => {

  const [bandwidth, setBandwidth] = useState([])
  const [sourceData, setSourceData] = useState([])
      let topApps = combined;
    useEffect(() => {
      setBandwidth(topApps)
    }, [])
 

  useEffect(() => {
    setSourceData(convertDataUsage())
  }, [bandwidth])

  function convertDataUsage() {
    var downJson = '{"name":"Download","values":[';
    var upJson = '{"name":"Upload","values":[';
    var timeTemp = '[';

    var maxY = 1;
    var minX = 0;
    var maxX = 1;

    var i = 0;
    var firstElement = true;

    bandwidth?.forEach(function (entry) {
      if (firstElement) {
        firstElement = false;
        minX = parseInt(entry.day) - 1;

        if (parseInt(entry.day) < 31 && parseInt(entry.day) > 1) {
          timeTemp += '{"time":"' + entry.year + '-' + entry.month + '-' + (parseInt(entry.day) - 1) + '"},';
        } else if (parseInt(entry.day) == 1) {
          if (parseInt(entry.month) == 3) {
            timeTemp += '{"time":"' + entry.year + '-2-28' + '"},';
          } else {
            timeTemp += '{"time":"' + entry.year + '-' + (parseInt(entry.month) - 1) + '-30' + '"},';
          }
        }
      } else {
        downJson += ',';
        upJson += ',';
        timeTemp += ',';
      }

      downJson += '{"time":"' + entry.year + '-' + entry.month + '-' + entry.day + '","value":' + formatBytes(entry.download) + '}';
      upJson += '{"time":"' + entry.year + '-' + entry.month + '-' + entry.day + '","value":' + formatBytes(entry.upload) + '}';
      timeTemp += '{"time":"' + entry.year + '-' + entry.month + '-' + entry.day + '"}';


      if (formatBytes(entry.download) > maxY) {
        maxY = formatBytes(entry.download);
      }
      if (formatBytes(entry.upload) > maxY) {
        maxY = formatBytes(entry.upload);
      }
      maxX = parseInt(entry.day) + 1;
    });

    downJson += ']}';
    upJson += ']}';
    timeTemp += ']';

    console.log("downJson");
    console.log(downJson);   
    console.log("upJson");
    console.log(upJson);    
    // console.log("timeTemp");
    console.log('timeTemp', timeTemp);

    var tmpJson = '[' + downJson + ',' + upJson + ']';

    //let connectedScatterXDomain = [minX, maxX];
    var connectedScatterXDomain = JSON.parse(timeTemp);
    var connectedScatterYDomain = [0, Math.ceil((maxY + 5) * 1.15)];

    let data = JSON.parse(tmpJson);
    let connectedScatterData = data; 

    function formatBytes(bytes, decimals = 2) {
      if (bytes === 0) return '0 Bytes';

      const k = 1024;
      const dm = decimals < 0 ? 0 : decimals;
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

      // calculate ALWAYS for MB
      const i = 2; //Math.floor(Math.log(bytes) / Math.log(k));

      return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)); // + ' ' + sizes[i];
    }

    return [{ 'scatterData': connectedScatterData, 'xDomain' : connectedScatterXDomain, 'yDomain': connectedScatterYDomain}];    
  }

  return (
    <div>
      {
        bandwidth?.length > 0
        ? <LineChart sourceData={sourceData} />
        : <Nodata />
      }   
    </div>
  )
}

export default UsageDataChart