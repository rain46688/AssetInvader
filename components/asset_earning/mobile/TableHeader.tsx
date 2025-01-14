import { ChangeEvent, MouseEvent } from 'react';
import { visuallyHidden } from '@mui/utils';
import { Order } from '@/utils/sort';
import { AssetEarningData } from "@/redux/asset_earning/AssetEarning";

// material-ui 관련 임포트
import { Box, Checkbox, TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';

interface HeadCell {
    id: keyof AssetEarningData;
    label: string;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'asset_name',
        label: '자산명',
    },
    {
        id: 'trns_date',
        label: '수익발생일',
    }
];

interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (event: MouseEvent<unknown>, property: keyof AssetEarningData) => void;
    onSelectAllClick: (event: ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    addStatus: boolean;
    setIsNotSortStatus: (status: boolean) => void;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, addStatus, setIsNotSortStatus } = props;
    const createSortHandler = (property: keyof AssetEarningData) => (event: MouseEvent<unknown>) => {
        onRequestSort(event, property);
        // 정렬 버튼 클릭시에 정렬 허용
        setIsNotSortStatus(false);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        sx={{whiteSpace: 'nowrap'}}
                        key={headCell.id}
                        align='center'
                        padding='normal'
                        sortDirection={orderBy === headCell.id ? order : false}>
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}>
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}