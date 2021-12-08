import { BigNumber } from '@ethersproject/bignumber';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    amount: {
        fontWeight: 700,
        color: "white"
    }
}));

interface TVLMsgProps {
    amount: string
}

export const TVLMsg = ({ amount }: TVLMsgProps) => {
    const classes = useStyles()

    return (
        <div>
            <div className={classes.amount}>{amount}</div>
        </div>
    )
}