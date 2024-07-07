import Link from "next/link";

// material-ui 관련 임포트
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

export default function DescriptionCH2_2_3Page() {
  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h4"
        component="div"
      >
        2.나도 한 번 해보자! 자산배분
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h5"
        component="div"
      >
        2.2.투자자산 파해치기
      </Typography>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="h6"
        component="div"
      >
        2.2.3.지수추종 ETF
      </Typography>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "left",
          }}
        >
          <Typography
            sx={{
              flex: "1 1 100%",
              pt: { sm: 2 },
              textDecoration: "none", // 밑줄 제거
            }}
            variant="subtitle1"
            component={Link}
            href="/description/ch2_2_2"
          >
            2.2.2.개별주식
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              flex: "1 1 100%",
              pt: { sm: 2 },
              textDecoration: "none", // 밑줄 제거
            }}
            variant="subtitle1"
            component={Link}
            href="/description/index"
          >
            목록으로
          </Typography>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            textAlign: "right",
          }}
        >
          <Typography
            sx={{
              flex: "1 1 100%",
              pt: { sm: 2 },
              textDecoration: "none", // 밑줄 제거
            }}
            variant="subtitle1"
            component={Link}
            href="/description/ch2_3_1"
          >
            2.3.배당자산 파해치기
          </Typography>
        </Grid>
      </Grid>
      <Typography
        sx={{
          flex: "1 1 100%",
          pt: { sm: 2 },
        }}
        variant="body1"
        component="div"
      >
        ETF는 앞서 설명드린 것처럼 개별주식을 고르는 게 어렵고 투자자산을 만들고
        싶을 때 좋은 분류입니다. 그렇다면 지수추종이란 수많은 ETF의 종류 중
        하나이며 여러 증권시장을 대표하는 주가지수에 포함되어 있는 종목들을
        그대로 투자하여 주가지수와 비슷한 변동성을 가지게 설계된 펀드입니다. 이
        ETF는 본인이 종목 선택을 잘한다고 생각하지 않거나 깊은 수준의 투자공부가
        필요하지 않다고 생각하는 경우에 관심을 가질 수 있습니다. 주가지수의
        종류에는 한국의 KOSPI, KOSPI200, KOSDAQ, 미국의 NASDAQ, S&P500,
        다우존스, 러셀2000 등이 대표적이며 증권시장의 지수를 추종하는 종목은
        더욱 많습니다. 아래에 지수추종 자산의 대략적인 종류를 정리하였습니다.
      </Typography>

      <TableContainer sx={{ mt: 2 }}>
        <Table aria-label="지수추종 자산 정리 테이블">
          <TableHead>
            <TableRow>
              <TableCell>자산명</TableCell>
              <TableCell>자산운용사</TableCell>
              <TableCell>ETF의 종류</TableCell>
              <TableCell>운용자산의 크기</TableCell>
              <TableCell>분배율(%)</TableCell>
              <TableCell>분배금 지급주기</TableCell>
              <TableCell>보수(%)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>KODEX 200</TableCell>
              <TableCell>삼성</TableCell>
              <TableCell>KOSPI 200</TableCell>
              <TableCell>62,913억원</TableCell>
              <TableCell>1.18</TableCell>
              <TableCell>연 4회</TableCell>
              <TableCell>0.15</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>KODEX 코스닥150</TableCell>
              <TableCell>삼성</TableCell>
              <TableCell>KOSDAQ 150</TableCell>
              <TableCell>8,626억원</TableCell>
              <TableCell>0.14</TableCell>
              <TableCell>연 1회</TableCell>
              <TableCell>0.25</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TIGER 미국S&P500</TableCell>
              <TableCell>미래에셋</TableCell>
              <TableCell>S&P500</TableCell>
              <TableCell>35,556억원</TableCell>
              <TableCell>0.3</TableCell>
              <TableCell>연 4회</TableCell>
              <TableCell>0.07</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>TIGER 미국나스닥100</TableCell>
              <TableCell>미래에셋</TableCell>
              <TableCell>NASDAQ 100</TableCell>
              <TableCell>33,430억원</TableCell>
              <TableCell>0.12</TableCell>
              <TableCell>연 4회</TableCell>
              <TableCell>0.07</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Vanguard S&P 500 ETF(VOO)</TableCell>
              <TableCell>Vanguard</TableCell>
              <TableCell>S&P 500</TableCell>
              <TableCell>4,729억달러</TableCell>
              <TableCell>1.32</TableCell>
              <TableCell>연 4회</TableCell>
              <TableCell>0.03</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Invesco QQQ Trust(QQQ)</TableCell>
              <TableCell>Invesco</TableCell>
              <TableCell>NASDAQ 100(금융주 제외)</TableCell>
              <TableCell>2,748억달러</TableCell>
              <TableCell>0.58</TableCell>
              <TableCell>연 4회</TableCell>
              <TableCell>0.2</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Typography
        sx={{
          pt: 2,
        }}
        variant="body1"
        component="div"
      >
        위 자산들 중 어느 것을 투자할지 선택하는 기준은 크게 다음과 같습니다.
        알려드린 자산이 전부는 아니기에 원하는 시장이 없다면 직접 찾아보고,
        이전에 설명드렸던 ETF를 나누는 기준들(운용사, 자산의 크기 등) 중
        독자분들에게 맞는 우선순위를 생각하여 정하면 됩니다. 예를 들면 아래
        경우에 따라 다양한 상품 투자가 가능합니다.
      </Typography>

      <Typography
        sx={{
          pt: 1,
          pl: 2,
        }}
        variant="body2"
        component="div"
      >
        국내시장에 투자하고 싶으면 ⇒ KODEX 200이나 KODEX 코스닥 150과 같은
        국내상장 국내시장 투자 ETF를 매수
      </Typography>

      <Typography
        sx={{
          pt: 1,
          pl: 2,
        }}
        variant="body2"
        component="div"
      >
        미국시장에 직접 투자하고 싶으면 ⇒ VOO와 QQQ와 같은 미국시장에 상장되어
        있는 ETF를 매수
      </Typography>

      <Typography
        sx={{
          pt: 1,
          pl: 2,
        }}
        variant="body2"
        component="div"
      >
        보수가 낮으면서 미국시장에 투자하고 싶으면 ⇒ TIGER 미국나스닥 100 같은
        국내상장 미국시장 투자 ETF 매수
      </Typography>

      <Typography
        sx={{
          pt: 2,
        }}
        variant="body1"
        component="div"
      >
        위 보여드린 예시 및 자산의 종류보다 훨씬 많고 다양한 ETF 상품이 있으므로
        비교해보고 매수하는 것이 좋습니다.
      </Typography>
    </Box>
  );
}
