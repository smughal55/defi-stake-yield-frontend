import { formatUnits } from "@ethersproject/units"
import { useEthers, useTokenBalance, useNotifications } from "@usedapp/core"
import { Token } from "../Main"
import { Input, CircularProgress, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Alert from "@mui/lab/Alert"
import { useStakeTokens } from "../../hooks/useStakeTokens";
import { useUnStakedTokens } from "../../hooks/useUnstakedTokens";
import { utils } from "ethers"


export interface StakeFormProps {
    token: Token
}

export const UnStakeForm = ({ token }: StakeFormProps) => {

    const { address: tokenAddress, name } = token
    const { account } = useEthers()
    const tokenBalance = useTokenBalance(tokenAddress, account)
    const formattedTokenBalance: number = tokenBalance ? parseFloat(formatUnits(tokenBalance, 18)) : 0
    const { notifications } = useNotifications()

    const { unStake, state: unStakeState } = useUnStakedTokens(tokenAddress)
    const handleStakeSubmit = () => {
        return unStake(tokenAddress)
    }

    const isMining = unStakeState.status === "Mining"

    const [showUnStakeTokenSuccess, setShowUnStakeTokenSuccess] = useState(false)
    const handleCloseSnack = () => {
        setShowUnStakeTokenSuccess(false)
    }

    useEffect(() => {
        if (notifications.filter(
            (notification) =>
                notification.type === "transactionSucceed" &&
                notification.transactionName === "unStake Tokens").length > 0) {
            setShowUnStakeTokenSuccess(true)
        }
    }, [notifications, showUnStakeTokenSuccess])

    return (
        <>
            <div>
                <Button
                    onClick={handleStakeSubmit}
                    variant="text"
                    color="primary"
                    disabled={isMining}>
                    {isMining ? <CircularProgress size={26} /> : "UNSTAKE"}
                </Button>
            </div>
            <Snackbar
                open={showUnStakeTokenSuccess}
                autoHideDuration={5000}
                onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    All {name} Tokens Un-Staked!
                </Alert>
            </Snackbar>
        </>
    )
}