/* eslint-disable spaced-comment */
/// <reference types="react-scripts" />
import { useEthers } from "@usedapp/core"
import helperConfig from "../helper-config.json"
import networkMapping from "../chain-info/deployments/map.json"
import { constants } from "ethers"
import brownieConfig from "../brownie-config.json"
import dapp from "../dapp.png"
import dai from "../dai.png"
import eth from "../eth.png"
import { YourWallet } from "./yourWallet/yourWallet"
import { makeStyles } from "@mui/styles"
import { YourTokenFarm } from "./yourTokenFarm"
import { UserTVL } from "./TVL"

export type Token = {
    image: string
    address: string
    name: string
}

const useStyles = makeStyles(() => ({
    title: {
        color: 'white',
        textAlign: 'center',
        padding: '0 30px'
    }
}))

export const Main = () => {
    // Show token values from the wallet
    // Get the address of different tokens
    // Get the balance of the users wallet

    // send the brownie-config to our 'src' folder
    // send the build folder
    const classes = useStyles()
    const { chainId } = useEthers()
    const networkName = chainId ? helperConfig[chainId] : "dev"
    //console.log(chainId)
    //console.log(networkName)
    const dappTokenAddress = chainId ? networkMapping[String(chainId)]["DappToken"][0] : constants.AddressZero
    const wethTokenAddress = chainId ? brownieConfig["networks"][networkName]["weth_token"] : constants.AddressZero
    const fauTokenAddress = chainId ? brownieConfig["networks"][networkName]["fau_token"] : constants.AddressZero
    //const daiTokenAddress = chainId ? brownieConfig["networks"][networkName]["dai_token"] : constants.AddressZero

    const supportedTokens: Array<Token> = [
        {
            image: dapp,
            address: dappTokenAddress,
            name: "DAPP"
        },
        {
            image: eth,
            address: wethTokenAddress,
            name: "WETH"
        },
        {
            image: dai,
            address: fauTokenAddress,
            name: "DAI"
        }
    ]

    return (<>
        <h2 className={classes.title}>ellipseFi</h2>
        <YourWallet supportedTokens={supportedTokens} />
        <YourTokenFarm supportedTokens={supportedTokens} />
    </>)
}