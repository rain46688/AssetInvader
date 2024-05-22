
// 포멧 관련 함수들을 모아둔 파일

/**
 * formatDate 함수 : 날짜를 받아서 yyyy-mm-dd hh:mm:ss 형태로 변환
 * @param dateString : 날짜
 * @returns : yyyy-mm-dd hh:mm:ss 형태의 날짜
 */
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

/**
 * formatDateV2 함수 : 날짜를 받아서 yyyy-mm-dd 형태로 변환
 * @param dateString : 날짜
 * @returns : yyyy-mm-dd 형태의 날짜
 */
export const formatDateV2 = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * formatDateV3 함수 : 날짜를 받아서 yyyy-mm 형태로 변환
 * @param dateString : 날짜
 * @returns : yyyy-mm 형태의 날짜
 */
export const formatDateV3 = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
};

/**
 * parseDate 함수 : yyyy-mm-dd 형태의 날짜를 받아서 날짜 타입으로 변경
 * @param yyyy-mm-dd 형태의 날짜
 * @returns : 날짜 객체
 */
export const parseDate = (dateString: string) => {
    const [year, month, day] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day);
}

/**
 * parseNumber 함수 : 문자형태의 숫자를 받아 천단위 콤마를 찍어서 반환
 * @param 콤마가 없는 형태의 숫자, 문자열
 * @returns : 콤마가 있는 형태의 숫자 문자열
 */
export const parseNumber = (numString: string | number) => {
    const str = typeof numString === 'number' ? numString.toString() : numString;
    if(str === '0')
        return '0';
    else
        return str.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * parseNumberDot 함수 : 문자형태의 숫자를 받아 천단위 콤마 및 소수점 둘째자리에서 반올림하여 반환
 * @param 콤마가 없는 형태의 숫자, 문자열
 * @returns : 콤마가 있고 소수점 둘째자리에서 반올림된 형태의 숫자 문자열
 */
export const parseNumberDot = (numString: string | number) => {
    const num = typeof numString === 'string' ? parseFloat(numString) : numString;
    if (isNaN(num)) return '0.00'; // 숫자가 아닌 경우 빈 문자열 반환
    const formattedNum = num.toFixed(2); // 소수점 두 번째 자리까지 반올림
    const parts = formattedNum.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // 천단위 콤마 추가
    return parts.join('.'); // 소수점 이후와 합쳐서 반환
}

// 숫자 관련
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import * as React from 'react';

interface CustomProps {
    onChange: (event: { target: { name: string; value: string } }) => void;
    name: string;
}

export const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    onChange({
                        target: {
                            name: props.name,
                            value: values.value,
                        },
                    });
                }}
                thousandSeparator
                valueIsNumericString
                prefix=""
            />
        );
    },
);