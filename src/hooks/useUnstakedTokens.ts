import { useContractCall, useContractFunction, useEthers } from "@usedapp/core"
import { constants, utils, BigNumber } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import ERC20 from "../chain-info/contracts/MockERC20.json"
import { Contract } from "@ethersproject/contracts"
import networkMapping from "../chain-info/deployments/map.json"
import { useState, useEffect } from "react"

export const useStakedTokens = (tokenAddress: string): BigNumber | undefined => {
    // address
    // abi
    // chainId
    const { account, chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)

    // get user's staked amount (balance)
    const [tokenBalance] =
        useContractCall(
            {
                abi: tokenFarmInterface,
                address: tokenFarmAddress,
                method: "stakingBalance",
                args: [tokenAddress, account],
            }
        ) ?? [];
    return tokenBalance;

}

export const useUnStakedTokens = (tokenAddress: string) => {
    // address
    // abi
    // chainId
    const { account, chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)
    const tokenFarmContract = new Contract(tokenFarmAddress, tokenFarmInterface)

    const erc20ABI = ERC20.abi
    const erc20Interface = new utils.Interface(erc20ABI)
    const erc20Contract = new Contract(tokenAddress, erc20Interface)

    // unStake
    const { send: unStakeSend, state: unStakeState } =
        useContractFunction(tokenFarmContract, "unStakeTokens", {
            transactionName: "unStake Tokens"
        })

    const unStake = (tokenAddress: string) => {
        unStakeSend(tokenAddress)
    }

    const [state, setState] = useState(unStakeState)

    useEffect(() => {
        setState(unStakeState)
        console.log("unStakeState: " + unStakeState.status)
    }, [unStakeState])

    return { unStake, state }
}