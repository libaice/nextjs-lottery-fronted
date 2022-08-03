import {useWeb3Contract, useWeb3Transfer} from "react-moralis"
import {abi, contractAddress} from "../constants"
import {useMoralis} from 'react-moralis'
import {useEffect, useState} from "react";
import {ethers} from "ethers"

export default function LotteryEntrance() {
    const {chainId: chainIdHex, isWeb3Enabled} = useMoralis();
    const chainId = parseInt(chainIdHex)

    const raffleAddress = chainId in contractAddress ? contractAddress[chainId][0] : null
    // let entranceFee = ""

    // use useState hook

    const [entranceFee, setEntranceFee] = useState("0")

    // const {runContractFunction: enterRaffle} = useWeb3Contract({
    //
    //     // abi: abi,
    //     // contractAddress: contractAddress,
    //     // abi
    //     // contractAddress
    //     // functionname
    //     // params
    //     // magValue
    // })

    const {runContractFunction: getEntranceFee} = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {}

    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entranceFeeFromCall = (await getEntranceFee()).toString();
                setEntranceFee(entranceFeeFromCall);
            }

            updateUI()
        }
    }, [isWeb3Enabled])

    return <div>
        Hi From Lottery entrance
        {raffleAddress ? (   <div> Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")} ETH </div>) : (
            <div> No Raffle Address Detached </div>
        )}

    </div>
}