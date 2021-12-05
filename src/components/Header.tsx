import { useEthers } from "@usedapp/core"
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        justifyContent: "flex-end",
        gap: '0 5px',
        padding: '8px 8px'
    },
    root: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 30,
        padding: '0 30px',
        variant: 'contained'
    },
}));

export const Header = () => {
    const classes = useStyles()
    const { account, activateBrowserWallet, deactivate } = useEthers()

    const isConnected = account !== undefined

    return (
        <div className={classes.container}>
            {isConnected ? (
                <>
                    <button className={classes.root}>
                        {`${account?.slice(0, 4)}...${account?.slice(-3)}`}
                    </button>
                    <button className={classes.root} onClick={deactivate}>
                        Disconnect
                    </button>
                </>
            ) : (
                <button className={classes.root}
                    onClick={() => activateBrowserWallet()}>
                    Connect
                </button>
            )
            }
        </div>
    )
}