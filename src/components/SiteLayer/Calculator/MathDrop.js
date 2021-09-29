import React from 'react';
import PropTypes from 'prop-types';
import { Close, Calculator } from 'grommet-icons';

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
        <Button size="small" onClick={() => {props.updateEquation1(); setOpen(false) }}>
          <p><BlockMath math="\sqrt{x}"/></p>
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
