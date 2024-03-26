import * as React from 'react';

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import DividendCalculator from '@/components/dividend/DividendCalculator';

export default function DividendPage() {

  return (
    <Box sx={{ width: '100%' }}>
      {/* Dividend 컴포넌트 */}
        <DividendCalculator />
    </Box>
  );
}
