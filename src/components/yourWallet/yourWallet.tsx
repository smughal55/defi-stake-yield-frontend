import { Token } from "../Main"
import React, { useState } from 'react'
import { Box } from "@mui/material"
import { TabContext, TabList, TabPanel } from "@mui/lab"
import { Tab } from "@mui/material"
import { WalletBalance } from "./WalletBalance"
import { StakeForm } from "./StakeForm"
import { makeStyles } from "@mui/styles"
import { createTheme } from '@mui/material/styles';
import { ClassNames } from "@emotion/react"

interface YourWalletProps {
    supportedTokens: Array<Token>
}

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
    tabContent: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: '0 30px'
    },
    box: {
        backgroundColor: "white",
        borderRadius: '25px'
    },
    header: {
        color: "white"
    }
}))

export const YourWallet = ({ supportedTokens }: YourWalletProps) => {
    const [selectedTokenIndex, setSelectedTokenIndex] = useState<number>(0)

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setSelectedTokenIndex(parseInt(newValue))
    }

    const classes = useStyles()
    return (
        <Box>
            <h1 className={classes.header}> Your Wallet! </h1>
            <Box className={classes.box}>
                <TabContext value={selectedTokenIndex.toString()}>
                    <TabList onChange={handleChange} aria-label="stake form tabs">
                        {supportedTokens.map((token, index) => {
                            return (
                                <Tab label={token.name}
                                    value={index.toString()}
                                    key={index} />
                            )
                        })}
                    </TabList>
                    {supportedTokens.map((token, index) => {
                        return (
                            <TabPanel value={index.toString()} key={index}>
                                <div className={classes.tabContent}>
                                    <WalletBalance token={supportedTokens[selectedTokenIndex]} />
                                    <StakeForm token={supportedTokens[selectedTokenIndex]} />
                                </div>
                            </TabPanel>
                        )
                    })}
                </TabContext>
            </Box>
        </Box>
    )
}