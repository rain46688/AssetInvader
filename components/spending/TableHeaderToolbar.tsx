import * as React from 'react';
import { sendPost, sendDelete, sendFile } from '@/utils/fetch';
import { createData } from '@/redux/spending/Spending';
import { SpendingData } from '@/redux/spending/Spending';
import { SpendingValidation } from '@/redux/spending/Spending';

// redux 관련 임포트
import { setSpendingList } from '@/redux/spending/spendingSlice';
import { useAppDispatch, useAppSelector } from '@/app/store';

import * as XLSX from "xlsx";

// material-ui 관련 임포트
import { alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AttachFileIcon from '@mui/icons-material/AttachFile';

interface EnhancedTableToolbarProps {
  numSelected: number;
  selected: readonly number[];
  setSelected: React.Dispatch<React.SetStateAction<readonly number[]>>;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  setOrder: React.Dispatch<React.SetStateAction<"asc" | "desc">>;
  setOrderBy: React.Dispatch<React.SetStateAction<keyof SpendingData>>;
  validationList: SpendingValidation[];
  setValidationList: React.Dispatch<React.SetStateAction<SpendingValidation[]>>;
  addStatus: boolean;
  setAddStatus: React.Dispatch<React.SetStateAction<boolean>>;
  validation: boolean;
  setSnack: React.Dispatch<React.SetStateAction<boolean>>;
  setSnackMessage: React.Dispatch<React.SetStateAction<string>>;
  setSnackBarStatus: React.Dispatch<React.SetStateAction<string>>;
  setIsNotSortStatus: React.Dispatch<React.SetStateAction<boolean>>;
  getList: (id: string) => Promise<void>;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected, selected, setSelected, setPage, rowsPerPage, setOrder, setOrderBy,
    validationList, setValidationList, addStatus, setAddStatus, validation, setSnack, setSnackMessage, setSnackBarStatus, setIsNotSortStatus, getList } = props;

  const dispatch = useAppDispatch();
  const list = useAppSelector(state => state.spendingReducer); // Redux 상태에서 필요한 데이터 읽어오기

  // 항목 추가
  const handleAddList = async () => {
    console.log('=== handleAddList === ');

    // 추가 버튼 클릭 시 addStatus 변경
    if (addStatus == false) {
      setAddStatus(true);
    }

    const newList = [
      createData(
        0,
        "",
        "",
        "",
        0
      ),
      ...list
    ];

    // 유효성 검사 리스트에 추가
    validationList.push({
      id: list.length,
      spnd_date: true,
      spnd_type: true,
      description: true,
      amount: true,
    });

    // 유효성 검사 리스트 업데이트
    setValidationList(validationList);

    // 추가 시에 맨처음 페이지로 이동
    const movePage = 0;
    setPage(movePage);
    setOrder('desc');
    setOrderBy('spnd_date');
    dispatch(setSpendingList(newList));
  };

  // 선택된 항목 삭제
  const handleDeleteList = async () => {
    console.log('=== handleDeleteList === ');

    selected.forEach(async (id) => {
      const result = await sendDelete('spending/delete_spending/' + id);
      if (result.status === 'success') {
        const newList = list.filter((item) => !selected.includes(item.id));
        setSelected([]);
        // 삭제 시에 맨처음 페이지로 이동
        const movePage = 0;
        setPage(movePage);
        setOrder('desc');
        setOrderBy('spnd_date');
        setSnack(true);
        setSnackMessage("데이터 삭제 완료.");
        setSnackBarStatus("success");
        dispatch(setSpendingList(newList));
      } else {
        setSnack(true);
        setSnackMessage("데이터 삭제 실패.");
        setSnackBarStatus("error");
        console.log("fail");
      }
    });
  };

  // 목록 새로고침
  const handleRefreshList = () => {
    console.log('=== handleRefreshList === ');
    setOrder('desc');
    setOrderBy('spnd_date');
    setPage(0);
    // 목록 새로고침
    getList(sessionStorage.getItem('id') + '');
  };

  // 항목 추가 완료
  const handleCompleteList = async () => {
    console.log('=== handleCompleteList === ');
    const new_data = { ...list[0] };

    // 유효성 검사
    if (validation == false) {
      // 유효성 검사 실패시 return
      console.log(" === 유효성 검사 실패 === ");
      setSnack(true);
      setSnackMessage("데이터 유효성 검사 실패.");
      setSnackBarStatus("warning");
      return;
    }

    // 서버에 데이터 추가
    const data = JSON.stringify({
      "member_id": sessionStorage.getItem('id'),
      "spnd_date": new_data.spnd_date,
      "spnd_type": new_data.spnd_type,
      "description": new_data.description,
      "amount": String(new_data.amount).trim() === '' ? "0" : new_data.amount,
    });

    const result = await sendPost(data, 'spending/add_spending');
    if (result.status === 'success') {
      setSnack(true);
      setSnackMessage("데이터 추가 완료.");
      setSnackBarStatus("success");
      setAddStatus(false);
      setIsNotSortStatus(false);
      // 기존 리스트에 추가된 임시 id값 데이터의 id(0임)를 서버에 추가 후 반환 받은 진짜 id로 변경
      let newList = [...list];
      let firstItem = { ...newList[0] };
      firstItem.id = result.data.id;
      newList[0] = firstItem;
      dispatch(setSpendingList(newList));
      // 다시 추가할때 순서가 입력된 순서로 정렬되어 처리하기 위함
      handleRefreshList();
    } else {
      console.log("fail");
      setSnack(true);
      setSnackMessage("데이터 추가 실패.");
      setSnackBarStatus("error");
      setAddStatus(false);
      setIsNotSortStatus(false);
      dispatch(setSpendingList([...list]));
    }
  };

  // 항목 추가 취소
  const handleCloseList = () => {
    console.log('=== handleCloseList === ');
    const newList = list.filter((item) => item.id !== 0);
    setSelected([]);
    setAddStatus(false);
    dispatch(setSpendingList(newList));
    // 추가 시에 맨처음 페이지로 이동
    const movePage = 0;
    setPage(movePage);
  };

  // 엑셀 데이터 업로드
  const handleFileUpChange = async (event: any) => {
    debugger;
    console.log('=== handleFileChange === ');
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('excelFile', file);
    formData.append('member_id', sessionStorage.getItem('id') || '');

    const result = await sendFile(formData, 'spending/upload');
    if (result.status === 'success') {
      setSnack(true);
      setSnackMessage("데이터 업로드 완료.");
      setSnackBarStatus("success");
      getList(sessionStorage.getItem('id') + '');
    } else {
      console.log("fail");
      setSnack(true);
      setSnackMessage("데이터 업로드 실패.");
      setSnackBarStatus("error");
    }
  };

  // 엑셀 양식 데이터 다운로드
  const handleFormFileDown = () => {
    console.log('=== handleFormFileDown === ');
    const ws = XLSX.utils.aoa_to_sheet([['지출 발생월', '지출 유형', '지출 설명', '지출 금액']]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '지출내역');

    // 엑셀 파일을 Blob 형태로 생성합니다.
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    // Blob을 URL로 변환하고 엑셀 파일을 다운로드합니다.
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', '지출내역 데이터 양식.xlsx');
    document.body.appendChild(link);
    link.click();
  }

    // 엑셀 데이터 다운로드
    const handleFileDown = () => {
      console.log('=== handleFileDown === ');
      const wsData = list.map(item => [item.spnd_date, item.spnd_type, item.description, item.amount]);
      const ws = XLSX.utils.aoa_to_sheet([['지출 발생월', '지출 유형', '지출 설명', '지출 금액'], ...wsData]);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '지출내역');
  
      // 엑셀 파일을 Blob 형태로 생성합니다.
      const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([wbout], { type: 'application/octet-stream' });
  
      // Blob을 URL로 변환하고 엑셀 파일을 다운로드합니다.
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', '지출내역 데이터.xlsx');
      document.body.appendChild(link);
      link.click();
    }

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div">
          지출내역 기록
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteList}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <>
          {!addStatus ? (
            <>
              {/* file download */}
              <Tooltip title="지출내역 엑셀 다운로드">
                <IconButton component="span" aria-label="download" onClick={handleFileDown}>
                  <FileDownloadIcon />
                </IconButton>
              </Tooltip>
              {/* sheet download */}
              <Tooltip title="입력 양식 다운로드">
                <IconButton component="span" aria-label="formDownload" onClick={handleFormFileDown}>
                  <AttachFileIcon />
                </IconButton>
              </Tooltip>
              {/* file upload */}
              <input
                type="file"
                id="upload-file"
                style={{ display: 'none' }}
                onChange={handleFileUpChange}
              />
              <label htmlFor="upload-file">
                <Tooltip title="지출내역 엑셀 업로드">
                  <IconButton component="span" aria-label="upload">
                    <FileUploadIcon />
                  </IconButton>
                </Tooltip>
              </label>
              <Tooltip title="Refresh">
                <IconButton aria-label="refresh" onClick={handleRefreshList}>
                  <RefreshIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add">
                <IconButton onClick={handleAddList}>
                  <AddIcon />
                </IconButton>
              </Tooltip>
            </>
          ) : (
            <>
              <Tooltip title="Close">
                <IconButton onClick={handleCloseList}>
                  <CloseIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Complete">
                <IconButton onClick={handleCompleteList}>
                  <CheckIcon />
                </IconButton>
              </Tooltip>
            </>
          )}
        </>
      )}
    </Toolbar>
  );
}
