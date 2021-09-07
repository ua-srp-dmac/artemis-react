import React, {useContext} from 'react';
import axios from 'axios';

import BarChartPlot from './BarChart';
import HeatMapPlot from './HeatMap';

import ReactSelect from 'react-select';

import {
  Box,
  Button,
  Grid,
  Text,
  Card,
  Heading,
  Select,
  ResponsiveContext,
  Anchor
} from 'grommet';

import {
  BarChart
} from 'grommet-icons';


export default function PlotBuilder(props) {

  const size = useContext(ResponsiveContext);
  
  const getData = () => {
    axios.get('https://artemis-dev.pharmacy.arizona.edu/site-extractions-cache/' + props.site.id)
    .then((response) => {
      const data = response;
      setData(data)
      console.log(data);
    })
    .catch(error => console.log(error));
  }

  
  const [showPlot, setShowPlot] = React.useState(false);
  const [data, setData] = React.useState('')
  const [elementsSelected, setElementsSelected] = React.useState([]);

  const [treatment1_selected, set_treatment1_selected] = React.useState(false);
  const [treatment2_selected, set_treatment2_selected] = React.useState(false);
  const [treatment3_selected, set_treatment3_selected] = React.useState(false);
  const [treatment4_selected, set_treatment4_selected] = React.useState(false);
  const [treatment5_selected, set_treatment5_selected] = React.useState(false);
  const [treatment6_selected, set_treatment6_selected] = React.useState(false);

  const [time0_selected, set_time0_selected] = React.useState(false);
  const [time1_selected, set_time1_selected] = React.useState(false);

  const [depth1_selected, set_depth1_selected] = React.useState(false);
  const [depth2_selected, set_depth2_selected] = React.useState(false);
  const [depth3_selected, set_depth3_selected] = React.useState(false);
  const [depth4_selected, set_depth4_selected] = React.useState(false);

  const [plotType, setPlotType] = React.useState('bar');
  const [groupBy, setGroupBy] = React.useState('treatment');

  React.useEffect(() => {
    getData();
  }, []);

  const treatments = [
    '15% CS',
    '15% C',
    '20% CS',
    '20% C',
    '10% CS',
    'control'
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

  const depths1 = [
    '0-20',
    '20-40',
    '40-60',
    '60-90'
  ];

  const times = [
    'Time 0',
    'Time 1'
  ];

  const elements = [
    { value: 'Al', label: 'Al'},
    { value: 'As', label: 'As'},
    { value: 'Ca', label: 'Ca'},
    { value: 'Cr', label: 'Cr'},
    { value: 'Fe', label: 'Fe'},
    { value: 'K', label: 'K'},
    { value: 'Mg', label: 'Mg'},
    { value: 'Mn', label: 'Mn'},
    { value: 'Pb', label: 'Pb'},
    { value: 'Tl', label: 'Tl'},
    { value: 'Zn', label: 'Zn'},
  ];

  let treatmentsSelected = []
  let depthsSelected = []
  let timesSelected = []

  for (let i = 0; i < treatments.length; i++ ) {
    if (eval('treatment' + (i + 1).toString() + '_selected')) {
      treatmentsSelected.push('treatment' + (i + 1).toString());
    }
  }

  for (let i = 0; i < depths1.length; i++ ) {
    if (eval('depth' + (i + 1).toString() + '_selected')) {
      depthsSelected.push(depths1[i]);
    }
  }

  if (time0_selected) {
    timesSelected.push(0);
  }
  
  if (time1_selected) {
    timesSelected.push(1);
  }

  var replicatePlots = [];

  const varNames = ['treatment', 'depth', 'time'];

  if (plotType === 'bar') {
    for (let i = 0; i < timesSelected.length; i++) {
      for (let j = 0; j < elementsSelected.length; j++) {
        if (groupBy === 'treatment') {
          replicatePlots.push({
            element: elementsSelected[j].value,
            type: "bar",
            x1_var: "time",
            x1_value: timesSelected[i],
            x2_var: "treatment",
            x2_value: treatmentsSelected,
            x3_var: "depth",
            x3_value: depthsSelected,
          });
        } else if (groupBy === 'depth') {
          replicatePlots.push({
            element: elementsSelected[j].value,
            type: "bar",
            x1_var: "time",
            x1_value: timesSelected[i],
            x2_var: "depth",
            x2_value: depthsSelected,
            x3_var: "treatment",
            x3_value: treatmentsSelected,
          });
        }
      }
    } 
  } else if (plotType === 'heat') {
    for (let i = 0; i < timesSelected.length; i++) {
      for (let j = 0; j < elementsSelected.length; j++) {
        replicatePlots.push({
          element: elementsSelected[j].value,
          type: "heat",
          x1_var: "time",
          x1_value: timesSelected[i],
          x2_var: "treatment",
          x2_value: treatmentsSelected,
          x3_var: "depth",
          x3_value: depthsSelected,
        });
      }     
    }
  }

  function selectAllTreatments() {
    set_treatment1_selected(true);
    set_treatment2_selected(true);
    set_treatment3_selected(true);
    set_treatment4_selected(true);
    set_treatment5_selected(true);
    set_treatment6_selected(true);
  }

  function clearTreatments() {
    set_treatment1_selected(false);
    set_treatment2_selected(false);
    set_treatment3_selected(false);
    set_treatment4_selected(false);
    set_treatment5_selected(false);
    set_treatment6_selected(false);
  }

  function selectAllDepths() {
    set_depth1_selected(true);
    set_depth2_selected(true);
    set_depth3_selected(true);
    set_depth4_selected(true);
  }

  function clearDepths() {
    set_depth1_selected(false);
    set_depth2_selected(false);
    set_depth3_selected(false);
    set_depth4_selected(false);
  }

  function selectAllTimes() {
    set_time0_selected(true);
    set_time1_selected(true);
  }

  function clearTimes() {
    set_time0_selected(false);
    set_time1_selected(false);
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
        
          
          <Heading
            level={5}
            margin={{
              "horizontal": "none",
              "top": "xsmall",
              "bottom": "xsmall",
            }}>
              Element
          </Heading>
          
          {/* <Select
            options={elements}
            value={element}
            multiple
            onChange={({ value: nextValue }) => setElement(nextValue)}
            placeholder="Select element"
          /> */}

          <ReactSelect
            value={elementsSelected}
            isMulti
            isSearchable
            options={elements}
            className="basic-multi-select"
            onChange={ (selectedOption) => {
              setElementsSelected(selectedOption);
              console.log(`Option selected:`, selectedOption);
            }}
            classNamePrefix="select"
          />
          
          <Box>
            <Heading
              level={5}
              margin={{
                "horizontal": "none",
                "top": "medium",
                "bottom": "xsmall",
              }}>
                Solvents
                { treatmentsSelected.length === 0 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={selectAllTreatments}>
                    Select all
                  </Anchor>
                }

                { treatmentsSelected.length >= 1 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={clearTreatments}>
                    Clear All
                  </Anchor>
                }
                
            </Heading>

            <Box direction="row" align="center" gap="small" >     
              <Button
                label="H20"
                primary={treatment6_selected}
                onClick={() => {set_treatment6_selected(!treatment6_selected)}}
                size="small"
              />
              <Button
                label="AmNO3"
                primary={treatment2_selected}
                onClick={() => {set_treatment2_selected(!treatment2_selected)}}
                size="small"
              />
              <Button
                label="AAc"
                primary={treatment4_selected}
                onClick={() => {set_treatment4_selected(!treatment4_selected)}}
                size="small"
              />
            </Box>

            <Box direction="row" align="center" gap="small" margin={{top: "xsmall"}}>
              <Button
                label="PO4"
                primary={treatment5_selected}
                onClick={() => {set_treatment5_selected(!treatment5_selected)}}
                size="small"
              />
              <Button
                label="AAO"
                primary={treatment1_selected}
                onClick={() => {set_treatment1_selected(!treatment1_selected)}}
                size="small"
              />
              <Button
                label="CDB"
                primary={treatment3_selected}
                onClick={() => {set_treatment3_selected(!treatment3_selected)}}
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

                { depthsSelected.length === 0 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={selectAllDepths}>
                    Select all
                  </Anchor>
                }

                { depthsSelected.length >= 1 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={clearDepths}>
                    Clear All
                  </Anchor>
                }
            </Heading>

            <Box direction="row" align="center" gap="small" >     
              <Button
                label="0-20"
                primary={depth1_selected}
                onClick={() => {set_depth1_selected(!depth1_selected)}}
                size="small"
              />
              <Button
                label="20-40"
                primary={depth2_selected}
                onClick={() => {set_depth2_selected(!depth2_selected)}}
                size="small"
              />
              <Button
                label="40-60"
                primary={depth3_selected}
                onClick={() => {set_depth3_selected(!depth3_selected)}}
                size="small"
              />
              <Button
                label="60-90"
                primary={depth4_selected}
                onClick={() => {set_depth4_selected(!depth4_selected)}}
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
                Time
                { timesSelected.length === 0 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={selectAllTimes}>
                    Select all
                  </Anchor>
                }

                { timesSelected.length >= 1 &&
                  <Anchor size="xsmall" margin="small" as="a" onClick={clearTimes}>
                    Clear All
                  </Anchor>
                }
            </Heading>

            <Box direction="row" align="center" gap="small" >     
              <Button
                label="Time 0"
                primary={time0_selected}
                onClick={() => {set_time0_selected(!time0_selected)}}
                size="small"
              />
              {/* <Button
                label="Time 1"
                primary={time1_selected}
                onClick={() => {set_time1_selected(!time1_selected)}}
                size="small"
              /> */}
            </Box>
          </Box>

          { elementsSelected.length > 0 && treatmentsSelected.length > 0 && depthsSelected.length > 0 && timesSelected.length > 0 &&
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
        {!showPlot &&
          <Box pad="small" align="center" margin="large">
            <BarChart size='large'></BarChart>
            <Text margin="medium">Select variables to build a plot.</Text>
          </Box>
        }
    
        {showPlot &&
        <Box pad="small">
          <Grid columns={size === 'small' ? 'medium' : 'medium'} gap="small">
            {replicatePlots.map((plot, index) => (       
              <Card key={index}>
              
                {plot.type === 'bar' &&
                  <>
                    <BarChartPlot
                      element={plot.element}
                      replicate={replicatePlots[index]}
                      data={data}>
                    </BarChartPlot>
                    
                    <Box margin={{bottom: "large", horizontal: "large"}}>
                      <Heading
                        level={5}
                        margin={{
                          "horizontal": "none",
                          "top": "xsmall",
                          "bottom": "xsmall",
                        }}>
                          Group By
                      </Heading>
                      
                      <Select
                        options={['treatment', 'depth']}
                        value={groupBy}
                        onChange={({ option }) => setGroupBy(option)}
                        placeholder="Select grouping"
                      />
                    </Box>
                  </>
                }
                {plot.type === 'heat' &&
                  <HeatMapPlot
                    element={plot.element}
                    replicate={replicatePlots[index]}
                    data={data}>
                  </HeatMapPlot>
                }
              </Card>
            ))}
          </Grid>
        </Box>
        }

      </Box>

    </Grid>

  );
}
