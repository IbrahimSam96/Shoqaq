"use client"
import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxLanguage from '@mapbox/mapbox-gl-language';
import ReactDOMServer from 'react-dom/server';
import Image from 'next/image';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGV2amRlZWQiLCJhIjoiY2xpczBneWh6MTIydDNlazlmNmJ3M2twMiJ9.JXeq6EXsQdcleRgNzB76Lw';
mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js');

const Listings = {
  "features": [
    {
      "type": "Feature",
      "id": 1,
      "properties": {
        "title": " 2 Bedroom Unit",
        "description": "A Luxury unit in the heart of downtown Amman",
        "price": "$250",
        "id": 1,
      },
      "geometry": {
        "coordinates": [35.8447541, 32.0023618],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "id": 2,
      "properties": {
        "title": " 1 Bedroom Unit",
        "description": "A spacious 1 bedroom with city views",
        "price": "$350",
        "id": 2,
      },
      "geometry": {
        "coordinates": [35.8411112, 31.9971146],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "id": 3,
      "properties": {
        "title": " 3 Bedroom Unit",
        "description": "Luxurious 3 Bdr, located close from City mall ",
        "price": "$550",
        "id": 3,
      },
      "geometry": {
        "coordinates": [35.81308394, 31.99493461],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "id": 4,
      "properties": {
        "title": "Jackson Park",
        "description": "A lakeside park that was the site of the 1893 World's Fair",
        "price": "$350",
        "id": 4,
      },
      "geometry": {
        "coordinates": [35.83569087, 32.00001951],
        "type": "Point"
      }
    },
    {
      "type": "Feature",
      "id": 5,
      "properties": {
        "title": "Columbus Park",
        "description": "A large park in Chicago's Austin neighborhood",
        "price": "$750",
        "id": 5,
      },
      "geometry": {
        "coordinates": [35.81222175, 31.99402873],
        "type": "Point"
      }
    }
  ],
  "type": "ListingsCollection"
}

export default function Home() {

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(35.90719);
  const [lat, setLat] = useState(31.97182);
  const [zoom, setZoom] = useState(11.5);
  // Colors
  // '#07364B', // HOVER color
  // '#0097A7' // Normal color

  //
  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: 'mapbox://styles/mapbox/streets-v11',
  //     center: [lng, lat],
  //     zoom: zoom,
  //     hash: true,
  //     // bounds:[]
  //   });

  //   const language = new MapboxLanguage({
  //     defaultLanguage: 'en'
  //   });
  //   map.current.addControl(language);
  //   // Zoom Button
  //   map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

  //   map.current.on('load', () => {
  //     // Add a new source from our GeoJSON data and
  //     // set the 'cluster' option to true. GL-JS will
  //     // add the point_count property to your source data.
  //     map.current.addSource('listings', {
  //       type: 'geojson',
  //       data: Listings,
  //       cluster: true,
  //       clusterMaxZoom: 14, // Max zoom to cluster points on
  //       clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
  //     });
  //     // Setting up Clusters - Color scale styling based on size of Cluseters
  //     map.current.addLayer({
  //       id: 'clusters',
  //       type: 'circle',
  //       source: 'listings',
  //       filter: ['has', 'point_count'],
  //       paint: {
  //         // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
  //         // with three steps to implement three types of circles:
  //         //   * Blue, 20px circles when point count is less than 100
  //         //   * Yellow, 30px circles when point count is between 100 and 750
  //         //   * Pink, 40px circles when point count is greater than or equal to 750
  //         // [
  //         //   'step',
  //         //   ['get', 'point_count'],
  //         //   '#51bbd6',
  //         //   100,
  //         //   '#f1f075',
  //         //   750,
  //         //   '#f28cb1'
  //         // ],
  //         'circle-color': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           '#07364B', // Replace with the desired hover halo color
  //           '#0097A7' // Replace with the default halo color
  //         ],
  //         'circle-radius': [
  //           'step',
  //           ['get', 'point_count'],
  //           20,
  //           100,
  //           30,
  //           750,
  //           40
  //         ]
  //       }
  //     });
  //     // Adds hover effect on Cluster
  //     let clusterState = null;
  //     map.current.on('mouseenter', 'clusters', function (e) {
  //       console.log(e)
  //       clusterState = e.features[0].properties.cluster_id;
  //       map.current.getCanvas().style.cursor = 'pointer';
  //       map.current.setFeatureState(
  //         { source: 'listings', id: clusterState },
  //         { hover: true }
  //       );
  //     });
  //     // Removes hover effect on Cluster 
  //     map.current.on('mouseleave', 'clusters', function () {
  //       map.current.getCanvas().style.cursor = '';
  //       map.current.setFeatureState(
  //         { source: 'listings', id: clusterState },
  //         { hover: false }
  //       );
  //       clusterState = null
  //     });
  //     // Add Cluster Count to Clusters Circles 
  //     map.current.addLayer({
  //       id: 'cluster-count',
  //       type: 'symbol',
  //       source: 'listings',
  //       filter: ['has', 'point_count'],
  //       layout: {
  //         'text-field': ['get', 'point_count_abbreviated'],
  //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  //         'text-size': 12,
  //       },
  //       paint: {
  //         'text-color': 'white'
  //       }
  //     });
  //     // Unclustrered; Single Listing Styling
  //     map.current.addLayer({
  //       id: 'unclustered-point',
  //       type: 'symbol',
  //       source: 'listings',
  //       filter: ['!', ['has', 'point_count']],
  //       paint: {
  //         'text-color': 'white',
  //         'text-halo-width': 5, // Adjust the halo width as needed
  //         'text-halo-color': [
  //           'case',
  //           ['boolean', ['feature-state', 'hover'], false],
  //           '#07364B', // Replace with the desired hover halo color
  //           '#0097A7' // Replace with the default halo color
  //         ],
  //       },
  //       layout: {
  //         'text-field': ['get', 'price'],
  //         'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
  //         'text-size': 25,
  //         'text-offset': [0, 0.6], // Adjust the offset as needed
  //         'text-anchor': 'top',
  //         'text-allow-overlap': true
  //       },
  //     });

  //     let state = null

  //     // Adds hover effect to single listing
  //     map.current.on('mouseenter', 'unclustered-point', function (e) {
  //       state = e.features[0].properties.id;
  //       map.current.getCanvas().style.cursor = 'pointer';
  //       map.current.setFeatureState(
  //         { source: 'listings', id: state },
  //         { hover: true }
  //       );
  //     });
  //     // Removes hover effect on single listing 
  //     map.current.on('mouseleave', 'unclustered-point', function () {
  //       map.current.getCanvas().style.cursor = '';
  //       map.current.setFeatureState(
  //         { source: 'listings', id: state },
  //         { hover: false }
  //       );
  //       state = null
  //     });

  //     // Highlights Area
  //     // Adds Area Coordinates to Outline Data 
  //     map.current.addSource('Amman', {
  //       'type': 'geojson',
  //       'data': {
  //         'type': 'Feature',
  //         'geometry': {
  //           'type': 'Polygon',
  //           // These coordinates outline Amman. 31.856/36.13
  //           'coordinates': [
  //             ammanCoordinates
  //           ]
  //         }
  //       }
  //     })
  //     // Add a new layer to visualize the polygon.
  //     map.current.addLayer({
  //       'id': 'Amman',
  //       'type': 'fill',
  //       'source': 'Amman', // reference the data source
  //       'layout': {},
  //       'paint': {
  //         'fill-color': '#A9D7DC', // #0080ff blue color fill OPTION 2 #A9D7DC Light Blue 
  //         'fill-opacity': 0.5
  //       }
  //     });
  //     // Add a black outline around the polygon.
  //     map.current.addLayer({
  //       'id': 'outline',
  //       'type': 'line',
  //       'source': 'Amman',
  //       'layout': {},
  //       'paint': {
  //         'line-color': '#000',
  //         'line-width': 3
  //       }
  //     });

  //     // inspect a cluster on click
  //     map.current.on('click', 'clusters', (e) => {
  //       const features = map.current.queryRenderedFeatures(e.point, {
  //         layers: ['clusters']
  //       });
  //       const clusterId = features[0].properties.cluster_id;
  //       map.current.getSource('listings').getClusterExpansionZoom(
  //         clusterId,
  //         (err, zoom) => {
  //           if (err) return;

  //           map.current.easeTo({
  //             center: features[0].geometry.coordinates,
  //             zoom: zoom
  //           });
  //         }
  //       );
  //     });

  //     // When a click event occurs on a feature in
  //     // the unclustered-point layer, open a popup at
  //     // the location of the feature, with
  //     // description HTML from its properties.
  //     map.current.on('click', 'unclustered-point', (e) => {
  //       const coordinates = e.features[0].geometry.coordinates.slice();
  //       const price = e.features[0].properties.price;
  //       const tsunami = e.features[0].properties.description;

  //       const JSXTooltip = () => {
  //         return (
  //           <div onClick={() => {
  //             console.log('hey')
  //           }} className={`w-full grid shadow-md shadow-slate-500 rounded-[10px]`}>

  //             <span className={`flex`}>
  //               <div style={{ width: '120px', height: '120px', border: '1px solid #ccc', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
  //                 <Image
  //                   src="/Building.jpg"
  //                   alt="Building"
  //                   width={120}
  //                   height={120}
  //                 // className={`m-1`}
  //                 />
  //               </div>

  //               <span className={`grid ml-2 self-center flex-1`}>

  //                 <span className={`flex p-1 self-center `}>
  //                   <p className={`text-black text-base font-bold mr-auto`}>
  //                     {price}
  //                   </p>
  //                   <p className={`text-[grey] ml-auto`}>
  //                     5 days
  //                   </p>
  //                 </span>

  //                 <span className={`flex py-1 self-center `}>
  //                   <p className={`text-[grey] inline`}>
  //                     Address - 100 Harbour St.
  //                   </p>
  //                 </span>

  //                 <span className={`flex py-1 self-center `}>
  //                   <p className={`text-[grey] inline`}>
  //                     Overview - 1BD 1BA 0 Parking 800sqft
  //                   </p>
  //                 </span>

  //               </span>

  //             </span>

  //             <span className={`bg-[#F8F8F8] flex `}>

  //               <span className={`flex mx-auto`}>
  //                 <p className={`text-[#A0D6DB]`}>
  //                   Building Name
  //                 </p>
  //                 <p className={`text-[grey] ml-2`}>
  //                   1 For Rent
  //                 </p>
  //               </span>

  //             </span>

  //           </div>
  //         )
  //       }
  //       let htmlString = ReactDOMServer.renderToString(JSXTooltip())

  //       // Ensure that if the map is zoomed out such that
  //       // multiple copies of the feature are visible, the
  //       // popup appears over the copy being pointed to.
  //       while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
  //         coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
  //       }

  //       new mapboxgl.Popup()
  //         .setLngLat(coordinates)
  //         .setHTML(
  //           htmlString
  //         )
  //         .addTo(map.current);
  //     });

  //   });

  //   // Displays buildings in 3D
  //   map.current.on('style.load', () => {
  //     // Insert the layer beneath any symbol layer.
  //     const layers = map.current.getStyle().layers;
  //     const labelLayerId = layers.find(
  //       (layer) => layer.type === 'symbol' && layer.layout['text-field']
  //     ).id;

  //     // The 'building' layer in the Mapbox Streets
  //     // vector tileset contains building height data
  //     // from OpenStreetMap.
  //     map.current.addLayer(
  //       {
  //         'id': 'add-3d-buildings',
  //         'source': 'composite',
  //         'source-layer': 'building',
  //         'filter': ['==', 'extrude', 'true'],
  //         'type': 'fill-extrusion',
  //         'minzoom': 15,
  //         'paint': {
  //           'fill-extrusion-color': '#aaa',

  //           // Use an 'interpolate' expression to
  //           // add a smooth transition effect to
  //           // the buildings as the user zooms in.
  //           'fill-extrusion-height': [
  //             'interpolate',
  //             ['linear'],
  //             ['zoom'],
  //             15,
  //             0,
  //             15.05,
  //             ['get', 'height']
  //           ],
  //           'fill-extrusion-base': [
  //             'interpolate',
  //             ['linear'],
  //             ['zoom'],
  //             15,
  //             0,
  //             15.05,
  //             ['get', 'min_height']
  //           ],
  //           'fill-extrusion-opacity': 0.6
  //         }
  //       },
  //       labelLayerId
  //     );
  //   });

  //   // Clean up on unmount
  //   return () => map.current.remove();

  // }, []);


  return (

    <div className={`w-full h-full min-h-full grid grid-cols-7 grid-rows-[100px,500px,100px]`} >

      {/* <div ref={mapContainer} className={`map-container row-start-2 row-end-3 col-start-1 col-end-8 `} /> */}

      <div className={`row-start-2 row-end-3 col-start-1 col-end-8 max-w-[80px] grid grid-rows-[60px,auto] bg-[beige] z-[100]`}>
        <span className={`self-center justify-self-center `}>
          <ArrowForwardIosIcon sx={{color:'#0097A7'}} />
        </span>

      </div>
    </div>
  )
}


const JordanCoordinates = [
  [35.0017, 29.6052], [35.0195, 29.6167], [35.0327, 29.6307],
  [35.0324, 29.6502], [35.0298, 29.6713], [35.0297, 29.705],
  [35.0468, 29.767], [35.0497, 29.7872], [35.0468, 29.8021],
  [35.0513, 29.8209], [35.0808, 29.8723], [35.0776, 29.9505],
  [35.0984, 30.0226], [35.1758, 30.1191], [35.1445, 30.2395],
  [35.1635, 30.2762], [35.1601, 30.2962], [35.1665, 30.3134],
  [35.1887, 30.3347], [35.1919, 30.3466], [35.1866, 30.3622],
  [35.152, 30.4186], [35.156, 30.4322], [35.1698, 30.4493],
  [35.1767, 30.4672], [35.1993, 30.558], [35.2017, 30.5745],
  [35.2312, 30.6238], [35.2461, 30.6357], [35.2514, 30.658],
  [35.2759, 30.6967], [35.29, 30.7251], [35.2901, 30.7659],
  [35.2989, 30.7867], [35.3138, 30.8023], [35.333, 30.8082],
  [35.3381, 30.8284], [35.3331, 30.8449], [35.3334, 30.863],
  [35.3601, 30.9139], [35.3977, 30.9351], [35.415, 30.9488],
  [35.4151, 30.9695], [35.4069, 30.989], [35.4045, 31.0052],
  [35.4086, 31.0256], [35.4468, 31.0764], [35.4598, 31.1204],
  [35.4588, 31.136], [35.4538, 31.1568], [35.4458, 31.1715],
  [35.4012, 31.2231], [35.3898, 31.2445], [35.3949, 31.2646],
  [35.4551, 31.3593], [35.4715, 31.3996], [35.4751, 31.4198],
  [35.4763, 31.5297], [35.4783, 31.5743], [35.4995, 31.6364],
  [35.5303, 31.7196], [35.5557, 31.7585], [35.5434, 31.8169],
  [35.5513, 31.8359], [35.5408, 31.8501], [35.5506, 31.8665],
  [35.5332, 31.876], [35.5234, 31.9181], [35.5415, 31.933],
  [35.5478, 31.9686], [35.5311, 32.0], [35.5404, 32.0116],
  [35.5388, 32.0184], [35.5278, 32.0292], [35.5256, 32.0722],
  [35.5339, 32.0863], [35.5371, 32.104], [35.5512, 32.1203],
  [35.555, 32.1314], [35.5579, 32.1581], [35.5643, 32.183],
  [35.5727, 32.1963], [35.5755, 32.206], [35.5744, 32.2175],
  [35.5716, 32.2254], [35.5707, 32.2414], [35.5668, 32.2557],
  [35.5704, 32.2778], [35.5635, 32.2923], [35.5638, 32.2994],
  [35.5687, 32.311], [35.5608, 32.3288], [35.5616, 32.3369],
  [35.5648, 32.3439], [35.5676, 32.3588], [35.5652, 32.3647],
  [35.5578, 32.3725], [35.5597, 32.3904], [35.5679, 32.3898],
  [35.5583, 32.4035], [35.5593, 32.4051], [35.5668, 32.4069],
  [35.5686, 32.4107], [35.5657, 32.4332], [35.5774, 32.4364],
  [35.5749, 32.4496], [35.5783, 32.4522], [35.5832, 32.4524],
  [35.5857, 32.4573], [35.5837, 32.4606], [35.5754, 32.464],
  [35.5738, 32.4686], [35.5747, 32.4736], [35.587, 32.4925],
  [35.5882, 32.4976], [35.5863, 32.5003], [35.5789, 32.5028],
  [35.5725, 32.5152], [35.566, 32.5151], [35.5613, 32.5181],
  [35.5666, 32.5244], [35.5767, 32.5262], [35.5789, 32.5294],
  [35.5722, 32.5386], [35.5715, 32.5446], [35.5737, 32.5456],
  [35.5795, 32.5423], [35.5841, 32.5422], [35.5859, 32.5517],
  [35.5959, 32.5515], [35.5969, 32.5536], [35.5866, 32.5716],
  [35.5873, 32.5811], [35.592, 32.5904], [35.59, 32.5966],
  [35.5826, 32.6], [35.5803, 32.6046], [35.5818, 32.6195],
  [35.5787, 32.6226], [35.58, 32.6329], [35.5945, 32.6422],
  [35.6033, 32.6443], [35.6057, 32.6467], [35.6053, 32.6528],
  [35.6166, 32.6566], [35.6147, 32.6707], [35.6212, 32.6769],
  [35.6494, 32.6873], [35.6614, 32.6938], [35.6861, 32.6953],
  [35.6933, 32.6992], [35.7032, 32.7018], [35.7191, 32.7113],
  [35.7335, 32.7236], [35.7563, 32.7262], [35.7642, 32.7473],
  [35.7692, 32.7509], [35.7796, 32.7519], [35.8014, 32.7596],
  [35.8077, 32.7565], [35.8093, 32.7511], [35.8045, 32.7427],
  [35.8076, 32.7384], [35.817, 32.7396], [35.8202, 32.7346],
  [35.8263, 32.7311], [35.8351, 32.729], [35.8413, 32.7294],
  [35.8619, 32.7357], [35.8784, 32.7357], [35.8864, 32.7331],
  [35.9013, 32.7248], [35.9091, 32.7259], [35.9204, 32.7221],
  [35.9308, 32.7246], [35.9368, 32.7241], [35.9452, 32.7177],
  [35.948, 32.707], [35.9517, 32.7034], [35.9627, 32.697],
  [35.9746, 32.6969], [35.9827, 32.6906], [35.9829, 32.682],
  [35.9726, 32.6735], [35.9734, 32.6711], [35.983, 32.6651],
  [35.9936, 32.6614], [36.0108, 32.6628], [36.0197, 32.6619],
  [36.0329, 32.6579], [36.0363, 32.6543], [36.0392, 32.6425],
  [36.0388, 32.6308], [36.0349, 32.6071], [36.0363, 32.6039],
  [36.0589, 32.5878], [36.0704, 32.5758], [36.0844, 32.5491],
  [36.0887, 32.5367], [36.0908, 32.5179], [36.1106, 32.5231],
  [36.1338, 32.5239], [36.1647, 32.5222], [36.1784, 32.5183],
  [36.2007, 32.5285], [36.2056, 32.5284], [36.2178, 32.5218],
  [36.2577, 32.4929], [36.2961, 32.4705], [36.3365, 32.4427],
  [36.4006, 32.3872], [36.4097, 32.3822], [36.4636, 32.3773],
  [36.4802, 32.3734], [36.4928, 32.3675], [36.5033, 32.3591],
  [36.5207, 32.3549], [36.6704, 32.3423], [36.6921, 32.3391],
  [36.7133, 32.3252], [36.72, 32.3251], [36.7384, 32.3324],
  [36.8254, 32.3107], [36.8458, 32.3125], [36.8893, 32.3482],
  [36.9562, 32.3908], [37.0336, 32.4327], [37.5361, 32.7026],
  [38.4211, 33.1732], [38.7968, 33.3682], [38.818, 33.3057],
  [38.8288, 33.2582], [38.9938, 32.7753], [39.0379, 32.6409],
  [39.0535, 32.582], [39.0577, 32.5437], [39.0522, 32.5127],
  [39.0163, 32.4598], [39.0094, 32.4342], [39.0098, 32.4132],
  [39.0153, 32.3877], [39.0255, 32.3616], [39.0395, 32.3404],
  [39.0566, 32.3275], [39.0815, 32.3208], [39.104, 32.3203],
  [39.1989, 32.3281], [39.2233, 32.3259], [39.2414, 32.3203],
  [39.2637, 32.3044], [39.2891, 32.2708], [39.3009, 32.2371],
  [39.3021, 32.2213], [39.2124, 32.1524], [39.2009, 32.1543],
  [39.1792, 32.1354], [39.0063, 32.0006], [38.667, 31.9193],
  [38.0398, 31.7635], [37.984, 31.7445], [37.9713, 31.7451],
  [37.9596, 31.7436], [37.8713, 31.7216], [37.6787, 31.6721],
  [37.64, 31.6635], [37.4033, 31.6017], [37.3818, 31.5946],
  [37.1805, 31.5458], [37.0922, 31.5219], [37.0062, 31.5006],
  [37.1922, 31.3171], [37.2399, 31.2784], [37.2671, 31.2449],
  [37.2773, 31.2356], [37.2828, 31.2278], [37.3249, 31.1851],
  [37.33, 31.1782], [37.3911, 31.1217], [37.4592, 31.05],
  [37.518, 30.9931], [37.5463, 30.9611], [37.5742, 30.9371],
  [37.5963, 30.9133], [37.6336, 30.8781], [37.9035, 30.6064],
  [37.9328, 30.5763], [37.9615, 30.5377], [37.9971, 30.5007],
  [37.6656, 30.3326], [37.6364, 30.2767], [37.5208, 30.0425],
  [37.5055, 30.0008], [37.2071, 29.9479], [37.1265, 29.9314],
  [37.1231, 29.9322], [37.1222, 29.9308], [37.1007, 29.929],
  [37.0572, 29.9193], [37.0547, 29.92], [37.0496, 29.9169],
  [37.0373, 29.9171], [37.0002, 29.9106], [36.865, 29.8856],
  [36.7969, 29.8709], [36.792, 29.8715], [36.7849, 29.8679],
  [36.7758, 29.852], [36.7648, 29.8378], [36.7599, 29.8205],
  [36.7361, 29.789], [36.6809, 29.7494], [36.6677, 29.7278],
  [36.6441, 29.6944], [36.6438, 29.6874], [36.6392, 29.6738],
  [36.6245, 29.6369], [36.616, 29.6318], [36.5504, 29.5636],
  [36.5485, 29.5605], [36.5473, 29.5462], [36.5273, 29.5143],
  [36.4923, 29.4853], [36.4741, 29.4643], [36.4601, 29.4525],
  [36.4493, 29.4304], [36.4371, 29.4207], [36.4308, 29.42],
  [36.4233, 29.4134], [36.4093, 29.4057], [36.397, 29.4014],
  [36.3868, 29.4028], [36.3709, 29.3976], [36.3417, 29.3801],
  [36.3313, 29.3731], [36.3103, 29.352], [36.2497, 29.3127],
  [36.2126, 29.2862], [36.1518, 29.232], [36.0982, 29.2026],
  [36.0828, 29.189], [36.0728, 29.1834], [36.0024, 29.1951],
  [35.9696, 29.1982], [35.9083, 29.21], [35.8199, 29.22],
  [35.7371, 29.238], [35.1351, 29.3318], [35.0888, 29.3393],
  [35.0742, 29.3441], [35.0531, 29.3444], [34.9621, 29.3587],
  [34.9668, 29.3615], [34.9665, 29.3632], [34.9607, 29.3674],
  [34.9585, 29.3649], [34.9576, 29.3674], [34.966, 29.3721],
  [34.9621, 29.3774], [34.9643, 29.3827], [34.9685, 29.3865],
  [34.9637, 29.3937], [34.9646, 29.3985], [34.9704, 29.4035],
  [34.9762, 29.406], [34.9779, 29.4099], [34.9724, 29.4204],
  [34.9746, 29.4326], [34.9704, 29.4379], [34.9676, 29.4471],
  [34.9712, 29.4501], [34.9715, 29.4535], [34.9762, 29.459],
  [34.9743, 29.4629], [34.9746, 29.4704], [34.9801, 29.4776],
  [34.9796, 29.4804], [34.9835, 29.4835], [34.9854, 29.4904],
  [34.9918, 29.5004], [34.9907, 29.5037], [34.9957, 29.5171],
  [35.001, 29.5182], [35.0007, 29.526], [34.9982, 29.5282],
  [34.9979, 29.5307], [34.9799, 29.5424], [34.966, 29.5471],
  [34.9757, 29.571], [34.9865, 29.5898], [35.0017, 29.6052]
]
const ammanCoordinates = [[36.0433, 31.9921], [36.0514, 31.9868],
[36.0599, 31.9837], [36.0831, 31.9816],
[36.1, 31.984], [36.1184, 31.9927],
[36.1325, 31.9947], [36.1388, 31.993],
[36.1543, 31.9808], [36.1718, 31.9777],
[36.2051, 31.9789], [36.2524, 31.9855],
[36.2847, 31.987], [36.3292, 32.0051],
[36.3632, 32.0249], [36.3818, 32.0332],
[36.3906, 32.0348], [36.3955, 32.0343],
[36.4045, 32.0303], [36.4154, 32.0207],
[36.4219, 32.0116], [36.4638, 31.9998],
[36.4735, 31.9915], [36.5054, 31.9567],
[36.521, 31.9429], [36.53, 31.9298],
[36.5333, 31.9181], [36.5303, 31.9089],
[36.5206, 31.9006], [36.4865, 31.8871],
[36.47, 31.8743], [36.445, 31.8614],
[36.4563, 31.8442], [36.4717, 31.8303],
[36.4858, 31.8106], [36.5001, 31.798],
[36.5142, 31.7782], [36.5285, 31.7656],
[36.5425, 31.7457], [36.5617, 31.7293],
[36.5847, 31.7206], [36.6044, 31.7008],
[36.6183, 31.6809], [36.6394, 31.6639],
[36.6528, 31.6622], [36.6645, 31.6631],
[36.6797, 31.6695], [36.6982, 31.6723],
[36.7167, 31.6781], [36.746, 31.6806],
[36.7644, 31.6867], [36.7765, 31.6872],
[36.7849, 31.6851], [36.8229, 31.6532],
[36.8497, 31.6258], [36.937, 31.5512],
[36.9508, 31.5356], [36.9935, 31.499],
[37.0026, 31.4888], [37.0066, 31.4895],
[37.0025, 31.4936], [37.0113, 31.4959],
[37.1922, 31.3171], [37.2399, 31.2784],
[37.2589, 31.255], [37.2293, 31.2447],
[37.2147, 31.2427], [37.1345, 31.2417],
[37.1185, 31.2427], [37.1012, 31.2486],
[37.0866, 31.2499], [36.8557, 31.2493],
[36.8092, 31.2532], [36.6038, 31.2528],
[36.5509, 31.2567], [36.3265, 31.2561],
[36.3087, 31.2573], [36.2931, 31.263],
[36.2754, 31.2643], [36.1958, 31.2639],
[36.1739, 31.2618], [36.1531, 31.2735],
[36.1421, 31.284], [36.1213, 31.2991],
[36.1129, 31.3086], [36.108, 31.3262],
[36.0995, 31.3352], [36.0797, 31.3505],
[36.0664, 31.3554], [36.0574, 31.3619],
[36.0287, 31.3894], [36.0136, 31.3993],
[35.9878, 31.409], [35.9007, 31.4189],
[35.8804, 31.4355], [35.8652, 31.4447],
[35.8811, 31.4622], [35.8851, 31.4818],
[35.8894, 31.494], [35.8955, 31.5044],
[35.9106, 31.5188], [35.9131, 31.5263],
[35.9142, 31.5348], [35.9102, 31.5436],
[35.9046, 31.5466], [35.8864, 31.5496],
[35.8775, 31.556], [35.8748, 31.5607],
[35.875, 31.5663], [35.8778, 31.5709],
[35.8864, 31.5773], [35.8991, 31.5823],
[35.9013, 31.5857], [35.9018, 31.5937],
[35.8937, 31.6075], [35.8811, 31.6181],
[35.8677, 31.6227], [35.8398, 31.6374],
[35.836, 31.6532], [35.8363, 31.6592],
[35.8399, 31.6661], [35.8478, 31.669],
[35.8639, 31.6709], [35.8785, 31.6771],
[35.8843, 31.6818], [35.8906, 31.6915],
[35.8911, 31.6983], [35.878, 31.7194],
[35.8773, 31.724], [35.8796, 31.7291],
[35.8909, 31.7429], [35.897, 31.7625],
[35.8795, 31.7727], [35.8533, 31.7759],
[35.8393, 31.7815], [35.8238, 31.7815],
[35.8053, 31.7758], [35.7959, 31.7756],
[35.76, 31.7884], [35.7174, 31.7955],
[35.7399, 31.8192], [35.7459, 31.8379],
[35.7501, 31.8617], [35.7542, 31.8692],
[35.767, 31.8838], [35.7725, 31.9083],
[35.7829, 31.9262], [35.7915, 31.9361],
[35.8129, 31.9518], [35.8587, 31.972],
[35.8729, 31.9864], [35.8749, 31.9953],
[35.8738, 32.0066], [35.9017, 32.0201],
[35.9209, 32.0363], [35.934, 32.0514],
[35.9506, 32.064], [35.9736, 32.0682],
[35.9792, 32.0677], [35.9891, 32.0638],
[36.026, 32.0321], [36.0293, 32.0104],
[36.0343, 31.9961], [36.0433, 31.9921]]