import { BigNumber } from '@ethersproject/bignumber';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    amount: {
        fontWeight: 900,
        color: '#302E52'
    }
}));

interface TVLMsgProps {
    amount: string
}

export const TVLMsg = ({ amount }: TVLMsgProps) => {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.amount}>Total Value Locked (USD): {amount}</div>
        </div>
    )
}