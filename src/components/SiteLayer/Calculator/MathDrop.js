import React from 'react';
import PropTypes from 'prop-types';
import { Close, Calculator, Subtract, Add } from 'grommet-icons';

import { Grommet, Box, Button, DropButton, Heading, Text } from 'grommet';
import { grommet } from 'grommet/themes';

import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';



export default function MathDrop (props) {
  
  const [open, setOpen] = React.useState();
  
  const onOpen = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const DropContent = ({ onClose }) => (
    <Box pad="small">
      
      <Box direction="row" justify="between" align="center">
        
        <Button
          size="medium"
          onClick={() => {props.updateEquation1("+"); setOpen(false) }}
          label={<InlineMath math="+"/>}
          margin="xsmall">
        </Button>

        <Button
          size="medium"
          onClick={() => {props.updateEquation1("-"); setOpen(false) }}
          label={<InlineMath math="-"/>}
          margin="xsmall">
        </Button>

        <Button
          size="medium"
          onClick={() => {props.updateEquation1("^{}"); setOpen(false) }}
          label={<InlineMath math="x^e"/>}
          margin="xsmall">
        </Button>

      </Box>

      <Box direction="row" justify="between" align="center">

        <Button
          size="medium"
          onClick={() => {props.updateEquation1("\\times"); setOpen(false) }}
          label={<InlineMath math="\times"/>}
          margin="xsmall">
        </Button>

        <Button
          size="medium"
          onClick={() => {props.updateEquation1("\\frac{}{}"); setOpen(false) }}
          label={<InlineMath math="\frac{x}{y}"/>}
          margin="xsmall">
        </Button>

        <Button
          size="medium"
          onClick={() => {props.updateEquation1("\\sum"); setOpen(false) }}
          label={<InlineMath math="\sum"/>}
          margin="xsmall">
        </Button>

      </Box>

    </Box>
  );

  return (
    <DropButton
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      dropContent={<DropContent onClose={onClose} />}
      dropProps={{ align: { top: 'bottom' } }}>
        <Calculator></Calculator>
    </DropButton>
  );
} 
