import React, {useContext} from 'react';
import Plot from 'react-plotly.js';
import SiteMap from './SiteMap';

import {
  Box,
  Button,
  Layer,
  Grid,
  Text,
  Tabs,
  Card,
  Heading,
  Select,
  ResponsiveContext,
} from 'grommet';

export default function Overview() {

  const increases = [
    { depth: '0-20', treatment:	4, treatmentName: '20% comp', element: 'U', percent: 37.2 },
    { depth: '40-60', treatment: 2,	treatmentName: '15% comp', element: 'U',	percent: 27.6 },
    { depth: '20-40', treatment: 5,	treatmentName: '10% comp seed', element: 'W',	percent: 9.1},
    { depth: '0-20', treatment:	5,	treatmentName: '10% comp seed', element: 'W',	percent: 8.71},
    { depth: '0-20', treatment:	5,	treatmentName: '10% comp seed', element: 'Zr', percent: 8.5 },
    // { depth: 40-60, treatment: 6,	element: Nb, percent: 5.095238095 },
    // { depth: 0-20, treatment:	6,	element: Zr, percent:	5.05 },
    // { depth: 40-60, treatment: 5,	element: U,	percent: 4.857142857 },
    // { depth: 20-40, treatment: 2,	element: U,	percent: 4.492537313 },
    // { depth: 0-20, treatment:	4,	element: Zr,percent: 4.416666667 },
  ]

  const decreases = [
    { depth: '40-60',	treatment: 4,	treatmentName: '20% comp', element: 'Tl', percent:	0.87 },
    { depth: '20-40',	treatment: 2, treatmentName: '15% comp', element: 'W', percent: 0.78 },
    { depth: '0-20',	treatment: 5, treatmentName: '10% comp seed', element: 'Tl', percent:	0.75 },
    { depth: '20-40',	treatment: 6, treatmentName: 'control', element: 'Ba', percent:	0.74 },
    { depth: '40-60',	treatment: 2,	treatmentName: '15% comp', element: 'Tl', percent:	0.73 },
    // { depth: '40-60',	treatment: 5,	element: 'Tl', percent:	-0.733333333 },
    // { depth: '20-40',	treatment: 5,	element: 'Gd', percent:	-0.688888889 },
    // { depth: '20-40',	treatment: 2,	element: 'Cr', percent:	-0.682539683 },
    // { depth: '20-40',	treatment: 5,	element: 'Tl', percent:	-0.68 },
    // { depth: '20-40',	treatment: 4,	element: 'Cu', percent:	-0.669819433 },
  ]

  const size = useContext(ResponsiveContext);
  const [value, setValue] = React.useState('treatment');
  const [element, setElement] = React.useState('Arsenic');
  const [treatment, setTreatment] = React.useState('Arsenic');


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
            <SiteMap></SiteMap>
            <Box>
            Color by
            <Select
              options={['treatment', 'pH', 'pHCa', 'EC']}
              value={value}
              onChange={({ option }) => setValue(option)}
            />
            </Box>
          </Box>
      </Box>

      <Box flex
        gridArea="main"
      >
        <Box
          flex
          // align='center'
          // justify='center'
        >

        <Heading level={4} margin="small">
          Site Summary

          {/* <Select
              options={['Site Overview', '10% comp', '15% comp seed']}
              value={treatment}
              onChange={({ option }) => setTreatment(option)}
              defaultValue=""
            /> */}
        </Heading>

        <Heading level={6} margin="small">
          Greatest Increases
        </Heading>

        <Grid columns={size !== 'small' ? 'small' : '100%'}  gap="xsmall">
          {increases.map((increase, index) => (
            <Card pad="small" key={index}>
              <Text className="element">{ increase.element }</Text>
              <Text>{ increase.treatmentName }</Text>
              <Text color="neutral-1">+ { increase.percent }%</Text>
            </Card>
          ))}
        </Grid>

        <Heading level={6} margin="small">
          Greatest Decreases
        </Heading>

        <Grid columns={size !== 'small' ? 'small' : '100%'}  gap="xsmall">
          {decreases.map((decrease, index) => (
            <Card pad="small" key={index}>
              <Text>
                <span className="element">{ decrease.element }</span>
                {/* <span color="status-critical">- { decrease.percent }%</span> */}
              </Text>
              <Text>{ decrease.treatmentName }</Text>
              <Text color="status-critical">- { decrease.percent }%</Text>
            </Card>
          ))}
        </Grid>





        {/* Select Element
        <Select
            options={['Arsenic', 'Aluminum']}
            value={element}
            onChange={({ option }) => setElement(option)}
          /> */}
        </Box>
      </Box>
    </Grid>

  );
}
