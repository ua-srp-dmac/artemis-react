
import React from 'react'; 

import {
  Box,
  Button,
  Text,
  Heading,
  DataTable
} from 'grommet';



export default function Solution(props) {

  let solution = props.solution;

  // console.log(solution)

  // create columns array
  let columns = [];
  let solutionData = [];

  for (let i = 0; i < props.variables.length; i++) {
    let varSummary = props['variable' + (i+1) + '_summary'];
    if (varSummary.isSolution) {
      columns.push({
        property: varSummary.name,
        header: <Text>{varSummary.name} (Solution)</Text>,
        primary: true,
      });
    } else {
      columns.push({
        property: varSummary.name,
        header: <Text>{varSummary.name}</Text>,
        primary: true,
      });
      columns.push({
        property: varSummary.name + '_description',
        header: <Text></Text>,
        primary: true,
        render: (datum) => (
          <Text size="small">
              { datum[varSummary.name + '_description'] }
          </Text>
        ),
      });
    }
  }

  console.log(columns)

  for (let i = 0; i < props.solution.length; i++) {
    let newData = {};
    for (const variable in solution[i]) { 
      let varValue = solution[i][variable];
      newData[variable] = varValue['element_amount'];
      let description = "";
      // for (const param in varValue) {
      Object.entries(varValue).forEach(([key, value], index) => {
        if (key !== 'element_amount') {
          if (index < Object.entries(varValue).length -1) {
            description += value + " • "
          } else {
            description += value
          }
          
        }
      })
    
      newData[variable + '_description'] = description;
    }
    solutionData.push(newData)
  }

  console.log(solutionData)
  

  return (

    <Box pad="small">
      
      <DataTable
        columns={columns}
        data={solutionData}>

      </DataTable>
    </Box>
  );
}
