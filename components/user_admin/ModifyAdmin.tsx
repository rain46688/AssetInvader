"use client"
import { useModifyAdmin } from '@/hooks/user_admin/useModifyAdmin';

// material-ui 관련 임포트
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

// 회원정보수정 컴포넌트
export default function ModifyAdmin() {

    const { 
        handleModify,
        newPassword,
        setNewPassword,
        newPassword_re,
        setNewPassword_re,
        newPasswordVaild,
        newPasswordReVaild,
        snack,
        snackMessage,
        handleSnackClose,
        handleBack,
        modifyState
    } = useModifyAdmin();

    return (
        <Container component="main" maxWidth="xs">
            {modifyState ?
                (
                    <>
                        <Box sx={{ width: '100%' }}>
                            <Typography component="h1" variant="subtitle1" align="center">
                                회원정보 수정이 완료되었습니다.
                            </Typography>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                handleBack();
                            }}>
                            관리자페이지로 돌아가기
                        </Button>
                    </>
                )
                : (
                    <>
                        {/* 스낵바 설정 */}
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={snack}
                            autoHideDuration={5000}
                            onClose={handleSnackClose}>
                            <Alert
                                onClose={handleSnackClose}
                                severity="error"
                                variant="filled"
                                sx={{ width: '100%' }}>
                                {snackMessage}
                            </Alert>
                        </Snackbar>
                        {/*  */}
                        <Typography component="h1" variant="h5" align="center">
                            회원정보 수정
                        </Typography>
                        <Box component="form" onSubmit={handleModify} noValidate sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword"
                                value={newPassword}
                                label="Password(신규)"
                                type="password"
                                id="newPassword"
                                autoComplete="current-password"
                                onChange={(event) => setNewPassword(event.target.value)}
                                error={newPasswordVaild}
                                helperText={newPasswordVaild ? "신규 비밀번호를 입력해주세요." : ""}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="newPassword_re"
                                value={newPassword_re}
                                label="Password(재입력)"
                                type="password"
                                id="newPassword_re"
                                autoComplete="current-password"
                                onChange={(event) => setNewPassword_re(event.target.value)}
                                error={newPasswordReVaild}
                                helperText={newPasswordReVaild ? "비밀번호가 일치하지 않습니다." : ""}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}>
                                수정하기
                            </Button>
                        </Box>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={() => {
                                handleBack();
                            }}>
                            관리자페이지로 돌아가기
                        </Button>
                    </>
                )}
        </Container>
    );
}