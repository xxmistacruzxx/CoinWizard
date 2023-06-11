import axios from "axios"

export default async function handler(req, res) {
  let address = req.query.address;
  let api = process.env.ethscan

  let amountData = await axios.get(`https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${api}`)
  amountData = amountData.data;
  if (amountData.status !== "1")
    return res.status(400).json({error: amountData.result})

  let lastBlockData = await axios.get(`https://api.etherscan.io/api?module=account&action=getminedblocks&address=${address}&blocktype=blocks&page=1&offset=1&apikey=${api}`)
  lastBlockData = lastBlockData.data.result;

  let amount = Number(amountData.result) / (Math.pow(10,18))
  return res.status(200).json({amount: amount, lastBlockData: lastBlockData})
}
