import * as React from 'react';

// material-ui 관련 임포트
import Box from '@mui/material/Box';
import AssetTypeTable from '@/components/asset_type/AssetTypeTable';
import AssetTypeChart from '@/components/asset_type/AssetTypeChart';

export default function AsetTypePage() {

  return (
    <Box sx={{ width: '100%' }}>
      {/* AssetTypeTable 컴포넌트 */}
      <AssetTypeTable />
      <AssetTypeChart />
    </Box>
  );
}
