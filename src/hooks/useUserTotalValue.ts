import { useContractCall, useEthers } from "@usedapp/core"
import { constants, utils, BigNumber } from "ethers"
import TokenFarm from "../chain-info/contracts/TokenFarm.json"
import networkMapping from "../chain-info/deployments/map.json"
import { useState, useEffect } from "react"
import { Falsy } from "@usedapp/core/dist/esm/src/model/types"

export const useUserTotalValue = (fetch: boolean): BigNumber | undefined => {
    // address
    // abi
    // chainId
    const { chainId } = useEthers()
    const { abi } = TokenFarm
    const tokenFarmAddress = chainId ? networkMapping[String(chainId)]["TokenFarm"][0] : constants.AddressZero
    const tokenFarmInterface = new utils.Interface(abi)

    const { account } = useEthers()
    var userAccount: String | Falsy
    console.log("fetch: " + fetch)
    const [numberOfUniqueTokensStaked] =
        useContractCall(
            fetch &&
            {
                abi: tokenFarmInterface,
                address: tokenFarmAddress,
                method: "uniqueTokensStaked",
                args: [account],
            }
        ) ?? [];
    console.log("numberOfUniqueTokensStaked:" + numberOfUniqueTokensStaked)
    userAccount = numberOfUniqueTokensStaked === undefined || Number(numberOfUniqueTokensStaked) === 0 ? false : account
    console.log("userAccount:" + userAccount)

    // get user's total value (USD)
    const [userTotalValue] =
        useContractCall(
            userAccount &&
            {
                abi: tokenFarmInterface,
                address: tokenFarmAddress,
                method: "getUserTotalValue",
                args: [account],
            }
        ) ?? [];
    return userTotalValue
}