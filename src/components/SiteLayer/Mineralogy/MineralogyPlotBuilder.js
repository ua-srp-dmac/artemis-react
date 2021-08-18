import React, {useContext} from 'react';

import BarChartPlot from './BarChart';
import HeatMapPlot from './HeatMap';

import axios from 'axios';

import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Card,
  Heading,
  ResponsiveContext,
} from 'grommet';

import {
  BarChart
} from 'grommet-icons';

export default function MineralogyPlotBuilder() {

  const size = useContext(ResponsiveContext);

  const getData = () => {
    axios.get('site-mineralogy-cache/6')
    .then((response) => {
      const data = response;
      setData(data)
      console.log(data);
    })
    .catch(error => console.log(error));
  }

  const minerals = [
    'quartz',
    'plagioclase',
    'illite',
    'chlorite',
    'kaolinite',
    'pyrite',
    'gypsum',
    'jarosite',
    'melanternite',
    'ankerite',
    'siderite',
    'amorphous',
  ];

  const depths0 = [
    '0-5',
    '5-15',
    '15-25',
    '25-35',
    '35-38',
    '38-54',
    '180-183'
  ];

  const [data, setData] = React.useState('');
  const [showPlot, setShowPlot] = React.useState(false);

  const [quartz_selected, set_quartz_selected] = React.useState(false);
  const [plagioclase_selected, set_plagioclase_selected] = React.useState(false);
  const [illite_selected, set_illite_selected] = React.useState(false);
  const [chlorite_selected, set_chlorite_selected] = React.useState(false);
  const [kaolinite_selected, set_kaolinite_selected] = React.useState(false);
  const [pyrite_selected, set_pyrite_selected] = React.useState(false);

  const [gypsum_selected, set_gypsum_selected] = React.useState(false);
  const [jarosite_selected, set_jarosite_selected] = React.useState(false);
  const [melanternite_selected, set_melanternite_selected] = React.useState(false);

  const [ankerite_selected, set_ankerite_selected] = React.useState(false);
  const [siderite_selected, set_siderite_selected] = React.useState(false);
  const [amorphous_selected, set_amorphous_selected] = React.useState(false);

  const [depth1_selected, set_depth1_selected] = React.useState(false);
  const [depth2_selected, set_depth2_selected] = React.useState(false);
  const [depth3_selected, set_depth3_selected] = React.useState(false);
  const [depth4_selected, set_depth4_selected] = React.useState(false);
  const [depth5_selected, set_depth5_selected] = React.useState(false);
  const [depth6_selected, set_depth6_selected] = React.useState(false);
  const [depth7_selected, set_depth7_selected] = React.useState(false);

  const [plotType, setPlotType] = React.useState('bar');

  React.useEffect(() => {
    getData();
  }, []);


  let depthsSelected = []

  for (let i = 0; i < depths0.length; i++ ) {
    if (eval('depth' + (i + 1).toString() + '_selected')) {
      depthsSelected.push(depths0[i]);
    }
  }

  let mineralsSelected = []

  for (let i = 0; i < minerals.length; i++ ) {

    if (eval(minerals[i] + '_selected') ) {
      mineralsSelected.push(minerals[i]);
    }
  }

  var replicatePlots = [];


  if (plotType === 'bar') {
    replicatePlots.push({
      type: "bar",
      x1_var: "time",
      x1_value: 0,
      x2_var: "mineral",
      x2_value: mineralsSelected,
      x3_var: "depth",
      x3_value: depthsSelected,
    });
  } else if (plotType === 'heat') {
    replicatePlots.push({
      type: "heat",
      x1_var: "time",
      x1_value: 0,
      x2_var: "mineral",
      x2_value: mineralsSelected,
      x3_var: "depth",
      x3_value: depthsSelected,
    });
  }
    
  return (
    
      <Grid
        fill="true"
        rows={['auto', 'flex']}
        columns={['auto', 'flex']}
        align="stretch"
        areas={[
          { name: 'sidebar', start: [0, 0], end: [0, 0] },
          { name: 'main', start: [1, 0], end: [1, 0] },
        ]}>

      <Box flex
        basis="full"
        gridArea="sidebar"
        width="medium">
     
        <Box pad="small">
          
          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Minerals
            </Heading>

            <Box direction="row" align="center" gap="small" >     
              <Button
                label="quartz"
                primary={quartz_selected}
                onClick={() => {set_quartz_selected(!quartz_selected)}}
                size="small"
              />
              <Button
                label="plagioclase"
                primary={plagioclase_selected}
                onClick={() => {set_plagioclase_selected(!plagioclase_selected)}}
                size="small"
              />
              <Button
                label="illite"
                primary={illite_selected}
                onClick={() => {set_illite_selected(!illite_selected)}}
                size="small"
              />
            </Box>

            <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
              <Button
                label="chlorite"
                primary={chlorite_selected}
                onClick={() => {set_chlorite_selected(!chlorite_selected)}}
                size="small"
              />
              <Button
                label="kaolinite"
                primary={kaolinite_selected}
                onClick={() => {set_kaolinite_selected(!kaolinite_selected)}}
                size="small"
              />
              <Button
                label="pyrite"
                primary={pyrite_selected}
                onClick={() => {set_pyrite_selected(!pyrite_selected)}}
                size="small"
              />
            </Box>

            <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
              <Button
                label="gypsum"
                primary={gypsum_selected}
                onClick={() => {set_gypsum_selected(!gypsum_selected)}}
                size="small"
              />
              <Button
                label="jarosite"
                primary={jarosite_selected}
                onClick={() => {set_jarosite_selected(!jarosite_selected)}}
                size="small"
              />
              <Button
                label="melanternite"
                primary={melanternite_selected}
                onClick={() => {set_melanternite_selected(!melanternite_selected)}}
                size="small"
              />
            </Box>

            <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
              <Button
                label="ankerite"
                primary={ankerite_selected}
                onClick={() => {set_ankerite_selected(!ankerite_selected)}}
                size="small"
              />
              <Button
                label="siderite"
                primary={siderite_selected}
                onClick={() => {set_siderite_selected(!siderite_selected)}}
                size="small"
              />
              <Button
                label="amorphous"
                primary={amorphous_selected}
                onClick={() => {set_amorphous_selected(!amorphous_selected)}}
                size="small"
              />
            </Box>
          </Box>
    
          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Depth
            </Heading>

            <Box direction="row" align="center" gap="small" >     
              <Button
                label="0-5"
                primary={depth1_selected}
                onClick={() => {set_depth1_selected(!depth1_selected)}}
                size="small"
              />
              <Button
                label="5-15"
                primary={depth2_selected}
                onClick={() => {set_depth2_selected(!depth2_selected)}}
                size="small"
              />
              <Button
                label="15-25"
                primary={depth3_selected}
                onClick={() => {set_depth3_selected(!depth3_selected)}}
                size="small"
              />
              <Button
                label="25-35"
                primary={depth4_selected}
                onClick={() => {set_depth4_selected(!depth4_selected)}}
                size="small"
              />
            </Box>
            <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>   
              <Button
                label="35-38"
                primary={depth5_selected}
                onClick={() => {set_depth5_selected(!depth5_selected)}}
                size="small"
              />
              <Button
                label="38-54"
                primary={depth6_selected}
                onClick={() => {set_depth6_selected(!depth6_selected)}}
                size="small"
              />
              <Button
                label="180-183"
                primary={depth7_selected}
                onClick={() => {set_depth7_selected(!depth7_selected)}}
                size="small"
              />
            </Box>
          </Box>


          { depthsSelected.length > 0 && 
            <>
              <Box>
                <Heading
                  level={5}
                  margin={{
                    "horizontal": "none",
                    "top": "medium",
                    "bottom": "xsmall",
                  }}>
                    Plot Type
                </Heading>

                <Box direction="row" align="center" gap="small" >     
                  <Button
                    label="Bar Chart"
                    primary={plotType === "bar"}
                    onClick={() => {setPlotType("bar")}}
                    size="small"
                  />
                  <Button
                    label="Heat Map"
                    primary={plotType === "heat"}
                    onClick={() => {setPlotType("heat")}}
                    size="small"
                  />
                </Box>
              </Box>
            
              <Box
                align="center"
                pad="medium">
                <Button
                  label="Plot"
                  icon={<BarChart />}
                  onClick={() => {setShowPlot(true)}}
                  color="neutral-1"
                  // primary
                />
              </Box>
            </>
          }
        </Box>
      </Box>
        
      <Box flex
        gridArea="main"
      >
    
        {showPlot &&
          <Box pad="small">
            <Grid columns={size === 'small' ? 'medium' : '100%'} gap="small">
              {replicatePlots.map((plot, index) => (       
                <Card key={index}>
                  {plot.type === 'bar' &&
                    <BarChartPlot
                      data={data}
                      replicate={replicatePlots[index]}>
                    </BarChartPlot>
                  }
                  {plot.type === 'heat' &&
                    <HeatMapPlot
                      data={data}
                      replicate={replicatePlots[index]}>
                    </HeatMapPlot>
                  }
                </Card>
              ))}
            </Grid>
          </Box>
        }

        {!showPlot &&
          <Box pad="small" align="center" margin="large">
            <BarChart size='large'></BarChart>
            <Text margin="medium">Select variables to build a plot.</Text>
          </Box>
        }

      </Box>

    </Grid>

  );
}
